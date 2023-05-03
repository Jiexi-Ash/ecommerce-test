import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import axios from "axios";

const baseURL = process.env.PAYPAL_URL;
const generateAccessToken = async () => {
  const baseURL = process.env.PAYPAL_URL;
  const client_id = process.env.PAYPAL_CLIENT_ID;
  const client_secret = process.env.PAYPAL_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    throw new Error("Missing PayPal credentials");
  }

  const response = await axios.post(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    `${baseURL!}/v1/oauth2/token`,
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${client_id}:${client_secret}`
        ).toString("base64")}`,
      },
    }
  );

  const data = (await response.data) as { access_token: string };

  return data.access_token;
};

export const paymentRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  createOrder: protectedProcedure
    .input(
      z.object({
        purchase_units: z.array(
          z.object({
            amount: z.object({
              currency_code: z.string(),
              value: z.string(),
            }),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.auth.userId;
      console.log(userId);
      const { purchase_units } = input;
      const accessToken = await generateAccessToken();

      try {
        const response = await axios.post(
          "https://api.sandbox.paypal.com/v2/checkout/orders",
          {
            intent: "CAPTURE",
            purchase_units,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = (await response.data) as { id: string };

        return data.id;
      } catch (error) {
        console.log("Error creating order");
        console.log(error);
        throw new Error("Error creating order");
      }
    }),

  approveOrder: protectedProcedure
    .input(
      z.object({
        order_id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const token = await generateAccessToken();

      const { order_id } = input;

      try {
        const response = await axios.post(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          baseURL! + "/v2/checkout/orders/" + order_id + "/capture",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = (await response.data) as { id: string };

        return data;
      } catch (error) {
        console.log("not logged in");
        throw new Error("Error approving order");
      }
    }),
});

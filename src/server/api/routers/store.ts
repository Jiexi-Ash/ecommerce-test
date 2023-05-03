import { array, z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const storeRouter = createTRPCRouter({
  createStore: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        industry: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const userID = ctx.auth.userId;

      const { name, industry, description } = input;

      try {
        const store = await ctx.prisma.store.create({
          data: {
            name,
            industry,
            description,
            userId: userID,
          },
        });

        return store;
      } catch (e) {
        throw new Error("Error creating store");
      }
    }),
});

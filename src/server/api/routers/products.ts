import { array, z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const productsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.product.findMany();
  }),
  createProduct: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        image: z.string(),
        category: z.string(),
        size: array(z.string()),
        storeId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const userID = ctx.auth.userId;
      const { name, price, quantity, image, storeId, category, size } = input;
      const getRole = await ctx.prisma.profile.findUnique({
        where: { id: userID },
        select: { role: true },
      });

      if (!getRole) {
        throw new Error("User not found");
      }

      if (getRole.role !== "BUSINESS") {
        throw new Error("User is not an BUSINESS");
      }

      try {
        // create product and add size to product
        const product = await ctx.prisma.product.create({
          data: {
            name,
            price,
            quantity,
            image,
            category,
            storeId: storeId,
            sizes: {
              create: size.map((size) => ({
                size,
              })),
            },
          },
        });

        return product;
      } catch (e) {
        return e;
      }
    }),
});

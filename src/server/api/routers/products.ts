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
        description: z.string().optional(),
        price: z.number(),
        quantity: z.number(),
        category: z.string(),
        size: array(z.string()),
        storeId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, price, quantity, storeId, category, size, description } =
        input;

      try {
        // create product and add size to product
        const product = await ctx.prisma.product.create({
          data: {
            name,
            description,
            price,
            quantity,
            category,
            storeId: storeId,
            sizes: {
              create: size.map((size) => ({
                size,
              })),
            },
          },
        });
        console.log(product);

        return product;
      } catch (e) {
        return e;
      }
    }),
});

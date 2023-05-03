import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const storeRouter = createTRPCRouter({
  createStore: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        industry: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
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
  getStore: protectedProcedure.query(async ({ ctx }) => {
    const userID = ctx.auth.userId;

    try {
      const store = await ctx.prisma.store.findUnique({
        where: {
          userId: userID,
        },
      });

      return store;
    } catch (e) {
      throw new Error("Error getting store");
    }
  }),
  updateStore: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        industry: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userID = ctx.auth.userId;

      const { name, industry, description } = input;

      try {
        const store = await ctx.prisma.store.update({
          where: {
            userId: userID,
          },
          data: {
            name,
            industry,
            description,
          },
        });

        return store;
      } catch (e) {
        throw new Error("Error updating store");
      }
    }),
});

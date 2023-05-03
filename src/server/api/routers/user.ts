// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getRole: protectedProcedure.query(async ({ ctx }) => {
    try {
      const userID = ctx.auth.userId;
      const role = await ctx.prisma.profile.findFirst({
        where: {
          userId: userID,
        },
        select: {
          role: true,
        },
      });

      return role;
    } catch (error) {
      return error;
    }
  }),
});

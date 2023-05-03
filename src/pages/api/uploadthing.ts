import { createNextPageApiHandler } from "uploadthing/server";
import { ourFileRouter } from "~/server/api/uploadthing";

const handler = createNextPageApiHandler({
  router: ourFileRouter,
});

export default handler;

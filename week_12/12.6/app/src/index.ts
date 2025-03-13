import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export interface Env {
  DATABASE_URL: string;
}

export default {
  async fetch(request, env, ctx) {
    const prisma = new PrismaClient({
      datasourceUrl: env.DATABASE_URL,
    }).$extends(withAccelerate());

	const response = await prisma.log.create({
		data:{
			level:"info",
			message:`${request.method}`,
			meta:{
				headers:JSON.stringify(request.headers)
			}
		}
	})
	console.log(JSON.stringify(response))

	return Response.json(response)

    // const logs = await prisma.log.findMany().withAccelerateInfo();
    // const result = JSON.stringify(logs);
    // return new Response(result);
  },
} satisfies ExportedHandler<Env>;
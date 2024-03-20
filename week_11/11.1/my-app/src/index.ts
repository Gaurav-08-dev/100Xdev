export interface Env {}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		if (request.method === 'GET') {
			return Response.json({
				message: 'Get Request',
			});
		} else {
			return Response.json({
				message: 'Some other request',
			});
		}
	},
};

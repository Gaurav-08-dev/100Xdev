export interface Env {}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {

		// How to do routing
		if (request.method === 'GET') {
			return Response.json({
				message: 'So I came back to practice',
			});
		} else {
			return Response.json({
				message: 'Some other request',
			});
		}
	},
};

import { OpenAPIRoute } from "chanfana";
import { z } from "zod";

export class HelloEndpoint extends OpenAPIRoute {
  schema = {
    tags: ["General"],
    summary: "Health check endpoint",
    responses: {
      200: {
        description: "Successful response",
        content: {
          "application/json": {
            schema: z.object({
              status: z.boolean(),
              message: z.string(),
            }),
          },
        },
      },
    },
  };

  async handle() {
    return Response.json({ status: true, message: "Hello Tanstack Start!" });
  }
}

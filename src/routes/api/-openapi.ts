import { fromHono } from "chanfana"
import type { Hono } from "hono"
import { HelloEndpoint } from "./-hello.route"

export function setupOpenAPI(app: Hono) {
  const openapi = fromHono(app, {
    schema: {
      openapi: "3.1.0",
      info: {
        title: "Global Economy API",
        version: "1.0.0",
        description: "API for the Global Economy application",
        contact: {
          name: "Global Economy Team",
          email: "support@global-economy.com",
          url: "https://global-economy.com",
        },
        license: {
          name: "Apache 2.0",
          url: "https://www.apache.org/licenses/LICENSE-2.0.html",
        },
        termsOfService: "https://global-economy.com/terms",
      },
      security: [
        { BearerAuth: [] },
        { ApiKeyAuth: [] },
        { OAuth2: ["read:users", "read:products"] },
      ],
      servers: [
        {
          url: "https://api.global-economy.com/v1",
          description: "Production server",
        },
        {
          url: "https://staging-api.global-economy.com/v1",
          description: "Staging server",
        },
      ],
      tags: [
        { name: "User", description: "Operations related to user management" },
        {
          name: "Product",
          description: "Operations related to product management",
        },
      ],
    },
    openapi_url: "/doc",
    docs_url: "/ui",
    openapiVersion: "3.1",
    generateOperationIds: true,
    raiseUnknownParameters: false,
  })

  openapi.registry.registerComponent("securitySchemes", "BearerAuth", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  })

  openapi.registry.registerComponent("securitySchemes", "ApiKeyAuth", {
    type: "apiKey",
    in: "header",
    name: "X-API-Key",
    description: "API key authentication using the X-API-Key header",
    flows: {
      authorizationCode: {
        authorizationUrl: "https://example.com/api/oauth/dialog",
        tokenUrl: "https://example.com/api/oauth/token",
        scopes: {
          "read:data": "Grants read access to data",
          "write:data": "Grants write access to data",
        },
      },
    },
    openIdConnectUrl: "https://example.com/.well-known/openid-configuration",
    scheme: "bearer",
    summary: "API key authentication using the X-API-Key header",
  })

  openapi.registry.registerComponent("securitySchemes", "OAuth2", {
    type: "oauth2",
    flows: {
      authorizationCode: {
        authorizationUrl: "https://auth.global-economy.com/oauth/authorize",
        tokenUrl: "https://auth.global-economy.com/oauth/token",
        scopes: {
          "read:users": "Read user data",
          "write:users": "Create and update users",
          "read:products": "Read product data",
          "write:products": "Create and update products",
        },
      },
    },
  })

  openapi.registry.registerComponent("schemas", "Pagination", {
    type: "object",
    properties: {
      page: { type: "integer", example: 1 },
      limit: { type: "integer", example: 10 },
      total: { type: "integer", example: 100 },
    },
  })

  openapi.get("/hello", HelloEndpoint)
}

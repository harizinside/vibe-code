# Global Economy API

API for the Global Economy application.

## Base URL

```
https://api.global-economy.com/v1
```

## Authentication

This API supports multiple authentication methods:

- **Bearer Token** — JWT token in the `Authorization` header
- **API Key** — API key in the `X-API-Key` header
- **OAuth2** — OAuth2 authorization code flow

## Endpoints

### GET /hello

Health check endpoint.

**Response**

```json
{
  "status": true,
  "message": "Hello Tanstack Start!"
}
```

### Swagger UI

Interactive API documentation available at [`/api/ui`](/api/ui).

### OpenAPI Spec

Raw OpenAPI 3.1 JSON available at [`/api/doc`](/api/doc).

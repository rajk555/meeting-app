# Exa MCP API Reference

This reference documents the Exa MCP endpoint used by this skill.

**Base URL:** `https://mcp.exa.ai/mcp`

## Request Schema

```json
{
  "query": "<topic>",
  "days_back": <integer>,
  "max_results": <integer>
}
```

- `query`: Search query or topic string.
- `days_back`: Limit results to items published within the past N days.
- `max_results`: Maximum number of results to return.

## Response Schema

On success, returns a JSON object:

```json
{
  "results": [
    {
      "title": "...",
      "url": "https://...",
      "snippet": "...",
      "published_at": "YYYY-MM-DD",
      "source": "..."
    },
    ...
  ],
  "metadata": {
    "query": "<topic>",
    "count": <integer>
  }
}
```

## Error Handling

- HTTP status codes >= 400 indicate failure.
- Error responses may include an `error` field with details.

## Authentication

_None required currently; update here if API key or token becomes necessary._

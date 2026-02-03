---
name: exa-mcp-search
description: Structured web search and summarization via Exa MCP. Use when you need to fetch, filter, and synthesize external articles or sources through the Exa MCP API.
---

# Exa MCP Search

## Overview

Use Exa MCP to perform structured web searches on a topic and automatically validate, normalize, and summarize results. Triggers when user asks to fetch articles, extract key points, or check for updates via Exa MCP (e.g. "Use the Exa MCP to search the web for the latest on <topic>").

## Quick Start

```plaintext
# List top 5 recent articles and generate a summary
Use Exa MCP to get 5 recent articles on Kubernetes and extract key points.
```

## Core Functionality

1. **Call MCP endpoint** with search parameters (topic, filters like days_back, domain, language).
2. **Validate response** status and handle empty or error cases gracefully.
3. **Normalize results** into fields: title, URL, summary/snippet, publish date, source.
4. **Rank and trim** to `max_results`, drop duplicates.
5. **Format output**:
   - Bulleted list of hits
   - 2–3 sentence meta-summary synthesizing top results

## Skill Flags

| Flag              | Type     | Default | Description                                        |
| ----------------- | -------- | ------- | -------------------------------------------------- |
| `max_results`     | integer  | 5       | Maximum number of results to return                |
| `days_back`       | integer  | 7       | Only include articles published within this window |
| `include_snippets`| boolean  | true    | Whether to include article snippets in the output  |

## Examples

- “Use the Exa MCP to search the web for the latest on security vulnerabilities.”
- “Ask Exa to find high‑quality sources about climate change and summarize them.”
- “Call the Exa MCP to get 5 recent articles on React and extract key points.”

## Scripts

See **scripts/** for implementation details.

## References

See **references/mcp_api.md** for API endpoint and schema documentation.

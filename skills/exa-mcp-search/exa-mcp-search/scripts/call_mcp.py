#!/usr/bin/env python3
"""
Call the Exa MCP endpoint and normalize results.
Usage:
    python call_mcp.py --topic TOPIC [--max_results N] [--days_back D] [--include_snippets]
"""
import argparse
import sys
import requests

API_URL = "https://mcp.exa.ai/mcp"


def parse_args():
    parser = argparse.ArgumentParser(description="Query Exa MCP and process results.")
    parser.add_argument('--topic', required=True, help='Search topic or query string')
    parser.add_argument('--max_results', type=int, default=5, help='Maximum number of results')
    parser.add_argument('--days_back', type=int, default=7, help='Limit results to this many days back')
    parser.add_argument('--include_snippets', action='store_true', default=True, help='Include content snippets')
    return parser.parse_args()


def call_mcp(topic, days_back, max_results):
    # TODO: implement actual API call and authentication if required
    payload = {
        'query': topic,
        'days_back': days_back,
        'max_results': max_results
    }
    try:
        response = requests.post(API_URL, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        sys.exit(f"Error calling Exa MCP: {e}")


def normalize(items):
    # TODO: adapt this to the MCP response schema
    normalized = []
    for it in items:
        normalized.append({
            'title': it.get('title'),
            'url': it.get('url'),
            'snippet': it.get('snippet'),
            'published_at': it.get('published_at'),
            'source': it.get('source')
        })
    return normalized


def format_output(normalized, include_snippets):
    bullets = []
    for doc in normalized:
        line = f"- {doc['title']} ({doc['source']}, {doc['published_at']}): {doc['url']}"
        if include_snippets and doc.get('snippet'):
            line += f"\n  snippet: {doc['snippet']}"
        bullets.append(line)
    return "\n".join(bullets)


def main():
    args = parse_args()
    raw = call_mcp(args.topic, args.days_back, args.max_results)
    items = raw.get('results', [])
    normalized = normalize(items)
    output = format_output(normalized, args.include_snippets)
    print(output)


if __name__ == '__main__':
    main()

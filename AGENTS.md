<!-- effect-solutions:start -->
## Effect TypeScript

This project is configured with Effect, a TypeScript library for building resilient applications with powerful error handling and functional programming patterns.

**Key Effect Concepts:**
- Use `Effect.gen` for sequential operations with error handling
- Wrap operations that can fail in `Effect.tryPromise` or `Effect.try`
- Use `Effect.runPromise` or `Effect.runSync` to execute effects
- Schema validation lives in `effect/Schema` (not `@effect/schema`)
- Prefer Effect's built-in utilities for common operations

**Development Tools:**
- Run `bun run typecheck` for comprehensive type checking with Effect diagnostics
- The Effect Language Service provides compile-time validation and better error messages
- Use Effect's testing utilities for robust test scenarios

**Example Effect Pattern:**
```ts
import { Effect, pipe } from "effect"

const program = pipe(
  Effect.tryPromise(() => fetch("https://api.example.com")),
  Effect.flatMap(response => Effect.tryPromise(() => response.json())),
  Effect.map(data => data.result)
)

// Run the effect
Effect.runPromise(program).then(console.log).catch(console.error)
```

**Effect Solutions Usage:**
The Effect Solutions CLI provides curated best practices and patterns for Effect TypeScript. Before working on Effect code, check if there's a relevant topic that covers your use case.

- `bun run effect-solutions list` - List all available topics
- `bun run effect-solutions show <slug...>` - Read one or more topics
- `bun run effect-solutions search <term>` - Search topics by keyword

**Local Effect Source:** The Effect repository is cloned to `~/.local/share/effect-solutions/effect` for reference. Use this to explore APIs, find usage examples, and understand implementation details when the documentation isn't enough.
<!-- effect-solutions:end -->

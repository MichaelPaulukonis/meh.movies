# ADR-001: Use TypeScript and Node.js

**Date**: 2026-02-03
**Status**: Accepted
**Deciders**: Engineering Team
**Related**: N/A

## Context

The project requires a solution for "Movie Systems Design", specifically involving data manipulation (SQLite) and LLM integration. The constraints allow for either Python or TypeScript/Node.js. We need to select a primary language and runtime environment that balances rapid development, type safety, and ecosystem support for both database and AI interactions.

### Current Situation

- The team is setting up the environment from scratch.
- The challenge explicitly allows TypeScript (Node.js v18+) or Python 3.x.
- We need to interface with:
  - SQLite databases (`movies.db`, `ratings.db`).
  - OpenAI API for enrichment and system tasks.
  - File system for JSON outputs.

## Decision

We decided to use **TypeScript with Node.js**.

### Implementation Strategy

- **Runtime**: Node.js (v18+) using `pnpm` for package management.
- **Language**: TypeScript for static typing.
- **Execution**: `ts-node` for direct execution during development/testing.
- **Libraries**:
  - `sqlite3` & `sqlite`: For database interactions.
  - `openai`: For LLM integration.
  - `dotenv`: For environment variable management.

## Rationale

We chose TypeScript/Node.js over Python for the following reasons:

### Advantages of This Decision ✅

1.  **Type Safety**: TypeScript provides strong static typing, which reduces runtime errors and improves developer tooling (autocompletion, refactoring) compared to standard Python.
2.  **Async/Await Model**: Node.js's non-blocking I/O and `async/await` pattern are naturally suited for IO-bound tasks like database queries and API calls to OpenAI, handling concurrency efficiently.
3.  **Unified Ecosystem**: If a frontend were to be added (e.g., React/Next.js), using TypeScript allows for sharing types and logic between backend scripts and frontend UI.

### Disadvantages or Trade-offs ⚠️

1.  **Setup Complexity**: Requires compilation (or `ts-node`) and configuration (`tsconfig.json`) compared to Python's interpreted nature.
2.  **Data Science Libraries**: Python has a stronger ecosystem for heavy data analysis (pandas, numpy). However, the current requirements (enrichment, simple aggregation) are well within the capabilities of JS/TS arrays and basic math.

### Alternatives Considered 🔄

1.  **Python**
    - **Pros**: Excellent for data science (`pandas`), simpler initial script setup.
    - **Cons**: Lack of static typing (unless strict MyPy is used), potentially slower for concurrent IO without `asyncio` complexity.
    - **Why not chosen**: The project scope involves building a "system" rather than just a data analysis notebook, making TypeScript's structural benefits appealing.

## Consequences

### Positive ✅

1.  **Code Quality**: Interfaces for API responses and Database schemas can be defined, ensuring data consistency throughout the application.
2.  **Modern Tooling**: Leveraging `pnpm` and modern ES modules.

### Negative ⚠️

1.  **Compilation Overhead**: Need to handle ESM vs CommonJS compatibility issues (as encountered during setup).

## Validation & Exit Criteria

- [x] Environment is set up with `package.json` and `tsconfig.json`.
- [x] Scripts run successfully using `ts-node`.
- [x] Database connections and API calls function correctly in the chosen environment.

## Future Considerations

- If heavy machine learning (beyond API calls) is required, we might need to introduce a Python microservice or use bindings, but for LLM API integration, Node.js is sufficient.

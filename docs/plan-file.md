# Remediation Plan: meh.movies 🙄

**Date:** February 5, 2026  
**Focus:** Addressing Critical, Documentation, and Security concerns identified in the Repository Snapshot.

---

## 1. Critical Issues (Functional & Architecture)

### C1: Recommendation Sampling Limitation

**Issue:** The recommendation engine only samples 20 movies from the database via a `LIMIT 20` query. This significantly limits the relevance and variety of suggestions.
**Plan:**

- Implement a multi-stage retrieval process:
    1. Extract keywords/genres from the user mood via a small LLM call or simple regex.
    2. Query the SQLite database using these keywords (e.g., `WHERE thematic_keywords LIKE %key%`).
    3. Pass the filtered subset (up to 50 movies) to Claude Sonnet for final selection.
**Risk:** Keyword matching might be too restrictive or too broad.
**Trade-off:** Better relevance at the cost of slightly higher latency (potential extra DB/LLM call).

### C2: UI/Logic Coupling

**Issue:** Component logic for movie cards and recommendation displays is embedded directly in `pages/index.vue`.
**Plan:**

- Extract `MovieCard.vue` and `RecommendationList.vue` into `components/`.
**Trade-off:** Minimal risk, high maintainability gain.

---

## 2. Documentation Issues

### D1: API Specification

**Issue:** No formal documentation for the `/api/` endpoints.
**Plan:**

- Create `docs/api/endpoints.md` documenting the request/response schemas for `movies.get.ts` and `recommendations.post.ts`.

### D2: Legacy Code Confusion

**Issue:** `src/index.ts` and `src/enrichment.ts` use OpenAI, while the rest of the app has moved to Anthropic.
**Plan:**

- Move legacy scripts to `src/legacy/` and update `package.json` scripts to reflect this change.

---

## 3. Security Issues

### S1: Basic Input Sanitization

**Issue:** Current sanitization in `server/utils/llm.ts` only removes `<` and `>` characters and truncates to 500 chars.
**Plan:**

- Strengthen the `sanitizeInput` function to handle common prompt injection patterns (e.g., "Ignore previous instructions").
- Move prompt templates to a more secure structure if necessary, though current system/user role separation is a good start.

### S2: Environment Variable Exposure

**Issue:** Ensure `.env` is properly excluded and that there's a clear rotation policy if keys are accidentally committed (checked `.gitignore`, it is excluded, but no rotation guide exists).
**Plan:**

- Add a "Security" section to `README.md` or a new `SECURITY.md` detailing how to handle keys safely.

---

## Summary of Risks & Trade-offs

| Action | Risk | Trade-off |
| :--- | :--- | :--- |
| **Retrieval Refactor (C1)** | Complexity increase in server logic. | Accuracy vs. Simplicity. |
| **Enhanced Sanitization (S1)** | Potential "False Positives" blocking valid creative user inputs. | Safety vs. User Expression. |
| **Code Restructuring (C2, D2)** | Breaking change if scripts are being used in CI/CD. | Cleanliness vs. Historical Compatibility. |

---

**Next Steps:** Awaiting user review of this plan before implementation.

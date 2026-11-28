# Copilot Instructions

## School and project
Mergington High School's fictional extracurricular activities website serves students and teachers. Preserve the existing FastAPI backend, MongoDB persistence, and HTML/CSS/JavaScript frontend. The staff is not technical; explain changes in plain language and make code maintainable.

## Development Environment
For detailed setup and development instructions, see [Development Guide](../docs/how-to-develop.md). Install dependencies from src/requirements.txt and use a local, disposable MongoDB 7 instance. Never connect to real student records or production services.

## Program architecture
- Keep the existing directory structure, separate routers and database layer.
- Use HTML, CSS, JavaScript and Python; do not add unrelated apps or services.
- Preserve authentication and authorization, avoid hardcoded new credentials, and never weaken access checks.
- For activity changes, keep the displayed schedule and structured schedule details consistent. Verify registration limits and preserve existing records.
- Test changes in a disposable environment; report exact test results and limitations. Update relevant documentation.
- Do not publish or deploy changes, use paid services, or modify unrelated repositories without approval.

## Validation checklist
- Use `python -m unittest discover -s tests -v`, `python -m compileall -q src`, and `node --check src/static/app.js` when relevant.
- The database persists across restarts; do not rely on seed changes to update an already populated database. Test a fresh instance and document migration needs.
- If a coding agent encounters a quota, timeout or unavailable tool, record the failure and current branch/PR before handoff. Never claim a different agent executed the task.

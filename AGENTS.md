# Development workflow

These rules apply to all development work in this repository.

## Branches and pull requests

- Never work directly on `main`.
- Never push directly to `main`.
- Start every change from an up-to-date `main` branch on a feature branch.
- Use a descriptive branch name with one of these prefixes:
  - `feat/` for new functionality
  - `fix/` for bug fixes
  - `refactor/` for structural or code-quality changes
  - `docs/` for documentation-only changes
  - `chore/` for maintenance work
- Keep each branch focused on one change.
- Do not merge branches locally or bypass review.
- Open a pull request from the feature branch into `main`.
- The pull request is the only route for merging changes into `main`. It should
  be reviewed and merged through the repository hosting service.
- Do not merge pull requests automatically for now. Leave the pull request open
  for the repository owner to review and merge.
- Delete the feature branch after the pull request has been merged.

## GitHub issues

- Track development work as GitHub Issues.
- Always read the relevant existing issues before starting a task, including
  their descriptions, comments, and current status.
- When a new task is requested and no issue exists for it, create a GitHub Issue
  before implementing the task.
- Link the pull request to the issue it implements.
- Close the issue when the implementation is complete and verified, even when
  the related pull request remains open for owner review.

## Before opening a pull request

- Review the complete diff and remove unrelated changes.
- Run `npm run build`.
- Run `npm test`.
- Run `npm run lint`.
- Confirm that no secrets, `.env` files, build output, or local tool state are
  included in the commit.
- Include a concise pull request description covering the change, verification,
  and any known follow-up work.

## Project conventions

- Keep application code under `src/app/`.
- Keep static assets under `public/`.
- Keep Firebase Hosting configuration in `firebase.json` and `.firebaserc`.
- Use Firebase Authentication and Firestore for persisted user-facing data.
- Treat client-side checks as UI conveniences only; enforce authorization with
  Firebase Security Rules and server-side controls when those are introduced.
- Keep demo/mock behavior clearly separated from production integrations.

## Deployment

- Deploy only from a reviewed, merged `main` commit.
- Verify the production build before deployment.
- Use the Firebase Hosting project and site configured in the repository.
- Do not deploy experimental feature-branch code to production.

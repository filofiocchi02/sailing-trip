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
- Delete the feature branch after the pull request has been merged.

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

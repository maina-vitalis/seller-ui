# Seller UI

Seller-facing React app for shop management.

## Auth and redirect flow

1. Customer app handles login.
2. Customer app redirects here with a token query param: `?token=...`.
3. Seller UI stores the token, removes it from the URL, loads current user, and checks `isSeller`.
4. If `isSeller` is true, the seller dashboard loads.
5. Otherwise, the user is prompted to return to customer onboarding/auth.

## Feature-based folder structure

```text
src/
	features/
		auth/
			api/
			hooks/
			lib/
			types.ts
		seller/
			api/
			components/
			hooks/
			types.ts
	shared/
		api/
			config.ts
			http-client.ts
```

## API configuration

Set these env vars in `.env`:

```bash
VITE_API_BASE_URL=http://localhost:3000/api
VITE_CUSTOMER_AUTH_URL=http://localhost:5173/auth
```

## Scripts

```bash
npm run dev
npm run typecheck
npm run lint
npm run build
```

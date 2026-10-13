# gotour-api

Gotour backend. gotour api is an application containing JavaScript. The checked-in dependency manifests use Express, MongoDB via Mongoose. Source modules cover `Touristsite`, `authentication`, `favorite`, `region`, `wanttogo`, `Region`, `User`, `favorites`, `regions`.

## Repository layout

- `config/` — 1 tracked file(s); source examples: `config/db.js`.
- `controllers/` — 5 tracked file(s); source examples: `controllers/Touristsite.js`, `controllers/authentication.js`.
- `middleware/` — 4 tracked file(s); source examples: `middleware/async.js`, `middleware/authentication.js`.
- `models/` — 3 tracked file(s); source examples: `models/Region.js`, `models/Touristsite.js`.
- `routes/` — 5 tracked file(s); source examples: `routes/Touristsite.js`, `routes/authentication.js`.
- `utils/` — 1 tracked file(s); source examples: `utils/error-response.js`.

## Local setup

Run each package setup block from the repository root. For workspace repositories, install dependencies at the root before running application-specific scripts.

Clone this repository and enter its directory:

```sh
git clone https://github.com/stanleyHayes/gotour-api.git
cd gotour-api
```

### Node package: `package.json`

Use Node.js and npm.

```sh
npm install
```

- `npm run dev` — runs the declared `dev` script (`nodemon server`).
- `npm run start` — runs the declared `start` script (`NODE_ENV=production node server`).

## Configuration

The application declares `dotenv`. Review environment-variable references in the source and supply your own local values before starting it. Keep credentials out of Git; do not reuse committed credentials.

## Source entry points

- [config/db.js](config/db.js)
- [controllers/Touristsite.js](controllers/Touristsite.js)
- [controllers/authentication.js](controllers/authentication.js)
- [controllers/favorite.js](controllers/favorite.js)
- [controllers/region.js](controllers/region.js)
- [controllers/wanttogo.js](controllers/wanttogo.js)
- [middleware/async.js](middleware/async.js)
- [middleware/authentication.js](middleware/authentication.js)

## Development notes

Commands above come from the tracked manifests and source layout. External services and runtime configuration may be required. Documentation updates do not establish that the application is deployed or that its tests pass.

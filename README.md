# Info

Created project using `create-next-app` with all default settings (+ enable tailwind css)

    npx create-next-app@latest

# Use

Fork repository. Then:

Run locally

    nmp install
    npm run dev

Build

    npm run build
    npm start

## Connect DB

- publish repo
- link it in vercel (new project linked to that repo) and deploy

### create db in Vercel

- go to Storage and create Database (Postgres)
- get connection to it - go to .env.local and copy its content (first click on show secret!)
- paste it into `.env.local` file in a root directory

### link db in Vercel

- go to your project
- go to "Storage tab"
- clink "connect" on the corresponding db
- done :)

# Troubleshooting

## Not setting up db in vercel

You will get an error during deployment as:

    [VercelPostgresError]: VercelPostgresError - 'missing_connection_string': You did not supply a 'connectionString' and no 'POSTGRES_URL' env var was found.

Fix: follow "link db in Vercel" step.

Then click on failed deployment "redeploy" button

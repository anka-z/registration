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

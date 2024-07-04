# Info

Created project using `create-next-app` with all default settings (+ enable tailwind css)

    npx create-next-app@latest

# Use

Prepare db:
```
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  start_time TIMESTAMP NOT NULL,
  description TEXT,
  visitor_limit INT NOT NULL DEFAULT 20
);

CREATE TABLE registrations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  event_id INT NOT NULL,
  FOREIGN KEY (event_id) REFERENCES events(id)
);
```

Prepare .env.local with the files from Vercel
```
POSTGRES_URL="postgres://default:hAtiOFj5rn6N@ep-steep-night-a4s6lhk6-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
POSTGRES_PRISMA_URL="postgres://default:hAtiOFj5rn6N@ep-steep-night-a4s6lhk6-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require&pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NO_SSL="postgres://default:hAtiOFj5rn6N@ep-steep-night-a4s6lhk6-pooler.us-east-1.aws.neon.tech:5432/verceldb"
POSTGRES_URL_NON_POOLING="postgres://default:hAtiOFj5rn6N@ep-steep-night-a4s6lhk6.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
POSTGRES_USER="default"
POSTGRES_HOST="ep-steep-night-a4s6lhk6-pooler.us-east-1.aws.neon.tech"
POSTGRES_PASSWORD="{password}"
POSTGRES_DATABASE="verceldb"
```

Run

    nmp install
    npm run dev

Build

    npm run build
    npm start


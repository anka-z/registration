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
POSTGRES_URL="{url}"
POSTGRES_PRISMA_URL="{url}"
POSTGRES_URL_NO_SSL="{url}"
POSTGRES_URL_NON_POOLING="{url}"
POSTGRES_USER="{user}"
POSTGRES_HOST="{host}"
POSTGRES_PASSWORD="{password}"
POSTGRES_DATABASE="{db}"
```

Run

    nmp install
    npm run dev

Build

    npm run build
    npm start


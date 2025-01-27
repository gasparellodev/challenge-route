# Challenge Route - Documentation

## Overview
The **Challenge Route** project enables users to manage and query the cheapest travel routes using a Node.js API for backend and a React-based frontend (Next.js or Vite). The database is managed using Supabase.

### Features
- CRUD operations for managing travel routes.
- Query for the cheapest route between two destinations, regardless of the number of connections.
- Frontend interface for adding, updating, deleting, and querying routes.

## Project Structure
```
challenge-route
 ┣ .git
 ┣ src
 ┃ ┣ components
 ┃ ┃ ┣ RouteManagement.tsx      # Component for CRUD operations.
 ┃ ┃ ┗ RouteQuery.tsx           # Component for querying cheapest routes.
 ┃ ┣ lib
 ┃ ┃ ┣ routeFinder.ts           # Logic to calculate the cheapest route.
 ┃ ┃ ┗ supabase.ts              # Supabase client setup.
 ┃ ┣ App.tsx                    # Main React component.
 ┃ ┣ index.css                  # Global styles.
 ┃ ┣ main.tsx                   # Entry point for the app.
 ┃ ┗ vite-env.d.ts
 ┣ supabase
 ┃ ┗ migrations
 ┃ ┃ ┗ 20250127220249_sunny_fog.sql  # Supabase migration script.
 ┣ .env                             # Environment variables.
 ┣ .env.example                     # Example environment variables.
 ┣ README.md                        # Project documentation.
 ┣ vite.config.ts                   # Vite configuration.
 ┗ ... (other configs and dependencies)
```

---

## Prerequisites
- [Node.js](https://nodejs.org/) >= 16.x
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Supabase CLI](https://supabase.com/docs/guides/cli)
- A Supabase account

---

## Environment Setup

1. **Clone the Repository**
```bash
git clone <repository-url>
cd challenge-route
```

2. **Install Dependencies**
```bash
yarn install
# or
npm install
```

3. **Create Supabase Project**
- Log in to [Supabase](https://supabase.com/).
- Create a new project.
- Retrieve your `SUPABASE_URL` and `SUPABASE_ANON_KEY` from the **API Settings** in the Supabase dashboard.

4. **Configure Environment Variables**
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

5. **Run Supabase Migrations**
Use the Supabase CLI to apply the migration file:
```bash
supabase db push
```
This will set up the `routes` table in your Supabase database.

---

## Running the Application

1. **Start the Development Server**
```bash
yarn dev
# or
npm run dev
```

2. **Access the Application**
- Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## API Endpoints

### Base URL
```text
http://localhost:5173/api
```

### 1. **Create a Route**
**Endpoint:** `POST /routes`

**Request Body:**
```json
{
  "origin": "GRU",
  "destination": "BRC",
  "value": 10
}
```

### 2. **Retrieve All Routes**
**Endpoint:** `GET /routes`

### 3. **Update a Route**
**Endpoint:** `PUT /routes/:id`

**Request Body:**
```json
{
  "origin": "GRU",
  "destination": "BRC",
  "value": 15
}
```

### 4. **Delete a Route**
**Endpoint:** `DELETE /routes/:id`

### 5. **Query Cheapest Route**
**Endpoint:** `GET /routes/cheapest?origin=GRU&destination=CDG`

**Response Example:**
```json
{
  "route": "GRU - BRC - SCL - ORL - CDG",
  "cost": 40
}
```

---

## Frontend Instructions

### CRUD Operations
- Use the **RouteManagement** component to add, edit, and delete routes.

### Query Cheapest Route
- Use the **RouteQuery** component to query the cheapest route by entering the origin and destination.

---

## Deployment

### Build for Production
```bash
yarn build
# or
npm run build
```

### Serve Production Build
```bash
yarn preview
# or
npm run preview
```

---

## Troubleshooting

### Common Issues
- **RLS Policy Error:** Ensure you have Row-Level Security (RLS) policies configured for the `routes` table or disable RLS in the Supabase dashboard.
- **Environment Variables Missing:** Verify `.env` contains the correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

For additional help, feel free to open an issue on the GitHub repository.

---

## License
This project is licensed under the MIT License. See the LICENSE file for more information.


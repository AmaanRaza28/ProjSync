# ProjSync


A full-featured project management application built with **Next.js 14**, **React**, **TypeScript**, **TailwindCSS**, **Neon (PostgreSQL)**, and **NextAuth.js** for authentication. The app allows users to manage tasks, collaborate in teams, and track project progress seamlessly.

## Features

- **Task Management**: Create, assign, and track tasks across multiple projects.
- **Team Collaboration**: Invite and manage team members, assign roles, and collaborate efficiently.
- **Notifications**: Get real-time updates for task assignments, project invitations, and more.
- **Performance Tracking**: Visualize project and team performance through interactive graphs.
- **Infinite Scrolling**: Efficiently handle large datasets with infinite querying using **React Query** and **Intersection Observer API**.
- **Streaming**: Partial page rendering using **React Suspense** to avoid blocking the entire page with slow data.
- **SSR and RSC**: Optimized performance using **Server-Side Rendering (SSR)** and **React Server Components (RSC)**.

## Tech Stack

- **Frontend**: React, Next.js 14, TypeScript, TailwindCSS
- **Backend**: Neon (PostgreSQL), NextAuth.js for authentication
- **Data Fetching**: React Query, React Suspense for streaming, SSR & RSC for server-side operations
- **UI/UX**: Responsive design with TailwindCSS

## Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables:

```bash
# Authentication secret
AUTH_SECRET="your-secret"

# PostgreSQL URLs
POSTGRES_URL="your-postgres-url"
POSTGRES_PRISMA_URL="your-prisma-url"
POSTGRES_URL_NO_SSL="your-postgres-no-ssl-url"
POSTGRES_URL_NON_POOLING="your-non-pooling-url"

POSTGRES_USER="your-user"
POSTGRES_HOST="your-host"
POSTGRES_PASSWORD="your-password"
POSTGRES_DATABASE="your-database"

# Google OAuth credentials
AUTH_GOOGLE_ID="your-google-id"
AUTH_GOOGLE_SECRET="your-google-secret"
```

## Getting Started

To run the project locally:

1.	Clone the repository:
```bash
git clone https://github.com/yourusername/project-management-app.git
cd project-management-app
```

2.	Install dependencies:
```bash
npm install
```

3.	Create a .env.local file in the root directory and add the environment variables as shown above.
4.	Run the development server:
   ```bash
npm run dev
```
5.	Open http://localhost:3000 in your browser to view the app.

Database

This project uses Neon (PostgreSQL) as the database provider. The necessary connection strings are included in the environment variables.

Authentication

Authentication is handled using NextAuth.js with Google OAuth. Make sure to configure your Google OAuth credentials in the .env.local file.

License

This project is licensed under the MIT License.

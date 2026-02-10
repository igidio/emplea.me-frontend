# EMPLEAME Frontend

<p align="center">
  <img src="https://i.imgur.com/U2uXSqz.png" width="49%" />
  <img src="https://i.imgur.com/oTmEWXo.png" width="49%" />
  <img src="https://i.imgur.com/nOjqhmS.png" width="49%" />
  <img src="https://i.imgur.com/xqa9Yqj.png" width="49%" />
</p>

**EMPLEAME** is a web platform that connects employers with job seekers, managing job postings, applications, and user profiles. This repository contains the frontend codebase built with Nuxt 3 and Vue 3.

## Features

- User registration and authentication (including social login)
- User profile management
- Job search and application
- Job posting for employers
- Premium subscriptions for enhanced features
- Assistant management for business accounts
- Notifications and alerts
- Responsive design for mobile and desktop
- Support and contact options

## Technologies Used

- **Nuxt 3** – Main application framework (Vue 3-based)
- **Vue 3** – Progressive JavaScript framework for building user interfaces
- **TypeScript** – Typed JavaScript for safer code
- **Pinia** – State management for Vue
- **Apollo Client** – GraphQL client for data fetching
- **Tailwind CSS** – Utility-first CSS framework
- **@nuxt/ui** – UI components for Nuxt
- **Socket.IO** – Real-time communication (notifications, chat)
- **Stripe** – Payment processing for premium subscriptions
- **Jest** & **Vue Test Utils** – Unit and integration testing
- **ESLint** & **Prettier** – Code quality and formatting
- **dotenv** – Environment variable management
- **Husky** – Git hooks for linting and formatting

> _Note: Please check `package.json` for the full list of dependencies._

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/emplea.me-frontend.git
   cd emplea.me-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file based on `.env.example` and configure your environment variables.

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Visit `http://localhost:3000` in your browser.

## Project Structure

- `src/` – Main source code (components, pages, services, etc.)
- `public/` – Static assets
- `README.md` – Project documentation

## Scripts

- `dev` – Start development server
- `build` – Build for production
- `start` – Start production server
- `test` – Run unit tests

### Test data

The server includes a set of default data that can be loaded via seeders. These include test users, job posts, applications and other elements needed to test platform features. Some sample users [available in the user seeder](https://github.com/igidio/emplea.me-backend-services/blob/main/database/user-contact/user-contact.default.ts) include:

| Role        | Username | Email               | Password    |
| ----------- | -------- | ------------------- | ----------- |
| `SUPERUSER` | salva123 | salva@example.com   | password123 |
| `ADMIN`     | mariana  | mariana@example.com | passW0RD222 |
| `EMPLOYER`  | pamela   | pamela@example.com  | passW0RD333 |
| `SEEKER`    | juan     | juan@example.com    | passW0RD444 |

Some test credit/debit cards for Stripe are:

| Card type          | Card number        |
| ------------------ | ------------------ |
| Visa               | 4242424242424242   |
| Visa (debit)       | 4000056655665556   |
| Mastercard         | 5555555555554444   |
| Mastercard (debit) | 5200828282828210   |
| American Express   | 378282246310005    |
| UnionPay           | 6200000000000005   |
| UnionPay           | 6200000000000047   |
| Discover           | 6011111111111117   |
| Discover           | 6011981111111113   |

> The test card expiration date can be any future date, and the security code (CVC) can be any three digits (or four digits for American Express).

## License

This project is licensed under the MIT License.
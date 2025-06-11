# 📘 Recipe Book Backend

A NestJS-based backend that proxies requests to the [TheMealDB API](https://www.themealdb.com/api.php).

---

## ⚙️ Installation

1. **Clone the repository and navigate to the backend folder:**
   ```bash
   git clone <your-repo-url>
   cd backend
   ```
   Install dependencies:

npm install

# or

yarn install

2. **Install dependencies:**
   npm install

# or

yarn install

📦 **Environment Variables**
Create a .env file in the root of the backend folder with the following content:

# Base URL of the external recipe API

RECIPE_API_BASE_URL=your_base_api_url

# Port for running the backend server

PORT=your_port

🚀 Running the Application

Development mode (with hot-reload):
npm run start:dev

Standard start:
npm run start

Production mode:
npm run build
npm run start:prod

🧪 Testing

Unit tests:
npm run test

Watch mode:
npm run test:watch

Test coverage:
npm run test:cov

End-to-end (e2e) tests:
npm run test:e2e

🧹 Useful Scripts
Lint and auto-fix:
npm run lint
Format code using Prettier:
npm run format

📁 Project Structure
src/ – main source code

test/ – unit and e2e tests

dist/ – compiled production build (after build)

🧑‍💻 Author
Plakhotnyk Andrii

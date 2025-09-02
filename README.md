# Users CRUD API

A RESTful API built with Node.js, Express, TypeScript, and MongoDB for managing users with authentication and Swagger documentation.

## Features

- 🔐 JWT Authentication
- 👥 User CRUD operations
- 📚 Swagger API documentation
- 🐳 Docker support
- 🔍 Input validation with Zod
- 🛡️ Error handling middleware
- 📝 TypeScript support

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Documentation**: Swagger/OpenAPI
- **Containerization**: Docker

## Prerequisites

- Node.js (v22 or higher)
- MongoDB
- Docker (optional)

## Installation

### Using npm

1. Clone the repository:

```bash
git clone https://github.com/dev-mariana/users-crud
cd users-crud
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/users-crud
JWT_SECRET=your-secret-key-here
```

4. Start the development server:

```bash
npm run dev
```

### Using Docker

1. Build the Docker image:

```bash
docker build -t users-crud .
```

2. Run the container:

```bash
docker run -p 3000:3000 users-crud
```

## API Documentation

Once the server is running, you can access the interactive API documentation at:

- **Swagger UI**: http://localhost:3000/api/docs

## API Endpoints

### Authentication

- `POST /api/login` - Authenticate user and get JWT token

### Users (Protected routes - require JWT token)

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PATCH /api/users/:id` - Update user by ID
- `DELETE /api/users/:id` - Delete user by ID

## Authentication

All user routes require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Request/Response Examples

### Login

```bash
POST /api/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "id": "user-id",
  "name": "User Name",
  "token": "jwt-token-here"
}
```

### Create User

```bash
POST /api/users
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

## Environment Variables

| Variable      | Description                | Default                              |
| ------------- | -------------------------- | ------------------------------------ |
| `PORT`        | Server port                | 3000                                 |
| `MONGODB_URI` | MongoDB connection string  | mongodb://localhost:27017/users-crud |
| `JWT_SECRET`  | Secret key for JWT signing | -                                    |

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm run lint` - Run linting with Biome

## Project Structure

```
src/
├── config/           # Configuration files
│   ├── database/     # Database configuration
│   └── env/          # Environment variables
├── controllers/      # Route controllers
├── dtos/            # Data Transfer Objects
├── entities/        # Database entities
├── errors/          # Error handling
├── helpers/         # Utility functions
├── middleware/      # Express middleware
├── repositories/    # Data access layer
├── routes/          # API routes
├── services/        # Business logic
├── app.ts           # Express app configuration
└── server.ts        # Server entry point
```

## License

This project is licensed under the MIT License.

## Author

**Mariana Bastos**

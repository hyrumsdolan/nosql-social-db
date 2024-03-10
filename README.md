# Social Network API

This is a backend API for an example social network web application built with JavaScript, Bun, Hono, and MongoDB.

## Features

- User and Thought models with CRUD operations.
- Users can have friends and thoughts.
- Thoughts can have reactions.

## Getting Started

### Prerequisites

- Bun JS
- MongoDB

### Installation

1. Clone the repository.
2. Install dependencies with `bun install`.
3. Start the server with `bun start` or `bun dev` for hot reloading.

## API Endpoints

### Users

- `GET /api/users`: Get all users.
- `GET /api/users/:id`: Get a user by ID.
- `POST /api/users`: Create a new user.
- `PUT /api/users/:id`: Update a user by ID.
- `DELETE /api/users/:id`: Delete a user by ID.
- `POST /api/users/:userId/friends/:friendId`: Add a friend to a user.
- `DELETE /api/users/:userId/friends/:friendId`: Remove a friend from a user.

### Thoughts

- `GET /api/thoughts`: Get all thoughts.
- `GET /api/thoughts/:id`: Get a thought by ID.
- `POST /api/thoughts`: Create a new thought.
- `PUT /api/thoughts/:id`: Update a thought by ID.
- `DELETE /api/thoughts/:id`: Delete a thought by ID.
- `POST /api/thoughts/:thoughtId/reactions`: Add a reaction to a thought.
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`: Remove a reaction from a thought.

## Built With

- [Bun](https://bun.sh/)
- [Hono](https://www.npmjs.com/package/hono)
- [Mongoose](https://mongoosejs.com/)

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

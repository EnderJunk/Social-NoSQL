# NoSQL Challenge: Social Network API

## Description

This project is a Social Network API built using MongoDB, Express.js, and Mongoose. It allows users to share their thoughts, react to friends' thoughts, and manage a friend list.

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```sh
    cd NoSQL-Challenge
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the MongoDB server:
    ```sh
    mongod
    ```
2. Seed the database (optional):
    ```sh
    npm run seed
    ```
3. Start the application:
    ```sh
    npm start
    ```

## API Endpoints

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:userId` - Get a single user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:userId` - Update a user by ID
- `DELETE /api/users/:userId` - Delete a user by ID
- `POST /api/users/:userId/friends/:friendId` - Add a friend to a user's friend list
- `DELETE /api/users/:userId/friends/:friendId` - Remove a friend from a user's friend list

### Thoughts

- `GET /api/thoughts` - Get all thoughts
- `GET /api/thoughts/:thoughtId` - Get a single thought by ID
- `POST /api/thoughts` - Create a new thought
- `PUT /api/thoughts/:thoughtId` - Update a thought by ID
- `DELETE /api/thoughts/:thoughtId` - Delete a thought by ID
- `POST /api/thoughts/:thoughtId/reactions` - Add a reaction to a thought
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId` - Remove a reaction from a thought

## License

This project is licensed under the MIT License.
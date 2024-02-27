# Star Wars API Backend

This backend server provides a RESTful API for managing Star Wars characters. It is built using Express.js and MongoDB, allowing users to perform CRUD operations on character data.

## Project Structure

The project structure is organized as follows:

- **controllers**: Contains controller functions for handling HTTP requests and business logic.
- **models**: Defines MongoDB schemas for character data.
- **routes**: Defines API routes and maps them to corresponding controller functions.
- **services**: Contains configuration for external services, such as Axios for making HTTP requests.

## Endpoints

- **GET /characters**: Retrieve all characters from the database.
- **GET /characters/:id**: Retrieve a specific character by ID.
- **POST /characters**: Create a new character.
- **PUT /characters**: Swap places between two characters.
- **DELETE /characters/:id**: Delete a character by ID.

## Database Connection

This backend server is designed to connect to a MongoDB database. To set up the database connection:

1. Ensure MongoDB is installed and running on your system.
2. Update the MongoDB connection URL in `app.js` to point to your database. The default URL is `"mongodb://localhost:27017/swapi-app"`, but this may vary depending on your database configuration.

## Running the Server

By default, the server runs on PORT 3000. To start the server, navigate to the `backend/src` directory and run:

```bash
node app.js
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---


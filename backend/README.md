# SWAPI PROJECT

## About

The SWAPI PROJECT is a simple Node.js application that allows you to manage a collection of Star Wars characters. You can add, retrieve, update, and delete characters from your collection using HTTP requests.

## Prerequisites

Before you get started, ensure you have the following dependencies installed:

- **Node.js**: [Download and Install Node.js](https://nodejs.org/)
- **Express**: Install using npm (Node Package Manager) by running `npm install express`
- **Axios**: Install using npm by running `npm install axios`

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Lodjuret2001/swapi

2. **Navigate to the project directory:**

    ```bash
    cd your-repo
    ```

3. **Install project dependencies:**

    ```bash
    npm install
    ```

## Running the API

The API will be accessible at http://localhost:3000.

To run the API, use the following command: 'node index.js'

# API Endpoints

## GET Routes

- **Description:** Home page
- **Endpoint:** `/`
- **Example:** [http://localhost:3000/](http://localhost:3000/)

- **Description:** Retrieve character data
- **Endpoint:** `/collection`
- **Example:** [http://localhost:3000/collection](http://localhost:3000/collection)

- **Description:** Retrieve a character by ID
- **Endpoint:** `/collection/:id`
- **Example:** [http://localhost:3000/collection/1](http://localhost:3000/collection/1)

## POST Route

- **Description:** Add a character to the collection from SWAPI Database.
- **Endpoint:** [http://localhost:3000/add-character](http://localhost:3000/add-character)

  **Request Body:**
  ```json
  {
    "name": "Character Name"
  }

## PUT Route

- **Description:** Swap the positions of two characters in the collection.
- **Endpoint:** [http://localhost:3000/swap-characters](http://localhost:3000/swap-characters)

  **Request Body:**
  ```json
  {
    "characters": [
      {
        "name": "Character Name 1"
      },
      {
        "name": "Character Name 2"
      }
    ]
  }


## DELETE Route

- **Description:** Remove an item by ID
- **Endpoint:** `/collection/:id`
- **Example:** [http://localhost:3000/collection/1](http://localhost:3000/collection/1)

## Contributing

Feel free to contribute to this project by opening issues or pull requests. Your contributions are welcome!

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Thanks to the Star Wars universe for providing awesome characters!


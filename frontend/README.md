# Star Wars Frontend

This frontend application provides a user interface for managing Star Wars characters. It is built using React with TypeScript and styled with Styled Components. The project structure is organized as follows:

- **src/assets**: Contains video, image, and audio files used in the application.
- **src/components**: Contains reusable React components used throughout the application.
- **src/hooks**: Contains custom React hooks for managing character data and interactions.
- **src/services**: Contains configuration and utility functions for making HTTP requests to the backend API.

## Important Files

- **src/App.tsx**: Main entry point for the application. Renders components and manages state for character management.
- **src/components/index.ts**: Index file that exports all components for easier importing.
- **src/hooks/useCharacters.ts**: Custom hook for fetching character data from the backend API.
- **src/hooks/useCharacterManagement.ts**: Custom hook for managing character interactions and state.
- **src/services/api-client.ts**: Configuration for Axios HTTP client. Must be configured to point to the backend API URL.
- **src/services/character-service.ts**: Defines interfaces and functions for interacting with character data from the backend API.
- **src/services/http-service.ts**: Utility class for making HTTP requests to the backend API.

## Dependencies

- **axios**: HTTP client for making requests to the backend API.
- **react**: JavaScript library for building user interfaces.
- **react-dom**: Entry point to the React library for web applications.
- **react-hook-form**: Library for managing form state and validation in React.
- **styled-components**: Library for styling React components with CSS-in-JS.

## Development

To set up the frontend application:

1. Make sure the backend server is running and accessible.
2. Configure the `src/services/api-client.ts` file to point to the backend API URL. Update the `baseURL` property to match the URL of the backend server.
3. Start the development server by running `npm run dev` in the `frontend` directory.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
# Travel Planning App

This is a travel planning web application that leverages OpenAI to curate and manage a list of must-see locations in any given city. This user-friendly platform enhances trip planning by offering efficient access to a city's top destinations.


## Backend Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account

### Installation

1. Navigate to the backend directory:

   ```sh
   cd backend
2. Install the dependencies:

    ```sh
    npm install
3. Create a .env file in the backend directory and add the following environment variables:
    ```sh
    OPENAI_API_KEY=your-openai-api-key
    MONGODB_URI=your-mongodb-uri
4. Start the server:
   ```sh
    npm start
The backend server will start on port 7789.

### API Endpoints

- POST /api/places/fetch - Fetches popular places for a given city.

- GET /api/places/cities - Retrieves the list of cities.

- GET /api/places/locations/:cityId - Retrieves locations for a specified city.

## Frontend Setup

### Prerequisites

- Node.js (v14 or higher)

Installation

1. Navigate to the frontend directory:
    ```sh
    cd frontend
2. Install the dependencies:

    ```sh
    npm install

3. Start the frontend development server:
    ```sh
    npm start

The frontend server will start on port 3000.


## Usage
1. Open your browser and navigate to http://localhost:3000.
2. Enter a city name in the input box and click the "Search" button.
3. If the city is not already in the database, the application will fetch popular places using the OpenAI API and display them.
4. Recent cities searched will be listed on the right side of the screen.
5. Click the "Show Description" button next to a location to view its details.
## Contributing
1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -m 'Add new feature').
5. Push to the branch (git push origin feature-branch).
6. Open a Pull Request.

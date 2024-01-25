# Responsive React Movie App with Typescript/Sass and OMDB API
Welcome to the React Film Search Application! This application allows users to search for movies using the OMDB API and view relevant movie information. The app is designed to be responsive and uses Sass for styling.

https://github.com/Seyma44/movie-search-react/assets/3766249/d59add04-48d1-4f8c-923c-1998a4c54a3b

https://github.com/Seyma44/movie-search-react/assets/3766249/b685a9c9-57af-4feb-b88f-e707216f0728

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Key](#api-key)
- [Usage](#usage)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, make sure you have the following tools installed on your system:

- [Node.js](https://nodejs.org/) (Recommended LTS version)
- [Yarn](https://yarnpkg.com/) (Yarn is used for package management)

### Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/Seyma44/movie-search-typescript.git
   cd movie-search-typescript

2. Install project dependencies using Yarn:
```bash
yarn install
```
  
### API Key

To use the OMDB API, you'll need an API key. Here's how to obtain and set up the API key:

Visit the OMDB API website: OMDB API website
Create an account and obtain your API key.
Copy your API key.

# Environment Variables
Create a .env file in the project's root directory and set the following variables with your API key and desired API URL:

```bash
REACT_APP_API_URL=your_api_url_here
REACT_APP_API_KEY=your_api_key_here
```
  
## Usage

1. Start the development server:
```bash
yarn start
```
2. When you open http://localhost:3000/, the default search in the search bar will be for "Pokemon". Each page displays 10 movies. Use pagination to see more results. You can use the search boxes above the table to filter the results. To view the details page, simply click on the movie's poster. When you go back, the page will show the last searched movie.

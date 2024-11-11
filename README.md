# GMDb - A Movie Rating and Review Platform

GMDb is a full-stack application where users can browse, review, and rate movies. Built with Node.js, Express, MySQL, and Angular, this platform enables users to view movie details, add reviews, and discover genres and actors associated with each movie.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Endpoints](#sample-api-endpoints)


## Features
- View a list of movies with details, including description, duration, genres, and actors.
- Add new movies with attributes such as title, description, release date, genres, and actors.
- Browse movies with related genres and actors.
- Rate and review movies.
- Responsive design with Angular for seamless user experience.

## Technologies Used
- **Frontend**: Angular
- **Backend**: Node.js, Express
- **Database**: MySQL
- **API Framework**: RESTful API
- **Other**: Firebase for media storage

## Prerequisites
- **Node.js** (version 14 or higher) and **npm**
- **MySQL** (version 5.7 or higher)
- **Angular CLI** (if developing frontend separately): `npm install -g @angular/cli`

## Getting Started
To get a local copy up and running, follow these simple steps.

### Clone the Repository


git clone https://github.com/yourusername/GMDb.git
cd MovieVerse


---

## Backend Setup

1. **Install Dependencies:**
    ```bash
    cd backend
    npm install
    ```
    

2. **Database Setup:**
   - Create a MySQL database named `movieverse` (as specified in your environment).
   - Run the provided SQL script (`database/schema.sql`) to create tables for movies, genres, and actors.
   - Update database connection details in `config/db.js`.

3. **Run the Server:**
    ```bash
    npm start
    ```
   The server will run at `http://localhost:3000`.

---

## Frontend Setup

1. **Install Dependencies:**
    ```bash
    cd frontend
    npm install
    ```

2. **Run the Angular Application:**
    ```bash
    ng serve
    ```
   The frontend will be accessible at `http://localhost:4200`.

---

## Usage

Once the server and frontend are running, you can:
- View the list of movies and their details.
- Add new movies, specifying genres and actors.
- Rate and review movies.
- Browse genres and actors linked to each movie.

---

## Sample API Endpoints

- **Get All Movies**: `GET /api/movies`
- **Add New Movie**: `POST /api/movies`
- **Get Movie Details by ID**: `GET /api/movies/:id`
- **Update Movie Rating**: `PUT /api/movies/:id/rating`

> **Note**: API endpoint paths might vary; please refer to `movieRoutes.js` for exact route configurations.

---




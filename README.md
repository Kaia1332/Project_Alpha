# Project Alpha - Educational Geography Quiz App

### Overview

Project Alpha is a geography quiz application designed to enhance student engagement through interactive multiple-choice questions. 

The application consists of:

- 	A frontend built with JavaScript to display quiz questions and handle user interactions.
-	A backend powered by Node.js and Express, which serves quiz data and manages user responses.
- 	A PostgreSQL database that stores quiz questions and user attempts.
- 	Docker support to simplify deployment and ensure consistency across environments.

### Features
* 	Randomised geography quiz questions
* 	Multiple-choice answer options with correct/incorrect feedback
* 	User authentication for login and registration
* 	Tracks user responses and scores in the database
* 	API endpoints for retrieving questions and submitting answers
* 	Fully containerised setup using Docker and Docker Compose


## Technologies Used

- Backend: Node.js, Express, Docker

- Frontend: HTML, CSS, Javascript

- Database: SQL

## Installation & Setup

Clone the repository:

```bash
git clone <repo-name>
cd <repo-name>/server
```


## Update username in docker-compose.yml file
Update your docker username for mvc and db:
```
image: YOUR_USERNAME/quiz-mvc:0.0.1.RELEASE

image: ismailp97/quiz-db:0.0.1.RELEASE
```

## Docker

### 1. Build the Docker Images

Database
```bash
# must be in same dir as dockerfile - within db
cd db
docker build -t YOUR_USERNAME/quiz-db:0.0.1.RELEASE .
cd ..
```

MVC
```bash
# must be in same dir as dockerfile - within server
cd server
docker build -t YOUR_USERNAME/quiz-mvc:0.0.1.RELEASE .
cd ..
```

### 2. Run the Docker Container with docker compose

Ensure docker in running and from root directory where docker-compose.yml is, run:
```bash
docker-compose up -d
```

The API should now be accessible on http://localhost:3010/

## Access application
In VS code using live server extension, run the index.html in live server.
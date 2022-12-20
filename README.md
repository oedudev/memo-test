# Memo Test
## _This project aims to develop a memo test using Laravel with GraphQL and ReactJS_

### Structure

For this project, the backend and frontend are located in distinct folders, as below:
- **Backend:** Laravel application using lighthouse-php.com as GraphQL provider
- **Frontend:** ReactJS application that comunicates with the backend API. 
 
### Requirements
- **Backend:** Requires  [Docker and Docker-Compose](https://www.docker.com/).
- **Frontend:** Requires [Node.js](https://nodejs.org/) v12+ to run.

As this project was developed using Linux Mint, the use of Linux or MacOS is recommended

### Instructions to run the project

- First, let's  start the backend to receive the requests, this command may take some time to finish

```sh
make up-backend
```

- After the command finishes, let's  start the frontend, to do it, type the following command

```sh
make up-frontend
```

You'll see a message like that:
```sh
 VITE v4.0.1  ready in 325 ms

  ➜  Local:  http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

after you see this message, please browse to the URL on the message (in this case: http://localhost:5173/)

Enjoy the game =)
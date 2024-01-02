# Moviedb
Welcome to my MovieDB Portfolio Project! Dive into a curated collection of movies with details on cast, crew, plots, and genres. I've crafted an interactive platform for film enthusiasts to explore both classics and the latest blockbusters. Join me in celebrating the magic of cinema through this user-friendly movie database.

![moviedb](https://user-images.githubusercontent.com/50628520/137638074-a94db396-e678-4920-b901-fdaf5fb971cd.png)

## Live Preview
[Click Here](https://moviedb6.netlify.app/)

## Local Preview
Clone this repository
```bash
   git clone https://github.com/surajkarki66/moviedb
```
### a. Backend
1. Make sure you have Node.js installed on your local machine.
2. Install `yarn` using npm.
   ```bash
   npm install -g yarn
   ```
3. Install dependencies required by the backend server.
   ```bash
   yarn install
   ```
4. Create a `.env` file in a project's root directory and set all the environment variables based on the provided `.env.sample` example.
   
5. Run the development server
   ```bash
   yarn run dev
   ```
6. Preview: http://localhost:5000

### b. Frontend
1. After running the backend server, you only need to run the frontend.
2. Open up a new terminal window, and change the directory to `client` folder.
   ```bash
   cd client
   ```
3. Install dependencies required by the frontend app.
   ```bash
   yarn install
   ```
4. Inside `src` directory there is a file with a name `configs.js`. Go inside that file and replace the last line of code with the code provided below.
    ```js
   export const NODE_ENV = "development";
   ```
   
5. Run the development server
   ```bash
   yarn start
   ```
6. Preview: http://localhost:3000
   
Happy Coding !!

# react-personal-notes-mgr

React Redux application for managing personal notes.

A complete Single-Page-Application (SPA) created using React JavaScript library. We have used Redux for state management and Bootstrap for styling the UI. We are interacting with a RESTful API which is protected using JWT.

Another thing to note is, we have not used any 3rd party library such as thunk/saga for performing async operations. Instead we have created own custom API redux middleware. For any medium to large application, leveraging redux middleware helps in centralizing common tasks (or cross cutting concerns) such as API calls, exception handling and logging.

Here are all the videos where we have created this React app [Youtube Playlist](https://www.youtube.com/playlist?list=PLWieu6NbbqTyMaRRywunCGZZsi8gmw7dh)

## Setup and Installation

1. **Backend REST API Node server**

   As this React app is consuming a REST API, make sure the same is up and running on your system
   - the complete code is available [here](https://github.com/pairlearning/personal-notes-mgr-api) at GitHub
   - go through any one of the below videos to make the API up and running:<br/>
   https://www.youtube.com/watch?v=YwjR7k28QV0 <br/>
   https://www.youtube.com/watch?v=hrT1kQSRB8U
2. **Clone the React app repo from GitHub**
   ```sh
   git clone https://github.com/pairlearning/react-personal-notes-mgr.git
   ```
3. **Install npm dependencies**
   ```sh
   cd react-personal-notes-mgr
   npm install
   ```
4. **Run npm start to start the application**
   ```sh
   npm start
   ```
   this runs the application at port 3000 and we can access from http://localhost:3000

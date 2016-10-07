# Tasty Server

This is the backend API server for Tasty, a bookmarking web app inspired by delicious. It should be used in conjunction with the [tasty-client](https://github.com/StoicLoofah/tasty-client).

Currently, it supports adding bookmarks and tags but does not have any authentication for user-specific data.

It is built using [swagger-node](https://github.com/swagger-api/swagger-node) and express to expose the API for querying and updating bookmarks. The data is stored in MongoDB, which is accessed through Mongoose.

This project was built during Zanbato Hack Week Fall 2016.

## Setup

You can use the swagger-node CLI as expected. Otherwise, there are no specific dependencies in this project. To get the server running,

1. Install Node.js
2. Install swagger-node globally according to its instructions
3. Check out this repo and `cd` into it
4. `npm install` all of the packages for this project
5. Setup or connect to an existing MongoDB server. `app.js` assumes it is running locally, but you can tweak that
6. Launch the server with `swagger project start`

I ran it locally on OSX 10.11 and installed Node.js and MongoDB through Homebrew. I recommend running locally for ease of use with the Swagger Editor, which you can run with `swagger project edit`.

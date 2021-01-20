# Evaluate News NLP

An exercise of webpack, sass, jest, express for Udacity.

## Project Structure

All front-end code is inside `src/client`. You'll find a few folder such as:
- `js`, containing all the javascript functionality
- `styles`, our sass/styling for the webpage
- `views`, the html

You'll also find our js entrypoing `index.js`.

The server code is all inside the `server.js` file in the root directory. Check below how to run everything.

### Service Worker

A service worker is put in place so the website can have limited off-line functionality.

## Building the project

### Pre-requisites

You need two environment variables setup, both related to Meaningcloud.com, the external NLP api we use for detecting the sentiment of a given news url.

There should be something like:

- KEY=abcd0000000000000000000000012345
- ENDPOINT=https://api.meaningcloud.com/sentiment-2.1

For development purposes you can create a `.env` file in the root directory with these two variables. For production or deployed environment you can add them to the calling command like:

```
KEY=mykey ENDPOINT=http://api.foo.com npm run start
```

### Production

Build with `npm run build-prod` and run the server with `npm run start`. You should be able to access http://localhost:8081

### Development

Build with `npm run build-dev` and run the server with `npm run start`. You should be able to access http://localhost:8081

### Development with live-reload (dev mode)

In one terminal run `npm run serve`, this will spin up your front-end code on http://localhost:8080. You will also need another terminal running `npm run start`, this will run the express server on port 8081.

### Running tests

These run automatically if you build prod or dev but you can manually run with the command `npm run test`.

# Serverless - AWS Node.js Typescript

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

## Installation/deployment instructions

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

## Test your service

I have found the testing locally (e.g. `serverless invoke local`) sometimes gets weird results.
Best to use _postman_ or any other _curl_ tool

# Deploy your service

## CORS

The _origin_ is configure via the parameters page in the web console. There is a different value for
each stage, `dev` and `PROD`. To use locally, override with CLI: `--param CORS_ORIGINS=http://localhost:4200`

## GUESTS_DB_TABLE

Since Table name is constant in Production, but may vary during development, it is configured as a parameter with default value. The `dev` stage has a parameter configured in the web console, but `PROD` does not. This Means that each time `sls deploy --stage dev` is called, parameter value will be dynamic, and when `sls deploy --stage PROD` is called, it will always be constant.

## Advanced usage

Any tsconfig.json can be used, but if you do, set the environment variable `TS_NODE_CONFIG` for building the application, eg `TS_NODE_CONFIG=./tsconfig.app.json npx serverless webpack`
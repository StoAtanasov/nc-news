# News API
​
An API for accessing and contributing to the latest developments.
​
## Getting Started
​
These instructions will get the project functioning locally to facilitate development and testing. For details on how to deploy the project on a live system, please refer to the deployment notes.
​
## _Prerequisites_
​
It is assumed that the following packages are already globally installed:
​
| Dependency | Version |
| ---------- | ------- |
| PostgreSQL | 10.8    |
| Node.JS    | 11.13.0 |
| NPM        | 6.9.0   |
​
The following dependencies will also be installed as part of the below installation process:
​
| Dependency    | Version |
| ------------- | ------- |
| Express       | 4.17.1  |
| Knex          | 0.19.1  |
| Node Postgres | 7.12.0  |
| Chai          | 4.2.0   |
| Chai-Sorted   | 0.2.0   |
| Mocha         | 6.2.0   |
| Supertest     | 4.0.2   |
​
## _Installing_
​
This section details the steps required in order to run the development environment.
​
After forking this repository, clone its contents to your local system by using the following terminal command:
​
```
$ git clone https://github.com/<your-github-username>/be-nc-news
```
​
Open this repository in your favoured code editor.
​
At this point, it is essential to create a local `knexfile.js` file in the root directory. The following code can be inserted into this:
​
```javascript
const ENV = process.env.NODE_ENV || "development";
const { DB_URL } = process.env;
​
const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};
​
const customConfig = {
  production: {
    connection: `${DB_URL}?ssl=true`
  },
  development: {
    connection: {
      database: "nc_news",
      username: "<your-postgreSQL-username>",
      password: "<your-postgreSQL-password>"
    }
  },
  test: {
    connection: {
      database: "nc_news_test",
      username: "<your-postgreSQL-username>",
      password: "<your-postgreSQL-password>"
    }
  }
};
​
module.exports = { ...customConfig[ENV], ...baseConfig };
```
​
Please note that the `development` and `test` connection objects will only require your postgreSQL username and password if you are running a linux system. If you are running Mac OSX, you may remove the username and password keys from these objects.
​
Subsequently, the following terminal commands must be run in order to set up your local test and development databases:
​
```
$ npm install
​
$ npm run setup-dbs
​
$ npm run seed
​
```
​
After following these steps, the databases will be in place and you will be able to access the test database by running the following commands in your terminal:
​
```
$ psql
\c nc_news_test
```
​
Now select any details you wish to access. For example:
​
```
nc_news_test=# SELECT * FROM users;
```
​
To return to your terminal command prompt, type `\q`.
​
Alternatively, you may wish to start a local server in order to access the respective endpoints directly. This can be achieved by running the command:
​
```
$ npm run start
```
​
In your preferred browser, simply navigate to http://localhost:9090/api in order to view the valid endpoints. Other requests, such as POST or PATCH requests, may be replicated using a REST client such as Insomnia.
​
## After Installation
​
After successfully installing the various dependencies and running the initial scripts, you will be free to explore and alter the project as you see fit. Please note that a substantive test suite has been provided with this repository, which may be utilised or amended as appropriate.
​
## _Running the Tests_
​
The test suite included with this repository contains various tests to ensure each endpoint functions as intended. Upon making any alterations, the complete test suite may be run using the following command:
​
```
$ npm t
```
​
The following table outlines the purpose of each category of tests. Should you require additional details, please review the tests themselves in the `app.spec.js` file.
​
| Endpoint                           | Request | Tests                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /api                               | GET     | Ensures that a JSON detailing the available endpoints and the requirements within each in served upon receiving a request.                                                                                                                                                                                                                              |
| /api/topics                        | GET     | Ensures that all topics are served. These are served as an array of each topic.                                                                                                                                                                                                                                                                         |
| /api/topics                        | POST    | Ensures that a new topic may be posted. An error is returned if the slug is less than 3 characters in length or a description is not provided.                                                                                                                                                                                                          |
| /api/users                         | GET     | Ensures that all users are served. These are served as an array of users.                                                                                                                                                                                                                                                                               |
| /api/users                         | POST    | Ensures that a new user may be posted. An error is returned if the username is less than 3 characters in length, or insufficient details are provided.                                                                                                                                                                                                  |
| /api/users/:username               | GET     | Ensures that details of the requested user are served. An error is returned if the requested user does not exist.                                                                                                                                                                                                                                       |
| /api/articles                      | GET     | Ensures that all articles are served in an array. Also ensures that the 6 valid queries (sort-by, order, author, topic, limit and page) function as intended, returning an error if an invalid value is provided, or a page requested that does not exist.                                                                                              |
| /api/articles                      | POST    | Ensures that a new article may be possted. An error is returned if either the topic or user posting the article do not exist.                                                                                                                                                                                                                           |
| /api/articles/:article_id          | GET     | Ensures that the correct article is displayed. An error is returned if the requested article ID does not exist or a non-integer is entered.                                                                                                                                                                                                             |
| /api/articles/:article_id          | PATCH   | Ensures that the requested changes are made to the article's vote property, serving the updated article. If additional keys are provided, they are ignored and an error is returned if a non-integer is entered as the value of inc_votes.                                                                                                              |
| /api/articles/:article_id          | DELETE  | Ensures that the specified article is deleted, along with any associated comments. An error is returned if the article ID does not exist or a non-integer is entered.                                                                                                                                                                                   |
| /api/articles/:article_id/comments | GET     | Ensures that all comments from the specified article are served. An error is returned if the requested article ID does not exist or a non-integer is entered. Also ensures that the 4 valid queries (sort-by, order, limit and page) function as intended, returning an error if an invalid value is provided, or a page requested that does not exist. |
| /api/articles/:article_id/comments | POST    | Ensures that a new comment is posted to the specified article, serving the complete new comment. Ensures an error is returned if an invalid or non-existent article ID is entered. Also ensures that an error is returned if insufficient data is received in the body of the request                                                                   |
| /api/comments/:comment_id          | PATCH   | Ensures that the requested changes are made to the comment's vote property, serving the updated comment. Ensures that if additional keys are provided, they are ignored and that an error is returned if a non-integer is entered as the value of inc_votes.                                                                                            |
| /api/comments/:comment_id          | DELETE  | Ensures the specified comment is deleted and that an error is returned if the specified comment does not exist or a non-integer is entered                                                                                                                                                                                                              |
​
## Deployment
​
Providing you have accurately followed the above steps, the repository will be ready for deployment to a live system using a production database.

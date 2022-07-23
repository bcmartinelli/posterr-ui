# posterR
This project was developed for Strider frontend position using React.

## System Requirements

- MacOS, Windows (including WSL), and Linux are supported
- [Node.js](https://nodejs.org/en/) (v16.15.1)
- [JSON Serve](https://www.npmjs.com/package/json-server/v/0.17.0) (V0.17.0)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable) (Optional)

## Installation

- Clone project https://github.com/martinelli4630/posterr-ui.git
- Enter project folder `cd posterr-ui`
- Install dependencies `npm install` or `yarn`

## Start development server
Run `json-server --watch db.json --port 3004`.<br />
Run `npm start` or `yarn start` for a dev server. Access http://localhost:3000 in your browser. 

##### Attention
All mocked data and new records are easily accessible in the `db.json` file at the root of the project. To delete/change any record or post just modify it.

## Planning
With the implemetation of new feature "reply-to-post", I would like to know  that considering that currentily our system limit the user to a maximum 5 post/repost/quot per day, we will add to this limit this new feature or increase the limit per day or we will to leave without limit for this feature?

Regarding these questions, the changes will be minimal on the frontend, for the backend it maybe necessary to pay more attention because in addition to removing the lock, it'll be necessary to analyze the performance of the database.


## Critique
Considering the code, if I had more time I would make more components and refactor some logic to improve performance. If this project were to grow and have many users, I think the first problem will be performance because currently lists all posts without pagination. To scale this product I would implement lazy loading and infinite scrolling or pagination in posts.


## Contributors

* [Bruno Martinelli](https://github.com/martinelli4630)

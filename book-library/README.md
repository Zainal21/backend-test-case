# Book Library API

## Entities

- Member
- Book

## Use Case

- Members can borrow books with conditions
  - [x] Members may not borrow more than 2 books
  - [x] Borrowed books are not borrowed by other members
  - [x] Member is currently not being penalized
- Member returns the book with conditions
  - [x] The returned book is a book that the member has borrowed
  - [x] If the book is returned after more than 7 days, the member will be subject to a penalty. Member with penalty cannot able to borrow the book for 3 days
- Check the book
  - [x] Shows all existing books and quantities
  - [x] Books that are being borrowed are not counted
- Member check
  - [x] Shows all existing members
  - [x] The number of books being borrowed by each member

## Mock Data

- Books

```tsx
[
  {
    code: 'JK-45',
    title: 'Harry Potter',
    author: 'J.K Rowling',
    stock: 1,
  },
  {
    code: 'SHR-1',
    title: 'A Study in Scarlet',
    author: 'Arthur Conan Doyle',
    stock: 1,
  },
  {
    code: 'TW-11',
    title: 'Twilight',
    author: 'Stephenie Meyer',
    stock: 1,
  },
  {
    code: 'HOB-83',
    title: 'The Hobbit, or There and Back Again',
    author: 'J.R.R. Tolkien',
    stock: 1,
  },
  {
    code: 'NRN-7',
    title: 'The Lion, the Witch and the Wardrobe',
    author: 'C.S. Lewis',
    stock: 1,
  },
];
```

- Members

```tsx
[
  {
    code: 'M001',
    name: 'Angga',
  },
  {
    code: 'M002',
    name: 'Ferry',
  },
  {
    code: 'M003',
    name: 'Putri',
  },
];
```

## Requirements

- [x] it should be use any framework, but prefered [NestJS](https://nestjs.com/) Framework Or [ExpressJS](https://expressjs.com/)
- [x] it should be use Swagger as API Documentation
- [x] it should be use Database (SQL/NoSQL)
- [x] it should be open sourced on your github repo

## Extras

- [ ] Implement [DDD Pattern](<[https://khalilstemmler.com/articles/categories/domain-driven-design/](https://khalilstemmler.com/articles/categories/domain-driven-design/)>)
- [ ] Implement Unit Testing

## Tech Stack

**Library and Framework:** Nest JS, TypeORM, class-validator, dotenv, mysql2, etc

## Installation

1 . Clone the project and enter to book-library directory

```bash
$ git clone git@github.com:Zainal21/backend-test-case
$ cd book-library
```

2. Create `.env` file from [`.env.sample`](./.env.example)

```bash
$ cp .env.example .env
```

3. import the database dump (.sql)

```bash
$ yarn install
```

4. install depedencies

```bash
$ yarn install
```

5. start development server

```bash
$ yarn start:dev
```

6. open your browser to access swagger API Docs

```bash
$ https://locahost:3000/api-docs
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Running Migration the app

```bash
# run migration
$ yarn migration:run

# generate migration
$ yarn migration:generate

# create migration
$ yarn migration:create

# revert migration
$ yarn migration:revert
```

Copyright © 2024 by Muhamad Zainal Arifin

> The Project is Under MIT licensed.

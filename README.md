# TODO App

### The Stack:
- NestJS: A well-structured Node.js framework for building efficient and scalable backends.
- MongoDB: A flexible NoSQL database that stores JSON-like documents, ideal for evolving data structures.
- React: A popular JavaScript library for creating dynamic and interactive user interfaces.
- MUI (Material-UI): A React component library providing pre-built, customizable UI elements based on Material Design.
### Why This Stack Works:
- Organized Backend: NestJS's structure and dependency injection make building a clean and maintainable backend.
- Scalable Storage: MongoDB scales horizontally, handling data growth effortlessly.
- Flexible Data: MongoDB's schema-less nature adapts to changing data needs.
- Faster Frontend Dev: MUI's pre-built components accelerate UI development.
- Modern UI: MUI ensures a consistent and visually appealing user experience.

** App feature **
1. User account creation
2. User Login
3. Create Todo task
4. Update Todo task

# Prerequisite
- Below steps are needed only for the first time when you setup your dev machine
1. NodeJS v18 & Nestjs - NestJS is a progressive Node. js framework that helps build server-side applications.
2. Docker & Mongodb - MongoDB is an open source cross-platform document-oriented database program.

# Start the project 
## Start DB
```bash
docker run -d -p 27018:27017 --name todo-mongodb -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root -d mongo
```

## Start Backend
```bash
$ cd backend
$ yarn install
$ yarn start
```
This will run on local URL http://localhost:3002


## Start Frontend
```bash
$ cd frontend
$ yarn install
$ yarn start
```
This will run on local URL http://localhost:3000


# Diagrams
## C4
<img width="760" alt="image" src="https://github.com/duminhtam/td-app/assets/1624637/96cddc41-b8bd-4cc5-b066-b366108534ae">

## Seq
1. Create Todo
<img width="809" alt="image" src="https://github.com/duminhtam/td-app/assets/1624637/c55a29fd-663d-42be-a95c-2345dab05884">
2. Read Todo
<img width="807" alt="image" src="https://github.com/duminhtam/td-app/assets/1624637/c2375cc5-6928-4b00-8b12-7d8294448c8e">
3. Update
<img width="804" alt="image" src="https://github.com/duminhtam/td-app/assets/1624637/c03e4a58-2674-4c05-b005-a61339c5ff18">
4. Delete
<img width="809" alt="image" src="https://github.com/duminhtam/td-app/assets/1624637/be26e88e-b9e3-46ac-b7c8-6148470d2d56">





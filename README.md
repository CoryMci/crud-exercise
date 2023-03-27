# Plexxis Interview Exercise

## Requirements

Create a simple but impressive (looks good, works well, has intuitive design, etc.) CRUD application that can do the following:

1. ~~Retrieve employees from a REST API~~
2. ~~Display the employees in a React application~~
3. ~~Has UI mechanisms for creating and deleting employees~~
4. ~~Has API endpoints for creating and deleting employees~~
5. ~~Edit your version of the `README.md` file to explain to us what things you did, where you focussed your effort, etc.~~

## Bonus (Highly Encouraged)

1. ~~Use a relational database to store the data (SQLite, MariaDB, Postgres)~~
2. ~~UI mechanisms to edit/update employee data~~
3. ~~Add API endpoint to update employee data~~
4. ~~Use [React Table](https://react-table.js.org)~~

## Overview

This CRUD app was built using React, Node/Express, and SQLite, based on the starter code provided. Employees and their corresponding information are displayed on a react-table with a responsive user interface. It has UI and API mechanisms to create, update, and delete employees stored on a relational database. This project challenged me to familiarize myself with new libaries, including React-Table and sqlite3.

## Approach

1. **Initial setup:** Created a simple frontend using vanilla tables and add basic UI for future crud operations.
2. **API connection:** Connected the frontend to the API using Axios, initially just with a simple read operation.
3. **Backend setup:** Built backend using mongoose/MongoDB, add API endpoints for CRUD operations
4. **React Table setup:** Converted the existing table to React Table, improved styling
5. **Frontend validation:** Added regex validation to frontend forms.
6. **Database conversion:** Converted the mongoose backend to SQLite (After an earnest attempt to setup an oracle database!)
7. **Backend validation:** Added validation to backend using express-validator
8. **Code Cleanup and Refactoring:** (Throughout entire process) Extracted/divided components where possible, removed redundant code, improved readability, etc.

## Focus areas

I tried to focus on constantly reorganizing and extracting my react components. This may be one of the areas I need the most work in. I spent most of my time in the last few days refactoring and reorganizing my code, trying to seperate logic/state management from rendering as best I can. I am actively working on forming a stronger "react intuition", and learning to structure my projects with maintainability/reusability in mind, even on smaller projects.

I also used this project as an opportunity to learn new skills and to practice old ones. A lot of time was spent reading and familiarizing myself with the documentation of these new libraries to use them effectively in the application.

## Other libraries/frameworks

1. `sqlite3`: This framework is used to connect node.js to the sqlite database. I chose SQLite because I have past experience with it when I was learning Python.
2. `tailwindcss`: Personal preference, recently learned it and wanted to use it for this app. Happy to use vanilla css or learn a new css library/framework!
3. `axios`: Chosen due to familiarity with syntax rather than fetch.
4. `express-validator`: Used to simplify backend validation process.

## Future improvements/steps

1. **Global Error handling:** Use a more sophisticated error handling system to display error messages globally to improve user experience.
2. **Context API:** To help with the global error handler, I want to learn to use the React context API, and hopefully use it to my benefit in other, larger applications.
3. **Testing:** Writing automated tests may have helped my development process and help with scalability in the future.
4. **Pagination and Searching:** Implement pagination and search functions to make it easier to manage larger datasets.

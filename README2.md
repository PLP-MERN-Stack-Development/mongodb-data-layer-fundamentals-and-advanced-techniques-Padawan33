# PLP Bookstore MongoDB Assignment Submission

This repository contains the solution files for the MongoDB CRUD, Advanced Queries, Aggregation, and Indexing assignment for the `plp_bookstore` database.

## 🛠️ Setup and Environment

1.  **MongoDB Instance:** The database was set up on **[Localhost / MongoDB Atlas]**.
2.  **Database Name:** `plp_bookstore`
3.  **Collection Name:** `books`
4.  **Tools Used:** MongoDB Shell (`mongosh`) and MongoDB Compass.

## 🚀 How to Run the Scripts

### 1. Data Population (`insert_books.js`)

Before running queries, ensure the collection is populated.

1.  Ensure your MongoDB server is running.
2.  Connect using `mongosh` or the Compass Shell.
3.  Switch to the correct database:
    ```javascript
    use plp_bookstore
    ```
4.  Execute the insertion script to populate the `books` collection with the initial data (this file is assumed to be in the current directory or the path provided):
    ```javascript
    load("insert_books.js") 
    ```

### 2. Execution of Queries (`queries.js`)

The `queries.js` file contains all required commands, including basic CRUD, advanced filtering, aggregation pipelines, and index creation/demonstration.

1.  Ensure you are still in the `plp_bookstore` database.
2.  Load and execute the solutions file:
    ```javascript
    load("queries.js")
    ```
    *Note: The script is designed to be executable, with clear comments explaining each section and command.*

## 🧪 Expected Outcome Highlights

| Task | Objective | Verification in `queries.js` |
| :--- | :--- | :--- |
| **Task 2 (CRUD)** | Find, Update (`updateOne`), Delete (`deleteOne`) | Specific commands targeting a single document or simple filter. |
| **Task 3 (Advanced)** | Projection, Sorting, and Pagination | `find({}, {title: 1, ...})`, `.sort()`, `.limit().skip()` |
| **Task 4 (Aggregation)** | Average Price, Most Prolific Author, Group by Decade | Three distinct `$group` and `$project` pipelines. |
| **Task 5 (Indexing)** | Performance Optimization | The `explain("executionStats")` query confirms a **`IXSCAN`** stage, demonstrating that the compound index (`author_1_published_year_-1`) was successfully used for faster query execution. |
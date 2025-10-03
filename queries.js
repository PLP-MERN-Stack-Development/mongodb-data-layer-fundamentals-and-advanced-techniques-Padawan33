/**
 * * PLP BOOKSTORE ASSIGNMENT QUERIES
 * * This script contains all required MongoDB queries, pipelines, and
 * index commands for the 'plp_bookstore' database and 'books' collection.
 * Execute this file in the MongoDB Shell (mongosh) or Compass Shell 
 * after running 'use plp_bookstore'.
 * */

// Switch to the correct database (just in case!)
use plp_bookstore


// ===============================================
// TASK 2: BASIC CRUD OPERATIONS (Read, Update, Delete)
// ===============================================

// 🚀 R - READ: Find all books in the 'Fiction' genre.
db.books.find({ genre: "Fiction" })

// 📅 R - READ: Find books published after the year 1950.
db.books.find({ published_year: { $gt: 1950 } })

// 🖋️ R - READ: Find all books written by 'George Orwell'.
db.books.find({ author: "George Orwell" })

// ✏️ U - UPDATE: Update the price of the book '1984' to 15.00.
db.books.updateOne(
    { title: "1984" },
    { $set: { price: 15.00 } }
)

// 🗑️ D - DELETE: Delete the book titled 'Moby Dick'.
db.books.deleteOne({ title: "Moby Dick" })


// ===============================================
// TASK 3: ADVANCED QUERIES
// ===============================================

// ✅ FILTER: Find books that are both in stock AND published after 2010. (Expect zero documents)
db.books.find({ 
    in_stock: true, 
    published_year: { $gt: 2010 } 
})

// 📚 PROJECTION: Return ONLY the title, author, and price fields for all books.
db.books.find(
    {}, 
    { title: 1, author: 1, price: 1, _id: 0 } // Include title, author, price, exclude _id
)

// ⬆️ SORT ASCENDING: Display all books sorted by price (cheapest first).
db.books.find({}).sort({ price: 1 })

// ⬇️ SORT DESCENDING: Display all books sorted by price (most expensive first).
db.books.find({}).sort({ price: -1 })

// 📄 PAGINATION: Page 1 (Books 1-5)
db.books.find({}).limit(5).skip(0)

// 📄 PAGINATION: Page 2 (Books 6-10)
db.books.find({}).limit(5).skip(5)

// 📄 PAGINATION: Page 3 (Book 11)
db.books.find({}).limit(5).skip(10)


// ===============================================
// TASK 4: AGGREGATION PIPELINE
// ===============================================

// 💰 AGGREGATE 1: Calculate the average price of books by genre.
db.books.aggregate([
    { $group: { _id: "$genre", average_price: { $avg: "$price" } } }
])

// 👑 AGGREGATE 2: Find the author with the most books in the collection (Top 1).
db.books.aggregate([
    { $group: { _id: "$author", book_count: { $sum: 1 } } },
    { $sort: { book_count: -1 } },
    { $limit: 1 }
])

// 🗓️ AGGREGATE 3: Group books by publication decade and count them.
db.books.aggregate([
    { 
        $project: { 
            _id: 0, 
            title: 1, 
            decade: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } 
        } 
    },
    { $group: { _id: "$decade", book_count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
])


// ===============================================
// TASK 5: INDEXING
// ===============================================

// 🔑 INDEX 1: Create a single index on the 'title' field for faster lookup.
db.books.createIndex({ title: 1 })

// 🔑🔑 INDEX 2: Create a compound index on 'author' and 'published_year'.
db.books.createIndex({ author: 1, published_year: -1 })

// 🔬 EXPLAIN: Demonstrate index use (IXSCAN) for the compound index.
// The output of this query shows the performance optimization.
db.books.find({ 
    author: "J.R.R. Tolkien", 
    published_year: { $gt: 1930 } 
}).explain("executionStats")
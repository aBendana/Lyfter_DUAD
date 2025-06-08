
-- DQL queries

-- 1. Get all books and their authors
SELECT books.name, authors.name 
FROM books as Books
INNER JOIN authors as Authors 
ON Books.author_id = Authors.id;


-- 2. Get all books that don't have an author
SELECT books.name, authors.name 
FROM books as Books
LEFT JOIN authors as Authors 
ON Books.author_id = Authors.id
WHERE Authors.id IS NULL;


-- 3. Get all the authors who don't have books

-- RIGHT JOIN and FULL OUTER JOINs are not currently supported in SQLITE
-- SELECT books.name, authors.name 
-- FROM books as Books
-- RIGHT JOIN authors as Authors 
-- ON Books.author_id = Authors.id
-- WHERE Books.id IS NULL;

-- INVERTING THE LEFT JOIN
SELECT authors.name, books.name 
FROM authors as Authors
LEFT JOIN books as Books 
ON Authors.id = Books.author_id
WHERE Books.id IS NULL;


-- 4. Obtain all books that have ever been rented
SELECT books.name
FROM books as Books
INNER JOIN rents as Rents 
ON Books.id = Rents.book_id
GROUP BY Books.name;


-- 5. Obtain all books that have never been rented
SELECT books.name
FROM books as Books
LEFT JOIN rents as Rents 
ON Books.id = Rents.book_id
WHERE Rents.book_id IS NULL;


-- 6. Obtain all customers who have never rented a book
SELECT customers.name, customers.email
FROM customers as Customers
LEFT JOIN rents as Rents 
ON Customers.id = Rents.customer_id
WHERE Rents.customer_id IS NULL;


-- 7. Obtain all books that have been rented and are in "Overdue" state
SELECT books.name, rents.state
FROM books as Books
INNER JOIN rents as Rents 
ON books.id = Rents.book_id
WHERE Rents.state IS 'Overdue';
CREATE TABLE books_review (
	id SERIAL PRIMARY KEY,
	book_title VARCHAR(100) NOT NULL,
	image_url VARCHAR(255) NOT NULL,
	review TEXT NOT NULL,
	notes TEXT
);

ALTER TABLE books_review
  RENAME TO book_reviews;

  
ALTER TABLE book_reviews
  ALTER COLUMN image_url TYPE TEXT;


INSERT INTO book_reviews (book_title, image_url, review, notes) 
VALUES ('Atomic Habits',
		'https://m.media-amazon.com/images/I/81YkqyaFVEL._AC_UF1000,1000_QL80_.jpg',
		'A very useful book for anyone looking to consciously set boundaries and goals for his daily unconscious actions!', 
		'if you can get 1 percent better each day for one year, you will end up thirty-seven times better by the time you are done')

create database Linklens;
use Linklens;

CREATE TABLE links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    long_url TEXT NOT NULL,
    short_code VARCHAR(50) UNIQUE NOT NULL,
    click_count INT DEFAULT 0,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_accessed TIMESTAMP NULL,
    expiry_date DATETIME NULL
);
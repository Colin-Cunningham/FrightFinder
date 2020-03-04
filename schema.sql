-- Creating the Database
DROP DATABASE IF EXISTS spooky_spots;
CREATE DATABASE spooky_spots;
USE spooky_spots;

-- Creating Spooks Table

CREATE TABLE spooky_spaces
(
	id int NOT NULL AUTO_INCREMENT,
	city varchar(50) NOT NULL,
    country varchar(50) NOT NULL,
	description varchar(10000),
    location varchar(50) NOT NULL,
    state varchar(25) NOT NULL,
    state_ab varchar(2) NOT NULL,
    cur_lat DECIMAL(14, 14) NOT NULL,
    cur_long DECIMAL(14, 14) NOT NULL,
    city_lat DECIMAL(14, 14) NOT NULL,
    city_long DECIMAL(14, 14) NOT NULL,
	PRIMARY KEY (id)
);


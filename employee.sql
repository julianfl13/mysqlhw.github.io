DROP DATABASE IF EXISTS employeehw_db;

CREATE DATABASE employeehw_db;

USE employeehw_db;

CREATE TABLE department (
id INT AUTO_INCREMENT NOT NULL,
name VARCHAR(30) NULL,

PRIMARY KEY (id)
);

CREATE TABLE role (
id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NULL,
salary DECIMAL(10, 4) NULL,
department_id INT NULL,

PRIMARY KEY (id)
);


CREATE TABLE employee (
id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NULL,
last_name VARCHAR(30) NULL,
role_id INT NULL,
manager_id INT NULL,

PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
	VALUES ("Julian", "Lopez", 1, 1);
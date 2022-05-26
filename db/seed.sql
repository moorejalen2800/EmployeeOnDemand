

INSERT INTO department (name)
VALUES
('Education'),
('Maintenance'),
('IT'),
('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES
('Dean of Studies', 80000.00, 1),
('Professor', 100000.00, 1),
('Maintenance manager', 70000.00, 2),
('Digital Projects Assistant', 50000.00, 3),
('IT Support Specialist ', 69000.00, 3),
('HR Manager', 100000.00,4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Carl', 'Cain', 1, 1),
('Stanley', 'Oglevee', 2, 1),
('Michael', 'Bubbly', 3, 1),
('Huey', 'Freemen', 4, 1),
('Vivian', 'Banks', 5, 1),
('Annalise', 'Keating', 6, NULL)
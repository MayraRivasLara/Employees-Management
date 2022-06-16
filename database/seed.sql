USE employees_management_db;

INSERT INTO departments (id, name)
VALUES (001, "Women"),
       (002, "Men"),
       (003, "Children");

INSERT INTO roles (id, title, department_id, salary)
VALUES (001, "Manager", 001, 75500),
       (002, "Adminnistrative", 001, 45000),
       (003, "Floor-staff", 002, 60000),
       (004, "Stock-staff", 003, 85000),
       (005, "Delivery", 002, 55000),
       (007, "Cleaning-staff", 003, 30000);
       
INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Monique", "Kelly", 001, NULL), 
       (002, "Tina", "Simmons", 004, 001), 
       (003, "Patrick", "Parson", 003, 001), 
       (004, "Kevin", "Mann", 003, 003), 
       (005, "Kirsty", "Chong", 005, 001), 
       (006, "Camilla", "Cabello", 003, 003), 
       (007, "Martha", "Shimmons", 005, 001), 
       (008, "Liam", "Brooks", 007, 002), 
       (009, "Ernest", "Grant", 005, 001), 
       (010, "Mathew", "Gair", 002, 001), 
       (011, "Walter", "Crawford", 004, 002), 
       (012, "Elliot", "Moses", 005, 001), 
       (013, "Mackenzie", "Golden", 005, 001), 
       (014, "Molly", "Armstrong", 004, 002), 
       (015, "Kailyn", "French", 007, 002), 
       (016, "Keaton", "Frazier", 002, 001);
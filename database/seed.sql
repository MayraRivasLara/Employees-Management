USE employees_management_db;

INSERT INTO departments (id, name)
VALUES (001, "Women"),
       (002, "Men"),
       (003, "Kids"),
       (004, "Beauty"),
       (005, "Home"),
       (006, "Sports"),
       (007, "Toys");

INSERT INTO roles (id, title, department_id, salary)
VALUES (001, "Store Manager", 001, 50000),
       (002, "Administrative", 001, 45000),
       (003, "Customer Service", 002, 40000),
       (004, "Cashier", 002, 45000),
       (005, "Security", 003, 43000),
       (006, "Visual Merchandisers", 003, 38000),
       (007, "Inventory Control Specialists", 004, 39000),
       (008, "Maintenance", 005, 45000);
       
INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Monique", "Kelly", 001, null), 
       (002, "Tina", "Simmons", 002, 001), 
       (003, "Patrick", "Parson", 003, 001), 
       (004, "Kevin", "Mann", 003, 004), 
       (005, "Kirsty", "Chong", 005, 001), 
       (006, "Camilla", "Cabello", 006, 001), 
       (007, "Martha", "Shimmons", 007, 001), 
       (008, "Liam", "Brooks", 008, 001), 
       (009, "Ernest", "Grant", 002, 001), 
       (010, "Mathew", "Gair", 003, 001), 
       (011, "Walter", "Crawford", 004, 001), 
       (012, "Elliot", "Moses", 005, 001), 
       (013, "Mackenzie", "Golden", 006, 001), 
       (014, "Molly", "Armstrong", 007, 001), 
       (015, "Kailyn", "French", 008, 001), 
       (016, "Tom", "Johns", 002, 001), 
       (017, "Daniel", "White", 003, 001), 
       (018, "Liz", "Smith", 004, 001), 
       (019, "Cassy", "Brown", 005, 001), 
       (020, "Carmen", "Miller", 006, 001), 
       (021, "Mary", "Davis", 007, 001), 
       (022, "Wanda", "Anderson", 008, 001), 
       (023, "Kathy", "Jackson", 002, 001), 
       (024, "Leeanne", "Thompson", 003, 001), 
       (025, "Harrison", "Clark", 004, 001), 
       (026, "Thomas", "Lewis", 005, 001), 
       (027, "Bradley", "Jeans", 006, 001), 
       (028, "Robin", "Walker", 007, 001), 
       (029, "Rachel", "Green", 008, 001), 
       (030, "Keaton", "Frazier", 002, 001);

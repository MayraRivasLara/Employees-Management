DROP DATABASE IF EXISTS `employees_management_db`;
CREATE SCHEMA `employees_management_db`;

-- Create table departments
CREATE TABLE `employees_management_db`.`departments` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));


-- Create table roles 
CREATE TABLE `employees_management_db`.`roles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `salary` DECIMAL NOT NULL,
  `department_id` INT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_roles_departments_idx` (`department_id` ASC) VISIBLE,
  CONSTRAINT `fk_roles_departments`
    FOREIGN KEY (`department_id`)
    REFERENCES `employees_management_db`.`departments` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


--   Create table employees 
CREATE TABLE `employees_management_db`.`employees` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `role_id` INT UNSIGNED NULL,
  `manager_id` INT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_employees_role_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `fk_employees_role`
    FOREIGN KEY (`role_id`)
    REFERENCES `employees_management_db`.`roles` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

-- add manager id fk constraint
ALTER TABLE `employees_management_db`.`employees` 
ADD INDEX `fk_employee_manager_idx` (`manager_id` ASC) VISIBLE;
;
ALTER TABLE `employees_management_db`.`employees` 
ADD CONSTRAINT `fk_employee_manager`
  FOREIGN KEY (`manager_id`)
  REFERENCES `employees_management_db`.`employees` (`id`)
  ON DELETE SET NULL
  ON UPDATE NO ACTION;
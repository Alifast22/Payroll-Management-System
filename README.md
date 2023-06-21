# Payroll Management System

This is a payroll management system project developed using React, Node.js, Express, and MySQL.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)


## Introduction
The Payroll Management System is a web application designed to automate and simplify the process of managing employee payroll and related tasks. It provides an efficient and user-friendly interface for HR personnel to manage employee information, calculate salaries, track attendance, and generate reports.

## Features
- Employee management: Add, update, and delete employee records
- Salary calculation: Automatically calculate salaries based on predefined rules and employee details
- Attendance tracking: Record and manage employee attendance
- Leave management: Track employee leaves and manage leave requests
- Payroll generation: Generate detailed payroll reports for individual employees or the entire organization
- Employee self-service: Allow employees to view their salary slips, attendance, and leave records

## Installation
To run the Payroll Management System locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/Alifast22/Payroll-Management-System.git
   ```
2. Navigate to the project directory:
   ```
   cd payroll-management-system
   ```
3. Install the dependencies for both the frontend and backend:
   ```
   cd frontend
   npm install
   cd ../backend
   npm install
   ```
4. Set up the MySQL database:
   - Create a new MySQL database for the project.
   - Import the provided SQL schema file `Database/Dump20230621.sql` to create the necessary tables.

## Usage
1. Start the backend server:
   ```
   cd backend
   nodemon index.js
   ```
2. Start the frontend development server:
   ```
   cd frontend/src
   npm start
   ```
3. Open your web browser and visit `http://localhost:3000` to access the Payroll Management System.

## Technologies Used
- React: JavaScript library for building user interfaces
- Node.js: JavaScript runtime environment
- Express: Web application framework for Node.js
- MySQL: Relational database management system

## Contributing
Contributions to the Payroll Management System project are welcome! If you find any issues or would like to add new features, please submit a pull request. For major changes, please open an issue first to discuss the proposed changes.


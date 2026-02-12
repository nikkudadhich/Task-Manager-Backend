# Task-Manager-Backend

# Task Manager Backend REGRIP INDIA PVT. LTD Backend Assignment 
## Overview This project is a secure and scalable backend for a Task Management System built using Node.js, Express.js and MySQL. The system enables authenticated users to organize their personal tasks with stringent access control, security features, and activity logging.

## Tech Stack
Runtime: Node.js
Framework: Express.js
Database: MySQL (Sequelize ORM)
Authentication: JWT (JSON Web Token)
Email OTP: Nodemailer
Deployment: Railway
Rate Limiting: express, rate, limit, Validation: express, validator

## Authentication & Security 
### OTP
Based Email Verification
User signup with the email & password
OTP delivered through email
Activation of account via OTP
Login permitted only for verified users ### JWT Authentication
Short, lived access tokens (1 hour)
All protected routes require a token
Token validation is done by a middleware before access to the route 

### Authorization
Each user is allowed to access only their tasks
Strong ownership validation mechanism is in place

## Core Features ### Task Management

Create Task
View User Tasks
Update Task
Delete Task (Soft Delete enabled)

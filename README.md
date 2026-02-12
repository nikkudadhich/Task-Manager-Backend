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

## Core Features 

### Task Management
Create Task
View User Tasks
Update Task
Delete Task (Soft Delete enabled)

### Soft Delete
Done through Sequelize `paranoid: true`
Deleted tasks still exist and are not permanently removed
Safe removal is done by using the `deletedAt` column

## Middleware Implementation

Authentication Middleware (JWT verification)
Authorization Middleware (Task ownership)
Input Validation (express, validator)
Rate Limiting:
Tight restrictions on OTP & Login
API throttling for general routes
Global Error Handler (centralized error management)

## Activity Logging Every significant action is recorded in the `activitylogs` table:

Login Success / Failure
Task Created
Task Updated
Task Deleted
OTP Resend
Security Events In this way
the audit trail and system transparency are ensured.

## Environment Variables You must have the following environment variables:

DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
JWT_SECRET
EMAIL_USER
EMAIL_PASS
PORT


## Deployment The project is deployed on Railway and is open to the public.

Architecture & Design Decisions Sequelize ORM was utilized for structured database interaction
The middleware pattern was employed for a clear separation of concerns Centralized error handling was facilitated to ease maintenance.
Rate limiting was implemented for security best practices 
Activity logging was added for audit compliance
Soft delete was done for safer data handling 

Author Nikhil Sharma(Nikku Dadhich)

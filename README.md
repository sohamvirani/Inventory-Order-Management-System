<h1 align="left">MERN-Based Inventory and Order Management System</h1>

## Backend Development Task

## Purpose
Create a backend system to handle user authentication, inventory oversight, and order management.

## Contents
- [Technologies Utilized](#technologies-utilized)
- [Key Features](#key-features)
- [Installation Instructions](#installation-instructions)
- [Deployment Guidelines](#deployment-guidelines)
- [API Reference](#api-reference)
- [Contributing Guidelines](#contributing-guidelines)
- [License Information](#license-information)

## Technologies Utilized
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Render for hosting

## Key Features
1. **User Authentication**
   - Implements JWT for secure authentication of both customers and administrators.
   - Role-based access:
     - Administrators can oversee inventory and access all orders.
     - Customers can explore products, submit orders, and track their order history.

2. **Inventory Control**
   - Allows CRUD operations for product management.
   - Administrators receive notifications for low-stock items.

3. **Order Processing**
   - Customers can place orders containing multiple products and monitor their statuses (Pending, Shipped, Delivered).
   - Administrators can modify order statuses and access all customer orders.

## Installation Instructions
1. **Clone the Repository**
  
   git clone https://github.com/sohamvirani/Inventory-Order-Management-System


2. **Create a .env File**
MONGO_URL=Your_mongo_url
PORT=Service_port
NODE_ENV=NODE_ENVIRONMENT
JWT_SECRET=jwt_secret

3. **Run the Application Locally**
   npm install

4. **Start the Application**
   npm start

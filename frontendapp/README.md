# Role-Based-Access-Control
Role-Based Access Control (RBAC) Backend This project implements a Role-Based Access Control (RBAC) system using Node.js, Express, and JWT authentication. 
It provides a secure backend that restricts access to routes based on user roles:

Admin: Can access all routes (admin, moderator, and user).
Moderator: Can access moderator and user routes.
User: Can access only user routes.

Features

JWT-based Authentication and Authorization.
Role-specific access to routes.
Modular architecture with separate middleware for authentication and role-based authorization.
Scalable for adding more roles or permissions in the future.


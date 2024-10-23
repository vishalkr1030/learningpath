# Employee Learning Management System (ELMS)

### Overview

The Employee Learning Management System (ELMS) is a comprehensive platform designed to manage and optimize learning paths for employees within an organization. By combining full-stack development, data engineering, and machine learning, ELMS helps monitor employee progress, assign personalized learning paths, and recommend courses that enhance performance.

This system is designed to meet the continuous learning needs of modern industries, ensuring employees stay on the most effective learning paths to improve their skills and align with organizational goals.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [API Endpoints](#api-endpoints)
---

## Features

- **User Registration and Authentication**  
  Secure registration and login for both admins and employees using email/password authentication.
  
- **Admin Dashboard**  
  A personalized dashboard that allows admins to:
  - Create and manage courses
  - Assign courses and learning paths to employees
  - Track employee performance, course completion, and certificates
  
- **Employee Dashboard**  
  A customized dashboard that enables employees to:
  - View performance stats and track course progress
  - View detailed module information and certificates
  - Access a profile page with personal stats and learning history

- **Machine Learning Course Recommendations**  
  The platform uses machine learning to recommend courses that will best improve employee performance based on historical data.

- **Responsive Design**  
  The UI is designed to work seamlessly across devices, providing an optimal experience on all screen sizes.

## Tech Stack

### Frontend:
- **React.js**
- **Tailwind CSS**
- **Framer Motion** (for animations)
- **Flowbite** (UI components)

### Backend:
- **Node.js**  
- **Express.js**  
- **MongoDB**  
- **Mongoose**  

### Data Engineering Pipeline:
- Four-layer architecture: **Raw Layer**, **Clean Layer**, and **Reporting Layer**.

## System Architecture

### Frontend Application:
- The React-based frontend provides an intuitive interface for both admins and employees.
- Key features include employee progress tracking, course management, quiz completion, certificate access, and interactive learning path visualizations.

### Backend Services:
- The Node.js/Express.js backend acts as the central hub for user management, course data, and business logic.
- RESTful APIs handle user interactions, course enrollment, and performance tracking.

## API Endpoints

### User Management
- POST /auth/register - Register a new user (admin or employee)
- POST /auth/login - Login user
- 
### Courses
- GET /courses - Fetch all courses
- POST /courses - Admin creates a new course
- GET /courses/:id - Fetch a specific course

### Performance and Certificates
- POST /performance/score - Submit employee performance score
- POST /performance/certificate - Award certificate based on course completion


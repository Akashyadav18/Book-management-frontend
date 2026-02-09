# BookManagement

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.5.

## Development server

To start a local development server, run:

```bash
ng serve# 📚 Book Management System

## 📌 Project Overview

This is a **Book Management System** developed using **Spring Boot**, **Angular**, and **PostgreSQL**.  
The project demonstrates **full-stack development**, **session-based authentication & authorization**, and **schema-per-tenant multi-tenancy** based on **city**.

The main goal of this project was to understand:
- CRUD operations end-to-end
- Backend + frontend integration
- User-level authorization
- Multi-tenant database architecture using PostgreSQL schemas

---

## 🛠️ Tech Stack

### Backend
- **Spring Boot**
- **Spring Data JPA (Hibernate)**
- **Lombok**
- **PostgreSQL**
- **Session-based Authentication**

### Frontend
- **Angular**
- **TypeScript**
- **HTML / CSS**

### Database
- **PostgreSQL**
- **Schema-per-Tenant Multi-Tenancy**

---

## ✨ Features

### 🔐 Authentication & Authorization
- Session-based login system
- Authenticated users can access protected APIs
- Authorization rules:
  - A user **can update/delete only their own books**
  - A user **can view all books**, even those created by other users

---

### 📘 Book Management (CRUD)
- Create a new book
- View all available books
- Update book details (only owner)
- Soft delete books (logical deletion)

---

### 🏙️ Multi-Tenancy (Schema per Tenant)
- Implemented **schema-based multi-tenancy**
- Each **city represents a separate tenant**
- Every tenant has its own PostgreSQL schema
- Tenant is resolved dynamically based on the request (city)

This ensures:
- Data isolation between cities
- Scalability for multiple tenants
- Clean separation of data at database level

---

## 🗂️ Database Design

- Each city has its **own schema**
- Common tables exist inside each schema
- Example schemas:
  - `mumbai`
  - `delhi`
  - `bangalore`
  - `pune`

---

## 🔄 Pagination

Pagination is implemented in REST APIs to efficiently handle large datasets.

Reference used for pagination implementation:  
🔗 https://medium.com/@anarxocayev/multitenancy-in-java-with-spring-boot-and-hibernate-with-an-example-d3577eef2b2a
🔗 https://towardsdev.com/multi-tenant-architecture-using-springboot-and-postgresql-d3d800e44ab0

---

## 🚀 How the Application Works (High Level)

1. User logs in → session is created
2. City (tenant) is identified from the request
3. Hibernate switches schema dynamically
4. CRUD operations are executed on the tenant-specific schema
5. Authorization ensures users can modify only their own data

---

## 📚 What I Learned From This Project

- Full-stack integration (Angular ↔ Spring Boot)
- Session management and security in Spring Boot
- Role-based and ownership-based authorization
- PostgreSQL schema-level multi-tenancy
- Clean API design with pagination
- Real-world project structuring for GitHub

---

## 🧠 Future Improvements

- JWT-based authentication
- Role-based access (ADMIN / USER)
- Search and filtering
- Deployment using Docker
- Centralized tenant management


⭐ *This project was built for learning and hands-on understanding of enterprise-level backend concepts.*

```

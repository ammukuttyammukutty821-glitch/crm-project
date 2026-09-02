# CRM System

A Customer Relationship Management (CRM) application built using the MERN Stack.

## Technologies Used

- MongoDB
- Express.js
- React.js
- Node.js
- Mongoose
- JWT Authentication
- bcryptjs
- Axios
- Tailwind CSS

## Features

### Authentication
- User Registration
- User Login
- Password Hashing
- JWT Authentication
- Protected Routes
- Logout

### Customer Management
- Add Customer
- View Customers
- Search Customers
- Filter Customers
- Edit Customer
- Update Customer
- Delete Customer

### Validation
- Required field validation
- Email validation
- 10-digit phone validation
- Password validation
- Error handling

## Project Structure

```text
crm-project/
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   └── .env
│
├── .gitignore
└── README.md
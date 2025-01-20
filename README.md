# Todo List App

A full-stack todo list application built with React.js and Node.js.

## Tech Stack

### Frontend
- **React.js**: UI development
- **Redux Toolkit**: State management
- **Material-UI**: Icons and UI components
- **Axios**: API requests

### Backend
- **Node.js**: Backend runtime environment
- **Express.js**: Server framework
- **MongoDB**: Database for storing user data, lists, and tasks
- **Mongoose**: ODM for MongoDB
- **CORS**: Cross-Origin Resource Sharing to allow API requests from different origins

## Screenshots

![image](https://github.com/user-attachments/assets/4ae489ba-0608-42cb-9bde-b082e4d960ca)


## Requirements

### Frontend
1. Responsive UI
2. Ability to manage lists and tasks:
   - Add/edit/delete tasks
   - Mark tasks as complete/incomplete
3. Dynamically cross out lists when all tasks are marked as complete
4. State management using Redux

### Backend
1. RESTful API with proper routing and status codes
2. CRUD operations for users, lists, and tasks
3. Middleware for CORS and user authentication
4. Database integration with MongoDB

## Getting Started

### Prerequisites
Ensure you have the following installed on your machine:
- Node.js (v14+)
- npm (v6+)
- MongoDB (local or cloud-based like MongoDB Atlas)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/todo-app.git
   cd todo-app
   ```

2. **Install dependencies**:
   
   For the backend:
   ```bash
   cd backend
   npm install
   ```

   For the frontend:
   ```bash
   cd frontend
   npm install
   ```

## Running the Application

### Backend
1. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```
   MONGO_URI=mongodb://localhost:27017/todolist
   PORT=5000
   JWT_SECRET=your-secret-key
   ```

2. Start the backend server:
   ```bash
   cd backend
   npm run start
   ```

### Frontend
1. Start the React development server:
   ```bash
   cd frontend
   npm run dev
   ```

## Project Structure

### Frontend
- **Components**:
  - `Sidebar.jsx`: Handles list management
  - `TaskPanel.jsx`: Handles task management for a selected list
- **Redux**:
  - `userSlice.js`: Manages user state
  - `listSlice.js`: Manages list state
  - `taskSlice.js`: Manages task state

### Backend
- **Routes**:
  - `/api/users`: User management
  - `/api/lists`: List management
  - `/api/tasks`: Task management
- **Controllers**:
  - `userController.js`: Handles user creation and fetching
  - `listController.js`: Handles list-related operations
  - `taskController.js`: Handles task-related operations
- **Models**:
  - `User.js`: User schema
  - `List.js`: List schema with embedded tasks

## Requirements Fulfilled

### Frontend
- Dynamic task and list management with cross-out functionality
- Redux for efficient state management
- Responsive design

### Backend
- RESTful API with MongoDB and Mongoose
- Authentication with JWT
- Middleware for CORS

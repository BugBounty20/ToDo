
---

### **Backend README (`backend/README.md`)**

```markdown
# Todo App Backend

This is the backend of the Todo app, built with **NestJS** and **MySQL**. It provides a RESTful API for managing tasks.

---

## Features

- **CRUD Operations**: Create, Read, Update, and Delete tasks.
- **Input Validation**: Ensures tasks cannot be empty.
- **MySQL Integration**: Persistent storage using a relational database.
- **CORS Support**: Allows requests from the React frontend.

---

## Prerequisites

- Node.js (v18+)
- npm (v9+)
- MySQL Server (v8+)

---

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/todo-app.git
   cd todo-app/backend

2. **Install Dependencies**:

    npm install

3. **Configure Environment Variables**:

    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=your_mysql_username
    DB_PASSWORD=your_mysql_password
    DB_DATABASE=todoapp
    PORT=3000


4. **Set Up MySQL**:

    CREATE DATABASE todoapp;

    CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'your_password';
    GRANT ALL PRIVILEGES ON todoapp.* TO 'appuser'@'localhost';
    FLUSH PRIVILEGES;


5. **Run the App**:

    npm run start:dev


API Endpoints
Method	Endpoint	Description
GET	/todos	Fetch all tasks
POST	/todos	Create a new task
PUT	/todos/:id	Update a task by ID
DELETE	/todos/:id	Delete a task by ID

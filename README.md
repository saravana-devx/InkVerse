# InkVerse - A Dynamic Blogging Platform ✍️

InkVerse is a full-featured **MERN** (MongoDB, Express, React, Node.js) blogging platform designed to empower users to write, edit, and publish engaging articles. With a modern UI powered by **Tailwind CSS** and a rich text editor (Editor.js), InkVerse offers a seamless writing experience for bloggers, along with features that enhance discoverability and user interaction.

---

## 🌟 Key Features

- 📝 **Rich Text Editor**: Create beautiful, structured content using **Editor.js**.
- 🔐 **Authentication & Authorization**: Secure login/signup with **JWT-based** access control.
- 💬 **Comment System**: Enable discussion on each blog post.
- 🧭 **Category Filtering**: Filter blogs based on user-defined categories or tags.
- 📸 **Image Upload**: Upload and manage images using **Cloudinary**.
- ⚡ **SEO & Performance Optimized**: Fast page loads and meta tag support for better search engine visibility.
- 🧑‍💻 **User Dashboard**: Each user has a dashboard to manage their blogs.
- 🧩 **Modular Architecture**: Clean folder structure for easy maintenance and scalability.

---

## 🛠️ Tech Stack

### Frontend

- **HTML**, **CSS**
- **Tailwind CSS** – For rapid and responsive UI styling
- **React** – Component-based UI
- **Redux** – Global state management
- **Editor.js** – Rich text editor for creating articles

### Backend

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework for building RESTful APIs
- **MongoDB** – NoSQL database for blogs, users, comments
- **JWT** – For secure authentication
- **Cloudinary** – Image and media file hosting

---

## ⚙️ Getting Started

Follow these instructions to get the project running locally.

### 📌 Prerequisites

- Node.js & npm
- MongoDB Atlas URI (or local MongoDB instance)
- Cloudinary account (for media upload)

---

### 🔧 Backend Setup

```bash
cd server
npm install
npm start

```

Create a `.env` file in the `server/` directory and add:

```
PORT = 4000
DATABASE_URL = your_mongo_db_connection_string
JWT_SECRET = your_jwt_secret_key
CLOUD_NAME = your_cloud_name
CLOUDINARY_API_KEY = your_api_key
CLOUDINARY_API_SECRET = your_api_secret
```

### 🎨 Frontend Setup

```bash
cd client
npm install
npm start
```
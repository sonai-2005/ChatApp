# 🗨️ ChatApp - Real-Time Messaging Platform

🌐 [Live App](https://chatapp-zx59.onrender.com)

== A full-stack real-time chat application with authentication, WebSocket communication, and a modern UI. ==

---

## 🚀 Features

✅ **Authentication** (Sign-up/Login)  
✅ **Real-Time Messaging** with Socket.IO  
✅ **MongoDB Storage** for messages and users  
✅ **Responsive UI** using Tailwind + DaisyUI  
✅ **In-App Toast Notifications**  
✅ **Render Deployment (Fullstack)**

---

## 🧰 Tech Stack

**Frontend**  
➡️ React  
➡️ Tailwind CSS + DaisyUI  
➡️ Zustand or Context API  
➡️ React Router  
➡️ react-hot-toast

**Backend**  
➡️ Node.js + Express  
➡️ Socket.IO  
➡️ Mongoose  
➡️ bcryptjs  
➡️ dotenv

**Database**  
➡️ MongoDB / MongoDB Atlas

**Deployment**  
➡️ [Render](https://render.com)

---


---

## ⚙️ Getting Started

### 📦 Prerequisites
- Node.js
- npm or yarn
- MongoDB URI (from Atlas or local)

### 🔧 Installation

```bash
git clone https://github.com/sonai-2005/ChatApp.git
cd ChatApp

# Backend Setup
cd backend
npm install
# Create .env and add:
# MONGODB_URI=your_mongo_uri
npm run dev

# Frontend Setup
cd ../frontend
npm install
npm run dev

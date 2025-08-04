import { config } from "dotenv";

import { connectDB } from "../src/lib/db.js";
import user from "../src/models/user.model.js";

config();

const seedUsers = [
  
  {
    email: "james.anderson@example.com",
    fullName: "jonny sins",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    email: "william.clark@example.com",
    fullName: "Test-1",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    email: "benjamin.taylor@example.com",
    fullName: "Test-2",
    password: "123456789",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await user.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};


seedDatabase();
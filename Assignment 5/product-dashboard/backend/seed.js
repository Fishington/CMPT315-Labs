import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("MongoDB Connected");

    await Product.deleteMany(); // Clear existing data
    await Product.insertMany([
      { name: "Laptop", price: 1000, stock: 5, category: "Electronics" },
      { name: "Phone", price: 600, stock: 0, category: "Electronics" },
      { name: "Tablet", price: 300, stock: 10, category: "Electronics" },
      { name: "Headphones", price: 100, stock: 20, category: "Accessories" },
      { name: "Monitor", price: 200, stock: 3, category: "Electronics" },
      { name: "Keyboard", price: 50, stock: 15, category: "Accessories" },
      { name: "Mouse", price: 30, stock: 25, category: "Accessories" },
      { name: "Smartwatch", price: 250, stock: 4, category: "Wearables" },
      { name: "Camera", price: 800, stock: 2, category: "Photography" },
      { name: "Speaker", price: 150, stock: 6, category: "Audio" },
    ]);

    console.log("Products Seeded");
    mongoose.connection.close();
  })
  .catch(err => console.error("Seeding Error:", err));

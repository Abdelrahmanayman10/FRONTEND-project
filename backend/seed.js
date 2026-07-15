const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const MenuItem = require('./models/MenuItem');
const Booking = require('./models/Booking');

dotenv.config();

const menuItems = [
  {
    name: "Fried Eggs",
    price: 9.99,
    img: "/src/assets/food111.jpg",
    category: "Breakfast",
    description: "Made with eggs, lettuce, salt, oil and other ingredients."
  },
  {
    name: "Hawaiian Pizza",
    price: 15.99,
    img: "/src/assets/food222.jpg",
    category: "Main Dishes",
    description: "Topped with sweet pineapple, savory ham, mozzarella, and house pizza sauce."
  },
  {
    name: "Martinez Cocktail",
    price: 7.25,
    img: "/src/assets/food333.jpg",
    category: "Drinks",
    description: "Classic gin cocktail sweet, aromatic, with notes of cherry and herbal bitters."
  },
  {
    name: "Butterscotch Cake",
    price: 20.99,
    img: "/src/assets/food444.jpg",
    category: "Desserts",
    description: "Delightful butterscotch sponge cake with butterscotch icing and butterscotch chips."
  },
  {
    name: "Mint Lemonade",
    price: 5.89,
    img: "/src/assets/food555.jpg",
    category: "Drinks",
    description: "Refreshing cold drink made with freshly squeezed lemon juice, mint leaves, and ice."
  },
  {
    name: "Chocolate Icecream",
    price: 18.05,
    img: "/src/assets/food666.jpg",
    category: "Desserts",
    description: "Rich and creamy double chocolate ice cream served in a dish or cone."
  },
  {
    name: "Cheese Burger",
    price: 12.55,
    img: "/src/assets/food777.jpg",
    category: "Main Dishes",
    description: "Grilled beef patty topped with melted cheddar, lettuce, tomato, pickles, and burger sauce."
  },
  {
    name: "Classic Waffles",
    price: 12.99,
    img: "/src/assets/food888.jpg",
    category: "Breakfast",
    description: "Fluffy golden waffles served with a drizzle of maple syrup and fresh berries."
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bistro-bliss');
    console.log('MongoDB Connected for seeding...');

    // Clear collections
    await User.deleteMany();
    await MenuItem.deleteMany();
    await Booking.deleteMany();
    console.log('Cleared existing collections.');

    // Seed Users
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@bistro.com',
      password: 'admin123',
      role: 'admin',
      phone: '123-456-7890',
      address: '123 Main St, Bistro City'
    });

    const normalUser = await User.create({
      name: 'John Doe',
      email: 'john@mail.com',
      password: 'user123',
      role: 'user',
      phone: '987-654-3210',
      address: '456 Elm St, Bistro Town'
    });

    console.log('Seed users created successfully!');
    console.log('Admin Email: admin@bistro.com | Password: admin123');
    console.log('User Email: john@mail.com | Password: user123');

    // Seed Menu Items
    await MenuItem.insertMany(menuItems);
    console.log('Seed menu items inserted successfully!');

    mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedDB();

import React, { useState } from "react";

const menuItems = [
  {
    name: "Fried Eggs",
    price: 9.99,
    img: "/src/assets/food111.jpg",
    category: "Breakfast",
  },
  {
    name: "Hawaiian Pizza",
    price: 15.99,
    img: "/src/assets/food222.jpg",
    category: "Main Dishes",
  },
  {
    name: "Martinez Cocktail",
    price: 7.25,
    img: "/src/assets/food333.jpg",
    category: "Drinks",
  },
  {
    name: "Butterscotch Cake",
    price: 20.99,
    img: "/src/assets/food444.jpg",
    category: "Desserts",
  },
  {
    name: "Mint Lemonade",
    price: 5.89,
    img: "/src/assets/food555.jpg",
    category: "Drinks",
  },
  {
    name: "Chocolate Icecream",
    price: 18.05,
    img: "/src/assets/food666.jpg",
    category: "Desserts",
  },
  {
    name: "Cheese Burger",
    price: 12.55,
    img: "/src/assets/food777.jpg",
    category: "Main Dishes",
  },
  {
    name: "Classic Waffles",
    price: 12.99,
    img: "/src/assets/food888.jpg",
    category: "Breakfast",
  },
];

const categories = ["All", "Breakfast", "Main Dishes", "Drinks", "Desserts"];

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <section className="menu-section">
      <h2 className="menu-title">Our Menu</h2>
      <p className="menu-subtitle">
        We consider all the drivers of change gives you the components you need
        to change to create a truly happens.
      </p>

      <div className="menu-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {filteredItems.map((item, index) => (
          <div key={index} className="menu-card">
            <img src={item.img} alt={item.name} />
            <h3>${item.price.toFixed(2)}</h3>
            <p className="item-name">{item.name}</p>
            <p className="item-desc">
              Made with eggs, lettuce, salt, oil and other ingredients.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}






import React, { useState, useEffect } from "react";

const categories = ["All", "Breakfast", "Main Dishes", "Drinks", "Desserts"];

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/menu");
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError("Could not load menu items from server. Displaying offline menu.");
        // Fallback static items
        setMenuItems([
          { name: "Fried Eggs", price: 9.99, img: "/src/assets/food111.jpg", category: "Breakfast" },
          { name: "Hawaiian Pizza", price: 15.99, img: "/src/assets/food222.jpg", category: "Main Dishes" },
          { name: "Martinez Cocktail", price: 7.25, img: "/src/assets/food333.jpg", category: "Drinks" },
          { name: "Butterscotch Cake", price: 20.99, img: "/src/assets/food444.jpg", category: "Desserts" },
          { name: "Mint Lemonade", price: 5.89, img: "/src/assets/food555.jpg", category: "Drinks" },
          { name: "Chocolate Icecream", price: 18.05, img: "/src/assets/food666.jpg", category: "Desserts" },
          { name: "Cheese Burger", price: 12.55, img: "/src/assets/food777.jpg", category: "Main Dishes" },
          { name: "Classic Waffles", price: 12.99, img: "/src/assets/food888.jpg", category: "Breakfast" }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

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

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading Menu...</span>
          </div>
        </div>
      ) : (
        <>
          {error && <div className="text-center text-muted mb-4 small">{error}</div>}
          <div className="menu-grid">
            {filteredItems.map((item, index) => (
              <div key={item._id || index} className="menu-card animate-fade-in">
                <img src={item.img} alt={item.name} onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80";
                }} />
                <h3>${item.price.toFixed(2)}</h3>
                <p className="item-name">{item.name}</p>
                <p className="item-desc">
                  {item.description || "Made with eggs, lettuce, salt, oil and other ingredients."}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

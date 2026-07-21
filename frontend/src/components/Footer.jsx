import React from "react";
import { Link } from "react-router-dom";
import { UtensilsCrossed, Globe } from "lucide-react";
import food1 from "../assets/food1.jpg";
import food2 from "../assets/food2.jpg";
import food3 from "../assets/food3.jpg";
import food4 from "../assets/food4.jpg";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-8 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                Bistro Bliss
              </span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              In the new era of technology we look in the future with certainty 
              and pride for our company and fine dining experience.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors" aria-label="Website">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Pages Col */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wide">Pages</h3>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/menu" className="hover:text-white transition-colors">Menu</Link></li>
              <li><Link to="/pages" className="hover:text-white transition-colors">Blog & Articles</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/book-table" className="hover:text-white transition-colors">Book a Table</Link></li>
            </ul>
          </div>

          {/* Utility Pages Col */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wide">Utility Pages</h3>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li><a href="#" className="hover:text-white transition-colors">Start Here</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Styleguide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Password Protected</a></li>
              <li><a href="#" className="hover:text-white transition-colors">404 Not Found</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Licenses</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>

          {/* Instagram Grid Col */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wide">Follow Us On Instagram</h3>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="overflow-hidden rounded-lg aspect-square bg-neutral-800">
                <img src={food1} alt="Food 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="overflow-hidden rounded-lg aspect-square bg-neutral-800">
                <img src={food2} alt="Food 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="overflow-hidden rounded-lg aspect-square bg-neutral-800">
                <img src={food3} alt="Food 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="overflow-hidden rounded-lg aspect-square bg-neutral-800">
                <img src={food4} alt="Food 4" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800 text-center text-xs text-neutral-500">
          Copyright © 2026 Bistro Bliss. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

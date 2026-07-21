import React from "react";
import { Phone, Mail, Globe } from "lucide-react";

export default function Topbar() {
  return (
    <div className="bg-neutral-900 text-neutral-300 text-xs py-2 px-4 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-primary" />
            (414) 857 – 0107
          </span>
          <span className="hidden md:flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-primary" />
            yummy@bistrobliss.com
          </span>
        </div>
        <div className="flex items-center gap-4 text-neutral-400">
          <a href="#" className="hover:text-white transition-colors" aria-label="Website"><Globe className="w-3.5 h-3.5" /></a>
        </div>
      </div>
    </div>
  );
}

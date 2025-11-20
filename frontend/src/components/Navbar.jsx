import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Info } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold hover:text-blue-400 transition-colors">
          <Brain className="w-8 h-8 text-blue-500" />
          <span>NeuroScan AI</span>
        </Link>
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <Link to="/about" className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
            <Info className="w-4 h-4" />
            <span>About</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

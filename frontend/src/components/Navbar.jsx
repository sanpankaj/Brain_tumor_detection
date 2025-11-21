import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Info, History } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white p-4 shadow-lg border-b border-slate-800">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold hover:text-blue-400 transition-colors">
          <Brain className="w-8 h-8 text-blue-500" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            NeuroScan AI
          </span>
        </Link>
        <div className="flex space-x-6">
          <Link to="/" className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
            <span>Home</span>
          </Link>
          <Link to="/history" className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
            <History className="w-4 h-4" />
            <span>History</span>
          </Link>
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

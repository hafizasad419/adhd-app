import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Brain, Menu, X } from 'lucide-react';

const AuthHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md z-50">
      {/* Top Nav Row */}
      <div className="flex justify-between items-center px-6 md:px-12 py-4 relative">
        <div className="flex items-center space-x-2">
         <NavLink to="/" className="flex items-center space-x-2">
            <Brain className="w-10 h-10 text-c-zinc" />
          <h1 className="text-4xl font-bold text-c-zinc hidden md:block">ADHD Tracker</h1>
          </NavLink>
        </div>

        <div className="hidden md:flex space-x-4">
          <NavLink to="/signup" className="btn !px-10 btn-primary">
            Sign Up
          </NavLink>
          <NavLink to="/login" className="btn !px-10 btn-outline">
            Log In
          </NavLink>
        </div>

        {/* Hamburger Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            {menuOpen ? (
              <X className="w-10 h-10 text-c-zinc" />
            ) : (
              <Menu className="w-10 h-10 text-c-zinc" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 px-6 pt-6 pb-12">
          <NavLink
            to="/signup"
            className="btn btn-primary w-full text-center"
            onClick={() => setMenuOpen(false)}
          >
            Sign Up
          </NavLink>
          <NavLink
            to="/login"
            className="btn btn-outline w-full text-center"
            onClick={() => setMenuOpen(false)}
          >
            Log In
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default AuthHeader;

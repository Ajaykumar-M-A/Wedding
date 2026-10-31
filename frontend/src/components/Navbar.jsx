import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Menu, X, LayoutDashboard, LogOut, UserCircle } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar glass-dark">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          <Heart size={20} fill="#c9a96e" color="#c9a96e" />
          <span className="brand-text">Heartful <span className="text-gold">Weddings</span></span>
        </Link>

        <div className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          <Link to="/templates" className={`nav-link ${isActive('/templates') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
            Templates
          </Link>
          {user && (
            <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
              Dashboard
            </Link>
          )}
          <Link to="/create" className={`nav-link ${isActive('/create') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
            Create
          </Link>
        </div>

        <div className="navbar-actions">
          {user ? (
            <div className="user-menu">
              <button className="user-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <UserCircle size={20} />
                <span>{user.name.split(' ')[0]}</span>
              </button>
              {dropdownOpen && (
                <div className="user-dropdown glass">
                  <Link to="/dashboard" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  <button className="dropdown-item danger" onClick={handleLogout}>
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-ghost btn-sm">Sign In</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
            </div>
          )}
          <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

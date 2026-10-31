import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Eye, EyeOff, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import './AuthPage.css';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success("Account created! Let's create your first invitation 💍");
      navigate('/create');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg" />
      <div className="auth-card glass">
        <div className="auth-logo">
          <Heart size={32} fill="#c9a96e" color="#c9a96e" />
        </div>
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle text-secondary">Start crafting unforgettable invitations</p>

        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" type="text" name="name" placeholder="Your name"
              value={form.name} onChange={handle} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" name="email" placeholder="you@example.com"
              value={form.email} onChange={handle} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-icon-wrap">
              <input className="form-input" type={showPass ? 'text' : 'password'} name="password"
                placeholder="Min. 6 characters" value={form.password} onChange={handle} required />
              <button type="button" className="eye-btn" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button className="btn btn-primary btn-lg auth-submit" type="submit" disabled={loading}>
            {loading ? <span className="spinner" style={{ width: 20, height: 20 }} /> : <><Sparkles size={16} /> Create Account</>}
          </button>
        </form>

        <p className="auth-switch text-secondary">
          Already have an account? <Link to="/login" className="text-gold">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

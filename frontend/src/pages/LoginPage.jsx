import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Eye, EyeOff, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import './AuthPage.css';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back! 💍');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Login failed');
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
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle text-secondary">Sign in to manage your beautiful invitations</p>

        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" name="email" placeholder="you@example.com"
              value={form.email} onChange={handle} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-icon-wrap">
              <input className="form-input" type={showPass ? 'text' : 'password'} name="password"
                placeholder="••••••••" value={form.password} onChange={handle} required />
              <button type="button" className="eye-btn" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button className="btn btn-primary btn-lg auth-submit" type="submit" disabled={loading}>
            {loading ? <span className="spinner" style={{ width: 20, height: 20 }} /> : <><Sparkles size={16} /> Sign In</>}
          </button>
        </form>

        <p className="auth-switch text-secondary">
          No account? <Link to="/register" className="text-gold">Create one free</Link>
        </p>
      </div>
    </div>
  );
}

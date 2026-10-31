import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { guestsAPI } from '../api';
import { Heart, CheckCircle, Users, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import './RSVPPage.css';

export default function RSVPPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    guest_name: '', guest_email: '', attending: true,
    number_of_guests: 1, meal_preference: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.guest_name.trim()) { toast.error('Please enter your name'); return; }
    setLoading(true);
    try {
      await guestsAPI.submitRSVP(token, form);
      setSubmitted(true);
    } catch (err) {
      toast.error(err.response?.data?.detail || 'RSVP failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return (
    <div className="rsvp-success">
      <div className="rsvp-success-card glass animate-fadeInUp">
        <CheckCircle size={56} className="text-gold animate-float" />
        <h2>RSVP Submitted! 🎊</h2>
        <p className="text-secondary">
          {form.attending
            ? `Thank you, ${form.guest_name}! We're excited to celebrate with you. 💍`
            : `Thank you, ${form.guest_name}. Your response has been noted.`}
        </p>
        <Link to={`/invitation/${token}`} className="btn btn-primary">
          View Invitation
        </Link>
      </div>
    </div>
  );

  return (
    <div className="rsvp-page">
      <div className="container">
        <div className="rsvp-card glass animate-fadeInUp">
          <div className="rsvp-header">
            <Heart size={28} fill="#c9a96e" color="#c9a96e" />
            <h1 className="rsvp-title">Kindly RSVP</h1>
            <p className="text-secondary">Please let the couple know if you'll be joining the celebration</p>
          </div>

          <form onSubmit={submit} className="rsvp-form">
            <div className="form-group">
              <label className="form-label">Your Full Name *</label>
              <input className="form-input" value={form.guest_name}
                onChange={e => handle('guest_name', e.target.value)} placeholder="Enter your name" required />
            </div>

            <div className="form-group">
              <label className="form-label">Email (Optional)</label>
              <input className="form-input" type="email" value={form.guest_email}
                onChange={e => handle('guest_email', e.target.value)} placeholder="your@email.com" />
            </div>

            <div className="form-group">
              <label className="form-label">Will you be attending?</label>
              <div className="attend-toggle">
                <button type="button"
                  className={`attend-btn ${form.attending ? 'attend-yes' : ''}`}
                  onClick={() => handle('attending', true)}>
                  <Heart size={16} /> Joyfully Accepts
                </button>
                <button type="button"
                  className={`attend-btn ${!form.attending ? 'attend-no' : ''}`}
                  onClick={() => handle('attending', false)}>
                  Regretfully Declines
                </button>
              </div>
            </div>

            {form.attending && (
              <>
                <div className="form-group">
                  <label className="form-label">Number of Guests</label>
                  <div className="counter">
                    <button type="button" className="btn btn-ghost btn-sm"
                      onClick={() => handle('number_of_guests', Math.max(1, form.number_of_guests - 1))}>−</button>
                    <span className="counter-val">{form.number_of_guests}</span>
                    <button type="button" className="btn btn-ghost btn-sm"
                      onClick={() => handle('number_of_guests', Math.min(10, form.number_of_guests + 1))}>+</button>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Meal Preference</label>
                  <select className="form-select" value={form.meal_preference} onChange={e => handle('meal_preference', e.target.value)}>
                    <option value="">No preference</option>
                    <option>Vegetarian</option>
                    <option>Non-Vegetarian</option>
                    <option>Vegan</option>
                    <option>Jain</option>
                  </select>
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">Message for the Couple (Optional)</label>
              <textarea className="form-textarea" value={form.message}
                onChange={e => handle('message', e.target.value)}
                placeholder="Share your warm wishes..." />
            </div>

            <button type="submit" className="btn btn-primary btn-lg rsvp-submit" disabled={loading}>
              {loading ? <span className="spinner" style={{ width: 20, height: 20 }} /> : <><Heart size={16} /> Submit RSVP</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

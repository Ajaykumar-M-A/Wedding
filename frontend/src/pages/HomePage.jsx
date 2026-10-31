import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Link2, Users, Star, ArrowRight, CheckCircle } from 'lucide-react';
import './HomePage.css';

const FEATURES = [
  { icon: <Sparkles size={24} />, title: '22 Premium Templates', desc: 'From floral romance to royal gold — every style for every love story.' },
  { icon: <Heart size={24} />, title: 'Fully Personalised', desc: 'Add your photos, couple names, venue, date and custom colors.' },
  { icon: <Link2 size={24} />, title: 'Instant Shareable Link', desc: 'One unique link for all your guests. Share via WhatsApp or anywhere.' },
  { icon: <Users size={24} />, title: 'Online RSVP', desc: 'Guests can confirm attendance and leave heartfelt messages.' },
];

const TEMPLATE_PREVIEWS = [
  { name: 'Floral Romance', colors: ['#f9d4d4', '#c9a96e'], emoji: '🌸' },
  { name: 'Royal Gold', colors: ['#0a0a2e', '#c9a96e'], emoji: '👑' },
  { name: 'South Indian', colors: ['#8b0000', '#c9a96e'], emoji: '🪷' },
  { name: 'Beach Sunset', colors: ['#ff7f50', '#20b2aa'], emoji: '🌅' },
  { name: 'Art Deco', colors: ['#1a1a1a', '#f5e6a3'], emoji: '✨' },
  { name: 'Cherry Blossom', colors: ['#ffb7c5', '#fff'], emoji: '🌺' },
];

function TemplatePreviewCard({ tmpl }) {
  return (
    <div className="preview-card" style={{ background: `linear-gradient(135deg, ${tmpl.colors[0]}, ${tmpl.colors[1]})` }}>
      <div className="preview-emoji">{tmpl.emoji}</div>
      <div className="preview-name">{tmpl.name}</div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero hero-bg">
        <div className="hero-particles" aria-hidden />
        <div className="container">
          <div className="hero-content animate-fadeInUp">
            <div className="hero-badge badge badge-gold">
              <Sparkles size={12} /> Digital Wedding Invitations
            </div>
            <h1 className="hero-title">
              Create <span className="gradient-text">Magical</span><br />
              Wedding Invitations
            </h1>
            <p className="hero-desc text-secondary">
              Design stunning digital invitations with 22 premium templates. Personalise with your photos,
              share a unique link with guests, and collect RSVPs instantly — all without printing a single card.
            </p>
            <div className="hero-ctas">
              <Link to="/templates" className="btn btn-primary btn-lg">
                <Sparkles size={18} /> Browse Templates
              </Link>
              <Link to="/register" className="btn btn-outline btn-lg">
                Start Free <ArrowRight size={18} />
              </Link>
            </div>
            <div className="hero-stats">
              {[['22+', 'Templates'], ['100%', 'Free to Start'], ['Instant', 'Shareable Link']].map(([n, l]) => (
                <div key={l} className="hero-stat">
                  <span className="hero-stat-num text-gold">{n}</span>
                  <span className="hero-stat-label text-muted">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating template previews */}
        <div className="hero-previews" aria-hidden>
          {TEMPLATE_PREVIEWS.map((t, i) => (
            <div key={t.name} className="preview-float" style={{ animationDelay: `${i * 0.4}s` }}>
              <TemplatePreviewCard tmpl={t} />
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-ornament"><Star size={14} className="text-gold" /></div>
            <h2 className="section-title">Everything You Need</h2>
            <p className="section-desc text-secondary">A complete platform to create, share, and celebrate your love</p>
          </div>
          <div className="features-grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="feature-card card">
                <div className="feature-icon text-gold">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc text-secondary">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <div className="section-ornament"><Heart size={14} className="text-gold" /></div>
            <h2 className="section-title">How It Works</h2>
          </div>
          <div className="steps-grid">
            {[
              { num: '01', title: 'Choose a Template', desc: 'Browse 22 stunning designs from traditional to modern.' },
              { num: '02', title: 'Personalise It', desc: 'Add your names, date, venue, photos and custom colors.' },
              { num: '03', title: 'Share the Link', desc: 'Send your unique invitation link to all your guests.' },
              { num: '04', title: 'Collect RSVPs', desc: "Track who's coming right from your dashboard." },
            ].map((s) => (
              <div key={s.num} className="step-item">
                <div className="step-num gradient-text">{s.num}</div>
                <h4 className="step-title">{s.title}</h4>
                <p className="step-desc text-secondary">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-card glass">
            <Heart size={40} fill="#c9a96e" color="#c9a96e" className="animate-float" />
            <h2 className="cta-title">Ready to Create Your Dream Invitation?</h2>
            <p className="text-secondary">Join hundreds of couples sharing their love story digitally.</p>
            <Link to="/register" className="btn btn-primary btn-lg">
              <Sparkles size={18} /> Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="text-muted" style={{ textAlign: 'center', fontSize: '0.85rem' }}>
            © 2024 Heartful Weddings · Made with <Heart size={12} fill="#c9a96e" color="#c9a96e" style={{ display: 'inline', margin: '0 2px' }} /> for every love story
          </p>
        </div>
      </footer>
    </div>
  );
}

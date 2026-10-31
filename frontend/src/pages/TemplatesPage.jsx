import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { templatesAPI } from '../api';
import { Search, Filter, Sparkles, ArrowRight } from 'lucide-react';
import './TemplatesPage.css';

const CATEGORIES = ['All', 'Romantic', 'Luxury', 'Traditional', 'Modern', 'Nature', 'Exotic', 'Vintage', 'Artistic', 'Asian', 'Tropical', 'Fantasy', 'Classic'];

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    templatesAPI.getAll()
      .then(r => { setTemplates(r.data); setFiltered(r.data); })
      .catch(() => setTemplates([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let list = templates;
    if (category !== 'All') list = list.filter(t => t.category === category);
    if (search) list = list.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));
    setFiltered(list);
  }, [category, search, templates]);

  const EMOJI_MAP = {
    'floral-romance': '🌸', 'royal-gold': '👑', 'rustic-boho': '🌾', 'modern-minimal': '⬜',
    'garden-bloom': '🌿', 'vintage-lace': '🪡', 'south-indian': '🪷', 'north-indian': '🎨',
    'celestial-starry': '⭐', 'beach-sunset': '🌅', 'art-deco': '✨', 'pastel-dreamy': '🦋',
    'black-tie': '🎩', 'watercolor-whimsy': '🎨', 'cherry-blossom': '🌸', 'emerald-forest': '🌲',
    'moroccan-luxe': '🕌', 'red-gold-festive': '🪔', 'purple-royale': '💜', 'ivory-pearl': '🤍',
    'teal-breeze': '🌊', 'burgundy-blossom': '🌹'
  };

  return (
    <div className="templates-page">
      <div className="templates-hero">
        <div className="container">
          <div className="section-ornament"><Sparkles size={14} className="text-gold" /></div>
          <h1 className="templates-title">Choose Your <span className="gradient-text">Perfect Template</span></h1>
          <p className="templates-desc text-secondary">22 premium, fully customisable wedding invitation designs</p>

          <div className="templates-search-bar glass">
            <Search size={18} className="text-muted" />
            <input type="text" placeholder="Search templates..." className="search-input"
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="container">
        {/* Category filter */}
        <div className="category-chips">
          {CATEGORIES.map(cat => (
            <button key={cat} className={`chip ${category === cat ? 'chip-active' : ''}`}
              onClick={() => setCategory(cat)}>{cat}</button>
          ))}
        </div>

        {loading ? (
          <div className="templates-loading">
            <div className="spinner" />
            <p className="text-muted">Loading templates...</p>
          </div>
        ) : (
          <>
            <p className="templates-count text-muted">{filtered.length} template{filtered.length !== 1 ? 's' : ''}</p>
            <div className="templates-grid">
              {filtered.map((t, i) => (
                <div key={t.id} className="template-card animate-fadeInUp" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="template-preview" style={{
                    background: `linear-gradient(135deg, ${t.colors[0]} 0%, ${t.colors[1]} 100%)`
                  }}>
                    <div className="template-preview-emoji">{EMOJI_MAP[t.id] || '💍'}</div>
                    <div className="template-overlay">
                      <Link to={`/create?template=${t.id}`} className="btn btn-primary btn-sm">
                        Use Template <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                  <div className="template-info">
                    <div>
                      <h3 className="template-name">{t.name}</h3>
                      <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>{t.category}</span>
                    </div>
                    <div className="template-colors">
                      {t.colors.map(c => (
                        <div key={c} className="color-dot" style={{ background: c }} title={c} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="no-results">
                <p className="text-muted">No templates match your search.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

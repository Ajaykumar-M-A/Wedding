import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { invitationsAPI, photosAPI, templatesAPI } from '../api';
import { PhotoUploader } from '../components/PhotoUploader';
import TemplateRenderer from '../components/TemplateRenderer';
import { Save, Send, Eye, ChevronLeft, ChevronRight, Palette } from 'lucide-react';
import toast from 'react-hot-toast';
import './EditorPage.css';

const DEFAULT_DETAILS = {
  bride_name: '', groom_name: '', wedding_date: '', wedding_time: '',
  venue_name: '', venue_address: '', ceremony_time: '', reception_time: '',
  hashtag: '', message: '', bride_photo: null, groom_photo: null,
  couple_photo: null, banner_photo: null,
  primary_color: '#c9a96e', secondary_color: '#f5e6d3', font_family: 'Cormorant Garamond',
};

const TABS = ['Details', 'Venue', 'Photos', 'Style'];

export default function CreatePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(searchParams.get('template') || 'floral-romance');
  const [title, setTitle] = useState('Our Wedding Invitation');
  const [details, setDetails] = useState(DEFAULT_DETAILS);
  const [tab, setTab] = useState(0);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    templatesAPI.getAll().then(r => setTemplates(r.data)).catch(() => {});
  }, []);

  const handleDetail = (key, val) => setDetails(prev => ({ ...prev, [key]: val }));

  const handlePhotoUpload = async (key, file) => {
    if (!file) {
      handleDetail(key, null);
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    const loadingId = toast.loading('Uploading photo...');
    try {
      const { data } = await photosAPI.upload(formData);
      handleDetail(key, data.filename);
      toast.success('Photo uploaded!', { id: loadingId });
    } catch {
      toast.error('Upload failed', { id: loadingId });
    }
  };

  const handleSave = async (publish = false) => {
    setSaving(true);
    try {
      const { data } = await invitationsAPI.create({
        title,
        template_id: selectedTemplate,
        couple_details: details,
        is_published: publish,
      });
      toast.success(publish ? '🎉 Published! Share the link with your guests.' : '💾 Saved as draft!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="editor-page">
      {/* Top bar */}
      <div className="editor-topbar glass-dark">
        <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)}>
          <ChevronLeft size={16} /> Back
        </button>
        <input
          className="editor-title-input"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Invitation Title..."
        />
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => setShowPreview(!showPreview)}>
            <Eye size={16} /> {showPreview ? 'Edit' : 'Preview'}
          </button>
          <button className="btn btn-ghost btn-sm" disabled={saving} onClick={() => handleSave(false)}>
            <Save size={16} /> Save Draft
          </button>
          <button className="btn btn-primary btn-sm" disabled={saving} onClick={() => handleSave(true)}>
            <Send size={16} /> Publish
          </button>
        </div>
      </div>

      <div className={`editor-body ${showPreview ? 'preview-mode' : ''}`}>
        {/* Left Panel: Form */}
        {!showPreview && (
          <div className="editor-panel">
            {/* Template selector */}
            <div className="editor-section">
              <h3 className="editor-section-title"><Palette size={16} /> Choose Template</h3>
              <div className="template-picker">
                {templates.map(t => (
                  <button key={t.id}
                    className={`template-pick-btn ${selectedTemplate === t.id ? 'selected' : ''}`}
                    onClick={() => setSelectedTemplate(t.id)}
                    title={t.name}
                    style={{ background: `linear-gradient(135deg, ${t.colors[0]}, ${t.colors[1]})` }}
                  >
                    {selectedTemplate === t.id && <span className="check">✓</span>}
                  </button>
                ))}
              </div>
              <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: 8 }}>
                Selected: <span className="text-gold">{templates.find(t => t.id === selectedTemplate)?.name || selectedTemplate}</span>
              </p>
            </div>

            {/* Tabs */}
            <div className="editor-tabs">
              {TABS.map((t, i) => (
                <button key={t} className={`editor-tab ${tab === i ? 'active' : ''}`} onClick={() => setTab(i)}>{t}</button>
              ))}
            </div>

            {/* Tab: Details */}
            {tab === 0 && (
              <div className="editor-form-tab">
                <div className="form-group">
                  <label className="form-label">Bride's Name</label>
                  <input className="form-input" value={details.bride_name} onChange={e => handleDetail('bride_name', e.target.value)} placeholder="e.g. Priya" />
                </div>
                <div className="form-group">
                  <label className="form-label">Groom's Name</label>
                  <input className="form-input" value={details.groom_name} onChange={e => handleDetail('groom_name', e.target.value)} placeholder="e.g. Arjun" />
                </div>
                <div className="form-group">
                  <label className="form-label">Wedding Date</label>
                  <input className="form-input" type="date" value={details.wedding_date} onChange={e => handleDetail('wedding_date', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Wedding Time</label>
                  <input className="form-input" type="time" value={details.wedding_time} onChange={e => handleDetail('wedding_time', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Wedding Hashtag</label>
                  <input className="form-input" value={details.hashtag} onChange={e => handleDetail('hashtag', e.target.value)} placeholder="#PriyaWedArjun" />
                </div>
                <div className="form-group">
                  <label className="form-label">Personal Message</label>
                  <textarea className="form-textarea" value={details.message} onChange={e => handleDetail('message', e.target.value)} placeholder="A heartfelt message to your guests..." />
                </div>
              </div>
            )}

            {/* Tab: Venue */}
            {tab === 1 && (
              <div className="editor-form-tab">
                <div className="form-group">
                  <label className="form-label">Venue Name</label>
                  <input className="form-input" value={details.venue_name} onChange={e => handleDetail('venue_name', e.target.value)} placeholder="e.g. The Grand Palace" />
                </div>
                <div className="form-group">
                  <label className="form-label">Venue Address</label>
                  <textarea className="form-textarea" value={details.venue_address} onChange={e => handleDetail('venue_address', e.target.value)} placeholder="123 Main Street, City..." style={{ minHeight: 80 }} />
                </div>
                <div className="form-group">
                  <label className="form-label">Ceremony Time</label>
                  <input className="form-input" type="time" value={details.ceremony_time} onChange={e => handleDetail('ceremony_time', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Reception Time</label>
                  <input className="form-input" type="time" value={details.reception_time} onChange={e => handleDetail('reception_time', e.target.value)} />
                </div>
              </div>
            )}

            {/* Tab: Photos */}
            {tab === 2 && (
              <div className="editor-form-tab">
                <p className="text-secondary" style={{ fontSize: '0.85rem', marginBottom: 16 }}>
                  Upload your photos. They'll appear on the invitation template.
                </p>
                {[
                  { key: 'couple_photo', label: 'Couple Photo (Main)' },
                  { key: 'bride_photo', label: "Bride's Photo" },
                  { key: 'groom_photo', label: "Groom's Photo" },
                  { key: 'banner_photo', label: 'Banner / Background Photo' },
                ].map(({ key, label }) => (
                  <div key={key} className="form-group">
                    <label className="form-label">{label}</label>
                    <PhotoUploader
                      value={details[key]}
                      onChange={(file) => handlePhotoUpload(key, file)}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Style */}
            {tab === 3 && (
              <div className="editor-form-tab">
                <div className="form-group">
                  <label className="form-label">Primary Color</label>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <input type="color" value={details.primary_color} onChange={e => handleDetail('primary_color', e.target.value)} style={{ width: 48, height: 40, border: 'none', borderRadius: 8, cursor: 'pointer', background: 'none' }} />
                    <input className="form-input" value={details.primary_color} onChange={e => handleDetail('primary_color', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Secondary Color</label>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <input type="color" value={details.secondary_color} onChange={e => handleDetail('secondary_color', e.target.value)} style={{ width: 48, height: 40, border: 'none', borderRadius: 8, cursor: 'pointer', background: 'none' }} />
                    <input className="form-input" value={details.secondary_color} onChange={e => handleDetail('secondary_color', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Font Family</label>
                  <select className="form-select" value={details.font_family} onChange={e => handleDetail('font_family', e.target.value)}>
                    <option>Cormorant Garamond</option>
                    <option>Playfair Display</option>
                    <option>Great Vibes</option>
                    <option>Dancing Script</option>
                    <option>Cinzel</option>
                    <option>Inter</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Right Panel: Live Preview */}
        <div className={`editor-preview ${showPreview ? 'full-preview' : ''}`}>
          <div className="preview-header text-muted">Live Preview</div>
          <div className="preview-scroll">
            <TemplateRenderer templateId={selectedTemplate} data={details} />
          </div>
        </div>
      </div>
    </div>
  );
}

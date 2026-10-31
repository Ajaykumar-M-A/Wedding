import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { invitationsAPI, guestsAPI } from '../api';
import { Plus, Edit2, Trash2, Share2, Copy, Eye, Users, Heart, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import './DashboardPage.css';

export default function DashboardPage() {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    invitationsAPI.getAll()
      .then(r => setInvitations(r.data))
      .catch(() => toast.error('Failed to load invitations'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this invitation? This cannot be undone.')) return;
    try {
      await invitationsAPI.delete(id);
      setInvitations(inv => inv.filter(i => i.id !== id));
      toast.success('Invitation deleted');
    } catch {
      toast.error('Could not delete invitation');
    }
  };

  const copyLink = (token) => {
    const url = `${window.location.origin}/invitation/${token}`;
    navigator.clipboard.writeText(url);
    toast.success('Guest link copied! 🔗');
  };

  const togglePublish = async (inv) => {
    try {
      const updated = await invitationsAPI.update(inv.id, { is_published: !inv.is_published });
      setInvitations(list => list.map(i => i.id === inv.id ? updated.data : i));
      toast.success(updated.data.is_published ? '🎉 Invitation published!' : 'Invitation set to draft');
    } catch {
      toast.error('Update failed');
    }
  };

  if (loading) return (
    <div className="dashboard-loading">
      <div className="spinner" />
      <p className="text-muted">Loading your invitations...</p>
    </div>
  );

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">My Invitations</h1>
            <p className="text-secondary">{invitations.length} invitation{invitations.length !== 1 ? 's' : ''} created</p>
          </div>
          <Link to="/create" className="btn btn-primary">
            <Plus size={18} /> New Invitation
          </Link>
        </div>

        {invitations.length === 0 ? (
          <div className="dashboard-empty card">
            <Heart size={48} className="text-gold animate-float" />
            <h2>No invitations yet</h2>
            <p className="text-secondary">Create your first stunning wedding invitation</p>
            <Link to="/create" className="btn btn-primary">
              <Sparkles size={16} /> Create Now
            </Link>
          </div>
        ) : (
          <div className="invitations-grid">
            {invitations.map((inv) => (
              <div key={inv.id} className="inv-card card">
                <div className="inv-card-header">
                  <div className="inv-card-info">
                    <h3 className="inv-title">{inv.title}</h3>
                    <p className="inv-couple text-secondary">
                      {inv.couple_details?.groom_name || 'Groom'} & {inv.couple_details?.bride_name || 'Bride'}
                    </p>
                  </div>
                  <span className={`badge ${inv.is_published ? 'badge-green' : 'badge-red'}`}>
                    {inv.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>

                <div className="inv-meta">
                  <span className="text-muted" style={{ fontSize: '0.82rem' }}>
                    📅 {inv.couple_details?.wedding_date || 'Date not set'}
                  </span>
                  <span className="text-muted" style={{ fontSize: '0.82rem' }}>
                    <Users size={12} style={{ display: 'inline', marginRight: 4 }} />
                    {inv.rsvp_count} RSVPs
                  </span>
                </div>

                <div className="divider" style={{ margin: '16px 0' }} />

                <div className="inv-actions">
                  <button className="btn btn-ghost btn-sm" onClick={() => navigate(`/edit/${inv.id}`)}>
                    <Edit2 size={14} /> Edit
                  </button>
                  <Link to={`/invitation/${inv.guest_token}`} target="_blank" className="btn btn-ghost btn-sm">
                    <Eye size={14} /> Preview
                  </Link>
                  <button className="btn btn-ghost btn-sm" onClick={() => copyLink(inv.guest_token)}>
                    <Copy size={14} /> Copy Link
                  </button>
                  <button
                    className={`btn btn-sm ${inv.is_published ? 'btn-ghost' : 'btn-primary'}`}
                    onClick={() => togglePublish(inv)}
                  >
                    {inv.is_published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(inv.id)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

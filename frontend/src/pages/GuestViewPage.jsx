import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { invitationsAPI } from '../api';
import TemplateRenderer from '../components/TemplateRenderer';
import { Heart, Share2, Copy, MessageCircle, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import './GuestViewPage.css';

export default function GuestViewPage() {
  const { token } = useParams();
  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    invitationsAPI.getByToken(token)
      .then(r => setInvitation(r.data))
      .catch(() => setInvitation(null))
      .finally(() => setLoading(false));
  }, [token]);

  const share = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: invitation?.title, url });
    } else {
      navigator.clipboard.writeText(url);
      toast.success('Link copied! Share with your guests 🔗');
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: 16 }}>
      <div className="spinner" />
      <p className="text-muted">Loading your invitation...</p>
    </div>
  );

  if (!invitation) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: 16, textAlign: 'center' }}>
      <Heart size={48} className="text-gold" />
      <h2>Invitation Not Found</h2>
      <p className="text-secondary">This invitation may not be published yet or the link is incorrect.</p>
      <Link to="/" className="btn btn-primary">Go Home</Link>
    </div>
  );

  return (
    <div className="guest-view">
      <div className="guest-view-inner">
        <TemplateRenderer templateId={invitation.template_id} data={invitation.couple_details} />
      </div>

      {/* RSVP CTA */}
      <div className="rsvp-cta glass-dark">
        <div className="container rsvp-cta-inner">
          <div>
            <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.3rem' }}>
              <Heart size={16} fill="#c9a96e" color="#c9a96e" style={{ display: 'inline', marginRight: 8 }} />
              Kindly confirm your attendance
            </h3>
            <p className="text-secondary" style={{ fontSize: '0.9rem' }}>Let the couple know you'll be there</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn-ghost btn-sm" onClick={share}>
              <Share2 size={16} /> Share
            </button>
            <Link to={`/invitation/${token}/rsvp`} className="btn btn-primary">
              RSVP Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

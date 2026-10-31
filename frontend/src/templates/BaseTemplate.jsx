import React from 'react';
import { photosAPI } from '../api';
import { formatDate, formatTime } from './helpers';
import { Calendar, Clock, MapPin, ExternalLink, Heart } from 'lucide-react';
import './templates.css';

export default function BaseTemplate({
  data = {},
  theme = {},
}) {
  const {
    bride_name = 'Bride',
    groom_name = 'Groom',
    wedding_date = '',
    wedding_time = '',
    venue_name = 'The Grand Ballroom',
    venue_address = '',
    ceremony_time = '',
    reception_time = '',
    hashtag = '',
    message = '',
    couple_photo,
    bride_photo,
    groom_photo,
    banner_photo,
    primary_color,
    secondary_color,
    font_family,
  } = data;

  const {
    id = 'floral-romance',
    name = 'Wedding Invitation',
    themeClass = 'floral-romance',
    defaultPrimary = '#c9a96e',
    defaultSecondary = '#f9d4d4',
    defaultFont = 'Cormorant Garamond',
    corners = ['🌸', '🌹', '🌺', '🌸'],
    divider = '— ❀ —',
    emblem = '💍',
    subtitle = 'Together with their families',
    footerText = 'We look forward to celebrating with you',
    darkTheme = false,
  } = theme;

  const primary = primary_color || defaultPrimary;
  const secondary = secondary_color || defaultSecondary;
  const font = font_family || defaultFont;

  const googleMapsUrl = (venue_name || venue_address)
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([venue_name, venue_address].filter(Boolean).join(', '))}`
    : null;

  // Calendar event URL
  const calendarTitle = encodeURIComponent(`Wedding of ${groom_name} & ${bride_name}`);
  const calendarLocation = encodeURIComponent([venue_name, venue_address].filter(Boolean).join(', '));
  const calendarDetails = encodeURIComponent(`Wedding celebration of ${groom_name} & ${bride_name}. ${hashtag ? 'Tag: ' + hashtag : ''}`);
  
  let calendarDateStr = '';
  if (wedding_date) {
    const dClean = wedding_date.replace(/-/g, '');
    const tClean = wedding_time ? wedding_time.replace(/:/g, '') + '00' : '100000';
    calendarDateStr = `${dClean}T${tClean}/${dClean}T235959`;
  }
  const googleCalUrl = wedding_date
    ? `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calendarTitle}&dates=${calendarDateStr}&details=${calendarDetails}&location=${calendarLocation}`
    : null;

  return (
    <div
      className={`template-wrap ${themeClass} ${darkTheme ? 'theme-dark' : 'theme-light'}`}
      style={{
        fontFamily: `'${font}', serif`,
        '--tmpl-primary': primary,
        '--tmpl-secondary': secondary,
      }}
    >
      {/* Banner / Header */}
      <div
        className={`tmpl-banner ${banner_photo ? 'tmpl-banner-has-photo' : ''}`}
        style={
          banner_photo
            ? {
                backgroundImage: `url(${photosAPI.getUrl(banner_photo)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
              }
            : {
                background: `linear-gradient(135deg, ${secondary}, ${darkTheme ? '#0b0b18' : '#ffffff'})`,
              }
        }
      >
        {/* Dark scrim so text is always legible over photos */}
        <div className={`tmpl-banner-overlay ${banner_photo ? 'tmpl-overlay-photo' : ''}`} />

        <div className="tmpl-corner tmpl-tl">{corners[0]}</div>
        <div className="tmpl-corner tmpl-tr">{corners[1]}</div>
        <div className="tmpl-corner tmpl-bl">{corners[2]}</div>
        <div className="tmpl-corner tmpl-br">{corners[3]}</div>

        <div className="tmpl-banner-content">
          <div className="tmpl-emblem">{emblem}</div>
          <p
            className="tmpl-subtitle"
            style={{ color: banner_photo ? '#ffffff' : primary }}
          >
            {subtitle}
          </p>
          <h1
            className="tmpl-names"
            style={{ color: banner_photo ? '#ffffff' : 'inherit', textShadow: banner_photo ? '0 2px 12px rgba(0,0,0,0.6)' : 'none' }}
          >
            <span>{groom_name}</span>
            <span
              className="tmpl-ampersand"
              style={{ color: banner_photo ? '#f5d98e' : primary }}
            >
              {' '}&{' '}
            </span>
            <span>{bride_name}</span>
          </h1>
          <p
            className="tmpl-invite-phrase"
            style={{ color: banner_photo ? 'rgba(255,255,255,0.9)' : 'inherit', textShadow: banner_photo ? '0 1px 6px rgba(0,0,0,0.5)' : 'none' }}
          >
            joyfully request the pleasure of your company to celebrate their wedding
          </p>
        </div>
      </div>

      {/* Individual Bride / Groom Photos */}
      {(bride_photo || groom_photo) && (
        <div className="tmpl-portraits-row">
          {groom_photo && (
            <div className="tmpl-portrait-wrap">
              <div className="tmpl-portrait-circle" style={{ borderColor: primary }}>
                <img src={photosAPI.getUrl(groom_photo)} alt={groom_name} />
              </div>
              <span className="tmpl-portrait-name" style={{ color: primary }}>{groom_name}</span>
              <span className="tmpl-portrait-role">The Groom</span>
            </div>
          )}

          <div className="tmpl-portrait-heart" style={{ color: primary }}>
            <Heart size={28} fill={primary} />
          </div>

          {bride_photo && (
            <div className="tmpl-portrait-wrap">
              <div className="tmpl-portrait-circle" style={{ borderColor: primary }}>
                <img src={photosAPI.getUrl(bride_photo)} alt={bride_name} />
              </div>
              <span className="tmpl-portrait-name" style={{ color: primary }}>{bride_name}</span>
              <span className="tmpl-portrait-role">The Bride</span>
            </div>
          )}
        </div>
      )}

      {/* Featured Couple Photo */}
      {couple_photo && (
        <div className="tmpl-couple-photo-box">
          <p className="tmpl-section-tag" style={{ textAlign: 'center', paddingTop: 8 }}>OUR STORY</p>
          <div className="tmpl-couple-frame" style={{ borderColor: primary }}>
            <img
              src={photosAPI.getUrl(couple_photo)}
              alt={`${groom_name} & ${bride_name}`}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <p
            className="tmpl-invite-phrase"
            style={{ textAlign: 'center', marginTop: 10, color: primary, fontStyle: 'italic', fontSize: '1rem' }}
          >
            {groom_name} &amp; {bride_name}
          </p>
        </div>
      )}

      {/* Date & Time Section */}
      <div
        className="tmpl-section tmpl-date-card"
        style={{
          background: darkTheme
            ? `linear-gradient(135deg, ${primary}15, ${primary}05)`
            : `linear-gradient(135deg, ${secondary}35, ${secondary}12)`,
          borderBottom: `1px solid ${primary}20`,
        }}
      >
        <div className="tmpl-divider" style={{ color: primary }}>{divider}</div>
        <p className="tmpl-section-tag">SAVE THE DATE</p>
        <h2 className="tmpl-date-text" style={{ color: primary }}>
          {formatDate(wedding_date)}
        </h2>
        {wedding_time && (
          <p className="tmpl-time-text">
            <Clock size={16} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
            {formatTime(wedding_time)}
          </p>
        )}
        {googleCalUrl && (
          <a
            href={googleCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tmpl-cal-btn"
            style={{ borderColor: `${primary}55`, color: primary }}
          >
            <Calendar size={14} /> Add to Calendar
          </a>
        )}
      </div>

      {/* Venue Section — always shown with guaranteed readable styling */}
      <div
        className="tmpl-section tmpl-venue-card"
        style={{
          background: darkTheme
            ? `linear-gradient(135deg, ${primary}18, ${primary}08)`
            : `linear-gradient(135deg, ${secondary}28, ${secondary}10)`,
          borderTop: `1px solid ${primary}30`,
          borderBottom: `1px solid ${primary}20`,
        }}
      >
        <div className="tmpl-divider" style={{ color: primary }}>{divider}</div>
        <p className="tmpl-section-tag">CEREMONY &amp; VENUE</p>

        <div className="tmpl-venue-icon" style={{ color: primary }}>📍</div>
        <h3 className="tmpl-venue-title" style={{ color: primary }}>
          {venue_name || 'Venue To Be Announced'}
        </h3>
        {venue_address && (
          <p className="tmpl-venue-address">{venue_address}</p>
        )}

        {(ceremony_time || reception_time) && (
          <div className="tmpl-events-grid">
            {ceremony_time && (
              <div
                className="tmpl-event-item"
                style={{
                  borderColor: `${primary}40`,
                  background: darkTheme ? `${primary}12` : `${primary}08`,
                }}
              >
                <span className="tmpl-event-label">🕯 CEREMONY</span>
                <span className="tmpl-event-time" style={{ color: primary }}>
                  {formatTime(ceremony_time)}
                </span>
              </div>
            )}
            {reception_time && (
              <div
                className="tmpl-event-item"
                style={{
                  borderColor: `${primary}40`,
                  background: darkTheme ? `${primary}12` : `${primary}08`,
                }}
              >
                <span className="tmpl-event-label">🥂 RECEPTION</span>
                <span className="tmpl-event-time" style={{ color: primary }}>
                  {formatTime(reception_time)}
                </span>
              </div>
            )}
          </div>
        )}

        {googleMapsUrl && (
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tmpl-map-btn"
            style={{ background: primary }}
          >
            <MapPin size={14} /> View on Google Maps <ExternalLink size={12} />
          </a>
        )}
      </div>

      {/* Couple Message */}
      {message && (
        <div className="tmpl-section tmpl-message-card" style={{ background: `linear-gradient(135deg, ${secondary}15, transparent)` }}>
          <div className="tmpl-divider" style={{ color: primary }}>{divider}</div>
          <div className="tmpl-quote-mark" style={{ color: primary }}>&ldquo;</div>
          <p className="tmpl-message-body">{message}</p>
        </div>
      )}

      {/* Hashtag */}
      {hashtag && (
        <div className="tmpl-hashtag-wrap">
          <span className="tmpl-hashtag-pill" style={{ borderColor: `${primary}60`, color: primary }}>
            {hashtag.startsWith('#') ? hashtag : `#${hashtag}`}
          </span>
        </div>
      )}

      {/* Footer */}
      <div className="tmpl-footer" style={{ borderTop: `1px solid ${primary}25` }}>
        <p className="tmpl-footer-emblem">{emblem}</p>
        <p className="tmpl-footer-text">{footerText}</p>
        <p className="tmpl-footer-sub">#CelebratingLove</p>
      </div>
    </div>
  );
}

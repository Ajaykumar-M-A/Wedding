import React, { useRef, useState } from 'react';
import { photosAPI } from '../api';
import { Upload, X, Image } from 'lucide-react';
import './PhotoUploader.css';

export function PhotoUploader({ value, onChange }) {
  const inputRef = useRef();
  const [dragging, setDragging] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    onChange(file);
  };

  return (
    <div
      className={`photo-uploader ${dragging ? 'dragging' : ''} ${value ? 'has-photo' : ''}`}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
      onClick={() => !value && inputRef.current?.click()}
    >
      <input type="file" accept="image/*" className="hidden-input" ref={inputRef}
        onChange={e => handleFile(e.target.files[0])} />

      {value ? (
        <div className="photo-preview">
          <img src={photosAPI.getUrl(value)} alt="Uploaded" />
          <button className="photo-remove" onClick={e => { e.stopPropagation(); onChange(null); }}>
            <X size={14} />
          </button>
        </div>
      ) : (
        <div className="photo-placeholder">
          <Upload size={20} className="text-gold" />
          <p>Drop image or <span className="text-gold">click to upload</span></p>
          <p className="text-muted" style={{ fontSize: '0.75rem' }}>JPEG, PNG, WEBP — Max 10MB</p>
        </div>
      )}
    </div>
  );
}

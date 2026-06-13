export default function MediaPreview({ label, value, onChange, placeholder }) {
  return (
    <div className="admin-form-group">
      {label && <label className="admin-form-label">{label}</label>}
      <input
        className="admin-form-input"
        type="text"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || 'https://…'}
      />
      {value && (
        <img
          src={value}
          alt="preview"
          className="admin-media-preview"
          onError={e => { e.target.style.display = 'none' }}
          onLoad={e => { e.target.style.display = 'block' }}
        />
      )}
    </div>
  )
}

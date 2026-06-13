export default function AdminPlaceholder({ title, desc, structure, notes }) {
  return (
    <div className="admin-placeholder">
      <div className="admin-placeholder__badge">Em desenvolvimento</div>
      <h1 className="admin-placeholder__title">{title}</h1>
      <p className="admin-placeholder__desc">{desc}</p>

      {structure && (
        <div className="admin-placeholder__card">
          <div className="admin-placeholder__card-title">Estrutura de dados</div>
          <pre>{structure}</pre>
        </div>
      )}

      {notes && notes.length > 0 && (
        <div className="admin-placeholder__card">
          <div className="admin-placeholder__card-title">Notas de implementação futura</div>
          <ul>
            {notes.map((n, i) => <li key={i}>{n}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}

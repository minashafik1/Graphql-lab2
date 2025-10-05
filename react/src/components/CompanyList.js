import React from "react";

export default function CompanyList({ companies }) {
  return (
    <div>
      <h2>Companies</h2>
      {companies.length === 0 && <p>No companies yet.</p>}
      <div className="list-group">
        {companies.map(c => (
          <div key={c.id} className="list-group-item mb-2">
            <h5>{c.name}</h5>
            <p>{c.slogan}</p>
            <strong>Users:</strong>
            <ul>
              {c.users.map(u => (
                <li key={u.id}>{u.firstName} ({u.age})</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

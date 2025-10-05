import React, { useState } from "react";

export default function AddUserForm({ addUser, companies, refetch }) {
  const [firstName, setFirstName] = useState("");
  const [age, setAge] = useState("");
  const [companyId, setCompanyId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !age || !companyId) return;
    await addUser({ variables: { firstName, age: parseInt(age), companyId } });
    setFirstName(""); setAge(""); setCompanyId("");
    refetch();
  };

  return (
    <div className="card mb-3 p-3">
      <h3>Add User</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
        <input className="form-control mb-2" type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />
        <select className="form-select mb-2" value={companyId} onChange={e => setCompanyId(e.target.value)}>
          <option value="">Select Company</option>
          {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <button className="btn btn-success" type="submit">Add User</button>
      </form>
    </div>
  );
}

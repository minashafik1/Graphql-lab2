import React, { useState } from "react";

export default function AddCompanyForm({ addCompany, refetch }) {
  const [name, setName] = useState("");
  const [slogan, setSlogan] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !slogan) return;
    await addCompany({ variables: { name, slogan } });
    setName(""); setSlogan("");
    refetch();
  };

  return (
    <div className="card mb-3 p-3">
      <h3>Add Company</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input className="form-control mb-2" placeholder="Slogan" value={slogan} onChange={e => setSlogan(e.target.value)} />
        <button className="btn btn-primary" type="submit">Add Company</button>
      </form>
    </div>
  );
}

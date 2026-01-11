import React, { useEffect, useState } from "react";
import axios from "axios";

const Transfers = () => {
  const [transfers, setTransfers] = useState([]);
  const [form, setForm] = useState({
    playerName: "",
    fromClub: "",
    toClub: "",
    fee: "",
    status: "Rumour",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const fetchTransfers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5005/api/transfers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransfers(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch transfers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5005/api/transfers", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ playerName: "", fromClub: "", toClub: "", fee: "", status: "Rumour" });
      fetchTransfers(); 
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to post transfer");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold text-danger mb-4">Transfer Centre</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <p className="text-muted">Loading transfers...</p>}

      
      {user?.role === "admin" && (
        <form onSubmit={handleSubmit} className="card p-4 shadow mb-5">
          <h5 className="mb-3">Post New Transfer</h5>
          <input className="form-control mb-2" placeholder="Player Name"
            value={form.playerName}
            onChange={(e) => setForm({ ...form, playerName: e.target.value })} />
          <input className="form-control mb-2" placeholder="From Club"
            value={form.fromClub}
            onChange={(e) => setForm({ ...form, fromClub: e.target.value })} />
          <input className="form-control mb-2" placeholder="To Club"
            value={form.toClub}
            onChange={(e) => setForm({ ...form, toClub: e.target.value })} />
          <input className="form-control mb-2" placeholder="Fee"
            value={form.fee}
            onChange={(e) => setForm({ ...form, fee: e.target.value })} />
          <select className="form-control mb-3"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option>Rumour</option>
            <option>Confirmed</option>
            <option>Here We Go</option>
          </select>
          <button className="btn btn-danger">Post Transfer</button>
        </form>
      )}

    
      {transfers.map((t) => (
        <div key={t._id} className="card mb-3 shadow-sm">
          <div className="card-body">
            <h5 className="fw-bold">{t.playerName}</h5>
            <p className="mb-1">
              <strong>{t.fromClub}</strong> ➜ <strong>{t.toClub}</strong>
            </p>
            <p className="mb-1">💰 {t.fee}</p>
            <span className={`badge ${
              t.status === "Here We Go" ? "bg-success" :
              t.status === "Confirmed" ? "bg-primary" : "bg-secondary"
            }`}>
              {t.status}
            </span>
            <p className="text-muted small mt-2">
              Posted by {t.createdBy?.firstName} • {new Date(t.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Transfers;
import React, { useState } from "react";

export default function NewEventForm({ addEvent, activeDate }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [color, setColor] = useState("emerald");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    addEvent({ title, date: activeDate, start, end, color });
    setTitle(""); setStart(""); setEnd("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Event title" required style={{ width: "100%", marginBottom: 6 }} />
      <div style={{ display: "flex", gap: 6 }}>
        <input type="time" value={start} onChange={e => setStart(e.target.value)} />
        <input type="time" value={end} onChange={e => setEnd(e.target.value)} />
      </div>
      <select value={color} onChange={e => setColor(e.target.value)} style={{ width: "100%", marginTop: 6 }}>
        <option value="emerald">Green</option>
        <option value="amber">Yellow</option>
        <option value="rose">Red</option>
        <option value="sky">Blue</option>
        <option value="violet">Violet</option>
      </select>
      <button type="submit" style={{ marginTop: 8, width: "100%" }}>Add</button>
    </form>
  );
}

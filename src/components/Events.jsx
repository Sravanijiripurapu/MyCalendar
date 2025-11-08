import React, { useState } from "react";
import NewEventForm from "./NewEventForm";

export default function Events({ activeDate, eventsByDate, removeEvent, addEvent, setModalVisible, palette }) {
  const key = activeDate;
  const events = eventsByDate[key]?.list || [];

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center",
      zIndex: 1000
    }}>
      <div style={{
        background: palette.card, padding: 24, borderRadius: 8, width: 400,
        maxHeight: "80vh", overflowY: "auto"
      }}>
        <h3 style={{ marginBottom: 12 }}>Events on {activeDate}</h3>

        {events.length > 0 ? events.map(ev => (
          <div key={ev.id} style={{
            background: palette.event[ev.color]?.bg,
            color: palette.event[ev.color]?.text,
            padding: 8,
            borderRadius: 6,
            marginBottom: 6,
            display: "flex", justifyContent: "space-between"
          }}>
            <span>{ev.title}</span>
            <button onClick={() => removeEvent(ev.id)}>🗑</button>
          </div>
        )) : <p>No events yet.</p>}

        <NewEventForm addEvent={addEvent} activeDate={activeDate} />
        <button onClick={() => setModalVisible(false)} style={{ marginTop: 10 }}>Close</button>
      </div>
    </div>
  );
}

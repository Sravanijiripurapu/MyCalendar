import React from "react";
import dayjs from "dayjs";
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
        <h3 style={{ marginBottom: 12 }}>Events on {activeDate || dayjs().format("YYYY-MM-DD")}</h3>

       {events.length > 0 ? events.map(ev => (
  <div key={ev.id} style={{
    background: palette.event[ev.color]?.bg,
    color: palette.event[ev.color]?.text,
    padding: 6,
    borderRadius: 6,
    marginBottom: 6,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }}>
    <div style={{ display: "flex", flexDirection: "column" }}>
      {ev.start && ev.end && (
        <span style={{ fontSize: 12, opacity: 0.8 }}>{ev.start} - {ev.end}</span>
      )}
      <span>{ev.title}</span>
    </div>
    <button onClick={() => removeEvent(ev.id)} 
      style={{ fontSize: 12, padding: "2px 4px", marginLeft: 8 }}>🗑</button>
  </div>
)) : <p>No events yet.</p>}


        <NewEventForm addEvent={addEvent} activeDate={activeDate} />
        <button onClick={() => setModalVisible(false)} style={{ marginTop: 10 }}>Close</button>
      </div>
    </div>
  );
}

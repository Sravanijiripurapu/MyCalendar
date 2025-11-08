import React from "react";
import calogo from "../assets/calogo.png"; 

export default function CalendarHeader({
  currentMonth, themeMode, setThemeMode,
  prevMonth, nextMonth, jumpToToday,
  setActiveDate, setModalVisible
}) {

  const handleAddEvent = () => {
    setActiveDate(null);
    setModalVisible(true);
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "16px 24px", borderBottom: `1px solid #ccc` 
    }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
        <img src={calogo} alt="Calendar Logo" style={{ width: 40, height: 40 }} />
        <span style={{ marginLeft: 10, fontSize: 14, color: "#555" }}>
          Click on date and add your events
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={prevMonth}>◀</button>
          <span style={{ fontWeight: "bold" }}>{currentMonth.format("MMMM YYYY")}</span>
          <button onClick={nextMonth}>▶</button>
          <button onClick={jumpToToday} style={{ marginLeft: "32px" }}>Today</button>
        </div>

       
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={handleAddEvent}>＋ Add Event</button>
          <button onClick={() => setThemeMode(themeMode === "light" ? "dark" : "light")}>
            {themeMode === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </div>
  );
}

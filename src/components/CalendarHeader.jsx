import React from "react";

export default function CalendarHeader({
  currentMonth, themeMode, setThemeMode,
  prevMonth, nextMonth, jumpToToday,
  setActiveDate, setModalVisible, palette
}) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "16px 24px", borderBottom: `1px solid ${palette.border}`
    }}>
      <div>
        <button onClick={prevMonth}>◀</button>
        <span style={{ margin: "0 12px", fontWeight: "bold" }}>
          {currentMonth.format("MMMM YYYY")}
        </span>
        <button onClick={nextMonth}>▶</button>
        <button onClick={jumpToToday} style={{ marginLeft: "16px" }}>Today</button>
      </div>
      <div>
        <button onClick={() => { setActiveDate(null); setModalVisible(true); }}>＋ Add Event</button>
        <button onClick={() => setThemeMode(themeMode === "light" ? "dark" : "light")}
          style={{ marginLeft: "12px" }}>
          {themeMode === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </div>
  );
}

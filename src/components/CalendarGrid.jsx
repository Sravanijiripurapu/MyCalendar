import React from "react";
import dayjs from "dayjs";

export default function CalendarGrid({ daysGrid, today, currentMonth, palette, eventsByDate, openDateModal }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      borderTop: `1px solid ${palette.border}`,
      borderRight: `1px solid ${palette.border}`
    }}>
      {daysGrid.map((day, i) => {
        const key = day.format("YYYY-MM-DD");
        const isToday = day.isSame(today, "day");
        const isCurrentMonth = day.isSame(currentMonth, "month");
        const events = eventsByDate[key]?.list || [];

        return (
          <div
            key={i}
            onClick={() => openDateModal(day.format("YYYY-MM-DD"))}
            style={{
              minHeight: 100,
              borderLeft: `1px solid ${palette.border}`,
              borderBottom: `1px solid ${palette.border}`,
              background: isCurrentMonth ? "transparent" : palette.page,
              cursor: "pointer",
              padding: "6px",
              position: "relative"
            }}
          >
            <div style={{
              fontWeight: isToday ? "bold" : "normal",
              color: isToday ? palette.heading : palette.text
            }}>
              {day.date()}
            </div>

            <div style={{ marginTop: 4 }}>
              {events.map(ev => (
                <div key={ev.id}
                  style={{
                    background: palette.event[ev.color]?.bg,
                    color: palette.event[ev.color]?.text,
                    borderRadius: 4,
                    fontSize: 12,
                    padding: "1px 4px",
                    marginTop: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}>
                  {ev.title}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

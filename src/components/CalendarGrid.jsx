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
              height: 100,                      
              borderLeft: `1px solid ${palette.border}`,
              borderBottom: `1px solid ${palette.border}`,
              background: isCurrentMonth ? "transparent" : palette.page,
              cursor: "pointer",
              padding: "4px",
              boxSizing: "border-box",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden"
            }}
          >
            {/* Date Number */}
            <div style={{
              fontWeight: isToday ? "bold" : "normal",
              color: isToday ? palette.heading : palette.text,
              marginBottom: 2
            }}>
              {day.date()}
            </div>

            {/* Events List */}
            <div style={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              gap: 2
            }}>
              {events.map(ev => (
                <div key={ev.id} style={{
                  background: palette.event[ev.color]?.bg,
                  color: palette.event[ev.color]?.text,
                  borderRadius: 4,
                  fontSize: 10,
                  padding: "1px 4px",
                  lineHeight: 1.1,
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}>
                  {ev.start && ev.end && (
                    <div style={{ fontSize: 9, opacity: 0.7 }}>
                      {ev.start} - {ev.end}
                    </div>
                  )}
                  <div style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}>
                    {ev.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

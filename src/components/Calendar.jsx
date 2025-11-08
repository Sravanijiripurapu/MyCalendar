import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { INITIAL_EVENTS, doTimesClash } from "./helpers";
import { COLOR_THEMES } from "./theme";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import Events from "./Events";

export default function Calendar() {
  const today = useMemo(() => dayjs(), []);
  const [currentMonth, setCurrentMonth] = useState(() => dayjs().startOf("month"));
  const [eventList, setEventList] = useState(() => INITIAL_EVENTS.map(ev => ({ ...ev })));
  const [activeDate, setActiveDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('calendar_theme') || 'light');

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
    localStorage.setItem('calendar_theme', themeMode);
  }, [themeMode]);

  const palette = COLOR_THEMES[themeMode];
  const firstDayIndex = currentMonth.day();

  const daysGrid = useMemo(() => {
    const totalCells = 6 * 7;
    const start = currentMonth.startOf("month").subtract(firstDayIndex, "day");
    return Array.from({ length: totalCells }, (_, i) => start.add(i, "day"));
  }, [currentMonth, firstDayIndex]);

  const eventsByDate = useMemo(() => {
    const mapping = {};
    eventList.forEach(ev => {
      const key = ev.date;
      if (!mapping[key]) mapping[key] = [];
      mapping[key].push(ev);
    });

    Object.keys(mapping).forEach(key => {
      const dayEvents = mapping[key];
      dayEvents.sort((a, b) => {
        if (a.allDay && !b.allDay) return 1;
        if (b.allDay && !a.allDay) return -1;
        return (a.start || '') > (b.start || '') ? 1 : -1;
      });

      const slots = [];
      for (const ev of dayEvents) {
        let placed = false;
        for (let s = 0; s < slots.length; s++) {
          if (!slots[s].some(existing =>
            doTimesClash(existing.start || '00:00', existing.end || '23:59', ev.start || '00:00', ev.end || '23:59')
          )) {
            slots[s].push(ev);
            ev._slot = s;
            placed = true;
            break;
          }
        }
        if (!placed) { slots.push([ev]); ev._slot = slots.length - 1; }
      }
      mapping[key] = { list: dayEvents, maxSlots: slots.length };
    });

    return mapping;
  }, [eventList]);

  const prevMonth = () => setCurrentMonth(m => m.subtract(1, "month"));
  const nextMonth = () => setCurrentMonth(m => m.add(1, "month"));
  const jumpToToday = () => setCurrentMonth(dayjs().startOf("month"));

  const openDateModal = (date) => { setActiveDate(date); setModalVisible(true); };
  const addEvent = (newEvent) => setEventList(prev => [...prev, { id: Math.random().toString(36).slice(2,9), ...newEvent }]);
  const removeEvent = (id) => setEventList(prev => prev.filter(e => e.id !== id));

  const layoutStyle = {
    minHeight: '100vh',
    background: palette.page,
    color: palette.text,
    padding: 24,
    fontFamily: 'Inter, system-ui, Roboto, Arial'
  };

  return (
    <div style={layoutStyle}>
      <div style={{ maxWidth: 1100, margin: '0 auto', background: palette.card, borderRadius: 10 }}>
        <CalendarHeader
          currentMonth={currentMonth}
          themeMode={themeMode}
          setThemeMode={setThemeMode}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          jumpToToday={jumpToToday}
          setActiveDate={setActiveDate}
          setModalVisible={setModalVisible}
          palette={palette}
        />
        <CalendarGrid
          daysGrid={daysGrid}
          today={today}
          currentMonth={currentMonth}
          palette={palette}
          eventsByDate={eventsByDate}
          openDateModal={openDateModal}
          themeMode={themeMode}
        />
      </div>

      {modalVisible && (
        <Events
          activeDate={activeDate}
          eventsByDate={eventsByDate}
          removeEvent={removeEvent}
          addEvent={addEvent}
          setModalVisible={setModalVisible}
          palette={palette}
          themeMode={themeMode}
        />
      )}
    </div>
  );
}

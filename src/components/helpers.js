export const INITIAL_EVENTS = [
  { id: '1', title: 'New Year Celebration', date: '2025-01-01', allDay: true, color: 'emerald', start: '00:00', end: '23:59' },
  { id: '2', title: 'Project Kickoff', date: '2025-01-02', start: '13:00', end: '14:20', color: 'sky' },
  { id: '3', title: 'Team Discussion', date: '2025-01-03', start: '11:00', end: '11:30', color: 'rose' },
  { id: '4', title: 'Lunch with Priya', date: '2025-01-05', start: '14:00', end: '15:00', color: 'amber' },
  { id: '5', title: 'Weekly Sync Up', date: '2025-11-04', start: '10:00', end: '10:30', color: 'violet' },
  { id: '6', title: 'Brainstorming Session', date: '2025-11-20', start: '11:00', end: '14:00', color: 'emerald' },
  { id: '7', title: 'Overlap Meeting A', date: '2025-12-10', start: '11:00', end: '12:00', color: 'amber' },
  { id: '8', title: 'Overlap Meeting B', date: '2025-01-10', start: '11:30', end: '12:30', color: 'rose' },
  { id: '9', title: 'Overlap Meeting C', date: '2025-01-10', start: '11:15', end: '11:45', color: 'sky' }
];

export const doTimesClash = (start1, end1, start2, end2) => !(end1 <= start2 || end2 <= start1);

export function adjustShade(hex, pct) {
  try {
    const h = hex.replace('#','');
    const num = parseInt(h,16);
    let r = (num >> 16) + pct;
    let g = ((num >> 8) & 0x00FF) + pct;
    let b = (num & 0x0000FF) + pct;
    r = Math.max(Math.min(255, r), 0);
    g = Math.max(Math.min(255, g), 0);
    b = Math.max(Math.min(255, b), 0);
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6,'0');
  } catch { return hex; }
}

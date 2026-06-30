const waypoints = [
  { left: '12%', top: '34%', label: '01' },
  { left: '24%', top: '68%', label: '02' },
  { left: '42%', top: '26%', label: '03' },
  { left: '62%', top: '61%', label: '04' },
  { left: '79%', top: '31%', label: '05' },
  { left: '88%', top: '74%', label: '06' },
]

export default function OdysseyBackdrop() {
  return (
    <div className="odyssey-backdrop" aria-hidden="true">
      <svg className="odyssey-routes" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <path className="odyssey-route route-a" d="M70 310 C 210 120, 340 620, 520 280 S 850 210, 1110 500" />
        <path className="odyssey-route route-b" d="M110 610 C 280 520, 300 220, 520 370 S 780 700, 1060 190" />
        <path className="odyssey-route route-c" d="M180 160 C 360 260, 390 500, 610 480 S 900 360, 1160 640" />
      </svg>
      <div className="odyssey-glow glow-a" />
      <div className="odyssey-glow glow-b" />
      {waypoints.map((point) => (
        <span key={point.label} className="odyssey-waypoint" style={{ left: point.left, top: point.top }}>
          <i />
          <b>{point.label}</b>
        </span>
      ))}
    </div>
  )
}

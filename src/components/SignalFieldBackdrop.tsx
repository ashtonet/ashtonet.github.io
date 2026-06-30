const nodes = [
  { left: '13%', top: '28%', size: 'sm', delay: '-1s' },
  { left: '23%', top: '67%', size: 'md', delay: '-4s' },
  { left: '39%', top: '20%', size: 'xs', delay: '-2s' },
  { left: '58%', top: '71%', size: 'lg', delay: '-6s' },
  { left: '74%', top: '29%', size: 'md', delay: '-3s' },
  { left: '87%', top: '58%', size: 'sm', delay: '-5s' },
]

export default function SignalFieldBackdrop() {
  return (
    <div className="signal-backdrop" aria-hidden="true">
      <div className="signal-scan" />
      <div className="signal-orb signal-orb-a" />
      <div className="signal-orb signal-orb-b" />
      <div className="signal-orb signal-orb-c" />
      <svg className="signal-lines" viewBox="0 0 1200 760" preserveAspectRatio="none">
        <path d="M120 210 C 290 140, 390 340, 545 265 S 790 185, 1030 310" />
        <path d="M180 575 C 330 455, 455 575, 610 455 S 860 360, 1080 510" />
        <path d="M235 350 C 420 270, 520 520, 755 420 S 980 210, 1140 240" />
      </svg>
      {nodes.map((node, index) => (
        <span
          key={`${node.left}-${node.top}`}
          className={`signal-node signal-node-${node.size}`}
          style={{ left: node.left, top: node.top, animationDelay: node.delay }}
        >
          <i />
          <b>{String(index + 1).padStart(2, '0')}</b>
        </span>
      ))}
      <div className="signal-card signal-card-a">
        <span>LIVE FIELD</span>
        <strong>Research · Systems · Travel</strong>
      </div>
      <div className="signal-card signal-card-b">
        <span>FOCUS</span>
        <strong>Computer Vision</strong>
      </div>
    </div>
  )
}

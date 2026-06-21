const dots = [{l:10,t:30},{l:18,t:70},{l:29,t:18},{l:39,t:78},{l:52,t:22},{l:61,t:67},{l:73,t:16},{l:81,t:58},{l:91,t:32},{l:69,t:88},{l:7,t:85},{l:93,t:79}]
export default function Particles() { return <div aria-hidden className="absolute inset-0 overflow-hidden">{dots.map((dot, i) => <span key={i} className="particle" style={{ left: `${dot.l}%`, top: `${dot.t}%` }} />)}</div> }

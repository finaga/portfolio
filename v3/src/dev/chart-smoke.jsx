import { createRoot } from 'react-dom/client'
import { AreaChart } from '@/components/charts/area-chart'
import { Area } from '@/components/charts/area'
import { Grid } from '@/components/charts/grid'
import { XAxis } from '@/components/charts/x-axis'
import '../styles/index.css'

// Coverage from the KPI case study. Reconciles to the real preview totals:
// 972 included, 915 excluded, 1887 sampled.
const INC = [96,102,88,21,14,18,74,108,112,95,60,55,63,66]
const EXC = [39,33,47,114,121,117,61,27,23,40,75,80,72,66]

// NOTE: real Date objects, not ISO strings — strings render an empty chart silently.
const data = INC.map((included, i) => ({
  date: new Date(2026, 6, 10 + i),
  included,
  excluded: EXC[i],
}))

function App() {
  return (
    <div style={{ padding: 32, background: 'var(--bg)', minHeight: '100vh' }}>
      <h1 style={{ font: '600 14px ui-monospace, monospace' }}>
        @bklit/area-chart smoke test — {data.length} points,
        {' '}{INC.reduce((a,b)=>a+b,0)} included / {EXC.reduce((a,b)=>a+b,0)} excluded
      </h1>
      <div id="probe" style={{ height: 320, marginTop: 24 }}>
        <AreaChart data={data} xDataKey="date">
          <Grid />
          <XAxis />
          <Area dataKey="included" stroke="var(--chart-1)" />
          <Area dataKey="excluded" stroke="var(--chart-3)" />
        </AreaChart>
      </div>
    </div>
  )
}
createRoot(document.getElementById('root')).render(<App />)

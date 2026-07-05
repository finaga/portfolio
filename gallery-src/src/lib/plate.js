// Editorial instrument-panel plate generator, ported from the real
// portfolio's data.js. Used where no real (or shareable) product
// photography exists — enterprise SaaS client work can't be screenshotted,
// so these stand in as honest, on-brand data/system visualizations rather
// than fabricated "product photos". Same source of truth as the deep-dive
// plates in the shipped portfolio.
const DISP = `font-family='Big Shoulders, Impact, ui-sans-serif, sans-serif'`
const MONO = `font-family='JetBrains Mono, ui-monospace, monospace'`
const SANS = `font-family='Space Grotesk, ui-sans-serif, sans-serif'`

export function plate(kind, opts = {}) {
  const tone = opts.tone || 'dark'
  const ink = tone === 'dark' ? '#E6E8EC' : '#050608'
  const bg0 = tone === 'dark' ? '#141923' : '#E6E3DC'
  const bg1 = tone === 'dark' ? '#0A0D14' : '#EFEDE6'
  const rule = tone === 'dark' ? 'rgba(230,232,236,0.10)' : 'rgba(5,6,8,0.08)'
  const soft = tone === 'dark' ? 'rgba(230,232,236,0.55)' : 'rgba(5,6,8,0.55)'
  const dim = tone === 'dark' ? 'rgba(230,232,236,0.28)' : 'rgba(5,6,8,0.28)'

  const defs = `
    <defs>
      <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='${bg0}'/>
        <stop offset='1' stop-color='${bg1}'/>
      </linearGradient>
      <pattern id='grid' width='80' height='80' patternUnits='userSpaceOnUse'>
        <path d='M 80 0 L 0 0 0 80' fill='none' stroke='${rule}' stroke-width='0.5'/>
      </pattern>
    </defs>`

  const frame = `
    <rect width='1200' height='800' fill='url(#bg)'/>
    <rect width='1200' height='800' fill='url(#grid)'/>
    <rect x='40' y='40' width='1120' height='720' fill='none' stroke='${rule}' stroke-width='0.5'/>`

  const eyebrow = (text) =>
    `<g ${MONO} font-size='11' fill='${dim}' letter-spacing='1.2'>
       <text x='56' y='78'>${text}</text>
     </g>`

  let body = ''

  if (kind === 'system-overview') {
    const cells = []
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        const x = 140 + c * 220
        const y = 200 + r * 160
        const active = r === 1 && c === 2
        cells.push(
          `<rect x='${x}' y='${y}' width='200' height='140' fill='none' stroke='${active ? ink : rule}' stroke-width='${active ? 1 : 0.5}'/>` +
            `<text x='${x + 10}' y='${y + 22}' ${MONO} font-size='10' fill='${dim}' letter-spacing='1'>M/${String(r * 4 + c + 1).padStart(2, '0')}</text>` +
            (active
              ? `<text x='${x + 10}' y='${y + 122}' ${MONO} font-size='10' fill='${ink}' letter-spacing='1'>CORE</text>`
              : ''),
        )
      }
    }
    body = `
      ${eyebrow('FARSIGHT / SYSTEM MAP · 20 MODULES')}
      <text x='56' y='170' ${DISP} font-size='110' font-weight='500' fill='${ink}' letter-spacing='-2'>ONE LANGUAGE</text>
      ${cells.join('')}
      <text x='56' y='740' ${MONO} font-size='10' fill='${dim}' letter-spacing='1.5'>6 TEAMS · 30+ ENGINEERS · SHARED VOCABULARY</text>`
  } else if (kind === 'density') {
    const rows = [
      ['COMPACT', 14, 16],
      ['DEFAULT', 18, 24],
      ['COMFORT', 24, 36],
      ['READING', 32, 52],
    ]
    body = `${eyebrow('DENSITY MODES · /04')}`
    rows.forEach(([name, size, gap], i) => {
      const y = 180 + i * 130
      body += `
        <line x1='56' y1='${y - 26}' x2='1144' y2='${y - 26}' stroke='${rule}' stroke-width='0.5'/>
        <text x='56' y='${y}' ${MONO} font-size='10' fill='${dim}' letter-spacing='1.5'>${name}</text>
        <text x='220' y='${y}' ${SANS} font-size='${size}' fill='${ink}'>Turbine T-0042 · Generator winding temp 84°C</text>
        <text x='220' y='${y + gap}' ${SANS} font-size='${Math.round(size * 0.7)}' fill='${soft}'>Severity 02 · since 14:22 UTC · crew dispatched</text>`
    })
  } else if (kind === 'alert-triage') {
    const rows = [
      ['01', 'CRITICAL', 'Inverter string 04 · ground fault', '00:12'],
      ['02', 'HIGH', 'T-0042 · gearbox temp out of band', '00:48'],
      ['03', 'HIGH', 'T-0117 · pitch drive drift', '02:14'],
      ['04', 'MEDIUM', 'Combiner box · humidity 72%', '04:03'],
      ['05', 'MEDIUM', 'Substation · SCADA link degraded', '06:22'],
      ['06', 'LOW', 'T-0088 · vibration outlier', '08:10'],
      ['07', 'LOW', 'T-0201 · yaw misalignment', '11:55'],
    ]
    body = `${eyebrow('GRID-OPS / ALERT QUEUE')}
      <text x='56' y='150' ${DISP} font-size='72' font-weight='500' fill='${ink}' letter-spacing='-1'>SEVERITY FIRST</text>`
    rows.forEach((r, i) => {
      const y = 230 + i * 62
      const isCrit = r[1] === 'CRITICAL'
      body += `
        <rect x='56' y='${y - 24}' width='4' height='34' fill='${isCrit ? ink : dim}'/>
        <text x='80'  y='${y}' ${MONO} font-size='11' fill='${dim}' letter-spacing='1.5'>${r[0]}</text>
        <text x='140' y='${y}' ${MONO} font-size='11' fill='${isCrit ? ink : soft}' letter-spacing='1.5'>${r[1]}</text>
        <text x='320' y='${y}' ${SANS} font-size='15' fill='${ink}'>${r[2]}</text>
        <text x='1100' y='${y}' ${MONO} font-size='11' fill='${dim}' text-anchor='end'>+${r[3]}</text>
        <line x1='56' y1='${y + 20}' x2='1144' y2='${y + 20}' stroke='${rule}' stroke-width='0.5'/>`
    })
  } else if (kind === 'control-room') {
    let bars = ''
    const heights = [60, 90, 45, 130, 70, 110, 95, 150, 120, 80, 60, 140, 95, 170, 130]
    heights.forEach((h, i) => {
      bars += `<rect x='${580 + i * 38}' y='${620 - h}' width='28' height='${h}' fill='${ink}' opacity='${0.25 + (i / heights.length) * 0.75}'/>`
    })
    body = `${eyebrow('CONTROL ROOM · WALL / 4K')}
      <text x='56' y='190' ${DISP} font-size='180' font-weight='600' fill='${ink}' letter-spacing='-3'>99.9%</text>
      <text x='56' y='240' ${MONO} font-size='11' fill='${dim}' letter-spacing='1.5'>FLEET UPTIME · ROLLING 30D</text>
      <text x='56' y='360' ${DISP} font-size='84' font-weight='500' fill='${soft}' letter-spacing='-1'>−62%</text>
      <text x='56' y='400' ${MONO} font-size='11' fill='${dim}' letter-spacing='1.5'>TIME-TO-DIAGNOSE</text>
      <text x='56' y='500' ${DISP} font-size='84' font-weight='500' fill='${soft}' letter-spacing='-1'>−48%</text>
      <text x='56' y='540' ${MONO} font-size='11' fill='${dim}' letter-spacing='1.5'>ALARM FATIGUE</text>
      <line x1='580' y1='620' x2='1140' y2='620' stroke='${rule}' stroke-width='0.5'/>
      ${bars}
      <text x='580' y='660' ${MONO} font-size='10' fill='${dim}' letter-spacing='1.5'>INCIDENTS / HOUR · LAST 15H</text>`
  } else if (kind === 'asset-detail') {
    body = `${eyebrow('ASSET · T-0042 / GEARBOX')}
      <circle cx='360' cy='440' r='180' fill='none' stroke='${rule}' stroke-width='0.5'/>
      <circle cx='360' cy='440' r='110' fill='none' stroke='${soft}' stroke-width='0.5'/>
      <circle cx='360' cy='440' r='40'  fill='none' stroke='${ink}' stroke-width='1'/>
      <line x1='360' y1='260' x2='360' y2='620' stroke='${rule}' stroke-width='0.5'/>
      <line x1='180' y1='440' x2='540' y2='440' stroke='${rule}' stroke-width='0.5'/>
      <text x='360' y='236' ${MONO} font-size='10' fill='${dim}' text-anchor='middle' letter-spacing='1.5'>ROTOR</text>
      <text x='660' y='180' ${DISP} font-size='72' font-weight='500' fill='${ink}' letter-spacing='-1'>T-0042</text>
      <text x='660' y='220' ${MONO} font-size='11' fill='${dim}' letter-spacing='1.5'>TURBINE · NORTH-SEA CLUSTER</text>
      <g ${MONO} font-size='12' fill='${soft}' letter-spacing='1'>
        <text x='660' y='300'>POWER        <tspan fill='${ink}'>2.4 MW</tspan></text>
        <text x='660' y='336'>WIND         <tspan fill='${ink}'>12.8 M/S</tspan></text>
        <text x='660' y='372'>ROTOR RPM    <tspan fill='${ink}'>14.2</tspan></text>
        <text x='660' y='408'>GEAR TEMP    <tspan fill='${ink}'>84°C</tspan></text>
        <text x='660' y='444'>VIBRATION    <tspan fill='${ink}'>0.41 G</tspan></text>
        <text x='660' y='480'>UPTIME       <tspan fill='${ink}'>98.4%</tspan></text>
      </g>
      <text x='660' y='600' ${MONO} font-size='11' fill='${dim}' letter-spacing='1.5'>STATE · NOMINAL / WATCH</text>
      <text x='660' y='630' ${MONO} font-size='11' fill='${dim}' letter-spacing='1.5'>LAST SERVICE · 12 DAYS</text>`
  } else if (kind === 'landing-variants') {
    const card = (x, tag, lift) => `
      <rect x='${x}' y='180' width='440' height='520' fill='none' stroke='${rule}' stroke-width='0.5'/>
      <text x='${x + 20}' y='212' ${MONO} font-size='10' fill='${dim}' letter-spacing='1.5'>VARIANT · ${tag}</text>
      <rect x='${x + 20}' y='240' width='400' height='120' fill='${soft}' opacity='0.18'/>
      <text x='${x + 20}' y='322' ${DISP} font-size='44' font-weight='600' fill='${ink}' letter-spacing='-1'>HIRE TOP 3%</text>
      <rect x='${x + 20}' y='380' width='260' height='14' fill='${soft}' opacity='0.45'/>
      <rect x='${x + 20}' y='402' width='340' height='14' fill='${soft}' opacity='0.30'/>
      <rect x='${x + 20}' y='424' width='200' height='14' fill='${soft}' opacity='0.30'/>
      <rect x='${x + 20}' y='470' width='160' height='40' fill='${ink}'/>
      <text x='${x + 100}' y='495' ${MONO} font-size='11' fill='${bg0}' text-anchor='middle' letter-spacing='1.5'>APPLY</text>
      <text x='${x + 20}' y='560' ${MONO} font-size='10' fill='${dim}' letter-spacing='1.5'>SIGNUP · COMPLETION</text>
      <text x='${x + 20}' y='620' ${DISP} font-size='64' font-weight='500' fill='${ink}' letter-spacing='-1'>${lift}</text>`
    body = `${eyebrow('TOPTAL / LANDING · A / B')}
      <text x='56' y='150' ${DISP} font-size='56' font-weight='500' fill='${ink}' letter-spacing='-1'>CONTROL vs VARIANT</text>
      ${card(140, 'A · CONTROL', '24.8%')}
      ${card(620, 'B · SHIPPED', '34.0%')}`
  } else if (kind === 'funnel') {
    const steps = [
      ['LAND', 1200, '100%'],
      ['INTEREST', 920, '77%'],
      ['START', 740, '62%'],
      ['QUALIFY', 540, '45%'],
      ['SUBMIT', 408, '34%'],
    ]
    body = `${eyebrow('FUNNEL · TALENT SIGNUP')}
      <text x='56' y='150' ${DISP} font-size='56' font-weight='500' fill='${ink}' letter-spacing='-1'>PROGRESSIVE DISCLOSURE</text>`
    steps.forEach((s, i) => {
      const y = 220 + i * 100
      const w = s[1]
      const x = (1200 - w) / 2
      body += `
        <rect x='${x}' y='${y}' width='${w}' height='60' fill='${ink}' opacity='${0.85 - i * 0.15}'/>
        <text x='${x + 20}' y='${y + 38}' ${MONO} font-size='12' fill='${bg0}' letter-spacing='1.5'>${String(i + 1).padStart(2, '0')} · ${s[0]}</text>
        <text x='${x + w - 20}' y='${y + 38}' ${MONO} font-size='12' fill='${bg0}' text-anchor='end' letter-spacing='1.5'>${s[2]}</text>`
    })
    body += `<text x='56' y='770' ${MONO} font-size='10' fill='${dim}' letter-spacing='1.5'>+37% COMPLETION · −24% CPA · 8 EXPERIMENTS</text>`
  } else if (kind === 'experiments') {
    const rows = [
      ['01', 'Social-proof micro-moment above fold', '+4.2%'],
      ['02', 'Split long form into 3 steps', '+6.8%'],
      ['03', 'Defer credentials upload to step 3', '+3.1%'],
      ['04', 'Remove CAPTCHA for vetted IPs', '+2.4%'],
      ['05', 'Headline: skill-first, not company-first', '+5.0%'],
      ['06', 'Progress indicator with step labels', '+1.9%'],
      ['07', 'Inline validation instead of page-level', '+4.7%'],
      ['08', 'Currency pre-fill by geo', '+3.6%'],
    ]
    body = `${eyebrow('EXPERIMENT LOG · Q1–Q4')}
      <text x='56' y='150' ${DISP} font-size='56' font-weight='500' fill='${ink}' letter-spacing='-1'>8 SHIPPED · 2.1× COMPOUND</text>`
    rows.forEach((r, i) => {
      const y = 240 + i * 58
      body += `
        <text x='56'  y='${y}' ${MONO} font-size='11' fill='${dim}' letter-spacing='1.5'>EXP</text>
        <text x='100' y='${y}' ${MONO} font-size='11' fill='${ink}' letter-spacing='1.5'>${r[0]}</text>
        <text x='160' y='${y}' ${SANS} font-size='15' fill='${ink}'>${r[1]}</text>
        <text x='1144' y='${y}' ${MONO} font-size='13' fill='${ink}' text-anchor='end' letter-spacing='1'>${r[2]}</text>
        <line x1='56' y1='${y + 20}' x2='1144' y2='${y + 20}' stroke='${rule}' stroke-width='0.5'/>`
    })
  } else if (kind === 'identity') {
    body = `${eyebrow('IDENTITY · FIT4BOX / WORDMARK')}
      <text x='600' y='460' ${DISP} font-size='260' font-weight='700' fill='${ink}' letter-spacing='-6' text-anchor='middle'>FIT4BOX</text>
      <line x1='56'  y1='500' x2='1144' y2='500' stroke='${ink}' stroke-width='0.75'/>
      <line x1='56'  y1='360' x2='1144' y2='360' stroke='${rule}' stroke-width='0.5'/>
      <line x1='56'  y1='230' x2='1144' y2='230' stroke='${rule}' stroke-width='0.5'/>
      <text x='56'  y='550' ${MONO} font-size='10' fill='${dim}' letter-spacing='1.5'>BASELINE</text>
      <text x='56'  y='380' ${MONO} font-size='10' fill='${dim}' letter-spacing='1.5'>X-HEIGHT</text>
      <text x='56'  y='250' ${MONO} font-size='10' fill='${dim}' letter-spacing='1.5'>CAP</text>
      <text x='56'  y='720' ${MONO} font-size='10' fill='${dim}' letter-spacing='1.5'>BUILT FOR GRIP · SWEAT · VOLUME</text>
      <text x='1144' y='720' ${MONO} font-size='10' fill='${dim}' text-anchor='end' letter-spacing='1.5'>SP / BR · 2023</text>`
  } else if (kind === 'lookbook') {
    const fig = (x, h) => `
      <rect x='${x - 40}' y='${440 - h}' width='80' height='${h}' fill='${ink}' opacity='0.85'/>
      <circle cx='${x}' cy='${420 - h}' r='24' fill='${ink}' opacity='0.85'/>
      <rect x='${x - 24}' y='${440}' width='14' height='180' fill='${ink}' opacity='0.7'/>
      <rect x='${x + 10}' y='${440}' width='14' height='180' fill='${ink}' opacity='0.7'/>`
    body = `${eyebrow('SS25 · LOOKBOOK / FRAME 04')}
      <text x='56' y='760' ${DISP} font-size='56' font-weight='500' fill='${ink}' letter-spacing='-1'>NO SHOUT</text>
      ${fig(300, 240)}
      ${fig(600, 260)}
      ${fig(900, 230)}`
  } else if (kind === 'pdp') {
    body = `${eyebrow('STORE · PDP / GRIP-TEE 002')}
      <rect x='56' y='120' width='540' height='620' fill='${soft}' opacity='0.12'/>
      <rect x='220' y='200' width='220' height='420' fill='${ink}' opacity='0.7'/>
      <circle cx='330' cy='290' r='30' fill='${bg0}'/>
      <text x='640' y='180' ${DISP} font-size='72' font-weight='600' fill='${ink}' letter-spacing='-1'>GRIP-TEE</text>
      <text x='640' y='220' ${MONO} font-size='11' fill='${dim}' letter-spacing='1.5'>002 · BONE / COMBED COTTON</text>
      <line x1='640' y1='250' x2='1144' y2='250' stroke='${rule}' stroke-width='0.5'/>
      <text x='640' y='310' ${DISP} font-size='56' font-weight='500' fill='${ink}' letter-spacing='-1'>€ 58</text>
      <rect x='640' y='510' width='260' height='50' fill='${ink}'/>
      <text x='770' y='542' ${MONO} font-size='11' fill='${bg0}' text-anchor='middle' letter-spacing='1.5'>ADD TO BAG</text>
      <text x='640' y='640' ${MONO} font-size='10' fill='${dim}' letter-spacing='1.5'>38% REPEAT / SIZE UP IF BETWEEN</text>`
  } else if (kind === 'campaign') {
    body = `${eyebrow('CAMPAIGN · AW24 / FILM STILL')}
      <text x='56' y='280' ${DISP} font-size='150' font-weight='600' fill='${ink}' letter-spacing='-3'>TRAIN.</text>
      <text x='56' y='430' ${DISP} font-size='150' font-weight='600' fill='${ink}' letter-spacing='-3'>WASH.</text>
      <text x='56' y='580' ${DISP} font-size='150' font-weight='600' fill='${ink}' letter-spacing='-3'>REPEAT.</text>
      <line x1='56' y1='620' x2='400' y2='620' stroke='${ink}' stroke-width='1'/>
      <text x='56' y='700' ${MONO} font-size='11' fill='${dim}' letter-spacing='2'>FIT4BOX · APPAREL FOR PEOPLE WHO ACTUALLY TRAIN</text>`
  } else if (kind === 'packaging') {
    body = `${eyebrow('PACKAGING · HANG-TAG / 80×140')}
      <rect x='360' y='180' width='480' height='520' fill='none' stroke='${ink}' stroke-width='0.75'/>
      <circle cx='600' cy='240' r='14' fill='none' stroke='${ink}' stroke-width='0.75'/>
      <text x='600' y='350' ${DISP} font-size='72' font-weight='700' fill='${ink}' text-anchor='middle' letter-spacing='-1'>FIT4BOX</text>
      <line x1='400' y1='380' x2='800' y2='380' stroke='${rule}'/>
      <text x='600' y='430' ${MONO} font-size='11' fill='${dim}' text-anchor='middle' letter-spacing='1.5'>GRIP-TEE · 002</text>
      <text x='600' y='460' ${MONO} font-size='11' fill='${dim}' text-anchor='middle' letter-spacing='1.5'>BONE · M</text>
      <line x1='400' y1='490' x2='800' y2='490' stroke='${rule}'/>
      <text x='600' y='540' ${MONO} font-size='10' fill='${soft}' text-anchor='middle' letter-spacing='1.5'>100% COMBED COTTON · 220GSM</text>
      <text x='600' y='570' ${MONO} font-size='10' fill='${soft}' text-anchor='middle' letter-spacing='1.5'>MADE IN PORTUGAL</text>
      <line x1='400' y1='600' x2='800' y2='600' stroke='${rule}'/>
      <text x='600' y='660' ${MONO} font-size='10' fill='${dim}' text-anchor='middle' letter-spacing='2'>TRAIN · WASH · REPEAT</text>`
  } else if (kind === 'label') {
    // simple identity/label plate for experiment thumbnails
    body = `${eyebrow(opts.eyebrow || 'STUDY')}
      <text x='56' y='420' ${DISP} font-size='84' font-weight='600' fill='${ink}' letter-spacing='-2'>${opts.title || 'UNTITLED'}</text>
      <text x='56' y='470' ${MONO} font-size='11' fill='${dim}' letter-spacing='1.5'>${opts.sub || ''}</text>`
  } else {
    body = eyebrow('PLATE')
  }

  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800' preserveAspectRatio='xMidYMid slice'>` +
    defs +
    frame +
    body +
    `</svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

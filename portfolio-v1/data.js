// data.js — case studies + plate visuals (monochrome editorial)

// ---------------------------------------------------------------------------
// Legacy single-seed plate (kept for back-compat if something still references
// it). New plates use the editorial `plate(kind, …)` factory below.
// ---------------------------------------------------------------------------
function makePlate(seed, tone = 'dark') {
  const s = seed;
  const bgA = tone === 'dark' ? '#141923' : '#e6e3dc';
  const bgB = tone === 'dark' ? '#050608' : '#ECECEA';
  const rule = tone === 'dark' ? 'rgba(230,232,236,0.06)' : 'rgba(5,6,8,0.05)';
  const label = tone === 'dark' ? 'rgba(230,232,236,0.35)' : 'rgba(5,6,8,0.35)';
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="g${s}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bgA}"/>
      <stop offset="1" stop-color="${bgB}"/>
    </linearGradient>
    <pattern id="grid${s}" width="100" height="100" patternUnits="userSpaceOnUse">
      <path d="M 100 0 L 0 0 0 100" fill="none" stroke="${rule}" stroke-width="0.5"/>
    </pattern>
  </defs>
  <rect width="1200" height="800" fill="url(#g${s})"/>
  <rect width="1200" height="800" fill="url(#grid${s})"/>
  <g font-family="JetBrains Mono, ui-monospace, monospace" font-size="11" fill="${label}" letter-spacing="1">
    <text x="40" y="44">PLATE / ${String(s).padStart(3,'0')}</text>
  </g>
</svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}

// ---------------------------------------------------------------------------
// Editorial plate factory. Composes distinct monochrome scenes — module maps,
// density ladders, alarm triage queues, funnels, identity constructions — so
// every plate is visually different and "composed", not grid-filler.
// ---------------------------------------------------------------------------
function plate(kind, opts = {}) {
  const tone = opts.tone || 'dark';
  const ink  = tone === 'dark' ? '#E6E8EC' : '#050608';
  const bg0  = tone === 'dark' ? '#141923' : '#E6E3DC';
  const bg1  = tone === 'dark' ? '#0A0D14' : '#EFEDE6';
  const rule = tone === 'dark' ? 'rgba(230,232,236,0.10)' : 'rgba(5,6,8,0.08)';
  const soft = tone === 'dark' ? 'rgba(230,232,236,0.55)' : 'rgba(5,6,8,0.55)';
  const dim  = tone === 'dark' ? 'rgba(230,232,236,0.28)' : 'rgba(5,6,8,0.28)';
  const DISP = `font-family='Big Shoulders, Impact, ui-sans-serif, sans-serif'`;
  const MONO = `font-family='JetBrains Mono, ui-monospace, monospace'`;
  const SANS = `font-family='Space Grotesk, ui-sans-serif, sans-serif'`;

  const defs = `
    <defs>
      <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='${bg0}'/>
        <stop offset='1' stop-color='${bg1}'/>
      </linearGradient>
      <pattern id='grid' width='80' height='80' patternUnits='userSpaceOnUse'>
        <path d='M 80 0 L 0 0 0 80' fill='none' stroke='${rule}' stroke-width='0.5'/>
      </pattern>
    </defs>`;

  const frame = `
    <rect width='1200' height='800' fill='url(#bg)'/>
    <rect width='1200' height='800' fill='url(#grid)'/>
    <rect x='40' y='40' width='1120' height='720' fill='none' stroke='${rule}' stroke-width='0.5'/>`;

  const eyebrow = (text) =>
    `<g ${MONO} font-size='11' fill='${dim}' letter-spacing='1.2'>
       <text x='56' y='78'>${text}</text>
     </g>`;

  let body = '';

  if (kind === 'system-overview') {
    const cells = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        const x = 140 + c * 220, y = 200 + r * 160;
        const active = (r === 1 && c === 2);
        cells.push(
          `<rect x='${x}' y='${y}' width='200' height='140' fill='none' stroke='${active ? ink : rule}' stroke-width='${active ? 1 : 0.5}'/>` +
          `<text x='${x + 10}' y='${y + 22}' ${MONO} font-size='10' fill='${dim}' letter-spacing='1'>M/${String(r*4+c+1).padStart(2,'0')}</text>` +
          (active ? `<text x='${x + 10}' y='${y + 122}' ${MONO} font-size='10' fill='${ink}' letter-spacing='1'>CORE</text>` : '')
        );
      }
    }
    body = `
      ${eyebrow('FARSIGHT / SYSTEM MAP · 20 MODULES')}
      <text x='56' y='170' ${DISP} font-size='110' font-weight='500' fill='${ink}' letter-spacing='-2'>ONE LANGUAGE</text>
      ${cells.join('')}
      <text x='56' y='740' ${MONO} font-size='10' fill='${dim}' letter-spacing='1.5'>6 TEAMS · 30+ ENGINEERS · SHARED VOCABULARY</text>`;
  }

  else if (kind === 'density') {
    const rows = [
      ['COMPACT', 14, 16],
      ['DEFAULT', 18, 24],
      ['COMFORT', 24, 36],
      ['READING', 32, 52],
    ];
    body = `${eyebrow('DENSITY MODES · /04')}`;
    rows.forEach(([name, size, gap], i) => {
      const y = 180 + i * 130;
      body += `
        <line x1='56' y1='${y - 26}' x2='1144' y2='${y - 26}' stroke='${rule}' stroke-width='0.5'/>
        <text x='56' y='${y}' ${MONO} font-size='10' fill='${dim}' letter-spacing='1.5'>${name}</text>
        <text x='220' y='${y}' ${SANS} font-size='${size}' fill='${ink}'>Turbine T-0042 · Generator winding temp 84°C</text>
        <text x='220' y='${y + gap}' ${SANS} font-size='${Math.round(size*0.7)}' fill='${soft}'>Severity 02 · since 14:22 UTC · crew dispatched</text>`;
    });
  }

  else if (kind === 'alert-triage') {
    const rows = [
      ['01', 'CRITICAL', 'Inverter string 04 · ground fault',     '00:12'],
      ['02', 'HIGH',     'T-0042 · gearbox temp out of band',      '00:48'],
      ['03', 'HIGH',     'T-0117 · pitch drive drift',             '02:14'],
      ['04', 'MEDIUM',   'Combiner box · humidity 72%',            '04:03'],
      ['05', 'MEDIUM',   'Substation · SCADA link degraded',       '06:22'],
      ['06', 'LOW',      'T-0088 · vibration outlier',             '08:10'],
      ['07', 'LOW',      'T-0201 · yaw misalignment',              '11:55'],
    ];
    body = `${eyebrow('GRID-OPS / ALERT QUEUE')}
      <text x='56' y='150' ${DISP} font-size='72' font-weight='500' fill='${ink}' letter-spacing='-1'>SEVERITY FIRST</text>`;
    rows.forEach((r, i) => {
      const y = 230 + i * 62;
      const isCrit = r[1] === 'CRITICAL';
      body += `
        <rect x='56' y='${y - 24}' width='4' height='34' fill='${isCrit ? ink : dim}'/>
        <text x='80'  y='${y}' ${MONO} font-size='11' fill='${dim}' letter-spacing='1.5'>${r[0]}</text>
        <text x='140' y='${y}' ${MONO} font-size='11' fill='${isCrit ? ink : soft}' letter-spacing='1.5'>${r[1]}</text>
        <text x='320' y='${y}' ${SANS} font-size='15' fill='${ink}'>${r[2]}</text>
        <text x='1100' y='${y}' ${MONO} font-size='11' fill='${dim}' text-anchor='end'>+${r[3]}</text>
        <line x1='56' y1='${y + 20}' x2='1144' y2='${y + 20}' stroke='${rule}' stroke-width='0.5'/>`;
    });
  }

  else if (kind === 'control-room') {
    let bars = '';
    const heights = [60, 90, 45, 130, 70, 110, 95, 150, 120, 80, 60, 140, 95, 170, 130];
    heights.forEach((h, i) => {
      bars += `<rect x='${580 + i * 38}' y='${620 - h}' width='28' height='${h}' fill='${ink}' opacity='${0.25 + (i / heights.length) * 0.75}'/>`;
    });
    body = `${eyebrow('CONTROL ROOM · WALL / 4K')}
      <text x='56' y='190' ${DISP} font-size='180' font-weight='600' fill='${ink}' letter-spacing='-3'>99.9%</text>
      <text x='56' y='240' ${MONO} font-size='11' fill='${dim}' letter-spacing='1.5'>FLEET UPTIME · ROLLING 30D</text>
      <text x='56' y='360' ${DISP} font-size='84' font-weight='500' fill='${soft}' letter-spacing='-1'>−62%</text>
      <text x='56' y='400' ${MONO} font-size='11' fill='${dim}' letter-spacing='1.5'>TIME-TO-DIAGNOSE</text>
      <text x='56' y='500' ${DISP} font-size='84' font-weight='500' fill='${soft}' letter-spacing='-1'>−48%</text>
      <text x='56' y='540' ${MONO} font-size='11' fill='${dim}' letter-spacing='1.5'>ALARM FATIGUE</text>
      <line x1='580' y1='620' x2='1140' y2='620' stroke='${rule}' stroke-width='0.5'/>
      ${bars}
      <text x='580' y='660' ${MONO} font-size='10' fill='${dim}' letter-spacing='1.5'>INCIDENTS / HOUR · LAST 15H</text>`;
  }

  else if (kind === 'asset-detail') {
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
      <text x='660' y='630' ${MONO} font-size='11' fill='${dim}' letter-spacing='1.5'>LAST SERVICE · 12 DAYS</text>`;
  }

  else if (kind === 'landing-variants') {
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
      <text x='${x + 20}' y='620' ${DISP} font-size='64' font-weight='500' fill='${ink}' letter-spacing='-1'>${lift}</text>`;
    body = `${eyebrow('TOPTAL / LANDING · A / B')}
      <text x='56' y='150' ${DISP} font-size='56' font-weight='500' fill='${ink}' letter-spacing='-1'>CONTROL vs VARIANT</text>
      ${card(140, 'A · CONTROL', '24.8%')}
      ${card(620, 'B · SHIPPED', '34.0%')}`;
  }

  else if (kind === 'funnel') {
    const steps = [
      ['LAND',      1200, '100%'],
      ['INTEREST',   920, '77%'],
      ['START',      740, '62%'],
      ['QUALIFY',    540, '45%'],
      ['SUBMIT',     408, '34%'],
    ];
    body = `${eyebrow('FUNNEL · TALENT SIGNUP')}
      <text x='56' y='150' ${DISP} font-size='56' font-weight='500' fill='${ink}' letter-spacing='-1'>PROGRESSIVE DISCLOSURE</text>`;
    steps.forEach((s, i) => {
      const y = 220 + i * 100;
      const w = s[1];
      const x = (1200 - w) / 2;
      body += `
        <rect x='${x}' y='${y}' width='${w}' height='60' fill='${ink}' opacity='${0.85 - i * 0.15}'/>
        <text x='${x + 20}' y='${y + 38}' ${MONO} font-size='12' fill='${bg0}' letter-spacing='1.5'>${String(i+1).padStart(2,'0')} · ${s[0]}</text>
        <text x='${x + w - 20}' y='${y + 38}' ${MONO} font-size='12' fill='${bg0}' text-anchor='end' letter-spacing='1.5'>${s[2]}</text>`;
    });
    body += `<text x='56' y='770' ${MONO} font-size='10' fill='${dim}' letter-spacing='1.5'>+37% COMPLETION · −24% CPA · 8 EXPERIMENTS</text>`;
  }

  else if (kind === 'experiments') {
    const rows = [
      ['01', 'Social-proof micro-moment above fold',      '+4.2%'],
      ['02', 'Split long form into 3 steps',              '+6.8%'],
      ['03', 'Defer credentials upload to step 3',        '+3.1%'],
      ['04', 'Remove CAPTCHA for vetted IPs',             '+2.4%'],
      ['05', 'Headline: skill-first, not company-first',  '+5.0%'],
      ['06', 'Progress indicator with step labels',       '+1.9%'],
      ['07', 'Inline validation instead of page-level',   '+4.7%'],
      ['08', 'Currency pre-fill by geo',                  '+3.6%'],
    ];
    body = `${eyebrow('EXPERIMENT LOG · Q1–Q4')}
      <text x='56' y='150' ${DISP} font-size='56' font-weight='500' fill='${ink}' letter-spacing='-1'>8 SHIPPED · 2.1× COMPOUND</text>`;
    rows.forEach((r, i) => {
      const y = 240 + i * 58;
      body += `
        <text x='56'  y='${y}' ${MONO} font-size='11' fill='${dim}' letter-spacing='1.5'>EXP</text>
        <text x='100' y='${y}' ${MONO} font-size='11' fill='${ink}' letter-spacing='1.5'>${r[0]}</text>
        <text x='160' y='${y}' ${SANS} font-size='15' fill='${ink}'>${r[1]}</text>
        <text x='1144' y='${y}' ${MONO} font-size='13' fill='${ink}' text-anchor='end' letter-spacing='1'>${r[2]}</text>
        <line x1='56' y1='${y + 20}' x2='1144' y2='${y + 20}' stroke='${rule}' stroke-width='0.5'/>`;
    });
  }

  else if (kind === 'identity') {
    body = `${eyebrow('IDENTITY · FIT4BOX / WORDMARK')}
      <text x='600' y='460' ${DISP} font-size='260' font-weight='700' fill='${ink}' letter-spacing='-6' text-anchor='middle'>FIT4BOX</text>
      <line x1='56'  y1='500' x2='1144' y2='500' stroke='${ink}' stroke-width='0.75'/>
      <line x1='56'  y1='360' x2='1144' y2='360' stroke='${rule}' stroke-width='0.5'/>
      <line x1='56'  y1='230' x2='1144' y2='230' stroke='${rule}' stroke-width='0.5'/>
      <text x='56'  y='550' ${MONO} font-size='10' fill='${dim}' letter-spacing='1.5'>BASELINE</text>
      <text x='56'  y='380' ${MONO} font-size='10' fill='${dim}' letter-spacing='1.5'>X-HEIGHT</text>
      <text x='56'  y='250' ${MONO} font-size='10' fill='${dim}' letter-spacing='1.5'>CAP</text>
      <text x='56'  y='720' ${MONO} font-size='10' fill='${dim}' letter-spacing='1.5'>BUILT FOR GRIP · SWEAT · VOLUME</text>
      <text x='1144' y='720' ${MONO} font-size='10' fill='${dim}' text-anchor='end' letter-spacing='1.5'>SP / BR · 2023</text>`;
  }

  else if (kind === 'lookbook') {
    const fig = (x, h) => `
      <rect x='${x - 40}' y='${440 - h}' width='80' height='${h}' fill='${ink}' opacity='0.85'/>
      <circle cx='${x}' cy='${420 - h}' r='24' fill='${ink}' opacity='0.85'/>
      <rect x='${x - 24}' y='${440}' width='14' height='180' fill='${ink}' opacity='0.7'/>
      <rect x='${x + 10}' y='${440}' width='14' height='180' fill='${ink}' opacity='0.7'/>`;
    body = `${eyebrow('SS25 · LOOKBOOK / FRAME 04')}
      <text x='56' y='760' ${DISP} font-size='56' font-weight='500' fill='${ink}' letter-spacing='-1'>NO SHOUT</text>
      ${fig(300, 240)}
      ${fig(600, 260)}
      ${fig(900, 230)}`;
  }

  else if (kind === 'pdp') {
    body = `${eyebrow('STORE · PDP / GRIP-TEE 002')}
      <rect x='56' y='120' width='540' height='620' fill='${soft}' opacity='0.12'/>
      <rect x='220' y='200' width='220' height='420' fill='${ink}' opacity='0.7'/>
      <circle cx='330' cy='290' r='30' fill='${bg0}'/>
      <text x='640' y='180' ${DISP} font-size='72' font-weight='600' fill='${ink}' letter-spacing='-1'>GRIP-TEE</text>
      <text x='640' y='220' ${MONO} font-size='11' fill='${dim}' letter-spacing='1.5'>002 · BONE / COMBED COTTON</text>
      <line x1='640' y1='250' x2='1144' y2='250' stroke='${rule}' stroke-width='0.5'/>
      <text x='640' y='310' ${DISP} font-size='56' font-weight='500' fill='${ink}' letter-spacing='-1'>€ 58</text>
      <text x='640' y='360' ${SANS} font-size='14' fill='${soft}'>Built to move. Tight shoulders, loose</text>
      <text x='640' y='382' ${SANS} font-size='14' fill='${soft}'>waist, seams that don't fight grip work.</text>
      <g ${MONO} font-size='11' fill='${dim}' letter-spacing='1.5'>
        <rect x='640' y='430' width='56' height='40' fill='none' stroke='${rule}'/>
        <text x='668' y='455' fill='${ink}' text-anchor='middle'>S</text>
        <rect x='706' y='430' width='56' height='40' fill='none' stroke='${ink}' stroke-width='1'/>
        <text x='734' y='455' fill='${ink}' text-anchor='middle'>M</text>
        <rect x='772' y='430' width='56' height='40' fill='none' stroke='${rule}'/>
        <text x='800' y='455' fill='${ink}' text-anchor='middle'>L</text>
        <rect x='838' y='430' width='56' height='40' fill='none' stroke='${rule}'/>
        <text x='866' y='455' fill='${ink}' text-anchor='middle'>XL</text>
      </g>
      <rect x='640' y='510' width='260' height='50' fill='${ink}'/>
      <text x='770' y='542' ${MONO} font-size='11' fill='${bg0}' text-anchor='middle' letter-spacing='1.5'>ADD TO BAG</text>
      <text x='640' y='640' ${MONO} font-size='10' fill='${dim}' letter-spacing='1.5'>38% REPEAT / SIZE UP IF BETWEEN</text>`;
  }

  else if (kind === 'campaign') {
    body = `${eyebrow('CAMPAIGN · AW24 / FILM STILL')}
      <text x='56' y='280' ${DISP} font-size='150' font-weight='600' fill='${ink}' letter-spacing='-3'>TRAIN.</text>
      <text x='56' y='430' ${DISP} font-size='150' font-weight='600' fill='${ink}' letter-spacing='-3'>WASH.</text>
      <text x='56' y='580' ${DISP} font-size='150' font-weight='600' fill='${ink}' letter-spacing='-3'>REPEAT.</text>
      <line x1='56' y1='620' x2='400' y2='620' stroke='${ink}' stroke-width='1'/>
      <text x='56' y='700' ${MONO} font-size='11' fill='${dim}' letter-spacing='2'>FIT4BOX · APPAREL FOR PEOPLE WHO ACTUALLY TRAIN</text>`;
  }

  else if (kind === 'packaging') {
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
      <text x='600' y='660' ${MONO} font-size='10' fill='${dim}' text-anchor='middle' letter-spacing='2'>TRAIN · WASH · REPEAT</text>`;
  }

  else if (kind === 'before-after') {
    let beforeCells = '';
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 9; c++) {
        const op = 0.45 + ((r * 9 + c) * 37 % 100) / 250;
        beforeCells += `<rect x='${80 + c * 50}' y='${200 + r * 50}' width='42' height='42' fill='${ink}' opacity='${op}'/>`;
      }
    }
    let afterCells = '';
    const hotspots = new Set(['0,1','3,5','5,2']);
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 9; c++) {
        const hot = hotspots.has(`${r},${c}`);
        afterCells += `<rect x='${680 + c * 50}' y='${200 + r * 50}' width='42' height='42' fill='${hot ? ink : soft}' opacity='${hot ? 1 : 0.15}'/>`;
      }
    }
    body = `${eyebrow('BEFORE / AFTER · ALARM WALL')}
      <text x='80' y='170' ${MONO} font-size='11' fill='${dim}' letter-spacing='1.5'>BEFORE · EVERYTHING IS URGENT</text>
      ${beforeCells}
      <text x='680' y='170' ${MONO} font-size='11' fill='${dim}' letter-spacing='1.5'>AFTER · SEVERITY SCOPED</text>
      ${afterCells}
      <text x='80' y='660' ${DISP} font-size='48' font-weight='500' fill='${ink}' letter-spacing='-1'>54 ALERTS</text>
      <text x='80' y='700' ${MONO} font-size='10' fill='${dim}' letter-spacing='1.5'>OPERATOR SCANS · FATIGUE HIGH</text>
      <text x='680' y='660' ${DISP} font-size='48' font-weight='500' fill='${ink}' letter-spacing='-1'>3 CRITICAL</text>
      <text x='680' y='700' ${MONO} font-size='10' fill='${dim}' letter-spacing='1.5'>OPERATOR ACTS · REST IS AMBIENT</text>`;
  }

  else if (kind === 'component-library') {
    const swatch = (x, y, label, shade) => `
      <rect x='${x}' y='${y}' width='120' height='120' fill='${ink}' opacity='${shade}'/>
      <text x='${x}' y='${y + 144}' ${MONO} font-size='10' fill='${dim}' letter-spacing='1.5'>${label}</text>`;
    body = `${eyebrow('COMPONENT LIBRARY · /V3.2')}
      <text x='56' y='150' ${DISP} font-size='56' font-weight='500' fill='${ink}' letter-spacing='-1'>TOKENS &amp; PRIMITIVES</text>
      ${swatch(56,  220, 'INK',      1.0)}
      ${swatch(200, 220, 'STEEL',    0.7)}
      ${swatch(344, 220, 'GRAPHITE', 0.45)}
      ${swatch(488, 220, 'FOG',      0.22)}
      ${swatch(632, 220, 'RULE',     0.08)}
      <rect x='56'  y='420' width='260' height='44' fill='${ink}'/>
      <text x='186' y='449' ${MONO} font-size='11' fill='${bg0}' text-anchor='middle' letter-spacing='1.5'>PRIMARY</text>
      <rect x='336' y='420' width='260' height='44' fill='none' stroke='${ink}' stroke-width='1'/>
      <text x='466' y='449' ${MONO} font-size='11' fill='${ink}' text-anchor='middle' letter-spacing='1.5'>SECONDARY</text>
      <rect x='616' y='420' width='260' height='44' fill='none' stroke='${rule}' stroke-width='0.5'/>
      <text x='746' y='449' ${MONO} font-size='11' fill='${soft}' text-anchor='middle' letter-spacing='1.5'>GHOST</text>
      <rect x='56'  y='500' width='820' height='60' fill='none' stroke='${rule}'/>
      <text x='76'  y='538' ${MONO} font-size='12' fill='${soft}' letter-spacing='1.5'>INPUT · TEXT</text>
      <rect x='56'  y='580' width='820' height='100' fill='none' stroke='${rule}'/>
      <text x='76'  y='618' ${MONO} font-size='12' fill='${soft}' letter-spacing='1.5'>CARD · ASSET</text>
      <line x1='76' y1='638' x2='400' y2='638' stroke='${rule}'/>
      <text x='76'  y='662' ${DISP} font-size='24' font-weight='500' fill='${ink}' letter-spacing='-0.5'>T-0042 · NOMINAL</text>`;
  }

  else if (kind === 'loss-waterfall') {
    const steps = [
      ['THEORETICAL MAX',   1100, ''],
      ['− WAKE',             980, '−9%'],
      ['− AVAILABILITY',     900, '−4%'],
      ['− ELECTRICAL',       860, '−2%'],
      ['− PERFORMANCE',      800, '−3%'],
      ['− ENVIRONMENTAL',    760, '−2%'],
      ['− CURTAILMENT',      660, '−7%'],
      ['= NET ENERGY',       660, ''],
    ];
    body = `${eyebrow('LOSS WATERFALL · IEC 61400-15')}
      <text x='56' y='150' ${DISP} font-size='56' font-weight='500' fill='${ink}' letter-spacing='-1'>ONE LOSS LEDGER</text>`;
    steps.forEach((s, i) => {
      const y = 200 + i * 68;
      const w = s[1];
      const x = 56 + (1100 - w) / 2;
      const isNet = s[0].startsWith('=');
      body += `
        <rect x='${x}' y='${y}' width='${w}' height='40' fill='${isNet ? ink : soft}' opacity='${isNet ? 1 : 0.35 + (1 - i / steps.length) * 0.4}'/>
        <text x='${x + 16}' y='${y + 26}' ${MONO} font-size='11' fill='${isNet ? bg0 : ink}' letter-spacing='1.5'>${s[0]}</text>
        <text x='${x + w - 16}' y='${y + 26}' ${MONO} font-size='11' fill='${isNet ? bg0 : ink}' text-anchor='end' letter-spacing='1.5'>${s[2]}</text>`;
    });
    body += `<text x='56' y='740' ${MONO} font-size='10' fill='${dim}' letter-spacing='1.5'>8 CATEGORIES · BRIDGES PRE-CONSTRUCTION &amp; OPERATIONAL STANDARDS</text>`;
  }

  else if (kind === 'availability-gap') {
    const rows = [
      ['TECHNICAL',   94.1, 'ASSET OWNERS · SCHEDULED MAINT. = UNAVAILABLE'],
      ['OPERATIONAL', 95.0, 'FULL-SYSTEM OWNERS · CONFIGURABLE EXCLUSIONS'],
      ['CONTRACTUAL', 95.8, 'OEMS · SCHEDULED MAINT. CARVED OUT'],
    ];
    body = `${eyebrow('AVAILABILITY · THREE DEFINITIONS, ONE DATASET')}
      <text x='56' y='150' ${DISP} font-size='56' font-weight='500' fill='${ink}' letter-spacing='-1'>THE 1–2% GAP</text>`;
    rows.forEach((r, i) => {
      const y = 220 + i * 150;
      const w = (r[1] / 100) * 1000;
      body += `
        <text x='56' y='${y - 14}' ${MONO} font-size='11' fill='${dim}' letter-spacing='1.5'>${r[0]}</text>
        <rect x='56' y='${y}' width='1000' height='36' fill='none' stroke='${rule}' stroke-width='0.5'/>
        <rect x='56' y='${y}' width='${w}' height='36' fill='${i === 2 ? ink : soft}' opacity='${i === 2 ? 1 : 0.55}'/>
        <text x='${56 + w + 16}' y='${y + 25}' ${DISP} font-size='22' font-weight='500' fill='${ink}'>${r[1]}%</text>
        <text x='56' y='${y + 58}' ${MONO} font-size='10' fill='${dim}' letter-spacing='1'>${r[2]}</text>`;
    });
    body += `<text x='56' y='700' ${MONO} font-size='10' fill='${dim}' letter-spacing='1.5'>SAME DATA · THREE NUMBERS · #1 SOURCE OF OEM DISPUTES</text>`;
  }

  else {
    body = eyebrow('PLATE');
  }

  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800' preserveAspectRatio='xMidYMid slice'>` +
    defs + frame + body + `</svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}

window.CASES = [
  {
    id: 'farsight',
    num: '001',
    client: 'BaxEnergy — a Yokogawa Company',
    clientShort: 'BaxEnergy',
    project: 'Farsight Design Direction & System',
    projectShort: 'Farsight',
    year: '2024 — PRESENT',
    role: 'Lead Designer / Design Ops',
    scope: 'Enterprise SaaS · 20+ modules · 6 teams',
    domain: 'SaaS',
    tabLabel: 'BAXENERGY FARSIGHT',
    hero: 'assets/bg-farsight.jpg',
    abstract: 'Farsight shipped with no unified design direction — new modules clashed, onboarding suffered, entry-users were lost. I led the visual and UX reset: a 3-layer token architecture, 24 production components, and a reusable KPI-page pattern that let 30+ engineers across 6 teams ship consistent analysis pages without re-inventing layout each time.',
    kpis: [
      { k: 'CLIENTS ONBOARDED', v: 10, suffix: '+', unit: true },
      { k: 'NEW MODULES', v: 20, suffix: '+', unit: true },
      { k: 'ENGINEERS GUIDED', v: 30, suffix: '+', unit: true },
      { k: 'TEAMS ALIGNED', v: 6, suffix: '', unit: false },
    ],
    plates: [
      { label: 'SYSTEM OVERVIEW',                          art: plate('system-overview', { tone: 'dark' }) },
      { label: 'KPI PAGE TEMPLATE · TURBULENCE INTENSITY',  art: 'url(assets/farsight/ti-over-time.png)' },
      { label: 'KPI PAGE TEMPLATE · POWER CURVE',           art: 'url(assets/farsight/ti-power-curve.png)' },
      { label: 'DESIGN SYSTEM · TOKENS & COMPONENTS',       art: 'url(assets/farsight/design-system.png)' },
    ],
    impact: [
      { k: 'CLIENTS ONBOARDED', note: 'Enterprise rollouts ship without bespoke UI per tenant.' },
      { k: 'NEW MODULES',       note: 'New surface area ships on-system — no more quarterly re-skin.' },
      { k: 'ENGINEERS GUIDED',  note: 'Design reviews embedded in every sprint across 6 teams.' },
      { k: 'TEAMS ALIGNED',     note: 'One type scale, one density, one motion language.' },
    ],
    deep: {
      context: 'Farsight is BaxEnergy\'s flagship platform for monitoring renewable-energy assets — wind, solar, hydro, storage — at utility scale. When I joined, the product had grown by accretion: six teams, each owning their modules, each drifting in their own direction. Different densities, three button variants, two motion languages, inconsistent severity colors. The cost landed on the users — grid operators, not software engineers — who had to relearn the interface every time they crossed a module boundary. Heavy-weight users shipped around it with keyboard hacks and saved queries; entry users quit. Sales demos started with apologies. The engineering leads weren\'t wrong — they were unmanaged.',
      approach: 'I ran a 6-week audit across every module, catalogued every control, state, and motion curve, and mapped the overlaps and conflicts. Then I rebuilt the vocabulary from zero: one type scale, four density modes (so the same component reads at both a laptop and a 4K wall), one severity color ramp, one stepped motion language. The system itself has three layers — primitives, semantic aliases, components — validated by an automated pipeline so a raw hex value never survives review; it now ships 24 production components in light and dark. For the analysis surfaces specifically, I built one KPI-page pattern — header, control bar, KPI strip, chart array — starting with the Turbulence Intensity page, then reused it verbatim for Wind Curtailment, NTF, and Solar Analysis, so every new analysis page shipped in days, not a fresh layout negotiation. The deliverable was not a Figma file — it was a shared ritual. Design reviews embedded in every sprint. A weekly system-sync with eng leads where we argued tradeoffs before code, not after. Most importantly: I co-owned roadmap decisions with engineering, so design constraints became product constraints. Killing the "designer hands off, engineering re-invents" loop was worth more than any specific token.',
      outcome: 'Over 18 months: 20+ new modules shipped on-system, 10+ enterprise clients onboarded without custom design work, 30+ engineers fluent in the language. The system scales without me — junior designers ship against it, engineers catch drift in review. What the numbers don\'t show: the sales org stopped starting demos with apologies, and onboarding for a new grid operator dropped from weeks to days. Design stopped being a cost center; it became a velocity multiplier.',
      reflection: 'What I\'d do differently: I under-invested in component governance early. For the first quarter I was the bottleneck — every new token came through me. I should have handed ownership to a lead-per-team sooner and kept only final sign-off. The lesson: systems scale when authorship does. My job is to make my role redundant.',
    },
  },
  {
    id: 'grid-ops',
    num: '002',
    client: 'BaxEnergy — a Yokogawa Company',
    clientShort: 'BaxEnergy',
    project: 'Grid-Ops Control Center',
    projectShort: 'Grid-Ops',
    year: '2023',
    role: 'Senior Product Designer',
    scope: 'Real-time SaaS · 24/7 control room',
    domain: 'SaaS',
    tabLabel: 'BAXENERGY GRID-OPS',
    hero: 'assets/bg-grid-ops.jpg',
    abstract: 'Grid-Ops is the command surface for operators monitoring thousands of renewable assets in real time — a portfolio dashboard built on a 12-column widget grid with 9 reusable chart types (KPI cards, stacked-area, donut, gauge, heatmap, sparkline tables, scatter maps). The brief: cut time-to-diagnose, reduce alarm fatigue, make the interface readable at 3am on a 4K wall.',
    kpis: [
      { k: 'TIME-TO-DIAGNOSE', v: -62, suffix: '%', unit: true },
      { k: 'ALARMS FATIGUE', v: -48, suffix: '%', unit: true },
      { k: 'ASSETS MONITORED', v: 12, suffix: 'k', unit: false },
      { k: 'UPTIME', v: 99.9, suffix: '%', unit: false, decimals: 1 },
    ],
    plates: [
      { label: 'PORTFOLIO WIDGET GRID', art: 'url(assets/grid-ops/dashboard-widgets.png)' },
      { label: 'FLEET AVAILABILITY',    art: 'url(assets/grid-ops/dashboard-1.png)' },
      { label: 'BEFORE / AFTER',        art: plate('before-after', { tone: 'dark' }) },
      { label: 'ASSET DETAIL',          art: plate('asset-detail', { tone: 'dark' }) },
    ],
    impact: [
      { k: 'TIME-TO-DIAGNOSE', note: 'A shift lead now handles 3 concurrent incidents where one used to saturate them.' },
      { k: 'ALARMS FATIGUE',   note: 'Operators stopped dismissing alarms by reflex — real criticals get acted on.' },
      { k: 'ASSETS MONITORED', note: '12k assets across wind, solar, and storage surface in one coherent view.' },
      { k: 'UPTIME',           note: 'Four control centers across Europe and Asia-Pacific, zero UI-caused incidents.' },
    ],
    deep: {
      context: 'Grid-Ops operators work 12-hour shifts inside control rooms that never sleep. A single dispatcher watches thousands of turbines, inverters, and substations across a continent, and the consequence of missing something isn\'t a bad UX score — it\'s a grid event, a fined customer, or worse. The legacy UI was built by the engineers who understood the data best, which meant everything shouted. Every anomaly — a 2°C temperature drift, a critical ground fault — looked the same shade of red. Operators coped by dismissing alarms in bulk, which meant real criticals got lost in noise. On ride-alongs I watched a shift lead miss an inverter fault for 11 minutes because it rendered identically to 40 routine warnings stacked above it. That was the north star: the UI should not be a source of cognitive load at 3am.',
      approach: 'Three decisions shaped everything. First, severity-first information architecture: every screen sorts by impact, not by timestamp or asset ID. A critical fault owns the top of the viewport until acknowledged; lows fall into an ambient band that can be scanned peripherally. Second, color as hazard, not decoration: I pulled red from the palette entirely except for genuine P0 events. Standard state lives in neutral steel; severity uses shape, position, and weight before it uses hue. Third, stepped mechanical motion — no springs, no easing flourishes. Operators read motion as change, so a wobble means data moved; a slide means the user moved. Spring physics in a control room is a lie. I also designed four density modes so the same components read at a laptop, a wall-desk, and a 4K control wall without re-layout. The dashboard itself is a drag-and-resize 12-column widget grid, so an operator\'s own priority view — which KPIs, which chart type, which arrangement — persists per-shift without engineering time; the same 9 chart primitives compose every widget on the wall.',
      outcome: 'Time-to-diagnose cut by 62% on the internal benchmark. Alarm-fatigue survey scores dropped 48% over six months. The operational result is what mattered: a shift lead now handles three concurrent incidents where one used to saturate them. Deployed across four control centers in Europe and Asia-Pacific, monitoring 12k+ assets at 99.9% uptime. One grid operator put it best in a post-launch interview: "I don\'t fight the screen anymore."',
      reflection: 'The hardest decision was killing color. Engineering pushed back hard — red is information density, they said. I built the dark-mode prototype, put it in a real control room for a week, and let the operators decide. They decided in an hour. The lesson: when domain experts defend the status quo on first principles, get them in a room with the users. First principles lose to lived experience.',
    },
  },
  {
    id: 'financial-losses',
    num: '003',
    client: 'BaxEnergy — a Yokogawa Company',
    clientShort: 'BaxEnergy',
    project: 'Financial Losses — Loss Taxonomy & Revenue Strategy',
    projectShort: 'Financial Losses',
    year: '2026',
    role: 'Design Lead · Product Strategy',
    scope: 'Research → spec · loss-accounting module',
    domain: 'SaaS',
    tabLabel: 'BAXENERGY LOSSES',
    hero: null,
    abstract: 'Farsight could tell an operator an asset\'s availability % but never how much revenue that represented, or why. I bridged three conflicting IEC standards — pre-construction, operational, contractual — into one loss taxonomy, and exposed the industry\'s most-disputed number: the 1–2% gap between OEM-reported and technical availability. The brief: turn a compliance metric into an auditable revenue argument.',
    kpis: [
      { k: 'LOSS CATEGORIES MAPPED', v: 8, suffix: '', unit: false },
      { k: 'IEC STANDARDS BRIDGED', v: 3, suffix: '', unit: false },
      { k: 'COMPETITORS BENCHMARKED', v: 6, suffix: '', unit: false },
      { k: 'DIFFERENTIATION ANGLES', v: 3, suffix: '', unit: false },
    ],
    plates: [
      { label: 'LOSS WATERFALL',     art: plate('loss-waterfall',   { tone: 'dark' }) },
      { label: 'AVAILABILITY GAP',   art: plate('availability-gap', { tone: 'dark' }) },
    ],
    impact: [
      { k: 'LOSS CATEGORIES MAPPED',   note: 'Every lost MWh now has a named cause — fault, curtailment, environmental, missing data — instead of one blended availability number.' },
      { k: 'IEC STANDARDS BRIDGED',    note: 'What the energy assessor predicted at project finance can finally be compared to what Farsight reports operationally — no platform on the market does this.' },
      { k: 'COMPETITORS BENCHMARKED',  note: 'Benchmarked against Power Factors, Bazefield, Vestas Scipher, GE APM, Clir, and AVEVA to find where every existing platform under-serves the financial layer.' },
      { k: 'DIFFERENTIATION ANGLES',   note: 'Three scoped opportunities handed to product and engineering, ranked by design complexity vs. contract/investor value.' },
    ],
    deep: {
      context: 'Farsight monitors wind, solar, and BESS assets and reports availability as a single percentage. It has never answered the two questions asset owners actually ask: how much energy did we lose and why, and how much revenue did that represent? The gap is structural, not cosmetic. Three IEC standards define this space — 61400-15 for pre-construction loss waterfalls, 61400-26-1/-2 for operational availability — and they use incompatible category definitions. An asset manager cannot compare what an energy assessor predicted at project finance with what the REMS reports two years into operation. Worse: the same operational data produces three legitimate but different availability numbers — technical, operational, contractual — depending on whether scheduled maintenance counts as downtime. The contractual number (the one OEMs report) runs 1–2% higher than the technical one by design. That 1–2% is real revenue, and it is the single largest source of disputes between asset owners and turbine OEMs.',
      approach: 'Three moves. First, I built a Farsight-native loss taxonomy — 8 categories — that maps cleanly onto IEC 61400-26\'s 13 operational turbine states while staying legible to an operator who has never read the standard: "turbine fault," "grid curtailment," "no wind," not state codes. Second, I split "compensated curtailment" out as its own category: when a grid operator curtails a site and pays for the lost production, that MWh is not a real revenue loss, and most platforms conflate it with uncompensated curtailment, systematically overstating losses. Third, I specced the page around two audiences sharing one dataset instead of two builds — Operator mode (last 7 days, MWh, "what\'s losing right now," click-through to the asset) and Manager mode (month-to-date, €, export) — because the same loss ledger has to serve a control-room decision and a board report without becoming two products. I benchmarked six platforms (Power Factors, Bazefield, Vestas, GE APM, Clir, AVEVA) to confirm the gap was real: nobody bridges pre-construction and operational taxonomies, and financial translation everywhere else is a single price multiplier bolted onto MWh, not a first-class model.',
      outcome: 'This shipped as a research brief and locked page structure — header, KPI strip, loss waterfall, category trend, detail table — not yet a built module; the open questions (which categories the backend can derive today, what price reference to use, whether curtailment compensation applies per client) went to product and engineering with clear ownership rather than sitting as unstated assumptions in a Figma file. Three differentiation angles came out ranked by cost and value: bridging the two IEC taxonomies (high design complexity, high investor value), a first-class carve-out ledger for OEM warranty disputes (medium complexity, very high contract value), and a toggle between the three availability definitions so the 1–2% gap becomes visible and auditable instead of a line item in a dispute (high value for owners in active OEM negotiations). Any of the three is a sellable feature on its own.',
      reflection: 'What I\'d do differently: I wrote most of this from standards documents and competitor teardown before pressure-testing the taxonomy with a single asset manager conversation. The 8 categories are probably right, but I don\'t yet know which distinctions an asset manager actually argues about at contract renewal versus which ones only matter to an energy assessor. The lesson: reference standards give you shared vocabulary, but only a domain user tells you which distinctions carry money.',
    },
  },
  {
    id: 'toptal',
    num: '004',
    client: 'Toptal',
    clientShort: 'Toptal',
    project: 'Growth Funnel Redesign',
    projectShort: 'Growth Funnel',
    year: '2022',
    role: 'Product Designer · Growth',
    scope: 'Acquisition funnel · 8 A/B tests',
    domain: 'Growth',
    tabLabel: 'TOPTAL GROWTH',
    hero: 'assets/bg-toptal.jpg',
    abstract: 'Rethought the top-of-funnel flow for talent signup. Cut form friction without cutting qualification. Every pixel on these pages costs or earns money — so every change ran as an experiment.',
    kpis: [
      { k: 'SIGNUP COMPLETION', v: 37, suffix: '%', unit: true },
      { k: 'CPA', v: -24, suffix: '%', unit: true },
      { k: 'EXPERIMENTS SHIPPED', v: 8, suffix: '', unit: false },
      { k: 'LIFT COMPOUND', v: 2.1, suffix: '×', unit: true, decimals: 1 },
    ],
    plates: [
      { label: 'LANDING · A / B', art: plate('landing-variants', { tone: 'dark' }) },
      { label: 'FUNNEL DIAGRAM',  art: plate('funnel',           { tone: 'dark' }) },
      { label: 'EXPERIMENT LOG',  art: plate('experiments',      { tone: 'dark' }) },
    ],
    impact: [
      { k: 'SIGNUP COMPLETION',  note: 'More qualified talent reaching the screen without softening the bar.' },
      { k: 'CPA',                note: 'Same quality, cheaper acquisition — the growth team reallocated the delta.' },
      { k: 'EXPERIMENTS SHIPPED', note: '8 shipped variants built on a shared hypothesis library, not one-off tests.' },
      { k: 'LIFT COMPOUND',      note: '2.1× over control — compounding came from staying in the same flow for a year.' },
    ],
    deep: {
      context: 'Toptal\'s top-of-funnel signup had plateaued. The product team had run dozens of tests and were getting diminishing returns — a hero-image swap, a CTA-color tweak, a headline A/B — all within noise. The hard constraint was that Toptal can\'t just "make it easier to sign up." The entire business model depends on the quality bar holding; more applicants matters only if they\'re more qualified applicants. So the question wasn\'t "how do we lift conversion" — it was "how do we lift qualified conversion without cutting the filter." That required treating the form as a product, not a wall.',
      approach: 'Three moves. First, I reframed the form as a conversation, not a gate. The old form front-loaded every sensitive question — resume, rate, legal status, references — on page one. Drop-off was enormous. I rebuilt it as progressive disclosure: skills and experience first (candidates love talking about those), credentials and rate later (once they\'ve invested). Second, social-proof at micro-moments: peer counts, domain-specific testimonials placed at the exact points on the hesitation curve where drop-off clustered. Third, a hypothesis library — every test logged its prior, the question it answered, and the cross-experiment interactions. Instead of 8 independent tests we got one learning system; we could compound lifts by knowing which variants played well together.',
      outcome: '+37% completion, −24% CPA, 2.1× compound lift over the control across 8 shipped experiments. The quality bar held — the filter moved from the form into the vetting loop behind it. Growth reallocated the CPA delta into new channels. The hypothesis library outlived the project: the team kept using it for two years after I left.',
      reflection: 'The biggest surprise was how much of the lift came from removing a single credentials-upload step from page one. A full quarter of the compound came from that one change. The lesson: in growth work, the expensive tests aren\'t the ones that move the number — the expensive ones are the ones that tell you which decision in the flow is actually binding. Everything else is local optimization.',
    },
  },
  {
    id: 'erico-adv',
    num: '005',
    light: true,
    liveUrl: 'https://ericoadv.vercel.app',
    client: 'Erico Advogados',
    clientShort: 'Erico Adv',
    project: 'Erico Advogados — Brand Microsite',
    projectShort: 'Erico Adv',
    year: '2026',
    role: 'Brand & Web Designer',
    scope: 'Brand microsite · single-page',
    domain: 'Brand',
    tabLabel: 'ERICO ADV',
    hero: 'assets/bg-erico.jpg',
    abstract: 'A brand microsite for a Brasília strategic-litigation firm, taken from positioning brief through to a deployed production build — plus a second, animation-heavy dark concept built to compare against the shipped direction.',
    kpis: [
      { k: 'LOGO VARIANTS', v: 60, suffix: '+', unit: false },
      { k: 'DESIGN CONCEPTS', v: 2, suffix: '', unit: false },
      { k: 'VENDOR LIBRARIES', v: 3, suffix: '', unit: false },
      { k: 'BUILD STEP', v: 0, suffix: '', unit: false },
    ],
    plates: [],
  },
  {
    id: 'destiny-pixel',
    num: '006',
    light: true,
    liveUrl: 'https://destiny-pixel.vercel.app',
    client: 'Personal Project',
    clientShort: 'Solo',
    project: 'Destiny Pixel — Run & Gun',
    projectShort: 'Destiny Pixel',
    year: '2026',
    role: 'Solo Designer / Builder',
    scope: 'Kaplay engine · single-file · solo',
    domain: 'Game',
    tabLabel: 'DESTINY PIXEL',
    hero: 'assets/bg-destiny-pixel.png',
    abstract: 'A Destiny-inspired pixel-art run-and-gun built solo end-to-end — three playable classes, five enemy variants, and a three-phase boss fight — directed and built through AI-orchestrated iteration rather than a traditional dev team.',
    kpis: [
      { k: 'PLAYABLE CLASSES', v: 3, suffix: '', unit: false },
      { k: 'ENEMY VARIANTS', v: 5, suffix: '', unit: false },
      { k: 'BOSS PHASES', v: 3, suffix: '', unit: false },
      { k: 'LINES SHIPPED', v: 2400, suffix: '+', unit: false },
    ],
    plates: [],
  },
];

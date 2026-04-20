// ============================================================
//  PAES M1 — Aula Virtual | script.js
//  Lee la clase activa desde localStorage y carga su contenido
// ============================================================
'use strict';

// ── CLASE ACTIVA ──
const claseNum = parseInt(localStorage.getItem('paes_activeClass') || '2');
const CLASE = CLASES_DATA[claseNum] || CLASES_DATA[2];

// ── ESTADO ──
const state = {
  currentTab: 'repaso',
  timerTotal: 6000, timerLeft: 6000, timerInterval: null,
  pdfResults: {}, pizarraInitialized: false,
  tool: 'draw', isDrawing: false,
  lastX: 0, lastY: 0, startX: 0, startY: 0,
  strokeColor: '#60efff', strokeSize: 4, snapshot: null
};

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  // Título
  document.getElementById('clase-titulo').textContent = `Clase ${claseNum} — ${CLASE.titulo}`;
  document.getElementById('clase-subtitulo').textContent = CLASE.subtitulo;
  document.title = `PAES M1 — Clase ${claseNum}: ${CLASE.titulo}`;

  renderRepaso();
  renderTeoria();
  renderEjercicios('facil', CLASE.facil);
  renderEjercicios('medio', CLASE.medio);
  renderEjercicios('dificil', CLASE.dificil);
  initTimer();
  initCheckboxes();
  addRingGradient();

  window.addEventListener('resize', () => {
    if (state.pizarraInitialized) resizePizarra();
  });
});

// ── TABS ──
function switchTab(tab, btn) {
  state.currentTab = tab;
  document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
  document.getElementById('section-'+tab).classList.add('active');
  btn.classList.add('active'); btn.setAttribute('aria-selected','true');
  window.scrollTo({top:0, behavior:'smooth'});
  if (tab === 'pizarra' && !state.pizarraInitialized) requestAnimationFrame(initPizarra);
}

// ── REPASO ──
function renderRepaso() {
  const grid = document.getElementById('repaso-grid');
  if (!grid || !CLASE.repaso) return;
  grid.innerHTML = CLASE.repaso.map((card, i) => `
    <div class="repaso-card">
      <div class="repaso-card-header">
        <span class="repaso-icon">${card.icono}</span>
        <h3>${card.titulo}</h3>
        <input type="checkbox" class="repaso-check" id="check-${i+1}"/>
      </div>
      <p>${card.desc}</p>
      <div class="formula-box"><code>${card.formula}</code></div>
      <ul class="concept-list">${card.items.map(it => `<li>${it}</li>`).join('')}</ul>
    </div>
  `).join('');
  document.getElementById('repaso-progress-text').textContent = `0 / ${CLASE.repaso.length} conceptos revisados`;
}

function initCheckboxes() {
  document.querySelectorAll('.repaso-check').forEach(c => c.addEventListener('change', updateRepasoProgress));
}
function updateRepasoProgress() {
  const checks = document.querySelectorAll('.repaso-check');
  const total = checks.length, checked = [...checks].filter(c => c.checked).length;
  const pct = Math.round((checked/total)*100);
  document.getElementById('repaso-progress-text').textContent = `${checked} / ${total} conceptos revisados`;
  document.getElementById('repaso-progress-bar').style.width = `${pct}%`;
}

// ── TEORÍA ──
function renderTeoria() {
  const indexList = document.getElementById('teoria-index-list');
  const content   = document.getElementById('teoria-content');
  if (!indexList || !content || !CLASE.teoria) return;

  indexList.innerHTML = CLASE.teoria.map((bloque, i) => `
    <li><a href="#${bloque.id}" class="index-link ${i===0?'active-link':''}"
      onclick="scrollToSection('${bloque.id}',this); return false;">${bloque.titulo}</a></li>
  `).join('');

  content.innerHTML = CLASE.teoria.map(bloque => `
    <div class="teoria-block" id="${bloque.id}">
      <h3>${bloque.titulo}</h3>
      <p>${bloque.contenido}</p>
      <div class="formula-card">
        <div class="formula-title">Fórmula</div>
        <div class="formula-math">${bloque.formula}</div>
        <div class="formula-example">Ejemplo: ${bloque.ejemplo}</div>
      </div>
    </div>
  `).join('');
}

function scrollToSection(id, linkEl) {
  const target = document.getElementById(id);
  if (target) {
    const offset = (document.querySelector('.header')?.offsetHeight||60) + (document.querySelector('.tab-nav')?.offsetHeight||50) + 16;
    window.scrollTo({top: target.getBoundingClientRect().top + window.pageYOffset - offset, behavior:'smooth'});
  }
  document.querySelectorAll('.index-link').forEach(l => l.classList.remove('active-link'));
  if (linkEl) linkEl.classList.add('active-link');
  return false;
}

// ── EJERCICIOS ──
function renderEjercicios(nivel, lista) {
  const container = document.getElementById(`practica-${nivel}-container`);
  if (!container || !lista) return;
  container.innerHTML = lista.map((ej, i) => `
    <div class="ejercicio-card" id="card-${ej.id}">
      <div class="ejercicio-num">${i+1}</div>
      <div class="ejercicio-enunciado">${ej.enunciado}</div>
      <div class="opciones-grid">
        ${ej.opciones.map((op,j) => `
          <label class="opcion-label" id="label-${ej.id}-${j}">
            <input type="radio" name="${ej.id}" value="${j}" id="radio-${ej.id}-${j}"/>
            ${op}
          </label>
        `).join('')}
      </div>
      <div id="feedback-${ej.id}" class="feedback-container"></div>
    </div>
  `).join('');
}

// ── CORRECCIÓN ──
function corregir(nivel) {
  const lista = CLASE[nivel];
  if (!lista) return;
  let correctas = 0;
  const errores = [];

  lista.forEach(ej => {
    const selected = document.querySelector(`input[name="${ej.id}"]:checked`);
    const card = document.getElementById(`card-${ej.id}`);
    const feedbackEl = document.getElementById(`feedback-${ej.id}`);
    card.classList.remove('correcto','incorrecto');
    ej.opciones.forEach((_,j) => document.getElementById(`label-${ej.id}-${j}`)?.classList.remove('correcta','incorrecta'));
    document.getElementById(`label-${ej.id}-${ej.correcta}`)?.classList.add('correcta');

    if (!selected) {
      card.classList.add('incorrecto');
      feedbackEl.innerHTML = `<span class="feedback-tag fail">⚠️ Sin responder — Respuesta: ${ej.opciones[ej.correcta]}</span>`;
      errores.push({area:ej.area});
    } else if (parseInt(selected.value) === ej.correcta) {
      correctas++;
      card.classList.add('correcto');
      feedbackEl.innerHTML = `<span class="feedback-tag ok">✅ ¡Correcto!</span>`;
    } else {
      card.classList.add('incorrecto');
      document.getElementById(`label-${ej.id}-${parseInt(selected.value)}`)?.classList.add('incorrecta');
      feedbackEl.innerHTML = `<span class="feedback-tag fail">❌ Incorrecto — Respuesta correcta: ${ej.opciones[ej.correcta]}</span>`;
      errores.push({area:ej.area});
    }
  });

  const pct = Math.round((correctas/lista.length)*100);
  mostrarResultado(nivel, correctas, lista.length, pct, errores);
  updateRing(pct);
  state.pdfResults[nivel] = {correctas, total:lista.length, pct, errores};
  lista.forEach(ej => document.querySelectorAll(`input[name="${ej.id}"]`).forEach(el => el.disabled=true));
  const btn = document.getElementById(`btn-corregir-${nivel}`);
  if (btn) { btn.disabled=true; btn.style.opacity='0.5'; }
}

function mostrarResultado(nivel, correctas, total, pct, errores) {
  const panel = document.getElementById(`resultado-${nivel}`);
  const emoji = pct>=80?'🎉':pct>=60?'👍':'📚';
  const msg   = pct>=80?'¡Excelente dominio!':pct>=60?'Buen trabajo, sigue practicando':'Necesitas repasar los conceptos clave';
  const areasError = [...new Set(errores.map(e=>e.area))];
  panel.style.display='block';
  panel.innerHTML = `
    <div class="resultado-score">
      <div class="score-num">${pct}%</div>
      <div class="score-sub">${emoji} ${correctas} de ${total} correctas — ${msg}</div>
    </div>
    ${areasError.length>0 ? `
    <div class="debilidades-list">
      <h4>📌 Áreas a reforzar:</h4>
      ${areasError.map(a=>`<div class="debilidad-item">⚡ ${a}</div>`).join('')}
    </div>` : '<div style="text-align:center;color:var(--accent-green);font-weight:600;margin-top:12px;">✅ ¡Dominio total del nivel! Sin áreas débiles.</div>'}
  `;
  panel.scrollIntoView({behavior:'smooth', block:'nearest'});
}

// ── TIMER ──
function initTimer() {
  state.timerInterval = setInterval(() => {
    if (state.timerLeft <= 0) { clearInterval(state.timerInterval); document.getElementById('timer-display').textContent='00:00'; document.getElementById('timer-display').style.color='var(--accent-red)'; return; }
    state.timerLeft--;
    const mins = Math.floor(state.timerLeft/60).toString().padStart(2,'0');
    const secs = (state.timerLeft%60).toString().padStart(2,'0');
    document.getElementById('timer-display').textContent=`${mins}:${secs}`;
    document.getElementById('timer-progress-fill').style.width=`${(state.timerLeft/state.timerTotal)*100}%`;
    if (state.timerLeft<600) { document.getElementById('timer-display').style.color='var(--accent-red)'; document.getElementById('timer-progress-fill').style.background='var(--accent-red)'; }
    else if (state.timerLeft<1800) document.getElementById('timer-display').style.color='var(--accent-orange)';
  }, 1000);
}

// ── PROGRESS RING ──
function addRingGradient() {
  const svg = document.querySelector('.progress-ring');
  if (!svg) return;
  const defs = document.createElementNS('http://www.w3.org/2000/svg','defs');
  defs.innerHTML=`<linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#60efff"/><stop offset="100%" style="stop-color:#4f8ef7"/></linearGradient>`;
  svg.insertBefore(defs, svg.firstChild);
}
function updateRing(pct) {
  const container = document.getElementById('progress-ring-container');
  const fill = document.getElementById('ring-fill');
  const text  = document.getElementById('ring-text');
  const c = 2*Math.PI*32;
  container.style.display='block';
  fill.style.strokeDasharray=`${c}`;
  fill.style.strokeDashoffset=`${c-(pct/100)*c}`;
  text.textContent=`${pct}%`;
}

// ── PIZARRA ──
function drawGrid(ctx, w, h) {
  ctx.fillStyle='#0a0c14'; ctx.fillRect(0,0,w,h);
  ctx.strokeStyle='rgba(96,239,255,0.05)'; ctx.lineWidth=1;
  for(let x=0;x<=w;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}
  for(let y=0;y<=h;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
}
function resizePizarra() {
  const canvas = document.getElementById('pizarra-canvas');
  const rect = canvas.getBoundingClientRect();
  const w = Math.round(rect.width), h = 500;
  if (canvas.width===w && canvas.height===h) return;
  const ctx = canvas.getContext('2d');
  const img = ctx.getImageData(0,0,canvas.width,canvas.height);
  canvas.width=w; canvas.height=h;
  drawGrid(ctx,w,h); ctx.putImageData(img,0,0);
}
function initPizarra() {
  const canvas = document.getElementById('pizarra-canvas');
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.round(rect.width) || (window.innerWidth-60);
  canvas.height = 500;
  drawGrid(canvas.getContext('2d'), canvas.width, canvas.height);
  state.pizarraInitialized = true;
  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDraw);
  canvas.addEventListener('mouseleave', stopDraw);
  canvas.addEventListener('touchstart', e=>{e.preventDefault();canvas.dispatchEvent(new MouseEvent('mousedown',{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY}));},{passive:false});
  canvas.addEventListener('touchmove',  e=>{e.preventDefault();canvas.dispatchEvent(new MouseEvent('mousemove',{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY}));},{passive:false});
  canvas.addEventListener('touchend',   e=>{e.preventDefault();canvas.dispatchEvent(new MouseEvent('mouseup'));},{passive:false});
}
function getPos(canvas, e) {
  const rect=canvas.getBoundingClientRect();
  return {x:(e.clientX-rect.left)*(canvas.width/rect.width), y:(e.clientY-rect.top)*(canvas.height/rect.height)};
}
function startDraw(e) {
  state.isDrawing=true;
  const canvas=document.getElementById('pizarra-canvas');
  const pos=getPos(canvas,e);
  state.lastX=pos.x; state.lastY=pos.y; state.startX=pos.x; state.startY=pos.y;
  if(state.tool==='line') state.snapshot=canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height);
}
function draw(e) {
  if(!state.isDrawing) return;
  const canvas=document.getElementById('pizarra-canvas');
  const ctx=canvas.getContext('2d');
  const pos=getPos(canvas,e);
  ctx.lineJoin='round'; ctx.lineCap='round';
  if(state.tool==='eraser'){ctx.globalCompositeOperation='destination-out';ctx.lineWidth=state.strokeSize*3;ctx.strokeStyle='rgba(0,0,0,1)';}
  else{ctx.globalCompositeOperation='source-over';ctx.strokeStyle=state.strokeColor;ctx.lineWidth=state.strokeSize;}
  if(state.tool==='line'){ctx.putImageData(state.snapshot,0,0);ctx.beginPath();ctx.moveTo(state.startX,state.startY);ctx.lineTo(pos.x,pos.y);ctx.stroke();}
  else{ctx.beginPath();ctx.moveTo(state.lastX,state.lastY);ctx.lineTo(pos.x,pos.y);ctx.stroke();state.lastX=pos.x;state.lastY=pos.y;}
}
function stopDraw() { state.isDrawing=false; document.getElementById('pizarra-canvas').getContext('2d').globalCompositeOperation='source-over'; }
function setTool(tool,btn) { state.tool=tool; document.querySelectorAll('.tool-btn').forEach(b=>b.classList.remove('active-tool')); btn.classList.add('active-tool'); }
function changeColor(color){state.strokeColor=color;}
function changeSize(size){state.strokeSize=parseInt(size);document.getElementById('brush-size-label').textContent=`${size}px`;}
function clearCanvas(){const canvas=document.getElementById('pizarra-canvas');canvas.getContext('2d').globalCompositeOperation='source-over';drawGrid(canvas.getContext('2d'),canvas.width,canvas.height);}
function downloadCanvas(){const canvas=document.getElementById('pizarra-canvas');const a=document.createElement('a');a.download=`pizarra-clase-${claseNum}.png`;a.href=canvas.toDataURL();a.click();}

// ── EXPORTAR PDF ──
function exportPDF() {
  const {jsPDF} = window.jspdf;
  if (!jsPDF) { alert('jsPDF no disponible'); return; }
  const doc = new jsPDF({orientation:'portrait',unit:'mm',format:'a4'});
  const ancho = doc.internal.pageSize.getWidth();
  doc.setFillColor(13,15,23); doc.rect(0,0,ancho,40,'F');
  doc.setFont('helvetica','bold'); doc.setFontSize(18); doc.setTextColor(96,239,255);
  doc.text(`PAES M1 — Clase ${claseNum}: ${CLASE.titulo}`, ancho/2, 18, {align:'center'});
  doc.setFontSize(9); doc.setTextColor(136,146,176);
  doc.text(`Informe de desempeño | ${new Date().toLocaleDateString('es-CL')}`, ancho/2, 30, {align:'center'});
  let y=50;
  [{key:'facil',label:'⭐ Práctica Fácil'},{key:'medio',label:'⭐⭐ Práctica Media'},{key:'dificil',label:'⭐⭐⭐ Desafío Final'}].forEach(({key,label})=>{
    const result = state.pdfResults[key];
    doc.setFont('helvetica','bold'); doc.setFontSize(12); doc.setTextColor(96,239,255);
    doc.text(label, 14, y); y+=7;
    if (!result) { doc.setFont('helvetica','italic'); doc.setFontSize(9); doc.setTextColor(136,146,176); doc.text('Sección no completada.', 14, y); y+=12; return; }
    const col = result.pct>=80?[52,211,153]:result.pct>=60?[251,146,60]:[248,113,113];
    doc.setFont('helvetica','normal'); doc.setFontSize(11); doc.setTextColor(...col);
    doc.text(`Puntaje: ${result.pct}% (${result.correctas}/${result.total} correctas)`, 14, y); y+=6;
    if (result.errores.length>0) {
      const areas=[...new Set(result.errores.map(e=>e.area))];
      doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor(248,113,113);
      doc.text('Áreas a reforzar:', 14, y); y+=5;
      areas.forEach(a=>{ doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor(100,100,100); doc.text(`  • ${a}`, 14, y); y+=4; });
    }
    y+=6; doc.setDrawColor(200,200,200); doc.line(14,y,ancho-14,y); y+=8;
    if(y>260){doc.addPage();y=20;}
  });
  doc.save(`Informe-PAES-M1-Clase${claseNum}.pdf`);
}

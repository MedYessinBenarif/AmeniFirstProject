/* ── State ────────────────────────────────────────────── */
let noCount = 0;

const questions = [
  { q: "Ameni, would you like to be my girlfriend?",       sub: "Think carefully… 💭",              emoji: "🥺", gif: "https://media.giphy.com/media/l4KhO6V2eEBNYk5va/giphy.gif" },
  { q: "Ameni, are you suuure you want to say no?",         sub: "The yes button looks lonely 💕",   emoji: "😔", gif: "https://media.giphy.com/media/26BRrMkEVHJyckp2w/giphy.gif" },
  { q: "Ameni, I know you secretly want to say yes…",       sub: "Don't be shy! 🥹",                emoji: "🤭", gif: "https://media.giphy.com/media/d2ZfqZY5eSCQSNmC/giphy.gif" },
  { q: "Pretty please Ameni? I'll be the best ever!",       sub: "I come with free hugs 🤗",         emoji: "🙏", gif: "https://media.giphy.com/media/l0MYGb1LuZ3n7dRnO/giphy.gif" },
  { q: "Ameni, what if you just said yes tho?",             sub: "Just hypothetically… 👀",          emoji: "😅", gif: "https://media.giphy.com/media/3oEjHFOscgNwdSRRDy/giphy.gif" },
  { q: "Ameni the yes button is literally crying rn 😢",    sub: "Please save it 💔",                emoji: "😢", gif: "https://media.giphy.com/media/l1J9EdzfOSgfyueLm/giphy.gif" },
  { q: "Ameni I have snacks and good vibes. Say yes.",      sub: "Final offer 🍓🎀",                  emoji: "🥰", gif: "https://media.giphy.com/media/l4KhO6V2eEBNYk5va/giphy.gif" },
  { q: "Ameni, at this point YES is inevitable 😏",         sub: "Resistance is futile 💘",           emoji: "😈", gif: "https://media.giphy.com/media/26BRrMkEVHJyckp2w/giphy.gif" },
  { q: "Ameni look how big YES got because of you 👀",      sub: "It just wants your love 💗",        emoji: "😳", gif: "https://media.giphy.com/media/d2ZfqZY5eSCQSNmC/giphy.gif" },
  { q: "Ameni the universe is telling you… SAY YES 🌌",    sub: "Stars aligned. Destiny. You. Me.",  emoji: "✨", gif: "https://media.giphy.com/media/l0MYGb1LuZ3n7dRnO/giphy.gif" },
];

/* YES scale steps (one per no-press) */
const yesScales  = [1, 1.35, 1.75, 2.2, 2.75, 3.35, 4.0, 5.0, 6.5, 9.0];
/* NO opacity / size steps */
const noScales   = [1, 0.88, 0.76, 0.65, 0.54, 0.44, 0.35, 0.27, 0.18, 0.09];

/* ── DOM refs ─────────────────────────────────────────── */
const yesBtn     = document.getElementById('yesBtn');
const noBtn      = document.getElementById('noBtn');
const questionEl = document.getElementById('question');
const subEl      = document.getElementById('subText');
const emojiEl    = document.getElementById('emojiTop');
const card       = document.getElementById('card');
const cardGif    = document.getElementById('cardGif');

/* ── Init background hearts ───────────────────────────── */
(function spawnBgHearts() {
  const container = document.getElementById('heartsBg');
  const emojis    = ['💕','💖','💗','💓','💘','🌸','💝','💞'];
  for (let i = 0; i < 22; i++) {
    const h = document.createElement('span');
    h.className  = 'heart-float';
    h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    h.style.left     = Math.random() * 100 + 'vw';
    h.style.fontSize = (0.8 + Math.random() * 1.4) + 'rem';
    h.style.animationDuration  = (7 + Math.random() * 12) + 's';
    h.style.animationDelay     = (-Math.random() * 15) + 's';
    container.appendChild(h);
  }
})();

/* ── Press NO ─────────────────────────────────────────── */
function pressNo() {
  noCount++;
  const idx = Math.min(noCount, questions.length - 1);

  /* — Update question text — */
  const data = questions[idx] || questions[questions.length - 1];
  questionEl.classList.remove('flash');
  void questionEl.offsetWidth; // reflow to restart anim
  questionEl.classList.add('flash');
  questionEl.textContent = data.q;
  subEl.textContent      = data.sub;
  emojiEl.textContent    = data.emoji;

  /* — Swap GIF — */
  cardGif.classList.remove('swap');
  void cardGif.offsetWidth;
  cardGif.src = data.gif;
  cardGif.classList.add('swap');

  /* — Grow YES — */
  const yScale = yesScales[Math.min(noCount, yesScales.length - 1)];
  yesBtn.style.fontSize = (1.15 * yScale) + 'rem';
  yesBtn.style.padding  = `${16 * Math.min(yScale, 2.5)}px ${40 * Math.min(yScale, 2.5)}px`;
  yesBtn.classList.remove('pulse');
  void yesBtn.offsetWidth;
  yesBtn.classList.add('pulse');

  /* — Shrink NO — */
  const nScale = noScales[Math.min(noCount, noScales.length - 1)];
  noBtn.style.fontSize = (1 * nScale) + 'rem';
  noBtn.style.padding  = `${13 * nScale}px ${30 * nScale}px`;
  noBtn.style.opacity  = Math.max(nScale, 0.06);

  /* — Shake card — */
  card.classList.remove('shake');
  void card.offsetWidth;
  card.classList.add('shake');

  /* — Hide NO completely at last step — */
  if (noCount >= noScales.length - 1) {
    noBtn.style.visibility = 'hidden';
  }
}

/* ── Press YES ────────────────────────────────────────── */
function pressYes() {
  const qScreen = document.getElementById('questionScreen');
  const cScreen = document.getElementById('celebScreen');

  qScreen.classList.add('hidden');

  setTimeout(() => {
    cScreen.classList.remove('hidden');
    spawnConfetti();
    spawnBurstHearts();
  }, 350);
}

/* ── Confetti ─────────────────────────────────────────── */
function spawnConfetti() {
  const wrap   = document.getElementById('confettiWrap');
  const colors = ['#fff','#ffe082','#ff80ab','#ea80fc','#80d8ff','#ccff90','#ffab40'];
  const count  = 140;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    const w = 6 + Math.random() * 10;
    const h = 8 + Math.random() * 16;
    p.style.width    = w + 'px';
    p.style.height   = h + 'px';
    p.style.left     = Math.random() * 100 + 'vw';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.borderRadius = Math.random() > 0.5 ? '50%' : '3px';
    p.style.animationDuration = (2.2 + Math.random() * 2.8) + 's';
    p.style.animationDelay    = (Math.random() * 1.2) + 's';
    wrap.appendChild(p);
  }
}

/* ── Burst hearts from center ─────────────────────────── */
function spawnBurstHearts() {
  const burst  = document.getElementById('heartsBurst');
  const emojis = ['💖','💕','💗','💓','💘','💝','🌸','✨','💞','🥰'];
  const count  = 18;

  for (let i = 0; i < count; i++) {
    const h = document.createElement('span');
    h.className = 'burst-heart';
    h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const angle  = (360 / count) * i + Math.random() * 20;
    const dist   = 100 + Math.random() * 160;
    const tx = Math.cos(angle * Math.PI / 180) * dist;
    const ty = Math.sin(angle * Math.PI / 180) * dist;
    h.style.setProperty('--tx', tx + 'px');
    h.style.setProperty('--ty', ty + 'px');
    h.style.animationDuration = (0.8 + Math.random() * 0.6) + 's';
    h.style.animationDelay    = (Math.random() * 0.4) + 's';
    burst.appendChild(h);
  }
}
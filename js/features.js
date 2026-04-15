/* =====================================================
   أكاديمية عايد STEP 2026
   Features Module:
   F1  – Lab Announcement Banner
   F2  – Randomized Questionnaire (Fisher-Yates)
   F4  – PWA Install Prompt
   F5  – Dynamic Share Button (Canvas)
   F6  – Print/PDF Export
   F7  – Egyptian Content Style (dynamic testimonials)
   F8  – Exit Intent Popup + Internal Linking
   ===================================================== */

/* ══════════════════════════════════════════════════════
   FEATURE 1 — Lab Announcement Banner (Fixed Top)
══════════════════════════════════════════════════════ */
function initLabBanner() {
  // Show only if user hasn't subscribed (session-based)
  if (sessionStorage.getItem('ayed_subscribed') === 'true') return;
  if (sessionStorage.getItem('ayed_banner_closed') === 'true') return;

  const banner = document.getElementById('labAnnouncement');
  if (!banner) return;
  banner.style.display = 'flex';

  // Adjust body padding for fixed banner
  const bannerH = banner.offsetHeight || 58;
  document.body.style.paddingTop = bannerH + 'px';

  // Re-adjust on resize
  window.addEventListener('resize', () => {
    document.body.style.paddingTop = banner.offsetHeight + 'px';
  });
}

function closeBanner() {
  const banner = document.getElementById('labAnnouncement');
  if (banner) {
    banner.style.transform = 'translateY(-110%)';
    banner.style.opacity = '0';
    setTimeout(() => { banner.style.display = 'none'; document.body.style.paddingTop = '0'; }, 350);
  }
  sessionStorage.setItem('ayed_banner_closed', 'true');
}

function bannerSubscribeClick() {
  sessionStorage.setItem('ayed_subscribed', 'true');
  closeBanner();
  const el = document.getElementById('courses');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/* ══════════════════════════════════════════════════════
   FEATURE 2 — Randomized Questionnaire (Fisher-Yates)
══════════════════════════════════════════════════════ */
let quizData = null;
let currentQuiz = [];
let currentQIndex = 0;
let trialAnswers = [];
let trialScore = 0;
let trialTimer = null;
let trialTimeLeft = 600; // 10 minutes

function fisherYatesShuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getShownIds(key) {
  try {
    return JSON.parse(localStorage.getItem('ayed_shown_' + key) || '[]');
  } catch { return []; }
}

function saveShownIds(key, ids) {
  try {
    const existing = getShownIds(key);
    const merged = [...new Set([...existing, ...ids])];
    // Keep only last 30 to allow cycling
    localStorage.setItem('ayed_shown_' + key, JSON.stringify(merged.slice(-30)));
  } catch {}
}

function selectFreshQuestions(pool, count, shownIds) {
  // Filter out recently shown
  let fresh = pool.filter(q => !shownIds.includes(q.id));
  if (fresh.length < count) {
    // Reset if not enough fresh
    fresh = [...pool];
  }
  return fisherYatesShuffle(fresh).slice(0, count);
}

async function loadQuizData() {
  if (quizData) return quizData;
  try {
    const res = await fetch('questions.json?v=' + Date.now());
    quizData = await res.json();
    return quizData;
  } catch (e) {
    console.warn('Failed to load questions.json:', e);
    return null;
  }
}

async function openTrialExam() {
  const modal = document.getElementById('trialExamModal');
  if (!modal) return;

  // Show loading
  modal.innerHTML = `<div class="trial-modal-inner">
    <div class="trial-loading">
      <div class="trial-spinner"></div>
      <p>🎲 جاري تحضير أسئلة عشوائية جديدة لك...</p>
    </div>
  </div>`;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  const data = await loadQuizData();
  if (!data) {
    modal.innerHTML = `<div class="trial-modal-inner">
      <button class="trial-close-btn" onclick="closeTrialExam()">✕</button>
      <p style="text-align:center;padding:40px;font-size:18px;">عذراً، تعذّر تحميل الأسئلة. حاول مجدداً.</p>
    </div>`;
    return;
  }

  // Select questions with anti-repetition
  const shownG = getShownIds('grammar');
  const shownR = getShownIds('reading');
  const shownL = getShownIds('listening');

  const grammarQ   = selectFreshQuestions(data.grammar,  5, shownG);
  const readingQ   = selectFreshQuestions(data.reading,  3, shownR);
  const listeningQ = selectFreshQuestions(data.listening, 2, shownL);

  // Save shown
  saveShownIds('grammar',   grammarQ.map(q => q.id));
  saveShownIds('reading',   readingQ.map(q => q.id));
  saveShownIds('listening', listeningQ.map(q => q.id));

  currentQuiz = [
    ...grammarQ.map(q => ({...q, type: 'grammar'})),
    ...readingQ.map(q => ({...q, type: 'reading'})),
    ...listeningQ.map(q => ({...q, type: 'listening'}))
  ];

  currentQIndex = 0;
  trialAnswers = new Array(currentQuiz.length).fill(null);
  trialScore = 0;
  trialTimeLeft = 600;

  renderQuizQuestion();
  startQuizTimer();
}

function renderQuizQuestion() {
  const modal = document.getElementById('trialExamModal');
  if (!modal || currentQIndex >= currentQuiz.length) {
    showQuizResults();
    return;
  }

  const q = currentQuiz[currentQIndex];
  const total = currentQuiz.length;
  const progress = Math.round((currentQIndex / total) * 100);

  const typeLabel = { grammar: '\uD83D\uDCDD نحو وقواعد', reading: '\uD83D\uDCD6 قراءة', listening: '\uD83C\uDFA7 استماع' };
  const typeClass = { grammar: 'type-grammar', reading: 'type-reading', listening: 'type-listening' };

  const passageHTML = q.passage
    ? `<div class="quiz-passage">${q.passage}</div>`
    : q.audio_text
    ? `<div class="quiz-passage quiz-audio-text"><span class="audio-icon">🎧</span> <em>${q.audio_text}</em></div>`
    : '';

  const answersHTML = q.options.map((opt, i) => `
    <button class="quiz-option ${trialAnswers[currentQIndex] === i ? 'selected' : ''}"
            onclick="selectAnswer(${i})" data-idx="${i}">
      <span class="opt-letter">${String.fromCharCode(65+i)}</span>
      <span class="opt-text">${opt}</span>
    </button>`).join('');

  modal.innerHTML = `
    <div class="trial-modal-inner" id="trialModalInner">
      <div class="trial-header">
        <div class="trial-header-right">
          <span class="trial-badge ${typeClass[q.type]}">${typeLabel[q.type]}</span>
          <span class="trial-counter">سؤال ${currentQIndex + 1} من ${total}</span>
        </div>
        <div class="trial-timer" id="quizTimer">\u23F1 ${formatTime(trialTimeLeft)}</div>
        <button class="trial-close-btn" onclick="closeTrialExam()">✕</button>
      </div>

      <div class="trial-progress-bar">
        <div class="trial-progress-fill" style="width:${progress}%"></div>
      </div>

      <div class="trial-body">
        ${passageHTML}
        <div class="quiz-question-text">${q.text || q.question}</div>
        <div class="quiz-options">${answersHTML}</div>
      </div>

      <div class="trial-footer">
        <button class="quiz-nav-btn prev-btn" onclick="quizNav(-1)" ${currentQIndex === 0 ? 'disabled' : ''}>
          \u2190 السابق
        </button>
        <div class="quiz-dots">
          ${currentQuiz.map((_, i) => `<span class="q-dot ${i === currentQIndex ? 'active' : ''} ${trialAnswers[i] !== null ? 'answered' : ''}"></span>`).join('')}
        </div>
        <button class="quiz-nav-btn next-btn" onclick="quizNav(1)">
          ${currentQIndex === total - 1 ? 'عرض النتيجة 🎯' : 'التالي →'}
        </button>
      </div>

      <div class="trial-upsell">
        🔓 <strong>اشترك الآن</strong> للوصول لبنك أسئلة كامل (120+ سؤال) — 
        <a href="#courses" onclick="closeTrialExam()" class="upsell-link">احصل على الدورة الكاملة</a>
      </div>
    </div>`;
}

function selectAnswer(idx) {
  trialAnswers[currentQIndex] = idx;
  document.querySelectorAll('.quiz-option').forEach((btn, i) => {
    btn.classList.toggle('selected', i === idx);
  });
  // Highlight dots
  const dots = document.querySelectorAll('.q-dot');
  if (dots[currentQIndex]) dots[currentQIndex].classList.add('answered');
}

function quizNav(dir) {
  const newIdx = currentQIndex + dir;
  if (newIdx < 0 || newIdx > currentQuiz.length) return;
  currentQIndex = newIdx;
  if (currentQIndex >= currentQuiz.length) {
    showQuizResults();
  } else {
    renderQuizQuestion();
  }
}

function showQuizResults() {
  clearInterval(trialTimer);
  let correct = 0;
  currentQuiz.forEach((q, i) => {
    if (trialAnswers[i] === q.answer) correct++;
  });
  const pct = Math.round((correct / currentQuiz.length) * 100);
  trialScore = pct;

  const modal = document.getElementById('trialExamModal');
  const stars = pct >= 80 ? '⭐⭐⭐' : pct >= 60 ? '⭐⭐' : '⭐';
  const msg   = pct >= 80 ? 'رائع جداً! أنت جاهز للاختبار' : pct >= 60 ? 'جيد! تحتاج مزيداً من التدريب' : 'تحتاج مذاكرة أكثر — أكاديمية عايد هنا لك!';

  modal.innerHTML = `
    <div class="trial-modal-inner results-screen">
      <button class="trial-close-btn" onclick="closeTrialExam()">✕</button>
      <div class="result-emoji">${stars}</div>
      <h2 class="result-title">نتيجتك في الاختبار التجريبي</h2>
      <div class="result-score-circle">
        <span class="result-pct">${pct}%</span>
        <span class="result-label">النتيجة</span>
      </div>
      <p class="result-msg">${msg}</p>
      <div class="result-breakdown">
        <div class="result-row"><span>الإجابات الصحيحة</span><span class="green-txt">${correct}</span></div>
        <div class="result-row"><span>الإجابات الخاطئة</span><span class="red-txt">${currentQuiz.length - correct}</span></div>
        <div class="result-row"><span>مجموع الأسئلة</span><span>${currentQuiz.length}</span></div>
      </div>

      <div class="result-actions">
        <button class="result-share-btn" onclick="shareResult(${pct})">
          📲 شارك نتيجتك
        </button>
        <button class="result-retry-btn" onclick="openTrialExam()">
          🔄 اختبار جديد بأسئلة مختلفة
        </button>
        <a href="#courses" onclick="closeTrialExam()" class="result-cta-btn">
          🚀 احصل على الدورة الكاملة الآن
        </a>
      </div>

      <p class="result-hint">💡 في كل اختبار تجريبي ستجد أسئلة مختلفة تماماً!</p>
    </div>`;
}

function startQuizTimer() {
  clearInterval(trialTimer);
  trialTimer = setInterval(() => {
    trialTimeLeft--;
    const el = document.getElementById('quizTimer');
    if (el) el.textContent = '\u23F1 ' + formatTime(trialTimeLeft);
    if (trialTimeLeft <= 0) {
      clearInterval(trialTimer);
      showQuizResults();
    }
  }, 1000);
}

function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function closeTrialExam() {
  clearInterval(trialTimer);
  const modal = document.getElementById('trialExamModal');
  if (modal) { modal.style.display = 'none'; }
  document.body.style.overflow = '';
}

/* ══════════════════════════════════════════════════════
   FEATURE 4 — PWA Install Prompt
══════════════════════════════════════════════════════ */
let pwaInstallPrompt = null;

function initPWA() {
  // Register Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(reg => {
      console.log('SW registered:', reg.scope);
    }).catch(err => console.warn('SW registration failed:', err));
  }

  // Capture beforeinstallprompt
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    pwaInstallPrompt = e;
    showPWABadge();
  });

  window.addEventListener('appinstalled', () => {
    hidePWABadge();
    showToast('🎉 تم تثبيت التطبيق بنجاح! يمكنك فتحه من الشاشة الرئيسية', 'success');
  });
}

function showPWABadge() {
  const badge = document.getElementById('pwaBadge');
  if (badge) {
    setTimeout(() => badge.classList.add('visible'), 3000);
  }
}

function hidePWABadge() {
  const badge = document.getElementById('pwaBadge');
  if (badge) badge.classList.remove('visible');
}

async function triggerPWAInstall() {
  if (pwaInstallPrompt) {
    pwaInstallPrompt.prompt();
    const result = await pwaInstallPrompt.userChoice;
    if (result.outcome === 'accepted') {
      pwaInstallPrompt = null;
      hidePWABadge();
    }
  } else {
    showToast('💡 افتح الموقع في Safari أو Chrome ثم اضغط "إضافة للشاشة الرئيسية"', 'info');
  }
}

/* ══════════════════════════════════════════════════════
   FEATURE 5 — Dynamic Share Button (Canvas Generator)
══════════════════════════════════════════════════════ */
async function shareResult(score) {
  const canvas = document.createElement('canvas');
  canvas.width  = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, 1080, 1080);
  grad.addColorStop(0,   '#003366');
  grad.addColorStop(0.5, '#00A651');
  grad.addColorStop(1,   '#D4AF37');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1080, 1080);

  // Decorative circles
  ctx.beginPath();
  ctx.arc(900, 150, 200, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(150, 900, 250, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.04)';
  ctx.fill();

  // Score circle
  ctx.beginPath();
  ctx.arc(540, 380, 180, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.fill();
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 8;
  ctx.stroke();

  // Score text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 120px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(score + '%', 540, 380);

  // Logo area
  ctx.fillStyle = 'rgba(255,255,255,0.1)';
  ctx.roundRect(340, 80, 400, 80, 20);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 28px Arial, sans-serif';
  ctx.fillText('أكاديمية عايد للتدريب', 540, 120);

  // Main text
  ctx.font = 'bold 52px Arial, sans-serif';
  ctx.fillStyle = '#FFD700';
  ctx.fillText('حصلت على ' + score + '%', 540, 600);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '38px Arial, sans-serif';
  ctx.fillText('في اختبار STEP التجريبي!', 540, 670);

  ctx.font = '28px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.fillText('جرّب أنت كمان 👇', 540, 750);

  // Website URL
  ctx.fillStyle = '#D4AF37';
  ctx.font = 'bold 22px Arial, sans-serif';
  ctx.fillText('studentservices241445-rgb.github.io/STEP-2030/', 540, 820);

  // Footer strip
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(0, 880, 1080, 200);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 30px Arial, sans-serif';
  ctx.fillText('أكاديمية عايد STEP 2026', 540, 940);
  ctx.font = '22px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.fillText('الأكاديمية الأولى لتدريب STEP في المملكة العربية السعودية', 540, 990);

  const dataURL = canvas.toDataURL('image/png');
  const shareURL = 'https://studentservices241445-rgb.github.io/STEP-2030/';
  const shareText = `حصلت على ${score}% في اختبار STEP التجريبي من أكاديمية عايد! 🎯\nجرّب أنت كمان: ${shareURL}`;

  // Try Web Share API first
  if (navigator.share) {
    try {
      // Convert canvas to blob for sharing
      canvas.toBlob(async blob => {
        const file = new File([blob], 'STEP_result.png', { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ title: 'نتيجتي في STEP', text: shareText, files: [file] });
        } else {
          await navigator.share({ title: 'نتيجتي في STEP', text: shareText, url: shareURL });
        }
      }, 'image/png');
      return;
    } catch (e) { /* fallback */ }
  }

  // Fallback: download image
  const link = document.createElement('a');
  link.download = 'STEP_result_' + score + 'pct.png';
  link.href = dataURL;
  link.click();

  // Show share options
  showShareOptions(shareText, shareURL, score);
}

function showShareOptions(text, url, score) {
  const div = document.createElement('div');
  div.className = 'share-options-popup';
  const encoded = encodeURIComponent(text);
  div.innerHTML = `
    <div class="share-popup-inner">
      <h3>📲 شارك نتيجتك</h3>
      <p>تم تحميل صورة نتيجتك! شاركها على:</p>
      <div class="share-btns">
        <a href="https://wa.me/?text=${encoded}" target="_blank" class="share-btn-wa">
          <i class="fab fa-whatsapp"></i> WhatsApp
        </a>
        <a href="https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encoded}" target="_blank" class="share-btn-tg">
          <i class="fab fa-telegram"></i> Telegram
        </a>
        <a href="https://twitter.com/intent/tweet?text=${encoded}" target="_blank" class="share-btn-tw">
          <i class="fab fa-twitter"></i> Twitter
        </a>
      </div>
      <button onclick="this.closest('.share-options-popup').remove()" class="share-close">إغلاق</button>
    </div>`;
  document.body.appendChild(div);
}

/* ══════════════════════════════════════════════════════
   FEATURE 6 — PDF Print Export
══════════════════════════════════════════════════════ */
function printQuestionBank() {
  // Dynamic import of html2pdf
  if (!window.html2pdf) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = () => doPrint();
    document.head.appendChild(script);
  } else {
    doPrint();
  }
}

function doPrint() {
  const content = document.getElementById('questionBankPrint');
  if (!content) {
    // Generate print content from loaded questions
    generatePrintContent();
    return;
  }

  const opt = {
    margin: [20, 15, 20, 15],
    filename: 'بنك_أسئلة_STEP_Premium_أكاديمية_عايد.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, direction: 'rtl' },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy'], after: '.question-block' }
  };
  html2pdf().set(opt).from(content).save();
}

async function generatePrintContent() {
  const data = await loadQuizData();
  if (!data) { showToast('تعذّر تحميل بنك الأسئلة', 'error'); return; }

  const allQ = [...data.grammar, ...data.reading, ...data.listening];
  const div = document.createElement('div');
  div.id = 'questionBankPrint';
  div.style.cssText = 'position:fixed;top:-9999px;left:-9999px;direction:rtl;font-family:Arial,sans-serif;';
  div.innerHTML = `
    <div class="print-header" style="text-align:center;border-bottom:3px solid #003366;padding:15px 0;margin-bottom:20px;">
      <h1 style="color:#003366;font-size:22px;margin:0;">أكاديمية عايد STEP 2026</h1>
      <p style="color:#00A651;margin:4px 0;font-size:14px;">بنك الأسئلة الشاملة — المواد التعليمية المحمية</p>
    </div>
    ${allQ.map((q, i) => `
      <div class="question-block" style="margin-bottom:20px;padding:15px;border:1px solid #e5e7eb;border-radius:8px;page-break-inside:avoid;">
        <p style="font-weight:bold;color:#003366;margin-bottom:10px;">${i+1}. ${q.text || q.question}</p>
        ${q.passage ? `<div style="background:#f3f4f6;padding:10px;border-radius:6px;margin-bottom:10px;font-size:13px;">${q.passage}</div>` : ''}
        ${q.options.map((o, j) => `<p style="margin:4px 0;padding-right:16px;">${String.fromCharCode(65+j)}. ${o}</p>`).join('')}
        <p style="color:#00A651;font-size:12px;margin-top:8px;">الإجابة الصحيحة: ${String.fromCharCode(65 + q.answer)}</p>
      </div>`).join('')}
    <div class="print-footer" style="text-align:center;border-top:2px solid #003366;margin-top:30px;padding-top:12px;font-size:12px;color:#6b7280;">
      أكاديمية عايد STEP 2026 | https://studentservices241445-rgb.github.io/STEP-2030/ | 
      جميع الحقوق محفوظة © 2026 أكاديمية عايد
    </div>`;

  document.body.appendChild(div);

  const opt = {
    margin: [20, 15, 20, 15],
    filename: 'بنك_أسئلة_STEP_Premium_أكاديمية_عايد.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy'] }
  };

  if (!window.html2pdf) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = () => {
      html2pdf().set(opt).from(div).save().then(() => document.body.removeChild(div));
    };
    document.head.appendChild(script);
  } else {
    html2pdf().set(opt).from(div).save().then(() => document.body.removeChild(div));
  }
}

/* ══════════════════════════════════════════════════════
   FEATURE 8 — Exit Intent Popup
══════════════════════════════════════════════════════ */
let exitIntentShown = false;

function initExitIntent() {
  if (sessionStorage.getItem('ayed_exit_shown') === 'true') return;

  document.addEventListener('mouseleave', e => {
    if (e.clientY <= 10 && !exitIntentShown) {
      exitIntentShown = true;
      sessionStorage.setItem('ayed_exit_shown', 'true');
      showExitPopup();
    }
  });

  // Mobile: back button or visibility change
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && !exitIntentShown) {
      exitIntentShown = true;
    }
  });
}

function showExitPopup() {
  const popup = document.getElementById('exitIntentPopup');
  if (!popup) return;
  popup.style.display = 'flex';
  popup.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Auto-countdown
  let secs = 30;
  const counter = popup.querySelector('.exit-countdown');
  const interval = setInterval(() => {
    secs--;
    if (counter) counter.textContent = secs;
    if (secs <= 0) {
      clearInterval(interval);
      closeExitPopup();
    }
  }, 1000);
  popup._interval = interval;
}

function closeExitPopup() {
  const popup = document.getElementById('exitIntentPopup');
  if (!popup) return;
  clearInterval(popup._interval);
  popup.classList.remove('active');
  setTimeout(() => { popup.style.display = 'none'; }, 300);
  document.body.style.overflow = '';
}

function exitPopupSubscribe() {
  closeExitPopup();
  const el = document.getElementById('courses');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/* ══════════════════════════════════════════════════════
   FEATURE — Lazy Loading
══════════════════════════════════════════════════════ */
function initLazyLoad() {
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const img = e.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            obs.unobserve(img);
          }
        }
      });
    });
    document.querySelectorAll('img[data-src]').forEach(img => obs.observe(img));
  }
}

/* ══════════════════════════════════════════════════════
   RECOMMENDATION QUIZ — handled by course-detail.js
   (openRecommendationQuiz already defined there)
══════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════
   INIT ALL FEATURES
══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initLabBanner();
  initPWA();
  initExitIntent();
  initLazyLoad();

  // WhatsApp widget init (from app.js compatibility)
  if (typeof initWhatsAppWidget === 'function') {
    initWhatsAppWidget();
  }
});

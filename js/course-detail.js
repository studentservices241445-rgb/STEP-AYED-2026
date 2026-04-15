/* =====================================================
   Course Detail Engine v2 — أكاديمية عايد STEP 2026
   - واجهة تفاصيل الدورة المفصّلة
   - نظام التوصيات الذكي
   - ويدجت واتساب العائم
   ===================================================== */

/* ══════════════════════════════════════════════════════
   1. COURSE DETAIL MODAL
══════════════════════════════════════════════════════ */
function openCourseDetail(courseId) {
  const course = COURSES_FULL[courseId];
  if (!course) return;

  // Remove existing
  const existing = document.getElementById('courseDetailOverlay');
  if (existing) existing.remove();

  const colorMap = {
    gold:  { accent: '#f59e0b', dark: '#d97706', glow: 'rgba(245,158,11,0.25)', light: '#fef3c7', text: '#92400e', grad: 'linear-gradient(135deg,#1a1006,#3d2b0a)' },
    blue:  { accent: '#3b82f6', dark: '#2563eb', glow: 'rgba(59,130,246,0.25)', light: '#dbeafe', text: '#1e40af', grad: 'linear-gradient(135deg,#0a1628,#0d1f3c)' },
    green: { accent: '#10b981', dark: '#059669', glow: 'rgba(16,185,129,0.25)', light: '#d1fae5', text: '#065f46', grad: 'linear-gradient(135deg,#041a0f,#062e16)' },
  };
  const c = colorMap[course.color];

  // Build stars
  const buildStars = (r) => {
    let s = '';
    for (let i = 1; i <= 5; i++) {
      s += `<i class="fas fa-star${i <= Math.floor(r) ? '' : (i - r < 1 ? '-half-alt' : '-o')}" style="color:${i <= r ? '#f59e0b' : '#d1d5db'}"></i>`;
    }
    return s;
  };

  // Who Is It For
  const whoHTML = course.whoIsItFor.map(w => `
    <div class="cdm-who-card">
      <div class="cdm-who-icon">${w.icon}</div>
      <div>
        <div class="cdm-who-title">${w.title}</div>
        <div class="cdm-who-desc">${w.desc}</div>
      </div>
    </div>`).join('');

  // Curriculum
  const currHTML = course.curriculum.map((unit, i) => `
    <div class="cdm-unit" onclick="cdmToggleUnit(this)">
      <div class="cdm-unit-head">
        <span class="cdm-unit-icon">${unit.icon}</span>
        <div class="cdm-unit-info">
          <span class="cdm-unit-label">${unit.unit}</span>
          <span class="cdm-unit-title">${unit.title}</span>
        </div>
        <div class="cdm-unit-right">
          <span class="cdm-unit-dur">⏱ ${unit.duration}</span>
          <i class="fas fa-chevron-down cdm-arrow"></i>
        </div>
      </div>
      <div class="cdm-lessons" ${i === 0 ? 'style="display:block"' : ''}>
        ${unit.lessons.map(l => `<div class="cdm-lesson"><i class="fas fa-play-circle"></i> ${l}</div>`).join('')}
      </div>
    </div>`).join('');

  // Features
  const featHTML = course.features.map(f => `
    <div class="cdm-feat">
      <span class="cdm-feat-icon">${f.icon}</span>
      <span>${f.text}</span>
    </div>`).join('');

  // Reviews
  const reviewsHTML = course.reviews.map(r => `
    <div class="cdm-review ${r.isDoubt ? 'cdm-doubt' : ''}">
      <div class="cdm-review-head">
        <div class="cdm-review-av" style="background:${r.color}">${r.avatar}</div>
        <div class="cdm-review-info">
          <div class="cdm-review-name">
            ${r.name}
            ${r.isVerified ? '<span class="cdm-verified">✅ مشترك موثّق</span>' : ''}
          </div>
          <div class="cdm-review-meta">${r.tag} · ${r.date}</div>
          <div class="cdm-review-stars">${buildStars(r.rating)}</div>
        </div>
        <div class="cdm-review-score" style="background:${c.light};color:${c.text}">
          <span class="cdm-score-num">${r.score}</span>
          <span class="cdm-score-label">STEP</span>
        </div>
      </div>
      <p class="cdm-review-text">${r.text}</p>
      ${r.isDoubt ? '<div class="cdm-doubt-note">💬 رأي صريح ومتوازن من مشترك حقيقي</div>' : ''}
    </div>`).join('');

  // Similar Courses Navigation
  const otherIds = [1, 2, 3].filter(id => id !== courseId);
  const navHTML = otherIds.map(id => {
    const oc = COURSES_FULL[id];
    const ocColor = colorMap[oc.color];
    return `<button class="cdm-nav-btn" onclick="switchCourseDetail(${id})" style="border-color:${ocColor.accent}">
      <span>${oc.icon}</span>
      <div>
        <div style="font-weight:700;font-size:13px">${oc.name}</div>
        <div style="font-size:12px;opacity:.7">${oc.price} ر.س</div>
      </div>
      <i class="fas fa-arrow-left" style="color:${ocColor.accent}"></i>
    </button>`;
  }).join('');

  // Recommendation note
  const recNote = course.recommendation.alternativeIf
    ? `<div class="cdm-rec-note">
        💡 <strong>تنبيه:</strong> ${course.recommendation.alternativeIf.condition}؟
        <button onclick="switchCourseDetail(${course.recommendation.alternativeIf.recommend})" class="cdm-rec-switch">
          انتقل للدورة ${COURSES_FULL[course.recommendation.alternativeIf.recommend].icon} ${COURSES_FULL[course.recommendation.alternativeIf.recommend].name}
        </button>
      </div>` : '';

  const overlay = document.createElement('div');
  overlay.id = 'courseDetailOverlay';
  overlay.className = 'cdm-overlay';
  overlay.innerHTML = `
    <div class="cdm-modal" id="cdmModal">

      <!-- STICKY HEADER -->
      <div class="cdm-sticky-header" style="background:${c.grad}">
        <button class="cdm-back" onclick="closeCourseDetail()">
          <i class="fas fa-arrow-right"></i>
        </button>
        <div class="cdm-sticky-info">
          <span class="cdm-sticky-icon">${course.icon}</span>
          <div>
            <div class="cdm-sticky-name">${course.name}</div>
            <div class="cdm-sticky-price" style="color:${c.accent}">${course.price} ر.س</div>
          </div>
        </div>
        <button class="cdm-sticky-buy" style="background:${c.accent}" onclick="buyNow(${course.id})">
          <i class="fas fa-bolt"></i> اشتري
        </button>
      </div>

      <!-- HERO BANNER -->
      <div class="cdm-hero" style="background:${c.grad};background-image:url('${course.image}');background-size:cover;background-position:center;">
        <div class="cdm-hero-overlay">
          <div class="cdm-hero-badge" style="background:${c.accent}">${course.badge}</div>
          <h2 class="cdm-hero-title">${course.fullName}</h2>
          <p class="cdm-hero-tagline">${course.tagline}</p>

          <div class="cdm-hero-stats">
            <div class="cdm-hstat">
              <div class="cdm-hstat-n">${course.studentsCount}</div>
              <div class="cdm-hstat-l">طالب مسجّل</div>
            </div>
            <div class="cdm-hstat">
              <div class="cdm-hstat-n">${course.rating}★</div>
              <div class="cdm-hstat-l">${course.reviewCount} تقييم</div>
            </div>
            <div class="cdm-hstat">
              <div class="cdm-hstat-n">${course.completionRate}%</div>
              <div class="cdm-hstat-l">نسبة إتمام</div>
            </div>
            <div class="cdm-hstat">
              <div class="cdm-hstat-n">${course.targetScore}</div>
              <div class="cdm-hstat-l">الدرجة المستهدفة</div>
            </div>
          </div>

          <!-- Price CTA -->
          <div class="cdm-hero-price">
            <div class="cdm-price-wrap">
              <span class="cdm-price-now" style="color:${c.accent}">${course.price}</span>
              <span class="cdm-price-unit">ر.س</span>
              <span class="cdm-price-was">${course.original} ر.س</span>
              <span class="cdm-discount-pill" style="background:${c.accent}">خصم ${course.discount}%</span>
            </div>
            <div class="cdm-hero-btns">
              <button class="cdm-btn-buy" style="background:${c.accent};box-shadow:0 4px 20px ${c.glow}" onclick="buyNow(${course.id})">
                <i class="fas fa-bolt"></i> اشتري الآن — ${course.price} ر.س
              </button>
              <button class="cdm-btn-cart" onclick="addToCart(${course.id});showToast('تمت الإضافة! 🛒','success')" style="border-color:${c.accent};color:${c.accent}">
                <i class="fas fa-cart-plus"></i> أضف للسلة
              </button>
            </div>
            <div class="cdm-access-info">
              <span>⏱️ ${course.access}</span>
              <span>⚡ وصول فوري</span>
              <span>📱 جميع الأجهزة</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CONTENT -->
      <div class="cdm-body">

        ${recNote}

        <!-- TABS -->
        <div class="cdm-tabs">
          <button class="cdm-tab active" onclick="cdmSwitchTab('overview',this)">نظرة عامة</button>
          <button class="cdm-tab" onclick="cdmSwitchTab('curriculum',this)">المحتوى</button>
          <button class="cdm-tab" onclick="cdmSwitchTab('reviews',this)">آراء الطلاب</button>
          <button class="cdm-tab" onclick="cdmSwitchTab('who',this)">لمن هي؟</button>
        </div>

        <!-- TAB: OVERVIEW -->
        <div class="cdm-tab-content active" id="cdm-tab-overview">
          <h3 class="cdm-section-title" style="color:${c.accent}">✨ ما الذي ستحصل عليه؟</h3>
          <div class="cdm-feats-grid">${featHTML}</div>

          <h3 class="cdm-section-title" style="color:${c.accent}">✅ هذه الدورة مناسبة لك إذا...</h3>
          <div class="cdm-best-for">
            ${course.recommendation.bestFor.map(b => `<div class="cdm-bfor-item"><i class="fas fa-check-circle" style="color:${c.accent}"></i> ${b}</div>`).join('')}
          </div>

          ${course.recommendation.notFor.length ? `
          <h3 class="cdm-section-title" style="color:#ef4444">❌ قد لا تناسبك إذا...</h3>
          <div class="cdm-not-for">
            ${course.recommendation.notFor.map(n => `<div class="cdm-nfor-item"><i class="fas fa-times-circle" style="color:#ef4444"></i> ${n}</div>`).join('')}
          </div>` : ''}
        </div>

        <!-- TAB: CURRICULUM -->
        <div class="cdm-tab-content" id="cdm-tab-curriculum" style="display:none">
          <h3 class="cdm-section-title" style="color:${c.accent}">📚 محتوى الدورة</h3>
          <div class="cdm-curriculum">${currHTML}</div>
        </div>

        <!-- TAB: REVIEWS -->
        <div class="cdm-tab-content" id="cdm-tab-reviews" style="display:none">
          <div class="cdm-reviews-header">
            <div class="cdm-overall-rating">
              <div class="cdm-big-rating" style="color:${c.accent}">${course.rating}</div>
              <div class="cdm-big-stars">${buildStars(course.rating)}</div>
              <div class="cdm-big-count">${course.reviewCount} تقييم</div>
            </div>
            <div class="cdm-rating-bars">
              ${[5,4,3,2,1].map(n => {
                const pct = n === 5 ? 75 : n === 4 ? 18 : n === 3 ? 5 : n === 2 ? 1 : 1;
                return `<div class="cdm-rbar-row">
                  <span>${n}★</span>
                  <div class="cdm-rbar"><div class="cdm-rbar-fill" style="width:${pct}%;background:${c.accent}"></div></div>
                  <span>${pct}%</span>
                </div>`;
              }).join('')}
            </div>
          </div>
          <div class="cdm-reviews-list">${reviewsHTML}</div>
          <div class="cdm-reviews-cta">
            <p>انضم لآلاف الطلاب الذين حققوا أهدافهم مع أكاديمية عايد 🏆</p>
            <button class="cdm-btn-buy" style="background:${c.accent}" onclick="buyNow(${course.id})">
              <i class="fas fa-graduation-cap"></i> ابدأ الآن — ${course.price} ر.س فقط
            </button>
          </div>
        </div>

        <!-- TAB: WHO IS IT FOR -->
        <div class="cdm-tab-content" id="cdm-tab-who" style="display:none">
          <h3 class="cdm-section-title" style="color:${c.accent}">🎯 هذه الدورة مصممة لـ...</h3>
          <div class="cdm-who-grid">${whoHTML}</div>

          <div class="cdm-nav-section">
            <h3 class="cdm-section-title">🔀 استعرض الدورات الأخرى</h3>
            <div class="cdm-nav-btns">${navHTML}</div>
          </div>
        </div>

        <!-- BOTTOM CTA -->
        <div class="cdm-bottom-cta" style="background:${c.grad}">
          <h3>جاهز تبدأ؟ 🚀</h3>
          <p>انضم لـ ${course.studentsCount} طالب حققوا درجاتهم مع أكاديمية عايد</p>
          <div class="cdm-bottom-btns">
            <button onclick="buyNow(${course.id})" style="background:${c.accent};box-shadow:0 4px 20px ${c.glow}" class="cdm-btn-buy">
              <i class="fas fa-bolt"></i> اشتري الآن — ${course.price} ر.س
            </button>
            <button onclick="openWhatsAppWidget()" class="cdm-btn-wa">
              <i class="fab fa-whatsapp"></i> استشر مستشارنا
            </button>
          </div>
          <div class="cdm-tg-link">
            أو تواصل معنا مباشرة: <a href="https://t.me/Ayed_Academy_2026" target="_blank">@Ayed_Academy_2026</a>
          </div>
        </div>

      </div><!-- /cdm-body -->
    </div><!-- /cdm-modal -->
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  // Animate in
  requestAnimationFrame(() => {
    overlay.classList.add('cdm-visible');
    document.getElementById('cdmModal').classList.add('cdm-modal-in');
  });

  // Close on backdrop click
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeCourseDetail();
  });
}

function closeCourseDetail() {
  const overlay = document.getElementById('courseDetailOverlay');
  if (!overlay) return;
  overlay.classList.remove('cdm-visible');
  document.getElementById('cdmModal')?.classList.remove('cdm-modal-in');
  setTimeout(() => { overlay.remove(); document.body.style.overflow = ''; }, 300);
}

function switchCourseDetail(courseId) {
  closeCourseDetail();
  setTimeout(() => openCourseDetail(courseId), 320);
}

function cdmToggleUnit(el) {
  const lessons = el.querySelector('.cdm-lessons');
  const arrow = el.querySelector('.cdm-arrow');
  const isOpen = lessons.style.display === 'block';
  lessons.style.display = isOpen ? 'none' : 'block';
  arrow.style.transform = isOpen ? '' : 'rotate(180deg)';
}

function cdmSwitchTab(tab, btn) {
  document.querySelectorAll('.cdm-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.cdm-tab-content').forEach(c => c.style.display = 'none');
  btn.classList.add('active');
  const content = document.getElementById('cdm-tab-' + tab);
  if (content) content.style.display = 'block';
}


/* ══════════════════════════════════════════════════════
   2. SMART RECOMMENDATION QUIZ
══════════════════════════════════════════════════════ */
let quizAnswers = {};
let currentQuestion = 0;

function openRecommendationQuiz() {
  const existing = document.getElementById('quizOverlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'quizOverlay';
  overlay.className = 'quiz-overlay';
  overlay.innerHTML = `
    <div class="quiz-modal" id="quizModal">
      <button class="quiz-close" onclick="closeQuiz()"><i class="fas fa-times"></i></button>
      <div class="quiz-header">
        <div class="quiz-logo">
          <img src="images/logo.png" alt="أكاديمية عايد" onerror="this.style.display='none'">
        </div>
        <h2 class="quiz-title">🎯 اكتشف دورتك المثالية</h2>
        <p class="quiz-subtitle">4 أسئلة بسيطة — نوصيك بالدورة الأنسب لك شخصياً</p>
        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" id="quizProgressFill" style="width:0%"></div>
        </div>
        <div class="quiz-progress-text" id="quizProgressText">السؤال 1 من 4</div>
      </div>
      <div class="quiz-body" id="quizBody">
        <!-- Questions rendered here -->
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  quizAnswers = {};
  currentQuestion = 0;

  requestAnimationFrame(() => {
    overlay.classList.add('quiz-visible');
    renderQuizQuestion(0);
  });

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeQuiz();
  });
}

function renderQuizQuestion(idx) {
  const q = RECOMMENDATION_QUIZ.questions[idx];
  const total = RECOMMENDATION_QUIZ.questions.length;
  const pct = (idx / total) * 100;

  document.getElementById('quizProgressFill').style.width = pct + '%';
  document.getElementById('quizProgressText').textContent = `السؤال ${idx + 1} من ${total}`;

  const body = document.getElementById('quizBody');
  body.innerHTML = `
    <div class="quiz-q-wrap">
      <div class="quiz-q-icon">${q.icon}</div>
      <h3 class="quiz-q-text">${q.question}</h3>
      <div class="quiz-options">
        ${q.options.map(opt => `
          <button class="quiz-opt" onclick="selectQuizAnswer('${q.id}','${opt.value}',${idx})" data-val="${opt.value}">
            <span class="quiz-opt-icon">${opt.icon}</span>
            <span>${opt.label}</span>
          </button>`).join('')}
      </div>
    </div>
  `;

  // Animate
  body.querySelector('.quiz-q-wrap').style.animation = 'quizSlideIn .3s ease';
}

function selectQuizAnswer(questionId, value, idx) {
  quizAnswers[questionId] = value;

  // Highlight selected
  document.querySelectorAll('.quiz-opt').forEach(b => {
    b.classList.toggle('quiz-opt-selected', b.dataset.val === value);
  });

  // Wait briefly then next
  setTimeout(() => {
    const next = idx + 1;
    if (next < RECOMMENDATION_QUIZ.questions.length) {
      renderQuizQuestion(next);
    } else {
      showQuizResult();
    }
  }, 350);
}

function showQuizResult() {
  const result = RECOMMENDATION_QUIZ.getRecommendation(quizAnswers);
  const course = COURSES_FULL[result.courseId];
  const colorMap = {
    gold: '#f59e0b', blue: '#3b82f6', green: '#10b981'
  };
  const accent = colorMap[course.color];

  document.getElementById('quizProgressFill').style.width = '100%';
  document.getElementById('quizProgressText').textContent = 'اكتملت التوصية!';

  document.getElementById('quizBody').innerHTML = `
    <div class="quiz-result">
      <div class="quiz-result-icon" style="background:${accent}">${course.icon}</div>
      <div class="quiz-result-confidence">
        <div class="quiz-conf-bar">
          <div class="quiz-conf-fill" style="width:${result.confidence}%;background:${accent}"></div>
        </div>
        <span>توافق ${result.confidence}% مع احتياجاتك</span>
      </div>
      <h3 class="quiz-result-title" style="color:${accent}">${course.name}</h3>
      <p class="quiz-result-reason">${result.reason}</p>
      <div class="quiz-result-price">
        <span class="quiz-r-now" style="color:${accent}">${course.price} ر.س</span>
        <span class="quiz-r-was">${course.original} ر.س</span>
        <span class="quiz-r-disc" style="background:${accent}">خصم ${course.discount}%</span>
      </div>
      <div class="quiz-result-btns">
        <button onclick="closeQuiz();openCourseDetail(${course.id})" style="background:${accent}" class="quiz-r-primary">
          <i class="fas fa-eye"></i> عرض التفاصيل الكاملة
        </button>
        <button onclick="closeQuiz();buyNow(${course.id})" class="quiz-r-secondary" style="border-color:${accent};color:${accent}">
          <i class="fas fa-bolt"></i> اشتري الآن
        </button>
      </div>
      <button onclick="quizAnswers={};currentQuestion=0;renderQuizQuestion(0)" class="quiz-retake">
        <i class="fas fa-redo"></i> أعد الاختبار
      </button>
      <div class="quiz-other-courses">
        <p>أو استعرض جميع الدورات:</p>
        ${[1,2,3].filter(id => id !== result.courseId).map(id => {
          const oc = COURSES_FULL[id];
          const oa = colorMap[oc.color];
          return `<button onclick="closeQuiz();openCourseDetail(${id})" class="quiz-other-btn" style="border-color:${oa};color:${oa}">
            ${oc.icon} ${oc.name} — ${oc.price} ر.س
          </button>`;
        }).join('')}
      </div>
    </div>
  `;
}

function closeQuiz() {
  const overlay = document.getElementById('quizOverlay');
  if (!overlay) return;
  overlay.classList.remove('quiz-visible');
  setTimeout(() => { overlay.remove(); document.body.style.overflow = ''; }, 300);
}


/* ══════════════════════════════════════════════════════
   3. WHATSAPP FLOATING WIDGET
══════════════════════════════════════════════════════ */
function initWhatsAppWidget() {
  // Remove if exists
  document.getElementById('waWidget')?.remove();

  const widget = document.createElement('div');
  widget.id = 'waWidget';
  widget.innerHTML = `
    <!-- Floating Button -->
    <div class="wa-fab" id="waFab" onclick="toggleWAWidget()">
      <div class="wa-fab-pulse"></div>
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <div class="wa-online-dot"></div>
    </div>

    <!-- Chat Window -->
    <div class="wa-window" id="waWindow">
      <div class="wa-window-head">
        <div class="wa-head-logo">
          <img src="images/logo.png" alt="أكاديمية عايد" onerror="this.style.display='none';this.parentElement.querySelector('.wa-head-emoji').style.display='block'">
          <span class="wa-head-emoji" style="display:none">🎓</span>
        </div>
        <div class="wa-head-info">
          <div class="wa-head-name">أكاديمية عايد للتدريب</div>
          <div class="wa-head-status"><span class="wa-status-dot"></span> متصل الآن</div>
        </div>
        <button class="wa-close-btn" onclick="toggleWAWidget()">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="wa-chat-body">
        <div class="wa-msg wa-msg-in">
          <p>مرحباً! 👋 أنا مستشارك في <strong>أكاديمية عايد STEP 2026</strong></p>
          <p>كيف أقدر أساعدك اليوم؟</p>
          <span class="wa-time">الآن</span>
        </div>

        <!-- Quick replies -->
        <div class="wa-quick-replies">
          <p class="wa-quick-label">اختر ما يناسبك:</p>
          <button class="wa-qr" onclick="waQuickReply('best')">🏆 أي دورة الأفضل لي؟</button>
          <button class="wa-qr" onclick="waQuickReply('price')">💰 استفسار عن الأسعار</button>
          <button class="wa-qr" onclick="waQuickReply('method')">📋 طريقة الاشتراك</button>
          <button class="wa-qr" onclick="waQuickReply('compare')">📊 مقارنة الدورات</button>
        </div>
      </div>

      <div class="wa-chat-input">
        <button class="wa-open-real" onclick="openRealWhatsApp()">
          <i class="fab fa-whatsapp"></i> فتح المحادثة مع المستشار
        </button>
        <div class="wa-share-btns">
          <button onclick="shareOnWhatsApp()" title="مشاركة الموقع">
            <i class="fas fa-share-alt"></i>
          </button>
          <button onclick="window.scrollTo({top:0,behavior:'smooth'})" title="للأعلى">
            <i class="fas fa-arrow-up"></i>
          </button>
          <button onclick="document.getElementById('courses').scrollIntoView({behavior:'smooth'})" title="الدورات">
            <i class="fas fa-graduation-cap"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(widget);
}

function toggleWAWidget() {
  const win = document.getElementById('waWindow');
  const fab = document.getElementById('waFab');
  if (!win) return;
  const isOpen = win.classList.contains('wa-open');
  win.classList.toggle('wa-open', !isOpen);
  fab.classList.toggle('wa-fab-active', !isOpen);
}

function openWhatsAppWidget() {
  const win = document.getElementById('waWindow');
  if (win && !win.classList.contains('wa-open')) {
    toggleWAWidget();
  }
  win?.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function waQuickReply(type) {
  const body = document.querySelector('.wa-chat-body');
  const qrs = document.querySelector('.wa-quick-replies');

  // Add user message
  const messages = {
    best: '🏆 أي دورة الأفضل لي؟',
    price: '💰 استفسار عن الأسعار',
    method: '📋 طريقة الاشتراك',
    compare: '📊 مقارنة الدورات'
  };

  const replies = {
    best: `<div class="wa-msg wa-msg-out"><p>${messages.best}</p></div>
      <div class="wa-msg wa-msg-in">
        <p>ممتاز! اسمح لي أساعدك تختار الأنسب 🎯</p>
        <p>جرّب نظام التوصيات الذكي — 4 أسئلة بسيطة ونوصيك بالدورة المثالية لك!</p>
        <button class="wa-action-btn" onclick="toggleWAWidget();openRecommendationQuiz()">
          🎯 ابدأ اختبار التوصية
        </button>
        <span class="wa-time">الآن</span>
      </div>`,
    price: `<div class="wa-msg wa-msg-out"><p>${messages.price}</p></div>
      <div class="wa-msg wa-msg-in">
        <p>أسعارنا الحالية 💰</p>
        <p>💎 المميزة: <strong>249 ر.س</strong> (الأصلي 749)</p>
        <p>⚡ المكثفة: <strong>199 ر.س</strong> (الأصلي 549)</p>
        <p>📚 الشاملة: <strong>149 ر.س</strong> (الأصلي 399)</p>
        <p>🎁 الحزمة الكاملة: <strong>597 ر.س</strong> بدل 1697</p>
        <span class="wa-time">الآن</span>
      </div>`,
    method: `<div class="wa-msg wa-msg-out"><p>${messages.method}</p></div>
      <div class="wa-msg wa-msg-in">
        <p>طريقة الاشتراك بسيطة جداً 📋</p>
        <p>1️⃣ اختر الدورة وأضفها للسلة</p>
        <p>2️⃣ حوّل المبلغ لبنك الإنماء (مؤسسة كريتيفا)</p>
        <p>3️⃣ أرسل الإيصال على تيليجرام</p>
        <p>4️⃣ تُفعَّل دورتك فوراً ✅</p>
        <span class="wa-time">الآن</span>
      </div>`,
    compare: `<div class="wa-msg wa-msg-out"><p>${messages.compare}</p></div>
      <div class="wa-msg wa-msg-in">
        <p>مقارنة سريعة 📊</p>
        <p>💎 المميزة: الأشمل، شرح من الصفر + محاكيات + نماذج 50-52</p>
        <p>⚡ المكثفة: لمن وقته ضيق، مركّز وسريع</p>
        <p>📚 الشاملة: للمبتدئين + تحديثات مدى الحياة</p>
        <button class="wa-action-btn" onclick="toggleWAWidget();document.getElementById('courses').scrollIntoView({behavior:'smooth'})">
          📚 استعرض الدورات
        </button>
        <span class="wa-time">الآن</span>
      </div>`
  };

  // Remove quick replies
  if (qrs) qrs.remove();

  // Insert messages
  body.insertAdjacentHTML('beforeend', replies[type]);
  body.scrollTop = body.scrollHeight;

  // After 1.5s show contact option
  setTimeout(() => {
    body.insertAdjacentHTML('beforeend', `
      <div class="wa-msg wa-msg-in">
        <p>لديك سؤال آخر؟ تواصل مع مستشارنا مباشرة 👇</p>
        <button class="wa-action-btn" onclick="openRealWhatsApp()">
          <i class="fab fa-whatsapp"></i> تحدث مع المستشار
        </button>
        <span class="wa-time">الآن</span>
      </div>
    `);
    body.scrollTop = body.scrollHeight;
  }, 1500);
}

function openRealWhatsApp() {
  const msg = encodeURIComponent('مرحباً أكاديمية عايد 👋\nأود الاستفسار عن دورات STEP 2026');
  window.open(`https://wa.me/966XXXXXXXXX?text=${msg}`, '_blank');
  // Note: Replace 966XXXXXXXXX with the actual WhatsApp number
}

function shareOnWhatsApp() {
  const msg = encodeURIComponent('🎓 أكاديمية عايد STEP 2026 — أفضل دورات STEP بخصومات تصل 70%!\n' + window.location.href);
  window.open(`https://wa.me/?text=${msg}`, '_blank');
}

/* =====================================================
   بيانات الدورات الكاملة — أكاديمية عايد STEP 2026
   ===================================================== */

const COURSES_FULL = {

  /* ══════════════════════════════════════
     1. دورة STEP المميزة
  ══════════════════════════════════════ */
  1: {
    id: 1, slug: 'premium',
    name: 'دورة STEP المميزة',
    fullName: 'دورة STEP المميزة — تحديث 2026',
    tagline: 'لمن يستهدف +90 ولا يقبل بأقل من التميّز',
    icon: '💎', color: 'gold',
    price: 249, original: 749, discount: 67,
    access: '90 يوم', badge: 'الأكثر مبيعاً', badgeColor: 'gold',
    rating: 4.9, reviewCount: 847, studentsCount: '1,200+',
    completionRate: 94, targetScore: '+90',
    image: 'images/step-course-jan.png',

    // ─── من هي الدورة له؟ ───
    whoIsItFor: [
      { icon: '🎓', title: 'طلاب الجامعات', desc: 'تريد درجة تؤهلك للقبول في البرامج التنافسية' },
      { icon: '👔', title: 'الموظفون الحكوميون', desc: 'محتاج STEP لترقية أو انتدابية أو ابتعاث' },
      { icon: '🏥', title: 'الكوادر الصحية', desc: 'مطلوب STEP في هيئة الصحة أو ترخيص مهني' },
      { icon: '⚖️', title: 'القانون والهندسة', desc: 'معيار تنافسي في التوظيف والتدريب الداخلي' },
      { icon: '📊', title: 'رجال الأعمال', desc: 'تعزيز ملفك الشخصي وفتح أبواب الاستثمار' },
      { icon: '🌍', title: 'المبتعثون', desc: 'شرط أساسي للابتعاث الخارجي والمنح الدراسية' },
    ],

    // ─── المنهج ───
    curriculum: [
      {
        unit: 'الوحدة 1', title: 'Grammar الأساسي والمتقدم',
        lessons: ['أنواع الجمل والتراكيب المعقدة', 'الأفعال المساعدة والزمن بكل تفاصيله', 'Conditionals & Passive Voice كاملاً', 'أسئلة Tricky الأكثر تكراراً في STEP'],
        duration: '4 ساعات', icon: '📝'
      },
      {
        unit: 'الوحدة 2', title: 'Reading Comprehension المتقدم',
        lessons: ['استراتيجيات القراءة السريعة وتوفير الوقت', 'فهم الفكرة الرئيسية vs التفاصيل الدقيقة', 'Academic Vocabulary الأكثر تكراراً', 'حل نماذج حقيقية بتوضيح مفصّل لكل إجابة'],
        duration: '5 ساعات', icon: '📖'
      },
      {
        unit: 'الوحدة 3', title: 'Listening Skills الاحترافي',
        lessons: ['أنواع أسئلة الـ Listening بالكامل', 'تقنيات الاستماع الفعّال وتدوين النقاط', 'British vs American accent — التمييز والفهم', 'تمارين مسجّلة حقيقية من اختبارات STEP'],
        duration: '3 ساعات', icon: '🎧'
      },
      {
        unit: 'الوحدة 4', title: 'Vocabulary & Structure',
        lessons: ['أكثر 500 كلمة تكراراً في STEP 2026', 'Word Formation & Collocations المتقدم', 'Idioms & Phrasal Verbs الأكثر ظهوراً', 'Structure البنائي للجمل الصعبة'],
        duration: '3.5 ساعات', icon: '💡'
      },
      {
        unit: 'الوحدة 5', title: 'النماذج 50 – 51 – 52 (أحدث 2026)',
        lessons: ['النموذج 50 كامل مع شرح كل إجابة بالتفصيل', 'النموذج 51 كامل مع تحليل الأخطاء الشائعة', 'النموذج 52 كامل — الأحدث 2026', 'تحليل الأنماط المتكررة والتوقعات الذكية'],
        duration: '6 ساعات', icon: '🔥'
      },
      {
        unit: 'الوحدة 6', title: 'محاكيات الاختبار الحقيقي',
        lessons: ['3 محاكيات كاملة بنفس بيئة الاختبار', 'تصحيح فوري مع تحليل النتائج', 'تتبع تقدمك في كل قسم', 'استراتيجيات اليوم الأخير قبل الاختبار'],
        duration: '4 ساعات', icon: '🎯'
      },
    ],

    // ─── مميزات الدورة ───
    features: [
      { icon: '🔥', text: 'أحدث النماذج 50 – 51 – 52 مع شرح كل إجابة' },
      { icon: '📝', text: 'شرح Grammar شامل من الصفر حتى المتقدم' },
      { icon: '🎯', text: 'محاكيات الاختبار الحقيقي (3 نماذج كاملة)' },
      { icon: '📋', text: 'خطة مذاكرة جاهزة لـ 10 و30 يوم' },
      { icon: '🔄', text: 'جميع التحديثات والنماذج القادمة لمدة 90 يوم' },
      { icon: '📱', text: 'وصول من أي جهاز في أي وقت' },
      { icon: '💬', text: 'دعم مباشر عبر تيليجرام' },
      { icon: '🏆', text: 'معدل نجاح 94% من طلاب هذه الدورة' },
    ],

    // ─── آراء ومراجعات ───
    reviews: [
      {
        name: 'نورة الشمري', avatar: 'ن', color: '#f59e0b',
        score: 92, university: 'جامعة الملك عبدالعزيز', sector: 'تعليم',
        rating: 5, date: 'مارس 2026',
        text: 'الدورة المميزة غيّرت طريقة تفكيري في الاختبار! الشرح واضح جداً والمحاكيات تعطيك ثقة كبيرة. حصلت على 92 في STEP 🎉',
        tag: 'طالبة جامعية', isVerified: true
      },
      {
        name: 'خالد الزهراني', avatar: 'خ', color: '#3b82f6',
        score: 88, university: 'وزارة الصحة', sector: 'صحة',
        rating: 5, date: 'فبراير 2026',
        text: 'محتوى منظم جداً ومفيد. الشرح مبسط وما يضيّع وقتك. الخطة الجاهزة اللي ذكروها كانت العامل الأهم في نجاحي!',
        tag: 'موظف صحي', isVerified: true
      },
      {
        name: 'ريم القحطاني', avatar: 'ر', color: '#ec4899',
        score: 91, university: 'جامعة الملك سعود', sector: 'علوم',
        rating: 5, date: 'يناير 2026',
        text: 'جربت دورات كثيرة قبل أكاديمية عايد لكن ما لقيت زيها! الأسعار معقولة جداً والمحتوى ممتاز. شكراً من القلب 🙏',
        tag: 'طالبة دكتوراه', isVerified: true
      },
      {
        name: 'أحمد الغامدي', avatar: 'أ', color: '#8b5cf6',
        score: 79, university: 'القطاع الخاص', sector: 'أعمال',
        rating: 4, date: 'أبريل 2026',
        text: 'دورة ممتازة. كنت أتوقع درجة أعلى لكن بصراحة الأساس ما كان عندي قوي وبدأت متأخر. محتوى ممتاز وسأعيد الاختبار مرة ثانية بجدية أكثر.',
        tag: 'موظف قطاع خاص', isVerified: true, isDoubt: true
      },
      {
        name: 'فاطمة العنزي', avatar: 'ف', color: '#10b981',
        score: 95, university: 'جامعة الأميرة نورة', sector: 'هندسة',
        rating: 5, date: 'أبريل 2026',
        text: 'أعلى درجة في مجموعتي كلها! النماذج الثلاث الجديدة 50-51-52 كانت مفاجأة كبيرة — وجدت نفس الأنماط في الاختبار الحقيقي 😍',
        tag: 'طالبة هندسة', isVerified: true
      },
    ],

    // ─── توصية ذكية ───
    recommendation: {
      bestFor: ['من يريد درجة +85', 'طلاب البرامج التنافسية', 'الموظفون الحكوميون'],
      notFor: ['من يريد مراجعة سريعة فقط في يومين'],
      alternativeIf: { condition: 'إذا وقتك أقل من أسبوعين', recommend: 2 }
    }
  },

  /* ══════════════════════════════════════
     2. دورة STEP المكثفة
  ══════════════════════════════════════ */
  2: {
    id: 2, slug: 'intensive',
    name: 'دورة STEP المكثفة',
    fullName: 'دورة STEP المكثفة — تحديث 2026',
    tagline: 'وقتك ضيق؟ هذه الدورة صُنعت لك!',
    icon: '⚡', color: 'blue',
    price: 199, original: 549, discount: 64,
    access: '90 يوم', badge: 'الأسرع نتيجة', badgeColor: 'blue',
    rating: 4.7, reviewCount: 634, studentsCount: '980+',
    completionRate: 91, targetScore: '70–85',
    image: 'images/step-banner.png',

    whoIsItFor: [
      { icon: '⏰', title: 'أصحاب الوقت المحدود', desc: 'عندك أسبوع أو أسبوعين فقط وتحتاج تحضّر بسرعة' },
      { icon: '🔁', title: 'المعيدون للاختبار', desc: 'أخذت STEP قبل وتريد رفع درجتك بشكل مركّز' },
      { icon: '📌', title: 'من لديه أساس جيد', desc: 'مستواك معقول وتحتاج تراجع النقاط المهمة فقط' },
      { icon: '🎯', title: 'هدف 70–80 بسرعة', desc: 'تريد تجاوز الحد الأدنى المطلوب في أسرع وقت' },
      { icon: '🏢', title: 'موظفون مستعجلون', desc: 'الاختبار قريب وما عندك وقت للمراجعة التفصيلية' },
      { icon: '🎓', title: 'طلاب الفصل الأخير', desc: 'تريد إنهاء متطلب STEP قبل التخرج بسرعة' },
    ],

    curriculum: [
      {
        unit: 'اليوم 1–2', title: 'Grammar المركّز (أهم 80% من الأسئلة)',
        lessons: ['أكثر 20 قاعدة تتكرر في STEP', 'Tricky Questions وطريقة حلها', 'تمارين مباشرة على الأنماط الأكثر ظهوراً', 'أخطاء الطلاب الأكثر شيوعاً وكيف تتجنبها'],
        duration: '3 ساعات', icon: '⚡'
      },
      {
        unit: 'اليوم 3–4', title: 'Reading السريع والفعّال',
        lessons: ['تقنية Skimming & Scanning للسرعة', 'أنواع الأسئلة وكيف تحلها في ثوانٍ', 'Vocabulary السياقية المتكررة', 'حل 2 نموذج Reading كامل بسرعة'],
        duration: '3 ساعات', icon: '⚡'
      },
      {
        unit: 'اليوم 5', title: 'Listening المركّز',
        lessons: ['التركيز على الأسئلة الأكثر تكراراً', 'استراتيجية التنبؤ قبل الاستماع', 'حل نموذج Listening كامل بشرح'],
        duration: '2 ساعات', icon: '🎧'
      },
      {
        unit: 'اليوم 6–7', title: 'النماذج 50 – 51 المكثفة',
        lessons: ['النموذج 50 مع تركيز على الأسئلة الصعبة', 'النموذج 51 مع تحليل الأنماط', 'نصائح يوم الاختبار الحاسمة', 'خطة الساعتين الأخيرتين قبل الاختبار'],
        duration: '4 ساعات', icon: '🔥'
      },
    ],

    features: [
      { icon: '⚡', text: 'خطة مذاكرة مكثفة لـ 7 أيام فعط' },
      { icon: '🎯', text: 'تركيز على الأسئلة الأكثر تكراراً في STEP' },
      { icon: '🔥', text: 'النماذج 50 – 51 مع شرح الأنماط' },
      { icon: '⏱️', text: 'تقنيات إدارة الوقت في الاختبار' },
      { icon: '📱', text: 'وصول كامل لمدة 90 يوم' },
      { icon: '💬', text: 'دعم مباشر عبر تيليجرام' },
      { icon: '🏆', text: '91% من الطلاب يحققون هدفهم' },
      { icon: '📊', text: 'تحليل نقاط الضعف وخطة معالجتها' },
    ],

    reviews: [
      {
        name: 'محمد العتيبي', avatar: 'م', color: '#3b82f6',
        score: 78, university: 'جامعة الملك فهد', sector: 'هندسة',
        rating: 5, date: 'مارس 2026',
        text: 'دورة المكثفة أنقذتني! كان عندي أسبوعان فقط للاختبار، وبفضل الخطة المكثفة نجحت بدرجة 78. خير من يوم كنت أتوقع!',
        tag: 'طالب هندسة', isVerified: true
      },
      {
        name: 'عبدالله المطيري', avatar: 'ع', color: '#f59e0b',
        score: 83, university: 'شركة أرامكو', sector: 'نفط وطاقة',
        rating: 5, date: 'فبراير 2026',
        text: 'استفدت كثيراً من خطة المذاكرة الجاهزة. وفّرت وقتي ووجهتني للمهم. النتيجة كانت أفضل من توقعاتي!',
        tag: 'موظف أرامكو', isVerified: true
      },
      {
        name: 'منيرة الحربي', avatar: 'م', color: '#ec4899',
        score: 75, university: 'وزارة التعليم', sector: 'تعليم',
        rating: 4, date: 'أبريل 2026',
        text: 'محتوى مركّز جداً ومباشر. كنت أتمنى فيه تفصيل أكثر في Grammar لكن للي وقته ضيق يكفيه تماماً.',
        tag: 'معلمة', isVerified: true, isDoubt: true
      },
      {
        name: 'طارق السعدي', avatar: 'ط', color: '#10b981',
        score: 86, university: 'القطاع الخاص', sector: 'مال وأعمال',
        rating: 5, date: 'يناير 2026',
        text: 'أخذت الدورة المكثفة وأنا قادم من تجربة سابقة. فعلاً ركّزت على الأهم وغيّرت طريقة تفكيري. رفعت درجتي من 65 إلى 86!',
        tag: 'محاسب قانوني', isVerified: true
      },
    ],

    recommendation: {
      bestFor: ['من لديه أسبوع – أسبوعان', 'من أخذ STEP من قبل ويريد رفع درجته', 'من مستواه الإنجليزي متوسط فأعلى'],
      notFor: ['المبتدئين الكاملين في الإنجليزية', 'من يريد درجة +90 بدون خبرة سابقة'],
      alternativeIf: { condition: 'إذا كنت مبتدئاً أو تريد +90', recommend: 1 }
    }
  },

  /* ══════════════════════════════════════
     3. دورة STEP الشاملة
  ══════════════════════════════════════ */
  3: {
    id: 3, slug: 'comprehensive',
    name: 'دورة STEP الشاملة',
    fullName: 'دورة STEP الشاملة — تحديث 2026',
    tagline: 'الأساس المتين خطوة بخطوة مع تحديثات مدى الحياة',
    icon: '📚', color: 'green',
    price: 149, original: 399, discount: 63,
    access: 'مدى الحياة ♾️', badge: 'الأفضل قيمة', badgeColor: 'green',
    rating: 4.8, reviewCount: 512, studentsCount: '750+',
    completionRate: 89, targetScore: '60–80',
    image: 'images/step-guide.png',

    whoIsItFor: [
      { icon: '🌱', title: 'المبتدئون الكاملون', desc: 'مستواك في الإنجليزية ضعيف وتريد البناء من الأساس' },
      { icon: '🎓', title: 'طلاب المرحلة الثانوية', desc: 'تستعد مبكراً لـ STEP قبل دخول الجامعة' },
      { icon: '📅', title: 'من يملك وقتاً كافياً', desc: 'عندك شهر أو أكثر وتريد استغلاله بشكل منظم' },
      { icon: '🔍', title: 'من يريد الفهم العميق', desc: 'لا تريد حفظاً سطحياً — تريد فهماً حقيقياً للإنجليزية' },
      { icon: '♾️', title: 'من يريد مرجعاً دائماً', desc: 'ستحتاج STEP مستقبلاً — ادفع مرة واستفد مدى الحياة' },
      { icon: '💰', title: 'الميزانية المحدودة', desc: 'تريد أفضل قيمة مقابل سعر منخفض مع تحديثات مجانية' },
    ],

    curriculum: [
      {
        unit: 'المرحلة 1', title: 'الأساسيات (Grammar من الصفر)',
        lessons: ['Parts of Speech — كل شيء من البداية', 'Simple & Compound Sentences', 'Tenses كلها مع التطبيق', 'Common Mistakes وكيف تتجنبها'],
        duration: '5 ساعات', icon: '📚'
      },
      {
        unit: 'المرحلة 2', title: 'Grammar المتوسط والمتقدم',
        lessons: ['Conditionals Types 1, 2, 3', 'Passive Voice في كل الأزمنة', 'Relative Clauses & Reported Speech', 'Advanced Sentence Structures'],
        duration: '5 ساعات', icon: '📝'
      },
      {
        unit: 'المرحلة 3', title: 'Reading الشامل',
        lessons: ['بناء Vocabulary من الصفر (أكثر 800 كلمة)', 'Main Idea vs Supporting Details', 'Inference & Context Clues', 'Practice Passages مع التحليل'],
        duration: '4 ساعات', icon: '📖'
      },
      {
        unit: 'المرحلة 4', title: 'Listening الشامل',
        lessons: ['تدريبات الاستماع المدرّجة للمبتدئين', 'Academic Listening Strategies', 'Note-taking Skills', 'Real STEP Listening Samples'],
        duration: '3 ساعات', icon: '🎧'
      },
      {
        unit: 'المرحلة 5', title: 'النماذج السابقة والمراجعة',
        lessons: ['نماذج 48 – 49 – 50 مع شرح مفصّل', 'مراجعة شاملة لكل الأقسام', 'خطة المذاكرة (5 / 10 / 30 يوم)', 'تحديثات مستمرة مدى الحياة ♾️'],
        duration: '5 ساعات', icon: '🔄'
      },
    ],

    features: [
      { icon: '♾️', text: 'تحديثات مدى الحياة بدون أي رسوم إضافية' },
      { icon: '📚', text: 'شرح Grammar من الصفر حتى المتقدم' },
      { icon: '📋', text: 'خطط مذاكرة مرنة (5 / 10 / 30 يوم)' },
      { icon: '🌱', text: 'مثالية للمبتدئين والذين يريدون الفهم العميق' },
      { icon: '💰', text: 'أفضل قيمة مقابل سعر منخفض' },
      { icon: '📱', text: 'وصول من أي جهاز في أي وقت' },
      { icon: '💬', text: 'دعم مباشر عبر تيليجرام' },
      { icon: '🔄', text: 'نماذج سابقة + مراجعة شاملة ومنظمة' },
    ],

    reviews: [
      {
        name: 'سارة الدوسري', avatar: 'س', color: '#10b981',
        score: 85, university: 'جامعة الأميرة نورة', sector: 'تعليم',
        rating: 5, date: 'فبراير 2026',
        text: 'الدورة الشاملة بنت عندي أساس قوي. شرح كل قسم بطريقة ذكية ومرتبة، والتحديثات مدى الحياة ميزة رائعة جداً!',
        tag: 'طالبة ماجستير', isVerified: true
      },
      {
        name: 'يوسف الشهراني', avatar: 'ي', color: '#3b82f6',
        score: 72, university: 'ثانوية الملك سعود', sector: 'تعليم',
        rating: 5, date: 'مارس 2026',
        text: 'أنا كنت ضعيف في الإنجليزي واستفدت كثيراً من الشرح من الصفر. الدورة مرتبة وواضحة. وصلت 72 في أول اختبار!',
        tag: 'طالب ثانوي', isVerified: true
      },
      {
        name: 'هنوف القرشي', avatar: 'هـ', color: '#8b5cf6',
        score: 68, university: 'كلية التمريض', sector: 'صحة',
        rating: 4, date: 'أبريل 2026',
        text: 'محتوى قيّم جداً بسعر ممتاز. أتمنى يكون فيه فيديوهات توضيحية أكثر. لكن الشرح المكتوب كافٍ ومنظم.',
        tag: 'طالبة تمريض', isVerified: true, isDoubt: true
      },
      {
        name: 'ناصر البلوي', avatar: 'ن', color: '#f59e0b',
        score: 80, university: 'جامعة تبوك', sector: 'علوم',
        rating: 5, date: 'يناير 2026',
        text: 'دفعت مرة وبأستفيد منها مدى الحياة! كل مرة فيه نموذج جديد يضيفونه مجاناً. هذه ميزة ما تقدر بثمن.',
        tag: 'طالب علوم', isVerified: true
      },
    ],

    recommendation: {
      bestFor: ['المبتدئون الكاملون', 'من لديه وقت كافٍ (شهر+)', 'من يريد مرجعاً دائماً بسعر منخفض'],
      notFor: ['من وقته أقل من أسبوعين', 'من مستواه متقدم ويريد فقط التدريب'],
      alternativeIf: { condition: 'إذا كان وقتك أقل من أسبوعين', recommend: 2 }
    }
  }
};

/* ══════════════════════════════════════
   نظام التوصيات الذكي
══════════════════════════════════════ */
const RECOMMENDATION_QUIZ = {
  questions: [
    {
      id: 'time',
      question: 'كم الوقت المتاح لديك قبل الاختبار؟',
      icon: '⏰',
      options: [
        { value: 'short', label: 'أسبوع أو أقل', icon: '🚀' },
        { value: 'medium', label: 'أسبوعان – شهر', icon: '📅' },
        { value: 'long', label: 'أكثر من شهر', icon: '🗓️' },
      ]
    },
    {
      id: 'level',
      question: 'كيف تقيّم مستواك في اللغة الإنجليزية؟',
      icon: '📊',
      options: [
        { value: 'beginner', label: 'مبتدئ / ضعيف', icon: '🌱' },
        { value: 'intermediate', label: 'متوسط', icon: '📈' },
        { value: 'advanced', label: 'جيد / متقدم', icon: '🏆' },
      ]
    },
    {
      id: 'goal',
      question: 'ما درجة STEP التي تستهدفها؟',
      icon: '🎯',
      options: [
        { value: 'pass', label: 'اجتياز الحد الأدنى (60–70)', icon: '✅' },
        { value: 'good', label: 'درجة جيدة (70–85)', icon: '⭐' },
        { value: 'excellent', label: 'درجة ممتازة (+85)', icon: '💎' },
      ]
    },
    {
      id: 'sector',
      question: 'في أي قطاع أو مجال تحتاج STEP؟',
      icon: '🏢',
      options: [
        { value: 'student', label: 'طالب جامعي / ثانوي', icon: '🎓' },
        { value: 'gov', label: 'موظف حكومي / صحة', icon: '🏥' },
        { value: 'business', label: 'قطاع خاص / أعمال', icon: '💼' },
      ]
    },
  ],

  getRecommendation(answers) {
    const { time, level, goal, sector } = answers;
    // Logic tree
    if (time === 'short') {
      return { courseId: 2, reason: 'وقتك ضيق والدورة المكثفة مصممة خصيصاً لك!', confidence: 95 };
    }
    if (level === 'beginner') {
      return { courseId: 3, reason: 'مستواك يحتاج أساساً قوياً — الشاملة هي البداية الصح!', confidence: 90 };
    }
    if (goal === 'excellent' || sector === 'gov') {
      return { courseId: 1, reason: 'هدفك درجة عالية ومتطلبات جدية — المميزة هي خيارك الأول!', confidence: 93 };
    }
    if (time === 'medium' && level === 'intermediate') {
      return { courseId: 2, reason: 'وقت معقول ومستوى متوسط — المكثفة ستحقق هدفك بكفاءة!', confidence: 88 };
    }
    if (time === 'long' && level === 'beginner') {
      return { courseId: 3, reason: 'وقت كافٍ وتريد البناء من الأساس — الشاملة مثالية لك!', confidence: 92 };
    }
    // Default
    return { courseId: 1, reason: 'الدورة المميزة هي الأشمل والأنسب لأغلب الطلاب!', confidence: 85 };
  }
};

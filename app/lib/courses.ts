export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Course {
  id: string;
  name: string;
  englishName: string;
  description: string;
  pricing: {
    midterm: number;
    final: number;
    testBank: number;
  };
  videos: { id: string; title: string; bunnyEmbedUrl: string }[];
  documents: { id: string; title: string; fileUrl: string }[];
  questions: Question[];
}

export const COURSES: Course[] = [
  {
    id: "adult-1",
    name: "تمريض البالغين 1",
    englishName: "Adult 1",
    description: "شرح شامل لمفاهيم تمريض البالغين 1، الفحوصات السريرية، والرعاية التمريضية المتكاملة مع بنك أسئلة للسنوات السابقة.",
    pricing: {
      midterm: 5,
      final: 5,
      testBank: 1.5,
    },
    videos: [
      {
        id: "ad1-v1",
        title: "المحاضرة الأولى: مقدمة والمفاهيم الأساسية",
        bunnyEmbedUrl: "",
      },
    ],
    documents: [
      {
        id: "ad1-doc1",
        title: "دوسية وملخص Adult 1 الشامل",
        fileUrl: "",
      },
    ],
    questions: [
      {
        id: "ad1-q1",
        question: "ما هي العلامة السريرية المبكرة الأكثر دقة لحدوث نقص الأكسجين (Hypoxia) لدى المريض البالغ؟",
        options: [
          "الزرقة السريرية (Cyanosis)",
          "التململ والقلق والتشتت (Restlessness & Confusion)",
          "انخفاض ضغط الدم (Hypotension)",
          "بطء ضربات القلب (Bradycardia)"
        ],
        correctIndex: 1,
        explanation: "التململ وتغير الوعي (Restlessness & Confusion) هما العلامة المبكرة الأولى لنقص الأكسجة؛ بينما الزرقة السريرية علامة متأخرة جداً."
      },
      {
        id: "ad1-q2",
        question: "عند تقييم مريض يعاني من نقص الصوديوم (Hyponatremia)، ما هو التدخل التمريضي الأكثر أولوية؟",
        options: [
          "مراقبة مستوى السكر في الدم",
          "مراقبة الحالة العصبية وتطبيق احتياطات النوبات (Seizure Precautions)",
          "إعطاء مدرات البول فوراً",
          "تشجيع المريض على شرب الماء بكثرة"
        ],
        correctIndex: 1,
        explanation: "نقص الصوديوم الحاد يؤثر مباشرة على خلايا الدماغ مسبباً تورماً ونوبات عصبية، لذا تأمين احتياطات النوبات له الأولوية القصوى."
      }
    ]
  },
  {
    id: "adult-2",
    name: "تمريض البالغين 2",
    englishName: "Adult 2",
    description: "تغطية مكثفة للحالات الحرجة، أمراض القلب، الجهاز التنفسي والهضمي، والتدخلات التمريضية المتقدمة.",
    pricing: {
      midterm: 5,
      final: 5,
      testBank: 1.5,
    },
    videos: [
      {
        id: "ad2-v1",
        title: "المحاضرة الأولى: اضطرابات القلب والشرايين",
        bunnyEmbedUrl: "",
      },
    ],
    documents: [
      {
        id: "ad2-doc1",
        title: "ملخص Adult 2 الشامل",
        fileUrl: "",
      },
    ],
    questions: [
      {
        id: "ad2-q1",
        question: "ما هو الفحص المخبري الأكثر دقة لتأكيد حدوث احتشاء عضلة القلب (Myocardial Infarction)؟",
        options: [
          "فحص AST",
          "فحص Troponin T / I",
          "فحص CRP",
          "فحص تجلط الدم INR"
        ],
        correctIndex: 1,
        explanation: "التروبونين (Troponin) هو المؤشر القلبي الأكثر حساسية ونوعية لتلف خلايا عضلة القلب."
      }
    ]
  },
  {
    id: "pediatric",
    name: "تمريض الأطفال",
    englishName: "Pediatric",
    description: "شرح شامل لرعاية الأطفال بمختلف المراحل العمرية، مراحل النمو والتطور، وأشهر الحالات المرضية لدى الأطفال.",
    pricing: {
      midterm: 5,
      final: 5,
      testBank: 1.5,
    },
    videos: [
      {
        id: "ped-v1",
        title: "المحاضرة الأولى: مراحل نمو وتطور الطفل (Growth & Development)",
        bunnyEmbedUrl: "",
      },
    ],
    documents: [
      {
        id: "ped-doc1",
        title: "دوسية تمريض الأطفال Pediatric",
        fileUrl: "",
      },
    ],
    questions: [
      {
        id: "ped-q1",
        question: "متى ينغلق اليافوخ الأمامي (Anterior Fontanelle) عادةً عند الرضيع الطبيعي؟",
        options: [
          "بين شهرين إلى 3 أشهر",
          "بين 12 إلى 18 شهراً",
          "مباشرة عند الولادة",
          "عند عمر 3 سنوات"
        ],
        correctIndex: 1,
        explanation: "اليافوخ الأمامي ينغلق عادة بين عمر 12 إلى 18 شهراً، بينما الخلفي ينغلق بين شهرين إلى 3 أشهر."
      }
    ]
  },
  {
    id: "maternity",
    name: "تمريض صحة الأم والولادة",
    englishName: "Maternity",
    description: "تغطية رعاية الحوامل، مراحل المخاض والولادة، الرعاية بعد الولادة، والمضاعفات الشائعة وطرق التعامل معها.",
    pricing: {
      midterm: 5,
      final: 5,
      testBank: 1.5,
    },
    videos: [
      {
        id: "mat-v1",
        title: "المحاضرة الأولى: فسيولوجيا الحمل والتغيرات الجسدية",
        bunnyEmbedUrl: "",
      },
    ],
    documents: [
      {
        id: "mat-doc1",
        title: "دوسية مادة Maternity الشاملة",
        fileUrl: "",
      },
    ],
    questions: [
      {
        id: "mat-q1",
        question: "ما هي العلامة الأكيدة والإيجابية (Positive Sign) لحدوث الحمل؟",
        options: [
          "انقطاع الدورة الشهرية (Amenorrhea)",
          "سماع نبضات قلب الجنين عبر الدوبلر (Fetal Heart Sounds)",
          "نتيجة فحص الحمل المنزلي الإيجابية",
          "الشعور بغثيان الصباح"
        ],
        correctIndex: 1,
        explanation: "سماع نبضات قلب الجنين أو رؤيته بالموجات فوق الصوتية هي من العلامات الأكيدة (Positive Signs) التي لا تحتمل أي سبب آخر."
      }
    ]
  }
];

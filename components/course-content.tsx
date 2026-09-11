"use client";

import React, { useState, useEffect } from "react";
import { Course } from "@/lib/courses";
import { isCourseUnlocked, activateCourseWithCode } from "@/lib/device-lock";
import TestBankQuiz from "./test-bank-quiz";
import { PlayCircle, FileText, CheckCircle, Lock, KeyRound, ShieldAlert } from "lucide-react";

interface CourseContentProps {
  course: Course;
  onSubscribeClick: (type: "midterm" | "final" | "testBank") => void;
}

export default function CourseContent({ course, onSubscribeClick }: CourseContentProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [activationMsg, setActivationMsg] = useState<{ text: string; isError: boolean } | null>(null);
  const [activeTab, setActiveTab] = useState<"videos" | "docs" | "quiz">("videos");

  useEffect(() => {
    setIsUnlocked(isCourseUnlocked(course.id));
  }, [course.id]);

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    const res = activateCourseWithCode(course.id, inputCode);
    if (res.success) {
      setIsUnlocked(true);
      setActivationMsg({ text: res.message, isError: false });
    } else {
      setActivationMsg({ text: res.message, isError: true });
    }
  };

  return (
    <div className="space-y-6">
      {/* في حال كانت المادة مقفلة على هذا الجهاز */}
      {!isUnlocked ? (
        <div className="bg-gray-900/90 border border-gray-800 rounded-3xl p-6 sm:p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-sky-950/60 border border-sky-800/40 rounded-2xl flex items-center justify-center mx-auto text-sky-400">
            <Lock className="w-8 h-8" />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-xl font-bold text-white">محتوى مادة {course.name} محمي</h3>
            <p className="text-sm text-gray-400">
              للوصول إلى شروحات الفيديوهات الخاصة بالمادة وبنوك الأسئلة والملخصات، يرجى الاشتراك أو تفعيل كود الدورة لجهازك.
            </p>
          </div>

          {/* خانة إدخال كود التفعيل */}
          <form onSubmit={handleActivate} className="max-w-md mx-auto space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="أدخل كود التفعيل (مثال: PYS-AD1-XXXX)"
                className="flex-1 bg-gray-950 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white text-center tracking-wider focus:outline-none focus:border-sky-500 font-mono uppercase"
              />
              <button
                type="submit"
                className="bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition flex items-center gap-1.5 shrink-0"
              >
                <KeyRound className="w-4 h-4" />
                تفعيل
              </button>
            </div>

            {activationMsg && (
              <p className={`text-xs font-medium ${activationMsg.isError ? "text-rose-400" : "text-emerald-400"}`}>
                {activationMsg.text}
              </p>
            )}
          </form>

          {/* باقات الاشتراك */}
          <div className="pt-4 border-t border-gray-800">
            <h4 className="text-sm font-semibold text-gray-300 mb-4">أو اختر إحدى الباقات للاشتراك الفوري:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
              <button
                onClick={() => onSubscribeClick("midterm")}
                className="p-4 rounded-xl bg-gray-950 border border-gray-800 hover:border-sky-500/50 transition text-right group"
              >
                <div className="text-xs text-gray-400">باقة الميد</div>
                <div className="text-base font-bold text-white group-hover:text-sky-400">امتحان Midterm</div>
                <div className="text-sky-400 font-extrabold mt-2">{course.pricing.midterm} دنانير</div>
              </button>

              <button
                onClick={() => onSubscribeClick("final")}
                className="p-4 rounded-xl bg-gray-950 border border-gray-800 hover:border-sky-500/50 transition text-right group"
              >
                <div className="text-xs text-gray-400">باقة الفاينل</div>
                <div className="text-base font-bold text-white group-hover:text-sky-400">امتحان Final</div>
                <div className="text-sky-400 font-extrabold mt-2">{course.pricing.final} دنانير</div>
              </button>

              <button
                onClick={() => onSubscribeClick("testBank")}
                className="p-4 rounded-xl bg-gray-950 border border-gray-800 hover:border-sky-500/50 transition text-right group"
              >
                <div className="text-xs text-gray-400">تدريب واستفتاء</div>
                <div className="text-base font-bold text-white group-hover:text-sky-400">Test Bank MCQ</div>
                <div className="text-emerald-400 font-extrabold mt-2">{course.pricing.testBank} دينار</div>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* في حال كانت المادة مفعلة ومفتوحة */
        <div className="space-y-6">
          {/* تبويبات الانتقال بين المحاضرات والملفات والأسئلة */}
          <div className="flex gap-2 p-1.5 bg-gray-900 border border-gray-800 rounded-2xl max-w-md mx-auto">
            <button
              onClick={() => setActiveTab("videos")}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeTab === "videos" ? "bg-sky-600 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              فيديوهات الشرح
            </button>
            <button
              onClick={() => setActiveTab("quiz")}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeTab === "quiz" ? "bg-sky-600 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              بنك الأسئلة (MCQ)
            </button>
            <button
              onClick={() => setActiveTab("docs")}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeTab === "docs" ? "bg-sky-600 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              الملخصات (PDF)
            </button>
          </div>

          {/* مشغل الفيديوهات المدمج الداخلي */}
          {activeTab === "videos" && (
            <div className="space-y-6">
              {course.videos.map((vid) => (
                <div key={vid.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden p-4 space-y-3">
                  <h4 className="font-bold text-white flex items-center gap-2">
                    <PlayCircle className="w-5 h-5 text-sky-400" />
                    {vid.title}
                  </h4>
                  {vid.bunnyEmbedUrl ? (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
                      <iframe
                        src={vid.bunnyEmbedUrl}
                        loading="lazy"
                        className="w-full h-full border-0 absolute top-0 left-0"
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-video rounded-xl bg-gray-950 border border-gray-800 flex flex-col items-center justify-center text-gray-500 text-xs sm:text-sm p-4 text-center">
                      <PlayCircle className="w-10 h-10 mb-2 text-gray-600" />
                      <span>سيتم إدراج رابط فيديو Bunny.net قريباً لهذه المحاضرة</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* قسم بنك الأسئلة */}
          {activeTab === "quiz" && (
            <TestBankQuiz questions={course.questions} courseName={course.name} />
          )}

          {/* قسم الملخصات والدوسيات */}
          {activeTab === "docs" && (
            <div className="space-y-3">
              {course.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 bg-gray-900 border border-gray-800 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-sky-400" />
                    <span className="text-sm font-semibold text-white">{doc.title}</span>
                  </div>
                  {doc.fileUrl ? (
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-lg transition"
                    >
                      فتح الملف
                    </a>
                  ) : (
                    <span className="text-xs text-gray-500 bg-gray-950 px-3 py-1.5 rounded-lg border border-gray-800">
                      قيد الرفع
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
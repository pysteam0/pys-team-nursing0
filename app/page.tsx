"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "../components/navbar";
import CheckoutModal from "../components/checkout-modal";
import CourseContent from "../components/course-content";
import { COURSES, Course } from "../lib/courses";
import { BookOpen, GraduationCap, ShieldCheck, Sparkles, HelpCircle } from "lucide-react";

export default function HomePage() {
  const [selectedCourse, setSelectedCourse] = useState<Course>(COURSES[0]);
  const [checkoutData, setCheckoutData] = useState<{
    course: Course | null;
    packageType: "midterm" | "final" | "testBank" | null;
  }>({
    course: null,
    packageType: null,
  });

  const handleOpenCheckout = (course: Course, packageType: "midterm" | "final" | "testBank") => {
    setCheckoutData({ course, packageType });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0f1d] text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 space-y-12">
        {/* قسم الترحيب */}
        <section className="text-center space-y-4 pt-4 pb-2">
          <div className="relative w-24 h-24 mx-auto rounded-3xl overflow-hidden border-2 border-sky-500/30 shadow-2xl shadow-sky-500/10 bg-gray-900">
            <Image src="/logo.png" alt="PYS TEAM" fill className="object-cover" priority />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-950/60 border border-sky-800/40 text-sky-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            منصة PYS TEAM الأكاديمية — كلية التمريض جامعة اليرموك
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white max-w-2xl mx-auto leading-tight">
            تعلم التمريض مع <span className="text-sky-400">PYS TEAM</span> بأسلوب هادئ ومنظم
          </h1>

          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            شروحات مرئية تفاعلية مدمجة عبر Bunny.net، دوسيات وملخصات شاملة، وبنك أسئلة وسنوات سابقة بنظام الاستفتاء المباشر.
          </p>
        </section>

        {/* بطاقات اختيار المواد */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-400" />
            اختر المادة الدراسية:
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {COURSES.map((c) => {
              const isSelected = selectedCourse.id === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCourse(c)}
                  className={`p-4 rounded-2xl border text-right transition-all duration-200 ${
                    isSelected
                      ? "bg-sky-950/40 border-sky-500 shadow-lg shadow-sky-950/40"
                      : "bg-gray-900/60 border-gray-800 hover:border-gray-700 text-gray-300"
                  }`}
                >
                  <div className="text-xs font-mono text-sky-400 mb-1">{c.englishName}</div>
                  <div className="font-bold text-sm sm:text-base text-white">{c.name}</div>
                  <div className="text-[11px] text-gray-400 mt-2 line-clamp-1">
                    Mid: {c.pricing.midterm}JD | Final: {c.pricing.final}JD
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* محتوى المادة المختارة */}
        <section className="space-y-4">
          <div className="bg-gray-900/40 border border-gray-800/80 rounded-3xl p-6 sm:p-8">
            <div className="border-b border-gray-800 pb-4 mb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {selectedCourse.name} ({selectedCourse.englishName})
                </h3>
                <p className="text-xs text-gray-400 mt-1">{selectedCourse.description}</p>
              </div>
              <span className="text-xs bg-gray-950 border border-gray-800 text-gray-400 px-3 py-1 rounded-full self-start sm:self-auto">
                محتوى محمي بنظام بصمة الجهاز
              </span>
            </div>

            <CourseContent
              course={selectedCourse}
              onSubscribeClick={(type) => handleOpenCheckout(selectedCourse, type)}
            />
          </div>
        </section>
      </main>

      {/* تذييل الصفحة */}
      <footer className="border-t border-gray-900 bg-gray-950/40 py-6 text-center text-xs text-gray-500 space-y-2">
        <p>© {new Date().getFullYear()} PYS TEAM — جميع الحقوق محفوظة لطلبة تمريض جامعة اليرموك.</p>
        <p className="text-[11px] text-gray-600">
          للدعم الفني والاستفسار وتفعيل الحسابات تواصل عبر التلغرام: <span className="text-sky-500 font-mono">@PYS_yu</span>
        </p>
      </footer>

      {/* نافذة الاشتراك */}
      {checkoutData.course && checkoutData.packageType && (
        <CheckoutModal
          course={checkoutData.course}
          packageType={checkoutData.packageType}
          onClose={() => setCheckoutData({ course: null, packageType: null })}
        />
      )}
    </div>
  );
}
"use client";

import React, { useState } from "react";
import { Course } from "@/lib/courses";
import { Copy, Check, Send, X, AlertCircle } from "lucide-react";

interface CheckoutModalProps {
  course: Course | null;
  packageType: "midterm" | "final" | "testBank" | null;
  onClose: () => void;
}

export default function CheckoutModal({ course, packageType, onClose }: CheckoutModalProps) {
  const [copied, setCopied] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  if (!course || !packageType) return null;

  const packageLabels: Record<string, string> = {
    midterm: "باقة امتحان الميد (Midterm)",
    final: "باقة امتحان الفاينل (Final Exam)",
    testBank: "بنك الأسئلة التفاعلي (Test Bank MCQ)",
  };

  const price = course.pricing[packageType];
  const cliqNumber = "0777815089";

  const handleCopy = () => {
    navigator.clipboard.writeText(cliqNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendTelegram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      alert("يرجى تعبئة كافة الحقول أولاً");
      return;
    }

    const message = `مرحباً PYS TEAM 👋\nأرغب بتأكيد اشتراكي في المنصة:\n\n` +
      `📌 المادة: ${course.name} (${course.englishName})\n` +
      `📦 الباقة: ${packageLabels[packageType]}\n` +
      `💰 المبلغ المحول: ${price} دنانير\n` +
      `👤 اسم الطالب: ${fullName}\n` +
      `📧 البريد الإلكتروني: ${email}\n` +
      `📱 رقم الهاتف: ${phone}\n\n` +
      `مرفق صورة إشعار التحويل (CliQ) للتفعيل 📄`;

    const encoded = encodeURIComponent(message);
    window.open(`https://t.me/PYS_yu?text=${encoded}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl text-right overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-sky-400 mb-1">إتمام الاشتراك والدفع</h3>
        <p className="text-sm text-gray-400 mb-4">
          المادة: <span className="text-white font-semibold">{course.name}</span> — {packageLabels[packageType]}
        </p>

        <div className="bg-gray-950/70 border border-sky-900/50 rounded-xl p-4 mb-5">
          <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-800">
            <span className="text-gray-400 text-sm">المستلم المعتمد:</span>
            <span className="text-white font-bold">Ahmad Ayman</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-400 text-sm">CliQ / رقم المحفظة:</span>
            <div className="flex items-center gap-2">
              <code className="text-sky-300 font-mono text-base font-bold bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/40">
                {cliqNumber}
              </code>
              <button
                type="button"
                onClick={handleCopy}
                className="p-1.5 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-300 transition"
                title="نسخ الرقم"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">المبلغ المطلوب تحويله:</span>
            <span className="text-emerald-400 font-bold text-lg">{price} دينار أردني</span>
          </div>
        </div>

        <form onSubmit={handleSendTelegram} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">الاسم الرباعي للطالب *</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="مثال: أحمد محمد علي عبدالله"
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">بريد قوقل الإلكتروني (Gmail) *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@gmail.com"
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">رقم الهاتف للتواصل والواتساب *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="07XXXXXXXX"
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="bg-amber-950/30 border border-amber-800/40 rounded-lg p-3 text-xs text-amber-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <p>
              بعد الضغط على الزر أدناه، سيتم توجيهك إلى التلغرام لإرسال صورة إيصال الدفع واستلام كود التفعيل فوراً.
            </p>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2.5 rounded-xl transition duration-200 mt-4 shadow-lg shadow-sky-900/30"
          >
            <Send className="w-4 h-4" />
            تأكيد الطلب وإرسال الوصل عبر التلغرام (@PYS_yu)
          </button>
        </form>
      </div>
    </div>
  );
}
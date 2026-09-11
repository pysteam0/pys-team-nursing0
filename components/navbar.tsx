"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { User, LogIn, LogOut, X } from "lucide-react";

export default function Navbar() {
  const [userName, setUserName] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("pys_student_name");
    if (savedUser) setUserName(savedUser);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      localStorage.setItem("pys_student_name", nameInput.trim());
      localStorage.setItem("pys_student_email", emailInput.trim());
      setUserName(nameInput.trim());
      setShowLoginModal(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("pys_student_name");
    localStorage.removeItem("pys_student_email");
    setUserName(null);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* الشعار واسم المنصة */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-sky-500/30 bg-gray-900">
              <Image src="/logo.png" alt="PYS TEAM Logo" fill className="object-cover" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-wide text-white block">PYS TEAM</span>
              <span className="text-[10px] text-sky-400 font-medium">Yarmouk University Nursing</span>
            </div>
          </div>

          {/* زر تسجيل الدخول أو اسم الطالب */}
          <div>
            {userName ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-300 flex items-center gap-1.5 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-full">
                  <User className="w-3.5 h-3.5 text-sky-400" />
                  {userName}
                </span>
                <button
                  onClick={handleLogout}
                  title="تسجيل الخروج"
                  className="p-1.5 text-gray-400 hover:text-rose-400 transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition"
              >
                <LogIn className="w-3.5 h-3.5" />
                تسجيل الدخول
              </button>
            )}
          </div>
        </div>
      </header>

      {/* نافذة تسجيل الدخول البسيطة */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl text-right">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 left-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="text-base font-bold text-white mb-1">تسجيل دخول الطالب</h4>
            <p className="text-xs text-gray-400 mb-4">ادخل بياناتك لتثبيت تفعيل دوراتك ومتابعتها</p>

            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">الاسم الرباعي</label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="أدخل اسمك الرباعي"
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">بريد Gmail</label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold py-2.5 rounded-xl transition mt-2"
              >
                تأكيد الدخول
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
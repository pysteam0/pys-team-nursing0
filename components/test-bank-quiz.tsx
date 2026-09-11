"use client";

import React, { useState } from "react";
import { Question } from "@/lib/courses";
import { CheckCircle2, XCircle, HelpCircle, RotateCcw } from "lucide-react";

interface TestBankQuizProps {
  questions: Question[];
  courseName: string;
}

export default function TestBankQuiz({ questions, courseName }: TestBankQuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-900/50 border border-gray-800 rounded-2xl">
        <HelpCircle className="w-12 h-12 text-gray-500 mx-auto mb-3" />
        <p className="text-gray-400">لا توجد أسئلة مضافة حالياً في هذا القسم.</p>
      </div>
    );
  }

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (selectedAnswers[questionId] !== undefined) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleResetQuestion = (questionId: string) => {
    setSelectedAnswers((prev) => {
      const updated = { ...prev };
      delete updated[questionId];
      return updated;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-gray-900 border border-gray-800 p-4 rounded-xl">
        <h4 className="font-bold text-sky-400">
          أسئلة بنك {courseName} ({questions.length} سؤال)
        </h4>
        <span className="text-xs bg-sky-950 text-sky-300 border border-sky-800/40 px-2.5 py-1 rounded-full">
          نظام الاستفتاء الفوري
        </span>
      </div>

      {questions.map((q, qIndex) => {
        const selected = selectedAnswers[q.id];
        const isAnswered = selected !== undefined;
        const isCorrect = selected === q.correctIndex;

        return (
          <div
            key={q.id}
            className="bg-gray-900/80 border border-gray-800 rounded-2xl p-5 shadow-lg space-y-4"
          >
            <div className="flex justify-between items-start gap-3">
              <div className="flex items-start gap-3">
                <span className="bg-sky-900/50 text-sky-300 text-xs font-bold px-2 py-1 rounded border border-sky-700/50 shrink-0 mt-0.5">
                  سؤال {qIndex + 1}
                </span>
                <h5 className="font-medium text-white leading-relaxed">{q.question}</h5>
              </div>
              {isAnswered && (
                <button
                  onClick={() => handleResetQuestion(q.id)}
                  className="text-gray-400 hover:text-sky-400 transition p-1"
                  title="إعادة المحاولة"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="space-y-2 pt-2">
              {q.options.map((opt, optIndex) => {
                let buttonStyle = "border-gray-800 bg-gray-950/60 hover:bg-gray-800/60 text-gray-300";

                if (isAnswered) {
                  if (optIndex === q.correctIndex) {
                    buttonStyle = "border-emerald-500/80 bg-emerald-950/40 text-emerald-200 font-semibold";
                  } else if (optIndex === selected && !isCorrect) {
                    buttonStyle = "border-rose-500/80 bg-rose-950/40 text-rose-200";
                  } else {
                    buttonStyle = "border-gray-800/40 bg-gray-950/30 text-gray-500 opacity-60";
                  }
                }

                return (
                  <button
                    key={optIndex}
                    type="button"
                    onClick={() => handleSelectOption(q.id, optIndex)}
                    disabled={isAnswered}
                    className={`w-full flex items-center justify-between text-right p-3.5 rounded-xl border transition-all duration-200 text-sm ${buttonStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && optIndex === q.correctIndex && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isAnswered && optIndex === selected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div
                className={`p-3.5 rounded-xl border text-xs leading-relaxed animate-in fade-in duration-300 ${
                  isCorrect
                    ? "bg-emerald-950/20 border-emerald-900/40 text-emerald-300"
                    : "bg-rose-950/20 border-rose-900/40 text-rose-300"
                }`}
              >
                <div className="font-bold mb-1 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" />
                  <span>الشرح الطبي والتعليل:</span>
                </div>
                <p className="text-gray-300">{q.explanation}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
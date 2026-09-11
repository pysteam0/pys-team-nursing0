"use client";

// توليد معرّف فريد لجهاز الطالب
export function getDeviceId(): string {
  if (typeof window === "undefined") return "";

  let deviceId = localStorage.getItem("pys_device_fingerprint");
  if (!deviceId) {
    const screenInfo = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
    const userAgent = navigator.userAgent;
    const randomSalt = Math.random().toString(36).substring(2, 9);
    
    // تشفير بسيط لإنشاء بصمة ثابتة للجهاز
    deviceId = "DEV-" + btoa(`${screenInfo}-${userAgent}-${randomSalt}`).slice(0, 16);
    localStorage.setItem("pys_device_fingerprint", deviceId);
  }
  return deviceId;
}

// فحص هل المادة مفعلة على هذا الجهاز
export function isCourseUnlocked(courseId: string): boolean {
  if (typeof window === "undefined") return false;
  const currentDeviceId = getDeviceId();
  const activationRecord = localStorage.getItem(`pys_active_${courseId}`);
  
  if (!activationRecord) return false;

  try {
    const parsed = JSON.parse(activationRecord);
    return parsed.deviceId === currentDeviceId;
  } catch {
    return false;
  }
}

// تفعيل المادة وربطها بجهاز الطالب فقط
export function activateCourseWithCode(courseId: string, inputCode: string): { success: boolean; message: string } {
  const currentDeviceId = getDeviceId();
  const cleanCode = inputCode.trim().toUpperCase();

  // فحص الكود (يقبل أكواد خاصة بالمنصة تبدأ بـ PYS وتطابق المادة)
  const prefixMap: Record<string, string> = {
    "adult-1": "PYS-AD1",
    "adult-2": "PYS-AD2",
    "pediatric": "PYS-PED",
    "maternity": "PYS-MAT",
  };

  const validPrefix = prefixMap[courseId];

  if (!cleanCode.startsWith(validPrefix)) {
    return {
      success: false,
      message: "⚠️ كود التفعيل غير صالح لهذه المادة. تأكد من إدخال الكود الصحيح.",
    };
  }

  // تخزين التفعيل مربوطاً بالبصمة الحالية للجهاز
  const record = {
    courseId,
    code: cleanCode,
    deviceId: currentDeviceId,
    activatedAt: new Date().toISOString(),
  };

  localStorage.setItem(`pys_active_${courseId}`, JSON.stringify(record));

  return {
    success: true,
    message: "✅ تم تفعيل المادة بنجاح على هذا الجهاز!",
  };
}

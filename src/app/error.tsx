"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error ke console tapi tidak tampil ke user
    console.error("[App Error]", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 w-full max-w-md p-8 text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-lg font-bold text-slate-800 mb-2">
          Terjadi Kesalahan
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed mb-6">
          Halaman ini mengalami gangguan sementara. Silakan coba lagi atau kembali ke halaman sebelumnya.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <button
            onClick={reset}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors"
          >
            Coba Lagi
          </button>
          <button
            onClick={() => window.history.back()}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-xl transition-colors"
          >
            Kembali
          </button>
          <button
            onClick={() => (window.location.href = "/login")}
            className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm font-medium rounded-xl transition-colors"
          >
            Ke Login
          </button>
        </div>

        {/* Subtle error code */}
        {error.digest && (
          <p className="mt-5 text-xs text-slate-300">Kode: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
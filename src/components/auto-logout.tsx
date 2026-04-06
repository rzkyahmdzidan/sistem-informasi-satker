"use client";

import { useEffect } from "react";

export default function AutoLogout() {
  useEffect(() => {
    // Tandai session aktif di sessionStorage
    // sessionStorage otomatis hilang saat tab/browser ditutup
    const SESSION_KEY = "app_session_active";

    // Cek apakah ini tab baru (bukan refresh)
    // Kalau sessionStorage kosong = tab baru / browser baru dibuka
    const isActive = sessionStorage.getItem(SESSION_KEY);

    if (!isActive) {
      // Tab baru dibuka tanpa sessionStorage = kemungkinan buka baru setelah close
      // Logout dulu untuk memastikan sesi bersih
      fetch("/api/auth", { method: "DELETE" }).finally(() => {
        // Hanya redirect kalau bukan di halaman login
        if (!window.location.pathname.startsWith("/login")) {
          window.location.href = "/login";
        }
      });
    }

    // Set flag aktif
    sessionStorage.setItem(SESSION_KEY, "1");

    // Saat tab/browser ditutup, sessionStorage otomatis bersih
    // Tapi kita tetap hit logout API via pagehide supaya cookie server juga bersih
    const handlePageHide = (e: PageTransitionEvent) => {
      // persisted = true artinya halaman masuk bfcache (navigasi biasa), bukan close
      if (!e.persisted) {
        // Gunakan sendBeacon supaya request tetap terkirim meski tab ditutup
        navigator.sendBeacon("/api/auth/logout-beacon");
      }
    };

    window.addEventListener("pagehide", handlePageHide);
    return () => window.removeEventListener("pagehide", handlePageHide);
  }, []);

  return null;
}
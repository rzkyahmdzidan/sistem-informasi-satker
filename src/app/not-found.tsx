export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 w-full max-w-md p-8 text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
          </svg>
        </div>

        {/* 404 */}
        <p className="text-5xl font-black text-slate-200 mb-3">404</p>

        <h1 className="text-lg font-bold text-slate-800 mb-2">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed mb-6">
          Halaman yang kamu cari tidak ada atau sudah dipindahkan.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <a
            href="/dashboard"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors"
          >
            Ke Dashboard
          </a>
          <a
            href="/login"
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-xl transition-colors"
          >
            Ke Login
          </a>
        </div>
      </div>
    </div>
  );
}
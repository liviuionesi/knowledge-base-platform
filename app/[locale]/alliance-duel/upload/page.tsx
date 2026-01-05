'use client';

import { Link } from '@/i18n/routing';

export default function UploadPage() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <div className="bg-zinc-900/40 rounded-3xl border border-zinc-800/50 p-12 text-center backdrop-blur-xl hover:border-orange-600/20 transition-all duration-700">
        <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-600/10 border border-orange-600/20 relative">
           <div className="absolute inset-0 bg-orange-600/20 blur-2xl animate-pulse"></div>
           <svg className="w-10 h-10 text-orange-600 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
           </svg>
        </div>
        
        <h1 className="text-3xl font-black tracking-tighter text-white mb-4 uppercase italic">Direct Intelligence <span className="text-orange-600">Sync</span></h1>
        
        <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
          OCR processing has been migrated to the <span className="text-white font-bold italic">Antigravity Core</span>. 
          Uploads are now handled directly via agent interaction for maximum security and data integrity.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/alliance-duel" 
            className="px-8 py-3 bg-zinc-800 text-white text-xs uppercase tracking-[0.2em] font-black hover:bg-zinc-700 transition-all border border-zinc-700 rounded-lg group"
          >
            ← View Intelligence Report
          </Link>
        </div>
      </div>
    </div>
  );
}

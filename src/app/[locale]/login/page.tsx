"use client";

import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const t = useTranslations('Auth');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
    
    // Simple client-side cookie set for demonstration/MVP of Phase 2
    // In a real app, use Server Action to validate env var and set HttpOnly cookie
    // But since we need to validate against the env var which is on server...
    // We should use an API route.
    
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    }).then(res => {
      if (res.ok) window.location.href = '/';
      else alert('Invalid Password');
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-background text-foreground">
      <div className="w-full max-w-sm space-y-4 border p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">{t('loginTitle')}</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="password" 
            name="password"
            placeholder={t('passwordPlaceholder')}
            className="w-full p-2 border rounded bg-background text-foreground"
          />
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {t('submit')}
          </button>
        </form>
      </div>
    </div>
  );
}

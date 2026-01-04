"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const cleanUsername = username.trim();
      const cleanPassword = password.trim();

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: cleanUsername, password: cleanPassword }),
      });

      if (res.ok) {
        router.refresh();
        router.push("/");
      } else {
        setError(t("error"));
      }
    } catch {
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full flex bg-[#0d131f] overflow-hidden">
      
      {/* Mobile Background: Absolute Phoenix */}
      <div className="absolute inset-0 lg:hidden flex items-center justify-center z-0 pointer-events-none overflow-hidden">
        <img 
          src="/phenix-flying.png" 
          alt="Phenix Background" 
          className="w-[150%] max-w-none h-auto object-cover opacity-20"
        />
      </div>
      
      {/* Left Section: Static Phoenix */}
      <section className="relative hidden lg:flex flex-1 items-center justify-center bg-[#0d131f]">
        <div className="relative w-full h-full flex items-center justify-center">
          <img 
            src="/phenix-flying.png" 
            alt="Phenix Alliance" 
            className="w-full max-w-4xl scale-110 object-contain select-none"
          />
        </div>
      </section>

      {/* Right Section: Solid Login Form */}
      <section className="relative z-10 w-full lg:w-[500px] bg-transparent lg:bg-[#0d131f] flex flex-col justify-center px-12 md:px-20">
        <div className="w-full">
          <header className="mb-12">
            <h1 className="text-white text-4xl font-extralight tracking-[0.2em] uppercase">
              Phenix
            </h1>
            <p className="text-zinc-500 mt-2 text-sm tracking-widest uppercase">
              {t("description")}
            </p>
          </header>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="group">
              <label className="block text-zinc-400 text-xs tracking-[0.2em] uppercase mb-3 font-semibold group-focus-within:text-orange-500 transition-colors">
                {t("usernamePlaceholder")}
              </label>
              <input 
                type="text"
                name="username"
                autoComplete="username"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="PLAYER ID"
                title="Your player name in the Phenix alliance"
                className="w-full bg-transparent border-b border-zinc-700 py-3 text-white text-base outline-none focus:border-orange-600 transition-all placeholder:text-zinc-600"
              />
            </div>

            <div className="group">
              <label className="block text-zinc-400 text-xs tracking-[0.2em] uppercase mb-3 font-semibold group-focus-within:text-orange-500 transition-colors">
                {t("passwordPlaceholder")}
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  title="Contact -IronMaiden- in the game for your password."
                  className="w-full bg-transparent border-b border-zinc-700 py-3 pr-10 text-white text-base outline-none focus:border-orange-600 transition-all placeholder:text-zinc-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm font-medium text-red-400 text-center px-4 py-2 bg-red-500/10 border border-red-500/20 rounded">
                {error}
              </p>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full mt-10 py-4 bg-white text-black font-black text-xs uppercase tracking-[0.3em] hover:bg-orange-600 hover:text-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "..." : t("submit")}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}


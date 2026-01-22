
'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import heroesEn from '@/data/heroes.json';
import heroesDe from '@/data/heroes_de.json';
import heroesFr from '@/data/heroes_fr.json';
import heroesIt from '@/data/heroes_it.json';

interface HeroUpgradeTableProps {
  category: 'blue' | 'purple' | 'orange-utility' | 'orange-combat';
  heroNames?: string[]; 
}

const heroDataMap: Record<string, any[]> = {
  en: heroesEn,
  de: heroesDe,
  fr: heroesFr,
  it: heroesIt,
};

const CATEGORIES = {
  blue: { type: 'B' },
  purple: { type: 'A' },
  'orange-utility': { type: 'S' },
  'orange-combat': { type: 'S' },
};

// Manually categorized orange heroes as requested
const ORANGE_UTILITY = ['Sophia', 'Amelia', 'Katrina', 'Laura'];
const ORANGE_COMBAT = ['Selena', 'Nyx', 'Oliveira', 'Scarlett']; 

export const HeroUpgradeTable: React.FC<HeroUpgradeTableProps> = ({ category }) => {
  const locale = useLocale();
  const heroes = heroDataMap[locale] || heroesEn;

  const filteredHeroes = heroes.filter(hero => {
    if (category === 'blue') return hero.type === 'B';
    if (category === 'purple') return hero.type === 'A';
    if (category === 'orange-utility') return hero.type === 'S' && ORANGE_UTILITY.includes(hero.name);
    if (category === 'orange-combat') return hero.type === 'S' && ORANGE_COMBAT.includes(hero.name);
    return false;
  });

  // Sort by faction
  const sortedHeroes = [...filteredHeroes].sort((a, b) => a.faction.localeCompare(b.faction));

  // Translation helpers
  const allHeaders: Record<string, { name: string, skill3: string, skill4: string }> = {
    en: { name: 'Hero', skill3: '3rd Skill (Global)', skill4: '4th Skill (Talent)' },
    fr: { name: 'Héros', skill3: '3ème Compétence', skill4: '4ème Compétence' },
    de: { name: 'Held', skill3: '3. Fähigkeit', skill4: '4. Fähigkeit' },
    it: { name: 'Eroe', skill3: '3ª Abilità', skill4: '4ª Abilità' },
  };
  const headers = allHeaders[locale] || allHeaders.en;

  return (
    <div className="overflow-x-auto my-4 border border-[var(--border)] rounded-lg">
      <table className="min-w-full divide-y divide-[var(--border)]">
        <thead className="bg-[var(--muted)]">
          <tr>
            <th scope="col" className="px-4 py-2 text-left text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
              {headers.name}
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
              {headers.skill3}
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
              {headers.skill4}
            </th>
          </tr>
        </thead>
        <tbody className="bg-[var(--background)] divide-y divide-[var(--border)]">
          {sortedHeroes.map((hero) => {
            const skill3 = hero.skills?.[2];
            const skill4 = hero.skills?.[3];
            
            return (
              <tr key={hero.name} className="hover:bg-[var(--accent)]/50 transition-colors">
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="relative group inline-block">
                    <span className="font-bold text-[var(--phenix-orange)] cursor-help border-b border-dotted border-[var(--border)]">
                      {hero.name}
                    </span>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                      <div className="bg-[var(--phenix-dark)] text-white text-[10px] py-1 px-2 rounded shadow-lg whitespace-nowrap border border-white/10">
                        {hero.faction}
                      </div>
                      <div className="w-2 h-2 bg-[var(--phenix-dark)] rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2 text-xs text-[var(--foreground)]">
                  <div className="font-bold text-[var(--foreground)] mb-0.5">{skill3?.name}</div>
                  <div className="leading-tight opacity-90">{skill3?.description}</div>
                </td>
                <td className="px-4 py-2 text-xs text-[var(--foreground)]">
                  <div className="font-bold text-[var(--foreground)] mb-0.5">{skill4?.name}</div>
                  <div className="leading-tight opacity-90">{skill4?.description}</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

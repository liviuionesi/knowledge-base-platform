
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
const ORANGE_UTILITY = ['Sophia', 'Amelia', 'Katrina', 'Laura', 'Mia', 'Chinatsu'];
const ORANGE_COMBAT = ['Selena', 'Nyx', 'Oliveira', 'Scarlett', 'Sakura', 'Evelyn']; 

const RECOMMENDATIONS: Record<string, string> = {
  // Blue Heroes
  'Audrey': 'High Priority: Boosts unit training speed. Essential for sustained growth.',
  'Giselle': 'Medium Priority: Focus on Wood gathering. Upgrade if short on wood resources.',
  'Angelina': 'High Priority: Essential for unit training speed bonuses.',
  'Natalie': 'Medium Priority: Focus on Food gathering. Useful for late-game food requirements.',
  'Athena': 'Medium Priority: Boosts Electricity gathering. Critical for high-level base tech.',
  'William': 'High Priority: Must-have for training speed efficiency.',
  
  // Purple Heroes
  'Vivian': 'High Priority: The best hero for farming Boomers and Creeps. 5★ unlocks global damage buff.',
  'Ava': 'Medium Priority: Solid faction attack buff for Blood Rose teams.',
  'Miranda': 'High Priority: Global defense buff for all units.',
  'Isabella': 'Medium Priority: Strong faction defense for Wings of Dawn.',
  'Fiona': 'Medium Priority: Strong faction attack for Wings of Dawn.',
  'Christina': 'Critical Priority: Essential for City Wars. Greatly reduces demolition time.',
  'Elizabeth': 'Medium Priority: Essential for Guard of Order defense synergy.',
  'Leah': 'Medium Priority: Essential for Guard of Order attack synergy.',
  'Maria': 'High Priority: Combines training speed with troop capacity. A must-have utility-combat hybrid.',
  
  // Orange Utility
  'Sophia': 'Top Priority: Construction speed and building cost reduction are game-changers for F2P and Whales alike.',
  'Amelia': 'Top Priority: Research speed and resource reduction for tech development.',
  'Katrina': 'High Priority: Maximize idle XP from Exploration to level up all heroes faster.',
  'Laura': 'High Priority: Free radar events and extra exploration chests mean more daily resources.',
  'Mia': 'High Priority: Daily blueprints and massive vehicle skill damage boost at 5★.',
  'Chinatsu': 'Critical Priority: Maximizing Alliance Duel points is the best way to secure legendary rewards every week.',
  
  // Orange Combat
  'Selena': 'Combat Priority: Core for Assaulter teams. Damage boost applies even if not deployed at 4★+.',
  'Nyx': 'Combat Priority: Core for Shooter teams. Global shooter damage boost at high stars.',
  'Sakura': 'Combat Priority: Core for Rider teams. Global rider damage boost at high stars.',
  'Oliveira': 'High Priority: Massive training speed boost for Assaulters. Essential for troop replenishment.',
  'Scarlett': 'High Priority: Massive training speed boost for Shooters.',
  'Evelyn': 'High Priority: Massive training speed boost for Riders.',
};

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
  const allHeaders: Record<string, { name: string, skill3: string, skill4: string, rec: string }> = {
    en: { name: 'Hero', skill3: '3rd Skill (Global)', skill4: '4th Skill (Talent)', rec: 'Recommendation' },
    fr: { name: 'Héros', skill3: '3ème Compétence', skill4: '4ème Compétence', rec: 'Recommandation' },
    de: { name: 'Held', skill3: '3. Fähigkeit', skill4: '4. Fähigkeit', rec: 'Empfehlung' },
    it: { name: 'Eroe', skill3: '3ª Abilità', skill4: '4ª Abilità', rec: 'Raccomandazione' },
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
            <th scope="col" className="px-4 py-2 text-left text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] w-1/4">
              {headers.rec}
            </th>
          </tr>
        </thead>
        <tbody className="bg-[var(--background)] divide-y divide-[var(--border)]">
          {sortedHeroes.map((hero) => {
            const skill3 = hero.skills?.[2];
            const skill4 = hero.skills?.[3];
            const rec = RECOMMENDATIONS[hero.name] || 'Upgrade based on team needs.';
            
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
                <td className="px-4 py-2 text-xs font-medium text-[var(--phenix-orange)] italic">
                  {rec}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};


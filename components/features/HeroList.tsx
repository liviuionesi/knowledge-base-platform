"use client";

import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';

// Import localized data
import bloodRoseDataEn from '@/data/heroes.json';
import bloodRoseDataFr from '@/data/heroes_fr.json';
import bloodRoseDataDe from '@/data/heroes_de.json';
import bloodRoseDataIt from '@/data/heroes_it.json';

import { useRef } from 'react';

// Custom Icons based on user visual description
const ExplosionIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    {/* Irregular Jagged Explosion/Blast Shape */}
    <path d="M12 2L15 9L22 7L17 12L22 17L16 19L18 24L12 20L6 24L8 19L2 17L7 12L2 7L9 9L12 2Z" />
  </svg>
);

const HalfShieldIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M12 22V2" strokeWidth="0" fill="currentColor" className="opacity-50" />
    <path d="M12 22s-8-4-8-10V5l8-3v20z" fill="currentColor" stroke="none" />
  </svg>
);

const BasketIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
     {/* Medical Bag Shape with Cross Cutout */}
     <path fillRule="evenodd" clipRule="evenodd" d="M9 3C9 2.44772 9.44772 2 10 2H14C14.5523 2 15 2.44772 15 3V5H19C20.1046 5 21 5.89543 21 7V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V7C3 5.89543 3.89543 5 5 5H9V3ZM11 5V3H13V5H11ZM11 14V11H13V14H16V16H13V19H11V16H8V14H11Z" />
  </svg>
);

interface StarEffects {
  [key: string]: string;
}

interface Skill {
  name: string;
  type: string;
  description: string;
  star_effects: StarEffects;
}

interface Hero {
  name: string;
  type: string;
  rarity: string;
  faction: string;
  image?: string;
  season?: string;
  role_description?: string;
  skills: Skill[];
}

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className={`w-4 h-4 ${filled ? 'text-yellow-400' : 'text-zinc-600'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const SkillCard = ({ skill }: { skill: Skill }) => (
  <div className="flex flex-col h-full w-full">
    <div className="flex justify-start mb-1">
      <span className="text-[10px] uppercase tracking-widest font-black px-2 py-1 rounded-md bg-[var(--muted)] text-[var(--muted-foreground)] border border-[var(--border)]">
        {skill.type}
      </span>
    </div>
    <h4 className="font-bold text-[var(--phenix-blue)] text-lg leading-tight mb-2">{skill.name}</h4>
    <p className="text-sm text-[var(--foreground)]/90 leading-relaxed mb-4">
      {skill.description}
    </p>
    
    {Object.keys(skill.star_effects).length > 0 && (
      <div className="pt-4 border-t border-dashed border-[var(--border)]/60">
        <div className="space-y-3">
          {Object.entries(skill.star_effects).map(([star, effect]) => (
            <div key={star} className="flex gap-3 text-[12px] leading-snug group/star">
              <div className="flex pt-0.5 shrink-0">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} filled={i < parseInt(star)} />
                ))}
              </div>
              <span className="text-[var(--muted-foreground)] group-hover/star:text-[var(--foreground)] transition-colors">{effect as string}</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

interface HeroListProps {
  faction: string;
}

export function HeroList({ faction }: HeroListProps) {
  const locale = useLocale();

  // Select localized data
  const currentBloodRoseData = (() => {
    switch (locale) {
      case 'fr': return bloodRoseDataFr;
      case 'de': return bloodRoseDataDe;
      case 'it': return bloodRoseDataIt;
      default: return bloodRoseDataEn;
    }
  })();

  // Mapping of faction names to their data
  const factionData: Record<string, Hero[]> = {
    'blood-rose': currentBloodRoseData as unknown as Hero[],
     // 'wings-of-dawn': wingsOfDawnData as Hero[],
     // 'guard-of-order': guardOfOrderData as Hero[],
  };

  const heroes = factionData[faction] || [];

  if (heroes.length === 0) {
    return (
      <div className="p-8 text-center border-2 border-dashed border-[var(--border)] rounded-xl my-8">
        <p className="text-[var(--muted-foreground)] text-lg">No hero data found for faction: <span className="font-bold text-[var(--foreground)]">{faction}</span></p>
      </div>
    );
  }

  return (
    <div className="space-y-16 my-8">
      {heroes.map((hero) => (
        <div key={hero.name} className="max-w-7xl mx-auto bg-[var(--card-bg)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col lg:flex-row items-stretch">
            
            {/* Left Panel: Details (Top) & Image (Bottom) */}
            <div className="w-full lg:w-[400px] lg:shrink-0 border-b lg:border-b-0 border-[var(--border)] flex flex-col relative bg-gradient-to-br from-[var(--card-bg)] to-[var(--muted)]/10 rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none overflow-hidden">
               {/* Fixed Height/Content for Details */}
               <div className="px-6 pb-6 pt-4 lg:px-8 lg:pb-8 lg:pt-4 flex flex-col justify-start relative z-10">
                  <h3 
                    id={hero.name.toLowerCase().replace(/\s+/g, '-')} 
                    className="text-3xl lg:text-4xl font-black text-[var(--foreground)] uppercase tracking-tight mb-2"
                    style={{ wordBreak: 'break-word' }} // Prevent long name overflow
                  >
                    {hero.name}
                  </h3>

                  {hero.season && (
                    <div className="mb-4 lg:mb-6">
                      <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-sm inline-block">
                        {hero.season}
                      </span>
                    </div>
                  )}

                  <div className="space-y-3 mb-6 lg:mb-8">
                    <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--phenix-blue)] shadow-[0_0_8px_var(--phenix-blue)]" />
                        Rarity
                      </div>
                      <span className="text-[var(--foreground)]">{hero.rarity}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                        Type
                      </div>
                       <span className="text-[var(--foreground)]">{hero.type}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                       <div className="flex items-center gap-2 min-w-[100px]">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                        Faction
                      </div>
                      <span className="text-[var(--foreground)]">{hero.faction}</span>
                    </div>
                  </div>

                  {hero.role_description && (
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--muted)]/40 border border-[var(--border)] backdrop-blur-sm w-fit">
                       {hero.role_description.includes("DEF") ? (
                          <HalfShieldIcon className="w-6 h-6 text-blue-500 shrink-0" />
                       ) : hero.role_description.includes("Buffs") ? (
                          <BasketIcon className="w-6 h-6 text-green-500 shrink-0" />
                       ) : (
                          <ExplosionIcon className="w-6 h-6 text-red-500 shrink-0" />
                       )}
                       <p className="text-sm font-medium text-[var(--foreground)] leading-snug">
                         {hero.role_description}
                       </p>
                    </div>
                  )}
               </div>

                {/* Hero Image - Pushed to bottom, Hidden on Mobile */}
                <div className="hidden lg:flex w-full relative m-0 p-0 leading-none">
                  {hero.image && (
                    <Image
                      src={hero.image}
                      alt={hero.name}
                      width={400}
                      height={600}
                      className="w-full h-auto block"
                      priority
                    />
                  )}
                </div>
            </div>

            {/* Right Panel: Skills Grid */}
            <div className="flex-1 grid grid-cols-1 2xl:grid-cols-2 bg-[var(--card-bg)]">
                {/* Skill 1: Top-Left */}
                <div className="p-6 lg:p-8 flex flex-col hover:bg-[var(--muted)]/5 transition-colors">
                   {hero.skills[0] ? (
                    <SkillCard skill={hero.skills[0]} />
                   ) : <div className="h-full flex items-center justify-center text-[var(--muted-foreground)]/20 font-black uppercase tracking-widest">No Skill</div>}
                </div>

                {/* Skill 2: Top-Right */}
                <div className="p-6 lg:p-8 flex flex-col hover:bg-[var(--muted)]/5 transition-colors">
                   {hero.skills[1] ? (
                     <SkillCard skill={hero.skills[1]} />
                   ) : <div className="h-full flex items-center justify-center text-[var(--muted-foreground)]/20 font-black uppercase tracking-widest">No Skill</div>}
                </div>

                {/* Skill 3: Bottom-Left */}
                <div className="p-6 lg:p-8 flex flex-col hover:bg-[var(--muted)]/5 transition-colors">
                   {hero.skills[2] ? (
                     <SkillCard skill={hero.skills[2]} />
                   ) : <div className="h-full flex items-center justify-center text-[var(--muted-foreground)]/20 font-black uppercase tracking-widest">No Skill</div>}
                </div>

                {/* Skill 4: Bottom-Right */}
                <div className="p-6 lg:p-8 flex flex-col hover:bg-[var(--muted)]/5 transition-colors">
                   {hero.skills[3] ? (
                     <SkillCard skill={hero.skills[3]} />
                   ) : <div className="h-full flex items-center justify-center text-[var(--muted-foreground)]/20 font-black uppercase tracking-widest">No Skill</div>}
                </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Hero } from '@/types/hero';
import { HeroCard } from './HeroCard';

// Import localized data
import heroDataEn from '@/data/heroes.json';
import heroDataFr from '@/data/heroes_fr.json';
import heroDataDe from '@/data/heroes_de.json';
import heroDataIt from '@/data/heroes_it.json';

interface HeroListProps {
  faction: string;
}

export function HeroList({ faction }: HeroListProps) {
  const locale = useLocale();

  // Select localized data
  const currentHeroData = (() => {
    switch (locale) {
      case 'fr': return heroDataFr;
      case 'de': return heroDataDe;
      case 'it': return heroDataIt;
      default: return heroDataEn;
    }
  })();

  // Map prop faction slugs to localized JSON faction names
  const factionMap: Record<string, Record<string, string>> = {
    en: {
      'blood-rose': 'Blood Rose',
      'wings-of-dawn': 'Wings of Dawn',
      'guard-of-order': 'Guard of Order',
    },
    fr: {
      'blood-rose': 'Paradis du chaos',
      'wings-of-dawn': "Ailes de l'aube",
      'guard-of-order': 'Volonté de la liberté',
    },
    de: {
      'blood-rose': 'Blood Rose', // Keep English for now or update if requested
      'wings-of-dawn': 'Wings of Dawn',
      'guard-of-order': 'Guard of Order',
    },
    it: {
      'blood-rose': 'Blood Rose',
      'wings-of-dawn': 'Wings of Dawn',
      'guard-of-order': 'Guard of Order',
    }
  };

  const currentFactionMap = factionMap[locale as keyof typeof factionMap] || factionMap.en;
  const targetFactionName = currentFactionMap[faction] || faction;

  // Filter and Sort heroes
  const heroes = (currentHeroData as Hero[])
    .filter(hero => hero.faction === targetFactionName)
    .sort((a, b) => {
      const getPriority = (h: Hero) => {
        if (h.type === 'S') {
          return h.season === 'Season 1' ? 1 : 0;
        }
        if (h.type === 'A') return 2;
        if (h.type === 'B') return 3;
        return 4;
      };
      
      return getPriority(a) - getPriority(b);
    });

  if (heroes.length === 0) {
    return (
      <div className="p-8 text-center border-2 border-dashed border-[var(--border)] rounded-xl my-8">
        <p className="text-[var(--muted-foreground)] text-lg">No hero data found for faction: <span className="font-bold text-[var(--foreground)]">{targetFactionName}</span></p>
      </div>
    );
  }

  return (
    <div className="space-y-16 my-8">
      {heroes.map((hero) => (
        <HeroCard key={hero.name} hero={hero} />
      ))}
    </div>
  );
}

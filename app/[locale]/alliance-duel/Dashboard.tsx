'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { WeeklyDuelData, DuelResult } from '../../actions/duel';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from '@heroicons/react/20/solid';
import { Link } from '../../../i18n/routing';

interface DuelDashboardProps {
  allData: WeeklyDuelData[];
}

const getHeroRank = (score: number, r2: number, r3: number) => {
  if (score >= r3) return { label: 'R3', tier: 3, className: 'text-orange-500 border-orange-500/30 bg-orange-500/10 shadow-[0_0_8px_-4px_rgba(249,115,22,0.5)]' };
  if (score >= r2) return { label: 'R2', tier: 2, className: 'text-purple-400 border-purple-400/30 bg-purple-400/10 shadow-[0_0_8px_-4px_rgba(192,132,252,0.5)]' };
  return { label: 'R1', tier: 1, className: 'text-blue-400 border-blue-400/30 bg-blue-400/10 shadow-[0_0_8px_-4px_rgba(96,165,250,0.5)]' };
};

export default function DuelDashboard({ allData }: DuelDashboardProps) {
  const t = useTranslations('AllianceDuel');
  // Sort data descending by date just in case
  const sortedData = useMemo(() => {
    return [...allData].sort((a, b) => new Date(b.weekDate).getTime() - new Date(a.weekDate).getTime());
  }, [allData]);

  const [selectedWeekId, setSelectedWeekId] = useState<string>(sortedData[0]?.id || '');

  const currentWeekData = useMemo(() => 
    sortedData.find(d => d.id === selectedWeekId)
  , [sortedData, selectedWeekId]);

  const previousWeekData = useMemo(() => {
    if (!currentWeekData) return null;
    const currentIndex = sortedData.findIndex(d => d.id === currentWeekData.id);
    if (currentIndex < sortedData.length - 1) {
      return sortedData[currentIndex + 1];
    }
    return null;
  }, [sortedData, currentWeekData]);

  const evolution = useMemo(() => {
    if (!currentWeekData || !previousWeekData) return {};
    
    // Map previous week by Name for robust diffing
    const prevMap = new Map<string, DuelResult>();
    previousWeekData.results.forEach((r: DuelResult) => prevMap.set(r.name, r));

    const evo: Record<string, { rankDiff: number, scoreDiff: number, tierDiff: number }> = {};
    
    // Thresholds for previous week
    const prevR2 = previousWeekData.r2Threshold ?? 2000000;
    const prevR3 = previousWeekData.r3Threshold ?? 5000000;

    // Thresholds for current week
    const currR2 = currentWeekData.r2Threshold ?? 2000000;
    const currR3 = currentWeekData.r3Threshold ?? 5000000;

    currentWeekData.results.forEach((curr: DuelResult) => {
        const prev = prevMap.get(curr.name);
        
        // Calculate current tier
        const currTier = getHeroRank(curr.score, currR2, currR3).tier;
        
        if (prev) {
            // Calculate prev tier
            const prevTier = getHeroRank(prev.score, prevR2, prevR3).tier;

            const rankDiff = prev.rank - curr.rank;
            const scoreDiff = curr.score - prev.score;
            const tierDiff = currTier - prevTier;

            evo[curr.name] = { rankDiff, scoreDiff, tierDiff };
        } else {
             // New entrant
             evo[curr.name] = { rankDiff: 999, scoreDiff: curr.score, tierDiff: 0 };
        }
    });
    return evo;

  }, [currentWeekData, previousWeekData]);

  if (sortedData.length === 0) {
    return (
      <div className="text-center py-20 bg-[var(--muted)]/40 rounded-3xl border border-[var(--border)]/50 backdrop-blur-xl">
        <p className="text-xl mb-4 font-light tracking-[0.2em] text-[var(--muted-foreground)] uppercase">{t('awaitingIntelligence')}</p>
        <p className="text-[var(--muted-foreground)]/80 text-sm max-w-md mx-auto">{t('awaitingDescription')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[var(--border)]/30 pb-8">
        <div>
           <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] mb-2">{t('reportTitle')} <span className="text-[var(--phenix-orange)]">{t('reportSub')}</span></h1>
           <p className="text-[var(--muted-foreground)] text-sm font-medium tracking-wide">{t('description')}</p>
        </div>
        <div className="group">
           <label className="block text-[var(--muted-foreground)] text-[10px] tracking-[0.3em] uppercase mb-2 font-black">{t('historicalRecord')}</label>
           <select 
             className="bg-[var(--background)] border border-[var(--border)] rounded-lg px-4 py-2 min-w-[240px] text-[var(--foreground)] outline-none focus:border-[var(--phenix-orange)]/50 transition-all uppercase tracking-widest text-xs font-bold appearance-none cursor-pointer"
             value={selectedWeekId}
             onChange={(e) => setSelectedWeekId(e.target.value)}
           >
             {sortedData.map(d => (
               <option key={d.id} value={d.id} className="bg-[var(--background)] text-[var(--foreground)]">
                  {t('weekOf', { date: d.weekDate })}
               </option>
             ))}
           </select>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="relative group">
        {/* Decorative elements */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--phenix-orange)]/20 to-[var(--background)] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative bg-[var(--background)]/80 backdrop-blur-2xl rounded-2xl overflow-hidden border border-[var(--border)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 uppercase text-[10px] tracking-[0.25em] font-black italic border-b border-zinc-200 dark:border-zinc-800">
                  <th className="px-8 py-6">{t('rank')}</th>
                  <th className="px-8 py-6">{t('operative')}</th>
                  <th className="px-8 py-6 text-right">{t('pointsSecured')}</th>
                  {previousWeekData && <th className="px-8 py-6 text-right">{t('trajectory')}</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]/30">
                {currentWeekData?.results.map((player: DuelResult) => {
                   const evo = evolution[player.name];
                   const isTop3 = player.rank <= 3;
                   
                   return (
                    <tr key={player.rank} className="group/row hover:bg-[var(--foreground)]/[0.02] transition-colors relative">
                      <td className="px-8 py-6 font-mono w-32">
                         <div className="flex items-center gap-3">
                            <span className={`
                              text-2xl font-black italic tracking-tighter
                              ${player.rank === 1 ? 'text-[var(--phenix-orange)] drop-shadow-[0_0_15px_var(--phenix-orange)]' : ''}
                              ${player.rank === 2 ? 'text-[var(--foreground)]/70 drop-shadow-[0_0_10px_var(--foreground)]' : ''}
                              ${player.rank === 3 ? 'text-[var(--phenix-orange)]/80 drop-shadow-[0_0_10px_var(--phenix-orange)]' : 'text-[var(--muted-foreground)] group-hover/row:text-[var(--foreground)]'}
                            `}>
                               {player.rank.toString().padStart(2, '0')}
                            </span>
                            {evo && evo.rankDiff !== 999 && evo.rankDiff !== 0 && (
                                <span className={`flex items-center ${evo.rankDiff > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                  {evo.rankDiff > 0 ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDownIcon className="w-3 h-3" />}
                                </span>
                            )}
                         </div>
                      </td>
                       <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                           {isTop3 && (
                             <div className={`w-1 h-8 rounded-full ${
                               player.rank === 1 ? 'bg-[var(--phenix-orange)]' : 
                               player.rank === 2 ? 'bg-[var(--foreground)]/50' : 'bg-[var(--phenix-orange)]/70'
                             }`} />
                           )}
                           
                           {/* Hero Rank Badge */}
                           {(() => {
                             const r2 = currentWeekData?.r2Threshold ?? 2000000;
                             const r3 = currentWeekData?.r3Threshold ?? 5000000;
                             const rank = getHeroRank(player.score, r2, r3);
                             const tierChange = evo?.tierDiff ?? 0;
                             
                             return (
                               <div className="flex items-center gap-1">
                                 <div className={`
                                   flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-black tracking-wider border uppercase
                                   ${rank.className}
                                 `}>
                                   {rank.label}
                                 </div>
                                 
                                 {tierChange > 0 && (
                                   <div className="flex items-center text-[10px] font-bold text-green-500 animate-pulse ml-1" title="Promoted">
                                      <ArrowUpIcon className="w-3 h-3 mr-0.5" />
                                      Up
                                   </div>
                                 )}
                                 {tierChange < 0 && (
                                   <div className="flex items-center text-[10px] font-bold text-red-500 ml-1" title="Demoted">
                                      <ArrowDownIcon className="w-3 h-3 mr-0.5" />
                                      Down
                                   </div>
                                 )}
                               </div>
                             );
                           })()}

                           <div className="flex flex-col">
                            <span className={`text-base font-bold tracking-tight ${isTop3 ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)] group-hover/row:text-[var(--foreground)]'} transition-colors`}>
                              {player.name}
                            </span>
                            <span className="text-[10px] text-[var(--muted-foreground)]/60 uppercase tracking-widest font-bold">{t('phenixAlliance')}</span>
                           </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right font-mono">
                        <span className={`text-lg font-bold ${isTop3 ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)]'} group-hover/row:text-[var(--foreground)] transition-colors`}>
                          {player.score.toLocaleString()}
                        </span>
                      </td>
                       {previousWeekData && (
                          <td className="px-8 py-6 text-right">
                              {evo ? (
                                  <div className="flex flex-col items-end gap-1">
                                     {evo.scoreDiff !== 0 ? (
                                         <span className={`font-mono text-sm font-black italic ${evo.scoreDiff > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                             {evo.scoreDiff > 0 ? '▲' : '▼'} {Math.abs(evo.scoreDiff).toLocaleString()}
                                         </span>
                                     ) : <span className="text-[var(--muted-foreground)]/50 text-xs">-</span>}
                                     
                                     {evo.rankDiff !== 999 && evo.rankDiff !== 0 && (
                                         <span className="text-[9px] uppercase tracking-widest font-black text-[var(--muted-foreground)] italic">
                                              {evo.rankDiff > 0 ? t('ranksAdvanced', { count: Math.abs(evo.rankDiff) }) : t('ranksLost', { count: Math.abs(evo.rankDiff) })}
                                         </span>
                                     )}
                                     {evo.rankDiff === 999 && <span className="text-[var(--phenix-blue)] text-[9px] uppercase tracking-[0.2em] font-black italic animate-pulse">{t('newEntrant')}</span>}
                                  </div>
                              ) : <span className="text-[var(--muted-foreground)]/40 text-[10px] font-black tracking-widest italic">{t('stable')}</span>}
                          </td>
                       )}
                    </tr>
                   );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

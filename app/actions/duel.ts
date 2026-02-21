'use server';

import fs from 'fs/promises';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'alliance_duel.json');

export interface DuelResult {
  rank: number;
  name: string;
  score: number;
  alliance: string;
}

export interface WeeklyDuelData {
  id: string; // ISO date string or similar unique ID
  weekDate: string;
  r2Threshold?: number;
  r3Threshold?: number;
  results: DuelResult[];
}

export async function getDuelData(): Promise<WeeklyDuelData[]> {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading duel data:', error);
    return [];
  }
}

export async function saveDuelData(weekDate: string, results: DuelResult[]) {
  try {
    const currentData = await getDuelData();
    const id = weekDate; // Simple ID for now
    
    // Check if data for this week already exists, if so update it
    const existingIndex = currentData.findIndex(d => d.id === id);
    
    const newData: WeeklyDuelData = {
      id,
      weekDate,
      results,
    };

    if (existingIndex >= 0) {
      currentData[existingIndex] = newData;
    } else {
      currentData.push(newData);
    }
    
    // Sort by date descending
    currentData.sort((a, b) => new Date(b.weekDate).getTime() - new Date(a.weekDate).getTime());

    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(currentData, null, 2));
    return { success: true };
  } catch (error) {
    console.error('Error saving duel data:', error);
    return { success: false, error: 'Failed to save data' };
  }
}

export async function deleteDuelEntry(id: string) {
    try {
        const currentData = await getDuelData();
        const newData = currentData.filter(d => d.id !== id);
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(newData, null, 2));
        return { success: true };
    } catch (error) {
        console.error('Error deleting duel entry:', error);
        return { success: false, error: 'Failed to delete entry' };
    }
}

export interface StarEffects {
  [key: string]: string;
}

export interface Skill {
  name: string;
  type: string;
  description: string;
  star_effects: StarEffects;
}

export interface Hero {
  name: string;
  type: string;
  rarity: string;
  faction: string;
  image?: string;
  season?: string;
  role_description?: string;
  skills: Skill[];
}

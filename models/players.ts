export enum PLAYER_BADGE {
  Gold = 'GOLD',
  Silver = 'SILVER',
  Bronze = 'BRONZE',
  Logged = 'LOGGED',
}

export interface Player {
  id: string;
  name: string;
  avatar: AvatarImage;
}

export interface PlayerWithEmail extends Player {
  email: string;
}

export interface PlayerWithBadge extends Player {
  badge: PLAYER_BADGE | undefined;
}

export interface PlayerWithBadgeAndScore extends PlayerWithBadge {
  score: number;
}

export interface PlayerWithRegisteredInfos extends Player {
  isRegistered: boolean;
}

export interface IGamePlayer extends PlayerWithRegisteredInfos {
  scores: Scores;
}

export interface InewGamePlayer {
  id: string;
  name: string;
  avatar: AvatarImage;
}

export interface AvatarImage {
  id: string;
  url: string;
}

export interface Scores {
  totalScore: number;
  birds: number;
  bonusCards: number;
  endOfRoundGoals: number;
  eggs: number;
  foodOnCards: number;
  tuckedCards: number;
  nectar: number;
}

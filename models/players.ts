export enum PLAYER_BADGE {
  Gold = 'GOLD',
  Silver = 'SILVER',
  Bronze = 'BRONZE',
}

export default interface Player {
  id: string;
  name: string;
  badge?: PLAYER_BADGE | undefined;
}

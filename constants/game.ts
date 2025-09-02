import { Score } from '../models/players';
import uniqid from 'uniqid';

export const defaultAvatar = {
  id: 'cmevohaxtnzuf07rvhlwshn1c',
  url: 'https://eu-central-1.graphassets.com/AITTlJAVWQCK7ncOJz5Drz/cmevohaxtnzug07rv6ih9smrg',
};

export const defaultScores: Score = {
  totalScore: 0,
  birds: 0,
  bonusCards: 0,
  endOfRoundGoals: 0,
  eggs: 0,
  foodOnCards: 0,
  tuckedCards: 0,
  nectar: 0,
};

export const defaultPlayer = {
  id: uniqid(),
  name: '',
  avatar: defaultAvatar,
  isRegistered: false,
  scores: defaultScores,
};

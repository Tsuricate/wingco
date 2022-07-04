import { Score } from '../models/players';
import uniqid from 'uniqid';

export const defaultAvatar = {
  id: 'cl3lozvfa7k690euj8n7af00q',
  url: 'https://media.graphassets.com/resize=fit:crop,height:96,width:96/kIFwuLNGRZi0DKWGZ5Ae',
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

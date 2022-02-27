export const categories = [
  'totalScore',
  'birds',
  'bonusCards',
  'endOfRoundGoals',
  'eggs',
  'foodOnCards',
  'tuckedCards',
  'nectar',
];

export const bestScoreByCategory = categories.map((category) => ({
  name: category,
  score: Math.floor(Math.random() * 100),
}));

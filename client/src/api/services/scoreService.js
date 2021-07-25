import api from '../api';

export const getScores = (dateRange, difficulty) => {
  return api.get(`/scores?dateRange=${dateRange}&difficulty=${difficulty}`);
}

export const saveScore = (body) => {
  return api.post('/scores', body);
}

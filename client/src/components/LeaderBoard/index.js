import * as React from 'react';
import moment from 'moment';
import { getScores } from '../../api/services/scoreService';
import './index.scss';

const LeaderBoard = ({ setUpdatedBoard, updatedBoard }) => {
  const [dateRange, setDateRange] = React.useState(moment().startOf('day').valueOf());
  const [scoresBeginner, setScoresBeginner] = React.useState([]);
  const [scoresIntermediate, setScoresIntermediate] = React.useState([]);
  const [scoresExpert, setScoresExpert] = React.useState([]);
  const [selectedRange, setSelectedRange] = React.useState('today');

  React.useEffect(() => {
    Promise.all([getScores(dateRange, 1), getScores(dateRange, 2), getScores(dateRange, 3)])
    .then((scores) => {
      setScoresBeginner(scores[0].data);
      setScoresIntermediate(scores[1].data);
      setScoresExpert(scores[2].data);
    });
    setUpdatedBoard(false);
  }, [dateRange, updatedBoard])

  React.useEffect(() => {
    switch (selectedRange) {
      case '7days':
        setDateRange(moment().subtract(7, 'days').valueOf());
        break;
      case '30days':
        setDateRange(moment().subtract(30, 'days').valueOf());
        break;
      case 'allTime':
        setDateRange(0);
        break;
      case 'today':
      default:
        setDateRange(moment().startOf('day').valueOf());
        break;
    }
  }, [selectedRange, setDateRange])

  return (
    <div className="leaderboard-wrapper">
      <h2>Current Leader Board</h2>
      <div className="leaderboard-switcher">
        <button className={selectedRange === 'today' ? 'selected' : ''} onClick={() => setSelectedRange('today')}>Today</button>
        <button className={selectedRange === '7days' ? 'selected' : ''} onClick={() => setSelectedRange('7days')}>Last 7 Days</button>
        <button className={selectedRange === '30days' ? 'selected' : ''} onClick={() => setSelectedRange('30days')}>Last 30 Days</button>
        <button className={selectedRange === 'allTime' ? 'selected' : ''} onClick={() => setSelectedRange('allTime')}>All Time</button>
      </div>
      <div className="leaderboard-body">
        <div>
          <h4>Beginner</h4>
          {scoresBeginner.length > 0 && scoresBeginner.map((score, idx) => (
            <div key={idx}>{idx + 1}. {score.user} -- {score.time} seconds</div>
          ))}
        </div>
        <div>
          <h4>Intermediate</h4>
          {scoresIntermediate.length > 0 && scoresIntermediate.map((score, idx) => (
            <div key={idx}>{idx + 1}. {score.user} -- {score.time} seconds</div>
          ))}
        </div>
        <div>
          <h4>Expert</h4>
          {scoresExpert.length > 0 && scoresExpert.map((score, idx) => (
            <div key={idx}>{idx + 1}. {score.user} -- {score.time} seconds</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LeaderBoard;

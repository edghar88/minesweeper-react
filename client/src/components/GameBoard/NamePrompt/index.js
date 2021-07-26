import moment from 'moment';
import * as React from 'react';
import { saveScore } from '../../../api/services/scoreService';
import './index.scss';

const NamePrompt = (props) => {
  const { close, difficulty, setUpdatedBoard, timer, visible } = props;
  const [name, setName] = React.useState('');

  const submitScore = () => {
    const getDifficulty = () => {
      switch (difficulty) {
        case 'intermediate':
          return 2;
        case 'expert':
          return 3;
        case 'beginer':
        default:
          return 1;
      }
    }
    saveScore({
      user: name,
      difficulty: getDifficulty(),
      time: Math.round(timer),
      timestamp: moment().valueOf(),
    })
    setUpdatedBoard(true);
    close();
  }

  return visible && (difficulty === 'beginner' || difficulty === 'intermediate' || difficulty ==='expert') && (
    <>
      <div className="backdrop" />
      <div className="prompt-modal">
        <h2>You win!</h2>
        <div>
          <div>It took you {Math.round(timer)} seconds!</div>
          <h4>Please enter your name for the Leader Board:</h4>
          <input onChange={e => setName(e.target.value)} placeholder="Enter name..." />
        </div>
        <div className="social-share">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fminesweeper-react-eh.herokuapp.com&quote=I%20just%20beat%20Minesweeper%20in%20${Math.round(timer)}%20seconds%20on%20${difficulty}%20difficulty!`} rel="noreferrer" target="_blank">
            Share on Facebook
          </a>
          <div>or</div>
          <a href={`https://twitter.com/intent/tweet?text=I%20just%20beat%20%23Minesweeper%20in%20${Math.round(timer)}%20seconds%20on%20${difficulty}%20difficulty!&url=https%3A%2F%2Fminesweeper-react-eh.herokuapp.com`} rel="noreferrer" target="_blank">
            Share on Twitter
          </a>
        </div>
        <button className="interaction-button" disabled={name.length < 1} onClick={submitScore}>Save Record</button>
      </div>
    </>
  );
}

export default NamePrompt;

import * as React from 'react';
import './index.scss';

const Modal = (props) => {
  const { close, difficulty, setCustomDifficultyParams, setDifficulty, setZoomed, visible, zoomed } = props;

  const [customHeight, setCustomHeight] = React.useState(9);
  const [customWidth, setCustomWidth] = React.useState(9);
  const [customMines, setCustomMines] = React.useState(10);
  const [darkMode, setDarkMode] = React.useState(false);
  const [difficultySetting, setDifficultySetting] = React.useState(difficulty);
  const [page, setPage] = React.useState(0);

  React.useEffect(() => {
    if (difficultySetting === 'custom') {
      setCustomDifficultyParams([customHeight, customWidth, customMines]);
    }
    setDifficulty(difficultySetting);

  }, [customHeight, customMines, customWidth, difficultySetting, setCustomDifficultyParams, setDifficulty])

  React.useEffect(() => {
    if (darkMode) {
      document.querySelector('.App').classList.add('dark-mode');
    } else {
      document.querySelector('.App').classList.remove('dark-mode');
    }
  }, [darkMode])

  return visible && (
    <>
      <div className="backdrop" />
      <div className="settings-modal">
        <h2>Minesweeper Menu</h2>
        <ul className="options-list">
          <li><button className={`options-button ${page === 0 && 'options-button__selected'}`} onClick={() => setPage(0)}>Game Difficulty</button></li>
          <li><button className={`options-button ${page === 1 && 'options-button__selected'}`} onClick={() => setPage(1)}>Display Settings</button></li>
          <li><button className={`options-button ${page === 2 && 'options-button__selected'}`} onClick={() => setPage(2)}>Instructions</button></li>
          <li><button className={`options-button ${page === 3 && 'options-button__selected'}`} onClick={() => setPage(3)}>Import/Export</button></li>
        </ul>
        {page === 0 && (
          <>
            <em><small>NOTE: Changing game difficulty will start a new game.</small></em>
            <table>
              <thead>
                <tr>
                  <th />
                  <th>Height</th>
                  <th>Width</th>
                  <th>Mines</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input checked={difficultySetting === 'beginner'} type="radio" onChange={() => setDifficultySetting('beginner')} />
                    <strong>Beginner</strong>
                  </td>
                  <td>9</td>
                  <td>9</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>
                    <input checked={difficultySetting === 'intermediate'} type="radio" onChange={() => setDifficultySetting('intermediate')} />
                    <strong>Intermediate</strong>
                  </td>
                  <td>16</td>
                  <td>16</td>
                  <td>40</td>
                </tr>
                <tr>
                  <td>
                    <input checked={difficultySetting === 'expert'} type="radio" onChange={() => setDifficultySetting('expert')} />
                    <strong>Expert</strong>
                  </td>
                  <td>16</td>
                  <td>30</td>
                  <td>99</td>
                </tr>
                <tr>
                  <td>
                    <input checked={difficultySetting === 'custom'} type="radio" onChange={() => setDifficultySetting('custom')} />
                    <strong>Custom</strong>
                  </td>
                  <td><input onChange={(e) => e.target.value >= 5 && e.target.value <= 18 ? setCustomHeight(e.target.value) : setCustomHeight(18)} type="number" value={customHeight} /></td>
                  <td><input onChange={(e) => e.target.value >= 5 && e.target.value <= 32 ? setCustomWidth(e.target.value) : setCustomWidth(32)} type="number" value={customWidth} /></td>
                  <td><input onChange={(e) => e.target.value >= 5 && e.target.value <= customHeight * customWidth - 1 ? setCustomMines(e.target.value) : setCustomMines(customHeight * customWidth - 1)} type="number" value={customMines} /></td>
                </tr>
              </tbody>
            </table>
          </>
        )}
        {page === 1 && (
          <>
            <h4>Zoom</h4>
            <div>
              <input checked={!zoomed} type="radio" onChange={() => setZoomed(0)} /> Regular
              <input checked={zoomed} type="radio" onChange={() => setZoomed(1)} /> Large
            </div>
            <hr />
            <h4>Enable Dark Mode?</h4>
            <div>
              <input checked={darkMode} type="checkbox" onChange={() => setDarkMode(!darkMode)} />
            </div>
          </>
        )}
        {page === 2 && (
          <>
            <h4>Object of the Game</h4>
            Reveal all the spaces without mines as quickly as possible. Clicking a mine is an instant loss!
            <div className="instructions">
              <ul>
                <li><strong>Single Left Click</strong> an empty square to reveal.</li>
                <li><strong>Single Right Click</strong> an empty square to flag it as a mine. This will prevent the space from being revealed unless you flagged incorrectly.</li>
                <li><strong>Double Left Click</strong> a number to reveal adjacent squares if you have flagged the number of adjacent spaces indicated.</li>
                <li><strong>Single Left Click</strong> the face to start a new game.</li>
              </ul>
            </div>
          </>
        )}
        <button className="interaction-button" onClick={close}>Return to Game</button>
      </div>
    </>
  );
}

export default Modal;

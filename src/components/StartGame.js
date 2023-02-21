import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import ToolTip from './ToolTip';

const StartGame = ({newGame, updateGameMode}) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      updateGameMode('single');
    } else {
      updateGameMode('default')
    }
  };

  return (
    <div className="modal-container">
      <div className="modeOptions">
        <FormControlLabel
          control={<Switch checked={checked}
          onChange={handleChange} />}
          label="Enable single character mode"
          labelPlacement="start"
        />
        <ToolTip> 
          <p>Single character mode means you will only be presented with one character at a time and you must find the characters in the order they are presented</p>
        </ToolTip>
      </div>

      <button className="newGameBtn" onClick={() => newGame()}>New Game</button>
    </div>
  )
 
}

export default StartGame;
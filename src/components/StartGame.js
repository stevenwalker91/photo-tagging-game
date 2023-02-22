import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState, useEffect } from 'react';
import ToolTip from './ToolTip';
import Typography from '@mui/material/Typography';


const StartGame = ({newGame, updateGameMode, gameMode}) => {
  const [checked, setChecked] = useState(false);
  const [imageSelected, setImageSelected] = useState('');

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      updateGameMode('single');
    } else {
      updateGameMode('default')
    }
  };

  useEffect(() => {
    if (gameMode === 'single') {
      setChecked(true);
    }

    if (gameMode === 'default') {
      setChecked(false);
    }
  }, [gameMode])

  const handleImageSelect = (event) => {
    setImageSelected(event.target.name);
  }

  return (
    <div className="modal-container">
      <div className="modeOptions">
        <FormControlLabel
          control={<Switch checked={checked}
          onChange={handleChange} />}
          label="Enable single character mode"
          labelPlacement="start"
          sx={{marginLeft: '0px'}}
        />
        <ToolTip> 
          <p>Single character mode means you will only be presented with one character at a time and you must find the characters in the order they are presented</p>
        </ToolTip>
      </div>
      <div className="mapOptions">
      <Typography variant="body1" gutterBottom>
        Select your map:
      </Typography>
      <img 
        className={imageSelected === 'mapOne' ? 'preview-image image-selected' : 'preview-image' }
        src={`${process.env.PUBLIC_URL}/assets/mapOnePreview.png` }
        alt="a huge panorama containing lots of different characters"
        name="mapOne"
        onClick={(event) => handleImageSelect(event)}
      />
      </div>

      <button className="newGameBtn" onClick={() => newGame()}>New Game</button>
    </div>
  )
 
}

export default StartGame;
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState, useEffect } from 'react';
import ToolTip from './ToolTip';
import Typography from '@mui/material/Typography';
import Loader from './Loader';
import { v4 as uuidv4 } from 'uuid';


const StartGame = ({newGame, updateGameMode, gameMode}) => {
  const [checked, setChecked] = useState(false);
  const [imageSelected, setImageSelected] = useState('mapOne');
  const [loading, setLoading] = useState(true);

  const maps = [{name: 'mapOne', url: '/assets/mapOnePreview.png'}, {name: 'mapTwo', url: '/assets/mapTwoPreview.png'}]

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
        <div className="previews-container">
        {maps.map((item) => {
          return (
            <div className="preview-image-container" key={uuidv4()}>
              <Loader style={{display: loading ? "block" : "none"}} /> 
              <img 
                className={imageSelected === item.name ? 'preview-image image-selected' : 'preview-image' }
                src={`${process.env.PUBLIC_URL}${item.url}` }
                alt="a huge panorama containing lots of different characters"
                name={item.name}
                onClick={(event) => handleImageSelect(event)}
                onLoad={() => setLoading(false)}
                style={{display: loading ? "none" : "block"}}
              />
            </div>
          )
        })}
        </div>

      </div>
      <Typography variant="body1" gutterBottom>
        How to play?
      </Typography>
      <Typography variant="body2" gutterBottom>
        Simply find the characters that are presented in the banner at the top of the page. Click the character once you find them to earn points.
      </Typography>

      <button className="newGameBtn" onClick={() => newGame()}>New Game</button>
    </div>
  )
 
}

export default StartGame;
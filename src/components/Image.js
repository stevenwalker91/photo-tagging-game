import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Loader from './Loader';
import {isMobile} from 'react-device-detect';


const Image = ({admin, checkClickSuccess, characters, endGame, mapToUse}) => {
  const [areas, setAreas] = useState([])
  const [loading, setLoading] = useState(true);

  const handleClick = (event) => {
    console.log(event.target)
    const imageWidth = event.target.offsetWidth;
    const xClickWithinImage = event.nativeEvent.offsetX;
    const imageHeight = event.target.offsetHeight
    const yClickWithinImage = event.nativeEvent.offsetY

    const x = (xClickWithinImage / imageWidth) * 100;
    const y = (yClickWithinImage/ imageHeight) * 100;

    checkClickSuccess(x, y);
}

// admin utility function to select char coords
const handleDrag = (event) => {
  if (!admin) return;
  event.preventDefault();
  const imageWidth = event.target.offsetWidth;
  const xClickWithinImage = event.nativeEvent.offsetX;
  const imageHeight = event.target.offsetHeight
  const yClickWithinImage = event.nativeEvent.offsetY
  let area;

  if (event.type === 'mousedown') {
    area = {}
    area.upperLeftX = (xClickWithinImage / imageWidth) * 100;
    area.upperLeftY = (yClickWithinImage/ imageHeight) * 100;
  }

  if (event.type === 'mouseup') {
    const lastArea = areas.length - 1;
    area = areas[lastArea];
    area.lowerRightX = (xClickWithinImage / imageWidth) * 100;
    area.lowerRightY = (yClickWithinImage/ imageHeight) * 100;
    console.log(area);
  }

  setAreas([...areas, area])
}

  return (

    <div 
      className="image-container" 
      onClick={(event) => handleClick(event)} 
      onMouseDown={(event) => handleDrag(event)} 
      onMouseUp={(event) => handleDrag(event)}
    >
      <span className='credit'>Big thanks to <a href="https://www.instagram.com/chekavo/?hl=en" target="_blank" rel="noreferrer">Egor Klyuchnyk</a> for letting me use his awesome art work.</span>
      <Loader style={{display: loading ? "block" : "none"}} /> 
      <TransformWrapper wheel={{wheelDisabled: true}} doubleClick={{disabled: true}} panning={{disabled: isMobile ? false : true}}>
         <TransformComponent>
      <img 
        className="game-image" 
        src={`${process.env.PUBLIC_URL}/assets/${mapToUse}.jpeg` }
        alt="a huge panorama containing lots of different characters"
        style={{display: loading ? "none" : "block"}}
        onLoad={() => setLoading(false)}
      />
      {characters.map((char) => {
        if (char.isFound) {
          const leftVal = `calc(${char.upperLeftX}%)`;
          const topVal = `calc(${char.upperLeftY}%)`;
          const width = `${char.lowerRightX - char.upperLeftX}%`
          const height = `${char.lowerRightY - char.upperLeftY}%`
          return (
          <div 
            className="square" 
            style={{left: leftVal, top: topVal, width: width, height: height, padding: "0px" }}
            key={uuidv4()}
          >
            <span style={{top: 'auto'}} className="check-circle"><CheckCircleIcon /></span>
          </div>
          )
        } else {
          return '';
        }
      })}
      </TransformComponent></TransformWrapper>
      <span 
        className="endGameBtn"
      >
        <IconButton size="medium" onClick={() => endGame()}>
          <StopCircleIcon sx={{color: 'red', fontSize: "80px"}}/>
        </IconButton>
      </span>
      
    </div>


  )
}

export default Image;
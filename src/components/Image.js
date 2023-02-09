import { useState } from 'react';

const Image = ({admin}) => {

  const [clickedPositions, setClickedPositions] = useState([])
  const [areas, setAreas] = useState([])


  const handleClick = (event) => {
    const imageWidth = event.target.offsetWidth;
    const xClickWithinImage = event.nativeEvent.offsetX;
    const imageHeight = event.target.offsetHeight
    const yClickWithinImage = event.nativeEvent.offsetY

    const x = (xClickWithinImage / imageWidth) * 100;
    const y = (yClickWithinImage/ imageHeight) * 100;

    setClickedPositions([
      ...clickedPositions,
      {x: x, y: y }
    ])
}

// admin utility function to select char coords
const handleDrag = (event) => {
  event.preventDefault();
  let area;
  if (event.type === 'mousedown') {
    area = {}
    area.upperLeftX = (event.pageX / event.target.offsetWidth) * 100;
    area.upperLeftY = (event.pageY / event.target.offsetHeight) * 100;
  }

  if (event.type === 'mouseup') {
    const lastArea = areas.length - 1;
    area = areas[lastArea];
    area.lowerRightX = (event.pageX / event.target.offsetWidth) * 100;
    area.lowerRightY = (event.pageY / event.target.offsetHeight) * 100;
    console.log(area);
  }

  setAreas([...areas, area])
}

  return (
    <>
      <div className="image-container">

        { admin ?
        <img 
          className="game-image" 
          src="./assets/background-img.jpg" 
          alt="a huge panorama containing lots of different characters"
          onMouseDown={(event) => handleDrag(event)}
          onMouseUp={(event) => handleDrag(event)}
        />
        :
        <img 
          className="game-image" 
          src="./assets/background-img.jpg" 
          alt="a huge panorama containing lots of different characters"
          onClick={(event) => handleClick(event)}
        />
        }
        {clickedPositions.map((position) => {
          const leftVal = `calc(${position.x}% )`;
          const topVal = `calc(${position.y}% )`;
          return <div className="square" style={{left: leftVal, top: topVal, transform: "translateX(-50%) translateY(-50%)" }}></div>
        })}
        {areas.map((area) => {
          const leftVal = `calc(${area.upperLeftX}%)`;
          const topVal = `calc(${area.upperLeftY}%)`;
          const width = `${area.lowerRightX - area.upperLeftX}%`
          const height = `${area.lowerRightY - area.upperLeftY}%`
          return <div className="square" style={{left: leftVal, top: topVal, width: width, height: height, padding: "0px" }}></div>
        })}
      </div>
    </>

  )
}

export default Image;
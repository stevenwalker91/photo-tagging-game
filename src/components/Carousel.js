import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Character from "./Character";
import { v4 as uuidv4 } from 'uuid';

const Car = ({characters, gameMode}) => {

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
      paritialVisibilityGutter: 100
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
      paritialVisibilityGutter: 50
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      paritialVisibilityGutter: 5
    }
  };

  const charactersToDisplay = () => {
    if (gameMode === 'default') {
      return characters.map((char) => <Character character={char} key={uuidv4()} />);
    }

    if (gameMode === 'single') {
      let nextCharacter = characters.find(char => char.isFound === false);
      if (!nextCharacter ) {
        nextCharacter = characters[characters.length-1];
  
      }
      return <Character character={nextCharacter} />
    }
  }

  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={false}
      responsive={responsive}
      infinite={true}
      keyBoardControl={true}
      containerClass={ gameMode === 'default' ? 'carousel-container' : 'carousel-container centered'}
      partialVisible={false}
    >
      { charactersToDisplay() }

    </Carousel>
)

}

export default Car;
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Character from "../Character";
import { v4 as uuidv4 } from 'uuid';


const Car = ({characters}) => {

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

  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={false}
      responsive={responsive}
      infinite={true}
      keyBoardControl={true}
      containerClass="carousel-container"
      partialVisible={false}
   
    >
      {characters.map((char) => <Character character={char} key={uuidv4()} />)}

    </Carousel>
)

}

export default Car;
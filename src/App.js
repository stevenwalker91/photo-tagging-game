
import './App.css';
import Image from './components/Image';
import Carousel from './components/Carousel';
import Data from './data.json';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [characters, setCharacters] = useState(Data);
  const [ score, setScore ] = useState({score: 0, wrongClicks: 0});


  const updateScore = (result) => {
    const newScore = score;

    if (result === 'success') {
      newScore.score = score.score + 1;
    }

    if (result === 'miss') {
      newScore.wrongClicks = score.wrongClicks + 1;
    }
    setScore(newScore);
  }

  const checkClickSuccess = (x, y) => {
    const matchingCharacters = characters.filter((char) => {
      if (
        x >= char.upperLeftX &&
        x <= char.lowerRightX &&
        y >= char.upperLeftY &&
        y <= char.lowerRightY
      ) {
        return char
      }
    })

    const successfulClick = matchingCharacters.length === 1;
    if (successfulClick) {
      updateScore('success');
      toast.success(`Excellent, you found ${matchingCharacters[0].name}!`)
      setCharacters(characters.map(char => {
        if (char.name === matchingCharacters[0].name) {
          return {...char, isFound: true}
          
        } else {
          return char
        }
      }))
      return true;
    } else {
      updateScore('miss');
      toast.error('Sorry, no characters there')
      return false;
    }
  }

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
      <Carousel characters={characters} />
      <Image characters={characters} admin={false} checkClickSuccess={checkClickSuccess}/>
  
    </div>

  );
}

export default App;

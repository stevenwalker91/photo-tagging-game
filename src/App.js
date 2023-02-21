
import './App.css';
import Image from './components/Image';
import Carousel from './components/Carousel';
import Data from './data.json';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './components/Modal'

function App() {
  const sortCharactersByDifficulty = (chars) => {
    const sortOrder = ['Very Easy', 'Easy', 'Medium', 'Hard', 'Very Hard'];

    return chars.sort((a, b) => {
      return sortOrder.indexOf(a.difficulty) - sortOrder.indexOf(b.difficulty);
    })
  }

  const [characters, setCharacters] = useState(sortCharactersByDifficulty(Data));
  const [score, setScore] = useState({score: 0, wrongClicks: 0});
  const [modalType, setModalType] = useState('endGame');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highscoreSubmitted, setHighScoreSubmitted] = useState(false);

  const handlePlayerMove = (successful, character) => {
    const newScore = score;
    if (successful) {
      newScore.score = score.score + 1;
      toast.success(`Excellent, you found ${character.name}!`)
      setCharacters(characters.map(char => {
        if (char.name === character.name) {
          return {...char, isFound: true}
        } else {
          return char
        }
      }))
    }

    if (!successful) {
      newScore.wrongClicks = score.wrongClicks + 1;
      toast.error('Sorry, no characters there')
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
      return null
    })

    const successfulClick = matchingCharacters.length === 1;
    if (successfulClick) {
      handlePlayerMove(successfulClick, matchingCharacters[0])
    } else {
      handlePlayerMove(successfulClick)
    }

    return successfulClick
  }

  const newGame = () => {
    handleHighScoreSubmitted(false)
    setIsModalOpen(false);
    setModalType('endGame');
    setCharacters(sortCharactersByDifficulty(Data));
    setScore({score: 0, wrongClicks: 0});
    
  }

  const endGame = () => {
    setIsModalOpen(true);
  }

  const handleHighScoreSubmitted = (show) => {
    setHighScoreSubmitted(show);
  }


  return (
    <div className="App">
      <Modal 
        modalType={modalType}
        isOpen={isModalOpen}
        newGame={newGame}
        scores={score}
        highscoreSubmitted={highscoreSubmitted}
        handleHighScoreSubmitted={handleHighScoreSubmitted}
      />
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
      <Image characters={characters} admin={false} checkClickSuccess={checkClickSuccess} endGame={endGame}/>
  
    </div>

  );
}

export default App;

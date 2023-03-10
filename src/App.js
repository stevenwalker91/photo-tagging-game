
import './App.css';
import Image from './components/Image';
import Carousel from './components/Carousel';
import MapOneCharacters from './maponedata.json';
import MapTwoCharacters from './maptwodata.json';
import { useState, useEffect } from 'react';
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

  const [mapToUse, setMapToUse] = useState('mapOne');
  const [characters, setCharacters] = useState(sortCharactersByDifficulty(MapOneCharacters));
  const [score, setScore] = useState({score: 0, wrongClicks: 0});
  const [modalType, setModalType] = useState('startGame');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [highscoreSubmitted, setHighScoreSubmitted] = useState(false);
  const [gameMode, setGameMode] = useState('default');
  

  const handlePlayerMove = (successful, character) => {
    const newScore = score;
    if (successful) {
      const scoreValues = ['Very Easy', 'Easy', 'Medium', 'Hard', 'Very Hard'];
      newScore.score = score.score + scoreValues.indexOf(character.difficulty)+1;
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

  useEffect(() => {
  const checkForWin = () => {
    const remainingCharacters = characters.filter((char) => {
      if (!char.isFound) {
        return char;
      }
      return null;
    })

    if (!remainingCharacters.length > 0) {
     endGame();
    }
  }
    checkForWin()
  }, [characters])

  const checkClickSuccess = (x, y) => {
    let matchingCharacters = [];

    if (gameMode === 'default') {
      matchingCharacters = characters.filter((char) => {
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
    }

    if (gameMode === 'single') {
      const currentCharacter = characters.find(char => char.isFound === false);

      if (
        x >= currentCharacter.upperLeftX &&
        x <= currentCharacter.lowerRightX &&
        y >= currentCharacter.upperLeftY &&
        y <= currentCharacter.lowerRightY
      ) {
        matchingCharacters = [currentCharacter];
      }
    }

    const successfulClick = matchingCharacters.length === 1;
    if (successfulClick) {
      handlePlayerMove(successfulClick, matchingCharacters[0])
    } else {
      handlePlayerMove(successfulClick)
    }

    return successfulClick
  }

  const newGame = () => {
    handleHighScoreSubmitted(false);
    setIsModalOpen(false);
    setModalType('endGame');
    setScore({score: 0, wrongClicks: 0});

    if (mapToUse === 'mapOne') {
      setCharacters(sortCharactersByDifficulty(MapOneCharacters));
    }

    if (mapToUse === 'mapTwo') {
      setCharacters(sortCharactersByDifficulty(MapTwoCharacters));
    }
    
  }

  const endGame = () => {
    setIsModalOpen(true);
  }

  const handleHighScoreSubmitted = (show) => {
    setHighScoreSubmitted(show);
  }

  const updateGameMode = (mode) => {
    setGameMode(mode);
  }

  const displayOptionsModal = () => {
    setModalType('startGame')
  }

  const updateMap = (mapName) => {
    setMapToUse(mapName);
    if (mapName === 'mapOne') {
      setCharacters(sortCharactersByDifficulty(MapOneCharacters));
    }

    if (mapName === 'mapTwo') {
      setCharacters(sortCharactersByDifficulty(MapTwoCharacters));
    }
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
        updateGameMode={updateGameMode}
        displayOptionsModal={displayOptionsModal}
        gameMode={gameMode}
        updateMap={updateMap}
        selectedMap={mapToUse}
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
      <Carousel characters={characters} gameMode={gameMode} />
      <Image characters={characters} admin={false} checkClickSuccess={checkClickSuccess} endGame={endGame} gameMode={gameMode} mapToUse={mapToUse}/>
  
    </div>

  );
}

export default App;

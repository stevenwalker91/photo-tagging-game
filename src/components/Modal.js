
import Modal from 'react-modal';
import EndGame from './EndGame';
import StartGame from './StartGame';

Modal.setAppElement('#root');

const Mod = ({modalType, isOpen, newGame, scores, highscoreSubmitted, handleHighScoreSubmitted, updateGameMode}) => {

  const styles = {
    overlay: {
      zIndex: 2,
      backgroundColor: 'rgb(9 2 2 / 68%)'
    },
    content: {
      marginTop: 'auto',
      marginBottom: 'auto',
      display: 'flex',
      backgroundColor: '#202124',
      borderColor: 'black',
      color: 'white',
      justifyContent: 'space-evenly',
      height: 'fit-content'
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      contentLabel={`${modalType} modal`}
      shouldCloseOnEsc={false}
      shouldCloseOnOverlayClick={false}
      style={styles}
    >
      { modalType === 'endGame' ?
      <EndGame 
        newGame={newGame}
        scores={scores}
        highscoreSubmitted={highscoreSubmitted}
        handleHighScoreSubmitted={handleHighScoreSubmitted}
      /> :
      <StartGame 
        newGame={newGame}
        updateGameMode={updateGameMode}
      />
    }
    </Modal>
  )

}

export default Mod
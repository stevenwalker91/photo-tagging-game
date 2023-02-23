
import Modal from 'react-modal';
import EndGame from './EndGame';
import StartGame from './StartGame';

Modal.setAppElement('#root');

const Mod = ({modalType, isOpen, newGame, scores, highscoreSubmitted, handleHighScoreSubmitted, updateGameMode, displayOptionsModal, gameMode, updateMap}) => {

  const styles = {
    overlay: {
      zIndex: 2,
      backgroundColor: 'rgb(9 2 2 / 68%)',

    },
    content: {
      marginTop: 'auto',
      marginBottom: 'auto',
      display: 'flex',
      backgroundColor: '#202124',
      borderColor: 'black',
      color: 'white',
      justifyContent: 'space-evenly',
      maxWidth: '800px',
      marginLeft: 'auto',
      marginRight: 'auto'

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
        displayOptionsModal={displayOptionsModal}
      /> :
      <StartGame 
        newGame={newGame}
        updateGameMode={updateGameMode}
        gameMode={gameMode}
        updateMap={updateMap}
      />
    }
    </Modal>
  )

}

export default Mod

import Modal from 'react-modal';
import EndGame from './EndGame';

Modal.setAppElement('#root');

const Mod = ({modalType, isOpen, newGame, scores, highscoreSubmitted, handleHighScoreSubmitted}) => {

  const styles = {
    overlay: {
      zIndex: 2,
      backgroundColor: 'rgb(9 2 2 / 68%)'
    },
    content: {
      height: '60%',
      marginTop: 'auto',
      marginBottom: 'auto',
      display: 'flex',
      backgroundColor: '#202124',
      borderColor: 'black',
      color: 'white',
      justifyContent: 'space-evenly'
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
      <EndGame 
        newGame={newGame}
        scores={scores}
        highscoreSubmitted={highscoreSubmitted}
        handleHighScoreSubmitted={handleHighScoreSubmitted}
      />
    </Modal>
  )

}

export default Mod
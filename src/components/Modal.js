import Modal from 'react-modal';
Modal.setAppElement('#root');

const Mod = ({modalType, isOpen, newGame, scores}) => {

  const styles = {
    overlay: {
      zIndex: 2,
      backgroundColor: 'rgb(9 2 2 / 68%)'
      
    },
    content: {
      height: '60%',
      marginTop: 'auto',
      marginBottom: 'auto'
      
    }
  }

  const modalContent = (modalType) => {

    if (modalType === 'newGame') {

    }

    if (modalType === 'endGame') {
      const html = (
      <div>
        <button onClick={() => newGame()}>New Game</button>

      </div>
      )
      return html
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
      { modalContent(modalType) }
    </Modal>
  )

}

export default Mod
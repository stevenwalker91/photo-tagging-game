import LeaderboardSubmission from './LeaderboardSubmission';
import { useState, useEffect } from 'react';
import {db} from '../firebase_setup/firebase'
import {collection, query, orderBy, limit, getDocs} from 'firebase/firestore'
import Modal from 'react-modal';
import { v4 as uuidv4 } from 'uuid';
import ToolTip from './ToolTip';

Modal.setAppElement('#root');

const Mod = ({modalType, isOpen, newGame, scores, highscoreSubmitted, handleHighScoreSubmitted}) => {

  const [highScores, setHighscores] = useState([]);
  
  const getHighScores = async () => {
    const leaderboard = collection(db, 'leaderboard')
    const q = query(leaderboard, orderBy('score', 'desc'), limit(10));
    const queryResults = await getDocs(q);
    let results = [];

    queryResults.forEach((doc) => {
      results.push(doc.data());
    })
    setHighscores(results);
  }

  useEffect(() => {
    getHighScores()
  }, [highscoreSubmitted])


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

  const modalContent = (modalType) => {

    let returnElements

    if (modalType === 'newGame') {

    }

    if (modalType === 'endGame') {
      let highScore = false;
      if (highScores[highScores.length-1].score < scores.score || highScores.length < 10) {
        highScore = true;
      }

      returnElements = (
        <>
          <div className="result-message">
            <h2>Well done!</h2>
            <h3>Your score was {scores.score - scores.wrongClicks}
              <ToolTip />
            </h3>
            {highScore && <p>Awesome, it looks like you got a high score! Why not add your score to the leaderboard below?</p>}
            </div>
            <h4 style={{textAlign: 'center'}}>Leaderboard</h4>
            <div className="leader-board-container">
              
              <table>
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Name</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    highScores.map((score, arr) => {
                      return (
                      <tr key={uuidv4()}>
                        <td>{arr +1}</td>
                        <td>{score.name}</td>
                        <td>{score.score}</td>
                      </tr>
                      )
                    })

                  }
                </tbody>
              </table>
              {highScore && !highscoreSubmitted && <LeaderboardSubmission score={scores} highscoreSubmitted={handleHighScoreSubmitted} updateHighScores={getHighScores}/>}
            </div>
            <div style={{alignSelf: 'flex-end'}}><button onClick={newGame}>New Game</button></div>
          </>
      )
      
    }
  return (
    <div className="modal-container">
      {returnElements}
    </div>
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      contentLabel={`${modalType} modal`}
      shouldCloseOnEsc={false}
      shouldCloseOnOverlayClick={false}
      style={styles}
    >
      { highScores.length > 0 && modalContent('endGame')}
    </Modal>
  )

}

export default Mod
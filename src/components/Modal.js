import LeaderboardSubmission from './LeaderboardSubmission';
import { useState, useEffect } from 'react';
import {db} from '../firebase_setup/firebase'
import {collection, query, orderBy, limit, getDocs} from 'firebase/firestore'
import Modal from 'react-modal';
Modal.setAppElement('#root');

const Mod = ({modalType, isOpen, newGame, scores}) => {

  const [highScores, setHighscores] = useState([]);
  const [highscoreSubmitted, setHighScoreSubmitted] = useState(false);

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
  }, [highScores])

  const markHighScoreSubmitted = () => {
    setHighScoreSubmitted(true);
  }

  const styles = {
    overlay: {
      zIndex: 2,
      backgroundColor: 'rgb(9 2 2 / 68%)'
    },
    content: {
      height: '60%',
      marginTop: 'auto',
      marginBottom: 'auto',
      display: 'flex'
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
              <p>
                Your score was <b>{scores.score - scores.wrongClicks}</b>. This is made up of the characters you found ({scores.score}) minus the clicks you made that were incorrect ({scores.wrongClicks}).
              </p>
              {highScore && <p>Awesome, it looks like you got a high score! Why not add your score to the leaderboard below?</p>}
            </div>
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
                      <tr>
                        <td>{arr +1}</td>
                        <td>{score.name}</td>
                        <td>{score.score}</td>
                      </tr>
                      )
                    })

                  }
                </tbody>
              </table>
              {highScore && !highscoreSubmitted && <LeaderboardSubmission score={scores} highscoreSubmitted={markHighScoreSubmitted} />}
            </div>
            <div><button onClick={newGame}>New Game</button></div>
           
            
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
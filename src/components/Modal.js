import LeaderboardSubmission from './LeaderboardSubmission';
import { useState, useEffect } from 'react';
import {db} from '../firebase_setup/firebase'
import {collection, query, orderBy, limit, getDocs} from 'firebase/firestore'
import Modal from 'react-modal';
Modal.setAppElement('#root');

const Mod = ({modalType, isOpen, newGame, scores}) => {

  const [highScores, setHighscores] = useState([]);

  const getHighScores = async () => {
    const leaderboard = collection(db, 'leaderboard')
    const q = query(leaderboard, orderBy('score', 'desc'), limit(100));
    const queryResults = await getDocs(q);
    let results = [];

    queryResults.forEach((doc) => {
      results.push(doc.data());
    })
    setHighscores(results);
  }

  useEffect(() => {
    getHighScores()
  }, [isOpen])



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

      const table = highScores.map((score, arr) => {
        return (
        <tr>
          <td>{arr +1}</td>
          <td>{score.name}</td>
          <td>{score.score}</td>
        </tr>
        )
      })
      const html = (
      <div>
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {table}
          </tbody>
        </table>
        
        <LeaderboardSubmission score={scores}/>
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
      { highScores && modalContent('endGame')}
    </Modal>
  )

}

export default Mod
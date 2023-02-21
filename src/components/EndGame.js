import LeaderboardSubmission from './LeaderboardSubmission';
import { useState, useEffect } from 'react';
import {db} from '../firebase_setup/firebase'
import {collection, query, orderBy, limit, getDocs} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';
import ToolTip from './ToolTip';

const EndGame = ({newGame, scores, highscoreSubmitted, handleHighScoreSubmitted}) => {
  const [highScores, setHighscores] = useState([]);
  const [highScore, setHighScore] = useState(false);

  const getHighScores = async () => {
    const leaderboard = collection(db, 'leaderboard')
    const q = query(leaderboard, orderBy('score', 'desc'), limit(10));
    const queryResults = await getDocs(q);
    let results = [];

    queryResults.forEach((doc) => {
      results.push(doc.data());
    })
    setHighscores(results);
    return(results)
  }

  useEffect(() => {
    getHighScores().then((results) => {
      if ((results.length > 0 && results[results.length-1].score < scores.score) || results.length < 10) {
        setHighScore(true)
      }
    })
  }, [highscoreSubmitted, scores])


  

  return (

    <div className="modal-container">
      <div className="result-message">
        <h2>Well done!</h2>
        <h3>Your score was {scores.score - scores.wrongClicks}
          <ToolTip>
            <h5>How is my score made up?</h5>
            <p>For each character you find, you will earn points based on the character difficulty. Beware though, for each wrong click you make, 1 point will be deducted from the score. This makes it possible to have a negative score. The points earned for each difficulty are:</p>
            <ul>
              <li>Very Easy: 1</li>
              <li>Easy: 2</li>
              <li>Medium: 3</li>
              <li>Hard: 4</li>
              <li>Very Hard: 5</li>
            </ul>
          </ToolTip>
        </h3>
        {highScore && <p>Awesome, it looks like you got a high score! Why not add your score to the leaderboard below?</p>}
        </div>
        <h4>Leaderboard</h4>
        <div className="leader-board-container">
          
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            {
            <tbody>
              { highScores.length > 0 && 
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
            }
          </table>
          {highScore && !highscoreSubmitted && <LeaderboardSubmission score={scores} highscoreSubmitted={handleHighScoreSubmitted} updateHighScores={getHighScores}/>}
        </div>
        <div style={{alignSelf: 'flex-end', marginTop: '30px'}}><button className="newGameBtn" onClick={newGame}>New Game</button></div>
      </div>
  )

}

export default EndGame;
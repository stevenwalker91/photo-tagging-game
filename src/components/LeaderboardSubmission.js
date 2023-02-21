import { useState } from 'react';
import {db} from '../firebase_setup/firebase'
import {collection, addDoc } from 'firebase/firestore'

const LeaderBoardSubmission = ({score, highscoreSubmitted}) => {
  const [userName, setUserName] = useState('')

  const handleInput = (event) => {
    setUserName(event.target.value)
  }

  const addHighScore = async () => {
    try {
      await addDoc(collection(db, 'leaderboard'), {
        name: userName,
        score: score.score
      })
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmission = async (event) => {
    event.preventDefault();
    addHighScore();
    highscoreSubmitted(true);

  }


  return (
    <form onSubmit={(event) => handleSubmission(event)}>
      <label htmlFor="nameInput">Name:</label>
      <input id="nameInput" name="nameInput" onChange={(event) => handleInput(event)} required />
      <button>Submit</button>
    </form>
  )
}

export default LeaderBoardSubmission;


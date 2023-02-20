import { useState } from 'react';
import {db} from '../firebase_setup/firebase'
import {collection, addDoc } from 'firebase/firestore'

const LeaderBoardSubmission = ({score}) => {
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

  }


  return (
    <form>
      <label htmlFor="nameInput">Name:</label>
      <input id="nameInput" name="nameInput" onChange={(event) => handleInput(event)}/>
      <button onClick={(event) => handleSubmission(event)}>Submit</button>
    </form>
  )
}

export default LeaderBoardSubmission;


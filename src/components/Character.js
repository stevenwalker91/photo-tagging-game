import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState } from 'react';
import Loader from './Loader';

const Character = ({character}) => {
  const [loading, setLoading] = useState(true);

  const getBackgroundColor = () => {
    let color = '';
    if (character.difficulty === 'Very Easy') {
      color = '#05e91ad1';
    }
    if (character.difficulty === 'Easy') {
      color = '#e9d305d1';
    }
    if (character.difficulty === 'Medium') {
      color = '#ff9008ba';
    }
    if (character.difficulty === 'Hard') {
      color = '#c30000ba';
    }
    if (character.difficulty === 'Very Hard') {
      color = '#800101ba';
    }

    return color;
  }

  const className = (input) => {
    if (character.isFound && input === 'img') {
      return 'option-image found';
    } 
    if (!character.isFound && input === 'img') {
      return 'option-image';
    } 
    if (character.isFound && input === 'span') {
      return 'difficulty found';
    } 
    if (!character.isFound && input === 'span') {
      return 'difficulty';
    } 


  }

  return (
    <div className="character-container">
      <Loader style={{display: loading ? "block" : "none"}} /> 
      <img 
        className={className('img')} 
        alt={character.name} 
        src={`${process.env.PUBLIC_URL}/assets/${character.file}`} 
        title={character.name}
        draggable={false}
        style={{display: loading ? "none" : "block"}}
        onLoad={() => setLoading(false)}
      />
      <span className={className('span')} style={{backgroundColor: getBackgroundColor()}}>{character.difficulty}</span>
      {character.isFound && <span className="check-circle"><CheckCircleIcon /></span>}
    </div>
  )
}

export default Character;
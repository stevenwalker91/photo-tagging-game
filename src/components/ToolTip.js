import InfoIcon from '@mui/icons-material/Info';
import Popover from '@mui/material/Popover';
import { useState } from 'react';

const ToolTip = () => {

  const [containerEl, setContainerEl] = useState(null);

  const handleOpen = (e) => {
      setContainerEl(e.currentTarget);
  };

  const handleClose = () => {
      setContainerEl(null);
  };

  const open = Boolean(containerEl);

  const styles = {
    backgroundColor: 'white',
    padding: '20px',
    maxWidth: '500px'

  }

  
  return (
    <>
      <InfoIcon 
        sx={{marginLeft: "10px"}}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
      >
      </InfoIcon>
      <Popover
      sx={{
        pointerEvents: "none",
      }}
      open={open}
      anchorEl={containerEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      onClose={handleClose}
      disableRestoreFocus
    >
      <div style={styles}>
        <h5>How is my score made up?</h5>
        <p>For each character you find, you will earn points based on the character difficulty. Beware though, for each wrong click you make, 1 point will be deducted from the score. This makes it possible to have a negative score. The points earned for each difficulty are:</p>
        <ul>
          <li>Very Easy: 1</li>
          <li>Easy: 2</li>
          <li>Medium: 3</li>
          <li>Hard: 4</li>
          <li>Very Hard: 5</li>
        </ul>
      </div>
    </Popover>
  </>
  )
}
  


export default ToolTip;
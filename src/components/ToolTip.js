import InfoIcon from '@mui/icons-material/Info';
import Popover from '@mui/material/Popover';
import { useState } from 'react';

const ToolTip = ({children}) => {

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
        sx={{marginLeft: "10px", "&:hover": {cursor: 'pointer'}}}
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
      {children}
      </div>
    </Popover>
  </>
  )
}
  


export default ToolTip;
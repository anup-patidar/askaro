import { Avatar } from '@material-ui/core';
import React from 'react';
import './css/askarobox.css';

function Askarobox() {
  return (
    <div className='askarobox'>
      <div className='askarobox-profile'>
        <Avatar />
      </div>

      <div className='askarobox-content'>
        <div className='askarobox-question'>
          <input type="text" placeholder="What is your question" />
        </div>
      </div>
    </div>
  );
}

export default Askarobox;

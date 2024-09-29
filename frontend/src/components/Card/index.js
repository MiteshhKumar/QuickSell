import React from 'react';
import './card.css';
import UserIcon from '../UserIcon';
import dot_menu from '../../assets/dot_menu.svg';
import { getStatusIcon } from '../../utils/helper';

function Card({ ticket, userData, hideStatusIcon, hideProfileIcon }) {
  return (
    <div className='card'>
      <div className='top-container'>
        <div className='ticket-id'>{ticket.id}</div>
        {!hideProfileIcon && <UserIcon name={userData.name} available={userData.available} />}
      </div>
      <div className='middle-container'>
        {!hideStatusIcon && getStatusIcon(ticket.status)}
        <div className='title'>{ticket.title}</div>
      </div>
      <div className='bottom-container'>
        <div className='more-icon-container'>
          <img src={dot_menu} alt='' />
        </div>
        {ticket.tag.map((tag) => (
          <div key={tag} className='tag-container'>
            <div className='tag-icon'></div>
            <div className='tag-text'>{tag}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;

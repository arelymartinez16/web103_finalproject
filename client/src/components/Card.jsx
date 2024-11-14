import React from 'react';
import '../App.css'

const Card = ({ title, children }) => {
  return (
    <div className="card">
      {title && <h2 className="card-title">{title}</h2>}
      <div className="card-content">{children}</div>
      {/* {room_id && (
        <Link to={`/room/${room_id}`} className="see-more-button">
          See More
        </Link>
      )} */}
    </div>
  );
};

export default Card;
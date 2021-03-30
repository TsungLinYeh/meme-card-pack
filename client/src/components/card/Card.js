import React from 'react';
import propTypes from 'prop-types';
import style from './card.css';

const Card = ({
  item,
}) => {
  let image;
  if (item.thumbnail_url) {
    image = (
      <div className={`cardImgContainer ${style.cardImgContainer}`}>
        <img className={`cardImg ${style.cardImg}`} src={item.thumbnail_url} alt={item.name} draggable="false" loading="lazy" />
      </div>
    );
  } else {
    image = (
      <div className={`cardImgLostContainer ${style.cardImgLostContainer}`}>
        <div className={`cardImgLost ${style.cardImgLost}`}>Sorry Photo lost</div>
      </div>
    );
  }
  return (
    <div>
      {image}
      <a
        className={`cardName ${style.cardName}`}
        href={`/?product_id=${item.id}`}
        draggable="false"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h3>{item.name}</h3>
      </a>
    </div>
  );
};

Card.propTypes = {
  item: propTypes.shape({
    name: propTypes.string.isRequired,
  }).isRequired,
};

export default Card;

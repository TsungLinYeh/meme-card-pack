import React from 'react';
import propTypes from 'prop-types';
import style from './card.css';

const Card = ({
  item,
}) => {
  let image;
  if (item.image) {
    image = (
      <div className={`cardImgContainer ${style.cardImgContainer}`}>
        <img className={`cardImg ${style.cardImg}`} src={item.image} alt={item.title} draggable="false" loading="lazy" />
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
    <div className={`${style.card}`}>
      {image}
      <a
        className={`cardName ${style.cardName}`}
        href={item.postLink}
        draggable="false"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h3>{item.title}</h3>
      </a>
      <div>{item.subreddit}</div>
      <div>
        RP:
        {item.upvotes}
      </div>
    </div>
  );
};

Card.propTypes = {
  item: propTypes.shape({
    title: propTypes.string.isRequired,
    image: propTypes.string.isRequired,
    postLink: propTypes.string.isRequired,
    subreddit: propTypes.string.isRequired,
    upvotes: propTypes.number.isRequired,
  }).isRequired,
};

export default Card;

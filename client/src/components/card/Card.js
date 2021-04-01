import React from 'react';
import propTypes from 'prop-types';
import style from './card.css';

const checkRarity = (upvotes) => {
  if (upvotes > 50000) {
    return style.legendary;
  }
  if (upvotes > 10000) {
    return style.ultraRare;
  }
  if (upvotes > 1000) {
    return style.superRare;
  }
  if (upvotes > 100) {
    return style.rare;
  }
  return style.normal;
};

const Card = ({ item, imgModalHandler }) => {
  const rarity = checkRarity(item.upvotes);

  let image;
  if (item.image) {
    image = (
      <div
        className={`cardImgContainer ${style.cardImgContainer}`}
        onClick={imgModalHandler.bind(this, item)}
        onKeyPress={imgModalHandler.bind(this, item)}
        role="button"
        tabIndex={0}
      >
        <img
          className={`cardImg ${style.cardImg}`}
          src={item.image}
          alt={item.title}
          draggable="false"
          loading="lazy"
        />
      </div>
    );
  } else {
    image = (
      <div className={`cardImgLostContainer ${style.cardImgLostContainer}`}>
        <div className={`cardImgLost ${style.cardImgLost}`}>
          Sorry Photo lost
        </div>
      </div>
    );
  }
  return (
    <div className={`${style.card} ${rarity}`} draggable="true" id={`card${item.id}`}>
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

import React from 'react';
import propTypes from 'prop-types';
import style from './Image.css';

const Image = ({
  clicked, closeModal, isClicked,
}) => (
  <div className={`${style.modal} ${isClicked ? style.modalShow : ''}`}>
    <div className={`blocker ${style.blocker}`} onClick={closeModal} onKeyPress={closeModal} role="button" tabIndex={0} aria-label="Mute volume" />
    <div className={style.imageModal} id="imageModal">
      <img className={`${style.image}`} src={clicked?.image || ''} alt={clicked?.title || ''} draggable="false" />
    </div>
  </div>
);

Image.propTypes = {

};

export default Image;

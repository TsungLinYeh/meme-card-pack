import React from 'react';
import propTypes from 'prop-types';
import Card from '../card/Card';
import style from './list.css';

const ListCollections = ({ collections, dropHandler, imgModalHandler }) => (
  <div className={`yourCollections ${style.yourCollections}`}>
    {collections.map((item, index) => (
      <Card item={item} key={item.id} index={index} imgModalHandler={imgModalHandler} />
    ))}
    <div className={`notification ${style.notification}`}>
      <span>
        drag to collect
      </span>
    </div>
  </div>
);

ListCollections.propTypes = {

};

export default ListCollections;

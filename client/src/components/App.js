import React from 'react';
import axios from 'axios';

import Card from './card/Card';
import Image from './card/Image';
import List from './list/List';

import styles from './app.css';
import dummy from '../../../dummy/dummy';

class App extends React.Component {
  static dragStart(e) {
    const id = e.target.id.slice(4);
    e.dataTransfer.setData('text/plain', id);
  }

  static cancelDefault(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  constructor(props) {
    super(props);
    this.state = {
      deck: [],
      pack: [],
      collections: [],
      clicked: undefined,
      isClicked: false,
    };
    this.getDeckName = this.getDeckName.bind(this);
    this.openOnePack = this.openOnePack.bind(this);
    this.imgModalHandler = this.imgModalHandler.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.dropped = this.dropped.bind(this);
    this.addToCollectionsHandler = this.addToCollectionsHandler.bind(this);
    this.changeSubreddit = this.changeSubreddit.bind(this);
    this.getDeckName();
  }

  componentDidMount() {
    const dropTarget = document.querySelector('.yourCollections');
    if (dropTarget) {
      dropTarget.addEventListener('drop', this.dropped);
      dropTarget.addEventListener('dragenter', App.cancelDefault);
      dropTarget.addEventListener('dragover', App.cancelDefault);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  getDeckName() {
    axios.get('/redditcards/deck').then((res) => {
      this.setState({
        deck: res.data,
      });
    });
  }

  changeSubreddit(event) {
    if (event.key === 'Enter') {
      // console.log(document.querySelector('#subreddit').value);
      axios.post('/redditcards/change', {
        subreddit: document.querySelector('#subreddit').value,
      });
      document.querySelector('#subreddit').value = '';
      this.getDeckName();
    }
  }

  openOnePack() {
    axios.get('/redditcards/open').then((res) => {
      this.setState({
        pack: res.data,
      }, () => {
        document.addEventListener('keydown', this.escFunction, false);
        const dragSources = document.querySelectorAll('[draggable="true"]');
        dragSources.forEach((dragSource) => {
          dragSource.addEventListener('dragstart', App.dragStart);
        });
      });
    });
  }

  addToCollectionsHandler(id) {
    const { pack, collections } = this.state;
    const checker = collections.filter((item) => item.id === id);
    const product = pack.filter((item) => item.id === id);
    if (checker.length === 0) {
      this.setState({
        collections: [...product, ...collections],
      });
    }
  }

  dropped(e) {
    App.cancelDefault(e);
    const id = e.dataTransfer.getData('text/plain');
    this.addToCollectionsHandler(id);
  }

  imgModalHandler(item) {
    this.setState({
      clicked: item,
      isClicked: true,
    });
  }

  escFunction(event) {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  }

  closeModal() {
    this.setState({
      isClicked: false,
    });
  }

  render() {
    const {
      pack, collections, clicked, isClicked, deck,
    } = this.state;
    return (
      <div id="app" className="app">
        <div className={styles.headerContainer}>
          <div className={styles.rarityExample}>
            <h3>
              Featured Pack:
              <br />
              {deck.join(',')}
            </h3>
          </div>
          <button onClick={this.openOnePack} type="button" className={styles.button}>
            open card pack
          </button>
          <div className={styles.rarityExample}>
            <h3>Rarity</h3>
          </div>
          <div className={styles.exampleNormal} />
          <div className={styles.exampleRare} />
          <div className={styles.exampleSuperRare} />
          <div className={styles.exampleUltraRare} />
          <div className={styles.exampleLegendary} />
          <input className={styles.target} placeholder="change subreddit pack ..." onKeyPress={this.changeSubreddit} id="subreddit" />
        </div>
        <div className={styles.relatedProducts}>
          {pack.map((post) => (
            <Card
              item={post}
              key={post.id}
              imgModalHandler={this.imgModalHandler}
            />
          ))}
        </div>
        <div>
          <List collections={collections} imgModalHandler={this.imgModalHandler} />
        </div>
        <Image clicked={clicked} closeModal={this.closeModal} isClicked={isClicked} />
      </div>
    );
  }
}

export default App;

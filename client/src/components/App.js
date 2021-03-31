import React from 'react';
import axios from 'axios';
import Card from './card/Card';
import Image from './card/Image';
import styles from './app.css';
import dummy from '../../../dummy/dummy';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pack: [],
      clicked: undefined,
      isClicked: false,
    };
    this.openOnePack = this.openOnePack.bind(this);
    this.imgModalHandler = this.imgModalHandler.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openOnePack() {
    axios.get('/redditcards/open').then((res) => {
      this.setState({
        pack: res.data,
      });
    });
  }

  imgModalHandler(item) {
    this.setState({
      clicked: item,
      isClicked: true,
    });
  }

  closeModal() {
    this.setState({
      isClicked: false,
    });
  }

  render() {
    const { pack, clicked, isClicked } = this.state;
    return (
      <div id="app" className="app">
        <div>
          <button onClick={this.openOnePack} type="button" className={styles.button}>
            open card pack
          </button>
        </div>
        <div>
          {pack.map((post) => (
            <Card
              item={post}
              key={post.id}
              imgModalHandler={this.imgModalHandler}
            />
          ))}
        </div>
        <Image clicked={clicked} closeModal={this.closeModal} isClicked={isClicked} />
      </div>
    );
  }
}

export default App;

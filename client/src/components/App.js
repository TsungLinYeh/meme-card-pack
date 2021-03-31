import React from 'react';
import axios from 'axios';
import Card from './card/Card';
import Image from './card/Image';
import dummy from '../../../dummy/dummy';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pack: [],
      clicked: undefined,
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
    });
  }

  closeModal() {
    this.setState({
      clicked: undefined,
    });
  }

  render() {
    const { pack, clicked } = this.state;
    return (
      <div id="app" className="app">
        <div>
          <button onClick={this.openOnePack} type="button">
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
        <Image clicked={clicked} closeModal={this.closeModal} isClicked={clicked !== undefined} />
      </div>
    );
  }
}

export default App;

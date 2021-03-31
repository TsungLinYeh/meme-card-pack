import React from 'react';
import Card from './card/Card';
import dummy from '../../../dummy/dummy';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div id="app" className="app">
        <Card item={dummy.dummyPost} />
      </div>
    );
  }
}

export default App;

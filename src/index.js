import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const INITIAL_NUM_OF_SHELLS = 3;

function createInitialShellObjectArray(num) {
  let shellObjects = [];
  for (var i = 0; i < num; i++) {
    let itemNum = i + 1;
    shellObjects.push({
      id: itemNum,
      text: "Shell " + itemNum,
    });
  }
  return shellObjects;
}

// SHELL =======================================================================
class Shell extends React.Component {
  render () {
    return (
      <div className="shell" onClick={(event) => {
        this.props.doClick(this.props.id);
      }}>
        {this.props.text}
      </div>
    );
  }
}

// GAME ========================================================================
class Game extends React.Component {

  constructor(props) {
    super(props);
    // let shellObjectArray = createInitialShellObjectArray(INITIAL_NUM_OF_SHELLS);
    // let currentAnswer = this.generateAnswer(shellObjectArray.length);
    this.state = {
      // turnsLeft: 3,
      // currentScore: 0,
      // shells: shellObjectArray,
      // currentAnswer: currentAnswer,
      // message: "Click on a shell",
    };
  }
  
  generateAnswer = (arrayLength) => {
    return Math.floor(Math.random() * arrayLength) + 1;
  }
  
  createShells = () => {
    let arrayOfShells = this.state.shells.map(shell => {
      console.log(shell);
      return (
        <Shell
        key={shell.id}
        id={shell.id}
        text={shell.text}
        doClick={this.handleClick}
        />
      )
    });
    return arrayOfShells;
  }
  
  initializeState = () => {
    let shellObjectArray = createInitialShellObjectArray(INITIAL_NUM_OF_SHELLS);
    let currentAnswer = this.generateAnswer(shellObjectArray.length);
    this.setState({
      turnsLeft: 3,
      currentScore: 0,
      shells: shellObjectArray,
      currentAnswer: currentAnswer,
      message: "You lost! Game restarted.",
    });
  }

  handleClick = (i) => {
    console.log("shell clicked: " + i);
    let message = "";
    let currentScore = this.state.currentScore;
    let turnsLeft = this.state.turnsLeft;
    if (i === this.state.currentAnswer) {
      message = "You win! Pick again to continue.";
      currentScore += 1;
      this.setState({currentAnswer: this.generateAnswer(this.state.shells.length)});
    } else {
      message = "Wrong answer! Pick again."
      turnsLeft -= 1;
    }
    if(turnsLeft <=0) {
      this.initializeState();
    } else {
      this.setState({
        message: message,
        currentScore: currentScore,
        turnsLeft: turnsLeft,
      });
    }
  }

  componentWillMount() {
    this.initializeState();
  }

  render () {
    console.log("currentAnswer: " + this.state.currentAnswer);
    return (
      <div className="container">
        <div className="shell-box">
          {this.createShells()}
        </div>
        <div className="message">{this.state.message}</div>
        <div className="status-box">
          <div className="status">Turns left: {this.state.turnsLeft}</div>
          <div className="status">Score: {this.state.currentScore}</div>
        </div>
      </div>
    )
  }

}

// ==============================================================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
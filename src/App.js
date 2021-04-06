import './App.scss';
import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      quote: []
    };
  }
  
  requestNewQuote = () =>{
    fetch("https://goquotes-api.herokuapp.com/api/v1/random?count=1")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          quote: result.quotes[0]
        });
      }
    );
  }

  componentDidMount(){
    fetch("https://goquotes-api.herokuapp.com/api/v1/random?count=1")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          quote: result.quotes[0]
        });
      }
    );
  }

  hex2RGB(hex){
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return [r, g, b].join();
  }

  getRandAccentStyle(){
    let random_hex = Math.floor(Math.random()*16777215).toString(16);
    let property = "radial-gradient(circle at 50% 50%, rgb("+ this.hex2RGB(random_hex)+"), rgba(76, 0, 255, 0)";
    return ({"background":property});
  }
  
  render(){
    console.log(this.state.quote);
    
    const {text, author} = this.state.quote;
    return (
      <div className="App">
      <div>
        <h1>Random Quote Machine</h1>

        <div id="quote-box">
          <p id="text">{text}</p>
          <p id="author">{author}</p>
          <div id="buttons">
            <button id="new-quote" className = "glow-on-hover" onClick={this.requestNewQuote.bind(this)}>New Quote</button>
            <a className="fa fa-twitter" id="tweet-quote" href={'https://twitter.com/intent/tweet?text='+text+"%0a%0a"+author} target="_blank" rel="noreferrer"> </a>
          </div>
        </div>
        </div>
        <div className = "accent-1" style= {this.getRandAccentStyle()}></div>
        <div className = "accent-2" style= {this.getRandAccentStyle()}></div>
      </div>
    );
  }
}

export default App;

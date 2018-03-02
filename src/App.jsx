import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    
    this.state = {
      calls: [],
      oneCall: false,
      first: false,
      second: false,
      third: false,
      fourth: false
    }
  }
  
  componentDidMount() {
    fetch(`https://data.cityofnewyork.us/resource/wewp-mm3p.json?$$app_token=jN9hrZIz4CWHZh5DaVasz3ZQq&$limit=100&$offset=${Math.floor(Math.random() * 900)}&$where=time like '12:%25' || '%25AM'`)
      .then((data) => {
        return data.json();
      })
      .then((c) => {
        let theCalls = c.map((call) => {
          return ({
            org: call.agency_name,
            issue: call.brief_description,
            resolution: call.call_resolution,
            time: call.time
          })
        });
        
        this.setState({
          calls: theCalls
        })
      })
  }
  
  start = () => {
    let one = this.state.calls[Math.floor(Math.random() * 100)];
    
    while (one.issue.split(' ')[0] === 'Hidden') {
      one = this.state.calls[Math.floor(Math.random() * 100)];
    }
    
    if (!this.state.fourth) {
      this.setState({
        oneCall: one,
        first: one.org,
        second: false,
        third: false,
        fourth: false
      })
    }
    else {
      this.setState({
        oneCall: one,
        first: false,
        second: false,
        third: false,
        fourth: false
      })
    }
  }
  
  nextLine = () => {
    let lastLines = ["okay, thanks", "thank you!", "uh... well, ok", "um, not what I was expecting, but thanks", "cool, thanks", "is that it?"];
    
    if (!this.state.second) {
      let issue;
      let issueArr = this.state.oneCall.issue
                                       .toLowerCase()
                                       .split(' ')
      if (issueArr[0] === "report" || 
          issueArr[0] === "request" || 
          issueArr[0] === "apply" || 
          issueArr[0] === "learn" ||
          issueArr[0] === "locate") {
        console.log(issueArr)
        issue = "hi, I'd like to " + issueArr.join(' ');
      } else if (issueArr[0] === "complaint") {
        issue = "hey, I need to file a " + issueArr.join(' ');
      } else if (issueArr[0] === "get" ||
                 issueArr[0] === "contact") {
        issue = "hey, I want to " + issueArr.join(' ');
      } else if (issueArr[0] === "requires") {
        issue = "hello, I need " + issueArr.slice(1, issueArr.length).join(' ');
      } else if (issueArr[0] === "tips" || 
                 issueArr[0] === "information") {
        issue = "can I have some " + issueArr.join(' ');
      } else if (issueArr[0] === "find" ||
                 issueArr[0] === "lookup") {
        issue = "hey, I need to " + issueArr.join(' ');
      } else if (issueArr[0] === "status" ||
                 issueArr[0] === "location") {
        issue = "hey, I need the " + issueArr.join(' ');
      } else if (issueArr[0] === "complaints") {
        issue = "hey, I've got a few " + issueArr.join(' ');
      } else {
        issue = issueArr.join(' ');
      }
      
      this.setState({
        second: issue
      })
    } else if (!this.state.third) {
      let reso;
      let resoArr = this.state.oneCall.resolution
                                       .toLowerCase()
                                       .split(' ')
                                       
      if (this.state.oneCall.resolution === "Information Provided") {
        let infoArr = ["sure, sending the info now", "I've got you, here's the info...", "I'm not sure, but here's what I got...", "maybe this is what you're looking for? {attachment}"]
        reso = infoArr[Math.floor(Math.random() * infoArr.length)];
      } else if (resoArr[0] === "transfer" ||
                 resoArr[0] === "internal" ||
                 resoArr[0] === "referral") {
        reso = "let me transfer you to another department.";
      } else if (resoArr[0] === "routed") {
        reso = "check our website for information on that";
      } else if (resoArr[0] === "csms" ||
                 resoArr[0] === "universal") {
        let serviceArr = ["alright, we're on the case.", "sending someone over now", "we'll follow up with you on this"]
        reso = serviceArr[Math.floor(Math.random() * serviceArr.length)];    
      } else if (resoArr[0] === "hot") {
        reso = "alright, I'm transfering you to 911!";
      } else {
        reso = resoArr.join(" ");
      }
      
      this.setState({
        third: reso
      })
    } else {
      this.setState({
        fourth: lastLines[Math.floor(Math.random() * lastLines.length)]
      })
    }
  }
  
  render() {
    let button;
    let firstThing;
    let secondThing;
    let thirdThing;
    let fourthThing;
    
    if (!this.state.first) {
      button = <button className="the-button" onClick={this.start}>New Call</button>
    } else if (this.state.fourth) {
      firstThing = <div className="dialogue-item-1">
        <p>hello, this is {this.state.first.toLowerCase()}, how can we help?</p>
        </div>
      button = <button className="the-button" onClick={this.start}>Next Call</button>
    } else {
      firstThing = <div className="dialogue-item-1">
        <p>hello, this is {this.state.first.toLowerCase()}, how can we help?</p>
        </div>
      button = <button className="the-button" onClick={this.nextLine}>Next</button>
    }
    
    if (this.state.second) {
      secondThing = <div className="dialogue-item-2">
        <p>{this.state.second}</p>
      </div>
    }
    
    if (this.state.third) {
      thirdThing = <div className="dialogue-item-1">
        <p>{this.state.third}</p>
      </div>
    }
    
    if (this.state.fourth) {
      fourthThing = <div className="dialogue-item-2">
        <p>{this.state.fourth}</p>
      </div>
    }
    
    return (
      <div className="App">
        <h3> Midnight Info NYC </h3>
        <div className="dialogue-box">
          <div className="chatroom">
            {firstThing}
            {secondThing}
            {thirdThing}
            {fourthThing}
          </div>
          {button}
        </div>
      </div>
    );
  }
}

export default App;

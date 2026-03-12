import { useState, useEffect } from 'react'
import './App.css'

const App = () => {
  const [calls, setCalls] = useState([])
  const [oneCall, setOneCall] = useState(false)
  const [first, setFirst] = useState(false)
  const [second, setSecond] = useState(false)
  const [third, setThird] = useState(false)
  const [fourth, setFourth] = useState(false)

  useEffect(() => {
    fetch(`https://data.cityofnewyork.us/resource/wewp-mm3p.json?$$app_token=jN9hrZIz4CWHZh5DaVasz3ZQq&$limit=100&$offset=${Math.floor(Math.random() * 900)}&$where=time like '12:%25' || '%25AM'`)
      .then((data) => data.json())
      .then((c) => {
        let theCalls = c.map((call) => ({
          org: call.agency_name,
          issue: call.brief_description,
          resolution: call.call_resolution,
          time: call.time
        }));
        setCalls(theCalls)
      })
  }, [])

  const start = () => {
    if (calls.length === 0) return;
    let one = calls[Math.floor(Math.random() * calls.length)];

    while (one.issue && one.issue.split(' ')[0] === 'Hidden') {
      one = calls[Math.floor(Math.random() * calls.length)];
    }

    if (!fourth) {
      setOneCall(one)
      setFirst(one.org)
      setSecond(false)
      setThird(false)
      setFourth(false)
    } else {
      setOneCall(one)
      setFirst(false)
      setSecond(false)
      setThird(false)
      setFourth(false)
    }
  }

  const nextLine = () => {
    let lastLines = ["okay, thanks", "thank you!", "uh... well, ok", "um, not what I was expecting, but thanks", "cool, thanks", "is that it?"];

    if (!second) {
      let issue;
      let issueArr = oneCall.issue.toLowerCase().split(' ')
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
      setSecond(issue)
    } else if (!third) {
      let reso;
      let resoArr = oneCall.resolution.toLowerCase().split(' ')

      if (oneCall.resolution === "Information Provided") {
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
      setThird(reso)
    } else {
      setFourth(lastLines[Math.floor(Math.random() * lastLines.length)])
    }
  }

    let button;
    let firstThing;
    let secondThing;
    let thirdThing;
    let fourthThing;

    if (!first) {
      button = <button className="the-button" onClick={start}>New Call</button>
    } else if (fourth) {
      firstThing = <div className="dialogue-item-1">
        <p>hello, this is {first.toLowerCase()}, how can we help?</p>
        </div>
      button = <button className="the-button" onClick={start}>Next Call</button>
    } else {
      firstThing = <div className="dialogue-item-1">
        <p>hello, this is {first.toLowerCase()}, how can we help?</p>
        </div>
      button = <button className="the-button" onClick={nextLine}>Next</button>
    }

    if (second) {
      secondThing = <div className="dialogue-item-2">
        <p>{second}</p>
      </div>
    }

    if (third) {
      thirdThing = <div className="dialogue-item-1">
        <p>{third}</p>
      </div>
    }

    if (fourth) {
      fourthThing = <div className="dialogue-item-2">
        <p>{fourth}</p>
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

export default App;

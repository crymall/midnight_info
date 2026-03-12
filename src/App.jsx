import { useState, useEffect } from "react";
import { nextLine } from "./utils";
import "./App.css";

const App = () => {
  const [calls, setCalls] = useState([]);
  const [oneCall, setOneCall] = useState(false);
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    fetch(
      `https://data.cityofnewyork.us/resource/wewp-mm3p.json?$$app_token=jN9hrZIz4CWHZh5DaVasz3ZQq&$limit=100&$offset=${Math.floor(Math.random() * 900)}&$where=time like '12:%25' || '%25AM'`,
    )
      .then((data) => data.json())
      .then((c) => {
        let theCalls = c.map((call) => ({
          org: call.agency_name || "NYC 311",
          issue: call.brief_description || "General Inquiry",
          resolution: call.call_resolution || "Information Provided",
          time: call.time,
        }));
        setCalls(theCalls);
      });
  }, []);

  const start = () => {
    if (conversation.length > 0 && conversation.length < 4) {
      setConversation((prev) => [...prev, nextLine(oneCall, conversation)]);
      return;
    }

    if (calls.length === 0) return;
    let one = calls[Math.floor(Math.random() * calls.length)];
    while (one.issue && one.issue.split(" ")[0] === "Hidden") {
      one = calls[Math.floor(Math.random() * calls.length)];
    }
    setOneCall(one);
    setConversation([one.org]);
  };

  const buttonText = () => {
    switch (conversation.length) {
      case 0:
        return "New Call";
      case 4:
        return "Next Call";
      default:
        return "Next";
    }
  };

  return (
    <div className="App">
      <h1>
        Midnight Info NYC{" "}
        <span className="tooltip">
          <span className="tooltip-icon">ℹ️</span>
          <div className="tooltip-container">
            <div className="tooltip-content">
              As of March 9th, 2026, over 400 million calls had been made to NYC's 311 service. This is a visualization of random calls that I made using NYC OpenData's <a href="https://data.cityofnewyork.us/Social-Services/NYC-311-Data/jrb2-thup/about_data">311 API</a>.
              <br />
              <br />
              You're welcome to look at the <a href="https://github.com/crymall/midnight_info">source</a>, but I wrote this ages ago, so it's pretty messy.
              <br />
              <br />
              Hit me up on my <a href="https://reedgaines.com/">personal website</a> if you're interested in who I am and what I do.
            </div>
          </div>
        </span>
      </h1>
      <div className="dialogue-box">
        <div className="chatroom">
          {conversation.map((line, i) => {
            if (i === 0) {
              return (
                <div key={i} className="dialogue-item-1">
                  <p>hello, this is {line.toLowerCase()}, how can we help?</p>
                </div>
              );
            }
            return (
              <div key={i} className={`dialogue-item-${(i % 2) + 1}`}>
                <p>{line}</p>
              </div>
            );
          })}
        </div>
        <button className="the-button" onClick={start}>
          {buttonText()}
        </button>
      </div>
    </div>
  );
};

export default App;

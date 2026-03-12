export const nextLine = (call, conversation) => {
  let lastLines = [
    "okay, thanks",
    "thank you!",
    "uh... well, ok",
    "um, not what I was expecting, but thanks",
    "cool, thanks",
    "is that it?",
  ];
  let infoArr = [
    "sure, sending the info now",
    "I've got you, here's the info...",
    "I'm not sure, but here's what I got...",
    "maybe this is what you're looking for? {attachment}",
  ];
  let serviceArr = [
    "alright, we're on the case.",
    "sending someone over now",
    "we'll follow up with you on this",
  ];

  if (conversation.length === 1) {
    let issue;
    let issueArr = call.issue.toLowerCase().split(" ");
    const firstWord = issueArr[0];
    const fullIssue = issueArr.join(" ");

    switch (firstWord) {
      case "report":
      case "request":
      case "apply":
      case "learn":
      case "locate":
        issue = "hi, I'd like to " + fullIssue;
        break;
      case "complaint":
        issue = "hey, I need to file a " + fullIssue;
        break;
      case "get":
      case "contact":
        issue = "hey, I want to " + fullIssue;
        break;
      case "requires":
        issue = "hello, I need " + issueArr.slice(1).join(" ");
        break;
      case "tips":
      case "information":
        issue = "can I have some " + fullIssue;
        break;
      case "find":
      case "lookup":
        issue = "hey, I need to " + fullIssue;
        break;
      case "status":
      case "location":
        issue = "hey, I need the " + fullIssue;
        break;
      case "complaints":
        issue = "hey, I've got a few " + fullIssue;
        break;
      default:
        issue = fullIssue;
    }
    return issue;
  } else if (conversation.length === 2) {
    let reso;

    if (call.resolution === "Information Provided") {
      reso = infoArr[Math.floor(Math.random() * infoArr.length)];
    } else {
      let resoArr = call.resolution.toLowerCase().split(" ");
      const firstWord = resoArr[0];

      switch (firstWord) {
        case "transfer":
        case "internal":
        case "referral":
          reso = "let me transfer you to another department.";
          break;
        case "routed":
          reso = "check our website for information on that";
          break;
        case "csms":
        case "universal":
          reso = serviceArr[Math.floor(Math.random() * serviceArr.length)];
          break;
        case "hot":
          reso = "alright, I'm transfering you to 911!";
          break;
        default:
          reso = resoArr.join(" ");
      }
    }
    return reso;
  } else {
    return lastLines[Math.floor(Math.random() * lastLines.length)];
  }
};

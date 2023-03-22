const firebaseConfig = {
  apiKey: "AIzaSyDyxGC9d2Q-sVJz8Qq7k6hOmF4ldR-dckQ",
  authDomain: "leetassist.firebaseapp.com",
  projectId: "leetassist",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const heading = document.getElementById("heading");
const loginButton = document.getElementById("loginButton");
// for Prerequisites
const getPrerequisitesButton = document.getElementById(
  "getPrerequisitesButton"
);
const prerequisitesContainer = document.getElementById(
  "prerequisitesContainer"
);
const addPrerequisitesButton = document.getElementById(
  "addPrerequisitesButton"
);
const paragraph_Prerequisites = document.getElementById(
  "paragraph_Prerequisites"
);

// for hints
const getHintButton = document.getElementById("getHintButton");
const hintContainer = document.getElementById("hintContainer");
const addHintButton = document.getElementById("addHintButton");
const paragraph = document.getElementById("paragraph");

function hideElements() {
  loginButton.style.display = "none";
  getHintButton.style.display = "none";
  hintContainer.style.display = "none";
  addHintButton.style.display = "none";
  getPrerequisitesButton.style.display = "none";
  prerequisitesContainer.style.display = "none";
  addPrerequisitesButton.style.display = "none";
  paragraph_Prerequisites.style.display = "none";
}

function showLogin() {
  hideElements();
  heading.textContent = "LeetAssist";
  paragraph.textContent =
    "Please login to use this extension, Don't worry it is just an anonymous login we don't ask for any info.";

  loginButton.style.display = "block";
}

function showGetHint() {
  // hideElements();
  loginButton.style.display = "none";
  addHintButton.style.display = "none";

  heading.textContent = "LeetAssist";
  hintContainer.style.display = "block";
  getHintButton.style.display = "block";
  paragraph.textContent = "Click the 'Get Hint' button to view hints";
  hintContainer.textContent = "";
}

function showGetPrerequisite() {
  // hideElements();
  loginButton.style.display = "none";
  addPrerequisitesButton.style.display = "none";
  paragraph_Prerequisites.style.display = "block";

  heading.textContent = "LeetAssist";
  prerequisitesContainer.style.display = "block";
  getPrerequisitesButton.style.display = "block";
  paragraph_Prerequisites.textContent =
    "Click the 'Get Prerequisites' button to view Prerequisites Questions";
  prerequisitesContainer.textContent = "";
}

function showHint(hints) {
  // hideElements();
  loginButton.style.display = "none";
  getHintButton.style.display = "none";

  heading.textContent = "LeetAssist";
  hintContainer.style.display = "block";
  addHintButton.style.display = "block";
  paragraph.textContent =
    "If you would like to contribute, you can add a hint.";
  console.log(hints);
  if (hints && hints.length > 0) {
    hints.forEach((hint, index) => {
      let oneup = false,
        onedown = false;
      const hintDiv = document.createElement("div");
      hintDiv.classList.add("hint");

      const hintNumber = document.createElement("span");
      hintNumber.classList.add("hint-number");
      hintNumber.textContent = `${index + 1}.`;

      const hintText = document.createElement("span");
      hintText.classList.add("hint-text");
      hintText.textContent = hint.text;

      const hintScore = document.createElement("span");
      hintScore.classList.add("hint-score");
      hintScore.textContent = hint.score;

      const upButton = document.createElement("button");
      upButton.classList.add("hint-up-button");
      upButton.textContent = "+";
      upButton.addEventListener("click", () => {
        updateHintScore(hint, parseInt(hint.score) + 1);
        if (!oneup) {
          hintScore.textContent = parseInt(hint.score) + 1;
          upButton.disabled = true;
          oneup = true;
        }
      });

      const downButton = document.createElement("button");
      downButton.classList.add("hint-down-button");
      downButton.textContent = "-";
      downButton.addEventListener("click", () => {
        updateHintScore(hint, parseInt(hint.score) - 1);
        if (!onedown) {
          hintScore.textContent = parseInt(hint.score) - 1;
          downButton.disabled = true;
          onedown = true;
        }
      });

      hintDiv.appendChild(hintNumber);
      hintDiv.appendChild(hintText);
      hintDiv.appendChild(hintScore);
      hintDiv.appendChild(upButton);
      hintDiv.appendChild(downButton);

      hintContainer.appendChild(hintDiv);
    });
  } else {
    hintContainer.textContent = "Sorry, no hint available.";
  }
}

function showPrerequisite(prerequisites) {
  // hideElements();
  loginButton.style.display = "none";
  getPrerequisitesButton.style.display = "none";

  heading.textContent = "LeetAssist";
  prerequisitesContainer.style.display = "block";
  addPrerequisitesButton.style.display = "block";
  paragraph_Prerequisites.textContent =
    "If you would like to contribute, you can add a Prerequisite Ques.";
  console.log(prerequisites);
  if (prerequisites && prerequisites.length > 0) {
    prerequisites.forEach((Prerequisite, index) => {
      let oneup = false,
        onedown = false;
      const prerequisitediv = document.createElement("div");
      prerequisitediv.classList.add("prerequisite");

      const prerequisiteNumber = document.createElement("span");
      prerequisiteNumber.classList.add("prerequisite-number");
      prerequisiteNumber.textContent = `${index + 1}.`;

      const prerequisiteText = document.createElement("span");
      prerequisiteText.classList.add("prerequisite-text");
      prerequisiteText.textContent = Prerequisite.text;

      const prerequisiteScore = document.createElement("span");
      prerequisiteScore.classList.add("prerequisite-score");
      prerequisiteScore.textContent = Prerequisite.score;

      const upButton = document.createElement("button");
      upButton.classList.add("prerequisite-up-button");
      upButton.textContent = "+";
      upButton.addEventListener("click", () => {
        updatePrerequisiteScore(Prerequisite, parseInt(Prerequisite.score) + 1);
        if (!oneup) {
          prerequisiteScore.textContent = parseInt(Prerequisite.score) + 1;
          upButton.disabled = true;
          oneup = true;
        }
      });

      const downButton = document.createElement("button");
      downButton.classList.add("prerequisite-down-button");
      downButton.textContent = "-";
      downButton.addEventListener("click", () => {
        updatePrerequisiteScore(Prerequisite, parseInt(Prerequisite.score) - 1);
        if (!onedown) {
          prerequisiteScore.textContent = parseInt(Prerequisite.score) - 1;
          downButton.disabled = true;
          onedown = true;
        }
      });

      prerequisitediv.appendChild(prerequisiteNumber);
      prerequisitediv.appendChild(prerequisiteText);
      prerequisitediv.appendChild(prerequisiteScore);
      prerequisitediv.appendChild(upButton);
      prerequisitediv.appendChild(downButton);

      prerequisitesContainer.appendChild(prerequisitediv);
    });
  } else {
    prerequisitesContainer.textContent = "Sorry, no Prerequisite available.";
  }
}

function updatePrerequisiteScore(prerequisite, newScore) {
  const tabsQuery = { active: true, currentWindow: true };
  chrome.tabs.query(tabsQuery, (tabs) => {
    const url = tabs[0].url;
    console.log(url);

    const regex = /\/problems\/(.+)\//;
    const match = url.match(regex);
    const problemId = match ? match[1] : null;
    console.log(problemId);

    const prerequisiteRef = db.collection("prerequisites").doc(problemId);
    const updatedprerequisites = prerequisiteRef
      .update({
        prerequisites: firebase.firestore.FieldValue.arrayRemove(prerequisite),
      })
      .then(() => {
        prerequisite.score = newScore;
        const updatedprerequisites = prerequisiteRef.update({
          prerequisites: firebase.firestore.FieldValue.arrayUnion(prerequisite),
        });
        console.log(updatedprerequisites);
      });
  });
}

function updateHintScore(hint, newScore) {
  const tabsQuery = { active: true, currentWindow: true };
  chrome.tabs.query(tabsQuery, (tabs) => {
    const url = tabs[0].url;
    console.log(url);

    const regex = /\/problems\/(.+)\//;
    const match = url.match(regex);
    const problemId = match ? match[1] : null;
    console.log(problemId);

    const hintRef = db.collection("hints").doc(problemId);
    const updatedHints = hintRef
      .update({
        hints: firebase.firestore.FieldValue.arrayRemove(hint),
      })
      .then(() => {
        hint.score = newScore;
        const updatedHints = hintRef.update({
          hints: firebase.firestore.FieldValue.arrayUnion(hint),
        });
        console.log(updatedHints);
      });
  });
}

function addHint() {
  const hintText = prompt("Enter hint:");
  if (hintText) {
    const userId = auth.currentUser.uid;
    const hint = {
      text: hintText,
      score: 0,
      userId: userId,
    };

    const tabsQuery = { active: true, currentWindow: true };
    chrome.tabs.query(tabsQuery, (tabs) => {
      const url = tabs[0].url;
      console.log(url);

      const regex = /\/problems\/(.+)\//;
      const match = url.match(regex);
      const problemId = match ? match[1] : null;
      console.log(problemId);
      const hintRef = db.collection("hints").doc(problemId);
      hintRef
        .update({
          hints: firebase.firestore.FieldValue.arrayUnion(hint),
        })
        .then(() => {
          alert("Hint added successfully!");
        })
        .catch((error) => {
          console.error("Error adding hint:", error);
        });
    });
  }
}

function getProblemIdFromUrl() {
  const tabsQuery = { active: true, currentWindow: true };
  chrome.tabs.query(tabsQuery, (tabs) => {
    const url = tabs[0].url;
    console.log(url);

    const regex = /\/problems\/(.+)\//;
    const match = url.match(regex);
    const problemId = match ? match[1] : null;
    console.log(problemId);
    return problemId;
  });
}

auth.onAuthStateChanged((user) => {
  if (user) {
    showGetHint();
    showGetPrerequisite();

    getHintButton.addEventListener("click", () => {
      // const problemId = getProblemIdFromUrl();
      const tabsQuery = { active: true, currentWindow: true };
      chrome.tabs.query(tabsQuery, (tabs) => {
        const url = tabs[0].url;
        console.log(url);

        const regex = /\/problems\/(.+)\//;
        const match = url.match(regex);
        const problemId = match ? match[1] : null;
        console.log(problemId);
        // return problemId;
        if (problemId) {
          const hintRef = db.collection("hints").doc(problemId);
          console.log(problemId);
          hintRef
            .get()
            .then((doc) => {
              console.log(doc);
              if (doc.exists) {
                console.log(doc);
                const hints = doc.data().hints;
                showHint(hints);
              } else {
                showHint(null);
              }
            })
            .catch((error) => {
              console.error("Error getting hint:", error);
            });
        } else {
          hintContainer.innerHTML =
            "Please navigate to a LeetCode problem page to use this extension.";
        }
      });
    });

    addHintButton.addEventListener("click", () => {
      addHint();
    });

    getPrerequisitesButton.addEventListener("click", () => {
      // const problemId = getProblemIdFromUrl();
      const tabsQuery = { active: true, currentWindow: true };
      chrome.tabs.query(tabsQuery, (tabs) => {
        const url = tabs[0].url;
        console.log(url);

        const regex = /\/problems\/(.+)\//;
        const match = url.match(regex);
        const problemId = match ? match[1] : null;
        console.log(problemId);
        // return problemId;
        if (problemId) {
          const hintRef = db.collection("prerequisites").doc(problemId);
          console.log(problemId);
          hintRef
            .get()
            .then((doc) => {
              console.log(doc);
              if (doc.exists) {
                console.log(doc);
                const prerequisites = doc.data().prerequisites;
                showPrerequisite(prerequisites);
              } else {
                showPrerequisite(null);
              }
            })
            .catch((error) => {
              console.error("Error getting hint:", error);
            });
        } else {
          prerequisitesContainer.innerHTML =
            "Please navigate to a LeetCode problem page to use this extension.";
        }
      });
    });
  } else {
    showLogin();
  }
});

loginButton.addEventListener("click", () => {
  auth
    .signInAnonymously()
    .then(() => {
      console.log("Logged in anonymously");
      // Remove login button from DOM once user logs in
      // loginButton.remove();
      // showGetHint();
    })
    .catch((error) => {
      console.error("Error logging in:", error);
    });
});

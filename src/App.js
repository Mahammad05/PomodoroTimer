import { useState, useEffect } from "react";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [minute, setMinute] = useState(25);
  const [second, setSecond] = useState(0);
  const [isWorking, setIsWorking] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [isEnding, setIsEnding] = useState(false);

  useEffect(() => {
    let timer;

    if (isWorking && minute >= 0 && second >= 0) {
      timer = setInterval(() => {
        if (second > 0) {
          setSecond(second - 1);
        } else if (minute > 0) {
          setMinute(minute - 1);
          setSecond(59);
        } else {
          if (isSession) {
            setMinute(breakLength);
          } else {
            setMinute(sessionLength);
          }
          setSecond(0);
          setIsSession(!isSession);
        }

        if (isWorking && isSession && minute === 0 && second <= 30) {
          setIsEnding(!isEnding);
        } else {
          setIsEnding(false);
        }

        if (minute === 0 && second === 6) {
            const alarm = document.getElementById("alarm");
            alarm.play();
        }

      }, 1000);
    }

    return () => clearInterval(timer);
  }, [
    isWorking,
    isSession,
    minute,
    second,
    breakLength,
    sessionLength,
    isEnding,
  ]);

  const startStop = () => {
    setIsWorking(!isWorking);
  };

  const handleBreakLength = (e) => {
    if (!isWorking) {
      const value = e.target.value;

      switch (value) {
        case "+":
          setBreakLength(breakLength + 1);
          if (!isSession) {
            setMinute(breakLength + 1);
            setSecond(0);
          }
          break;
        case "-":
          if (breakLength > 1) {
            setBreakLength(breakLength - 1);
            if (!isSession) {
              setMinute(breakLength - 1);
              setSecond(0);
            }
          }
          break;
        default:
          break;
      }
    }
  };

  const handleSessionLength = (e) => {
    if (!isWorking) {
      const value = e.target.value;

      switch (value) {
        case "+":
          setSessionLength(sessionLength + 1);
          if (isSession) {
            setMinute(sessionLength + 1);
            setSecond(0);
          }
          break;
        case "-":
          if (sessionLength > 1) {
            setSessionLength(sessionLength - 1);
            if (isSession) {
              setMinute(sessionLength - 1);
              setSecond(0);
            }
          }
          break;
        default:
          break;
      }
    }
  };

  const handleReset = () => {
    setSecond(0);
    setBreakLength(5);
    setSessionLength(25);
    setMinute(25);
    setIsSession(true);
    setIsWorking(false);
    setIsEnding(false);
  };

  return (
    <div className="App">
      <div className="length">
        <div className="length-control">
          <div id="break-label">Break Length</div>
          <button
            onClick={handleBreakLength}
            className="operator"
            id="break-decrement"
            value="-"
          >
            -
          </button>
          <div id="break-length">{breakLength}</div>
          <button
            onClick={handleBreakLength}
            className="operator"
            id="break-increment"
            value="+"
          >
            +
          </button>
        </div>
        <div className="length-control">
          <div id="session-label">Session Length</div>
          <button
            onClick={handleSessionLength}
            className="operator"
            id="session-decrement"
            value="-"
          >
            -
          </button>
          <div id="session-length">{sessionLength}</div>
          <button
            onClick={handleSessionLength}
            className="operator"
            id="session-increment"
            value="+"
          >
            +
          </button>
        </div>
      </div>
      <div className="timer">
        <div className="timer-wrapper">
          <div
            className={`${isSession ? "session" : "break"} ${
              isEnding ? "session-ending" : ""
            }`}
            id="timer-label"
          >
            {isSession ? "Session" : "Break"}
          </div>
          <div
            className={`${isSession ? "session-time" : "break-time"} ${
              isEnding ? "is-ending" : ""
            }`}
            id="time-left"
          >{`${minute.toString().padStart(2, "0")}:${second
            .toString()
            .padStart(2, "0")}`}</div>
        </div>
        <div className="timer-control">
          <button onClick={startStop} id="start_stop">
            {isWorking ? "Stop" : "Start"}
          </button>
          <button id="reset">
            <i className="fa fa-rotate-right" onClick={handleReset}></i>
          </button>
        </div>
      </div>
      <audio
        id="alarm"
        src={process.env.PUBLIC_URL + '/sound/beep.mp3'} type="audio/mp3"
      ></audio>
    </div>
  );
}

export default App;

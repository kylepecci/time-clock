import React from "react";
import { Button } from "antd";
import "./timer.css";

function Timer(props) {
  let intervalId = null;
  let totalTime = 0;
  let currTime = 0;
  let allIntervals = [];

  function formatTime(time) {
    let temp = time.toISOString().substr(11, 8);
    if (temp.charAt(0) === "0") {
      temp = temp.substr(1);
    }
    return temp;
  }

  function addRow(obj) {
    let row = document.getElementById("time-table").insertRow();
    console.log(obj.start.toISOString().substr(11, 8));
    row.insertCell(0).innerHTML = formatTime(obj.start);
    row.insertCell(1).innerHTML = formatTime(obj.end);
    row.insertCell(2).innerHTML = obj.diff;
    row.insertCell(3).innerHTML = obj.total;
  }

  function startTimer() {
    currTime = 0;
    document.getElementById("current-time-text").innerHTML = "00:00:00";
    intervalId = setInterval(() => {
      totalTime++;
      currTime++;
      let totText = new Date(totalTime * 1000).toISOString().substr(11, 8);
      let curText = new Date(currTime * 1000).toISOString().substr(11, 8);
      document.getElementById("total-time-text").innerHTML = totText;
      document.getElementById("current-time-text").innerHTML = curText;
    }, 1000);
  }

  function endTimer() {
    let now = new Date();
    let tempStart = new Date(now - currTime * 1000);
    let temp = {
      key: allIntervals.length,
      start: tempStart,
      end: now,
      diff: ((currTime / 3600) * 100).toFixed(2),
      total: totalTime,
    };
    clearInterval(intervalId);
    allIntervals = [...allIntervals, temp];
    addRow(temp);
  }

  return (
    <div id="timerContainer">
      <div id="timer-total" className="timer">
        <p className="time-label">Total:</p>
        <div id="total-time-text" className="time-text">
          00:00:00
        </div>
      </div>
      <div id="timer-current" className="timer">
        <p className="time-label">Current:</p>
        <div id="current-time-text" className="time-text">
          00:00:00
        </div>
      </div>

      <div id="timer-buttons">
        <Button
          id="start"
          className="control-buttons"
          type="primary"
          onClick={startTimer}
        >
          Start
        </Button>
        <Button
          id="stop"
          className="control-buttons"
          type="default"
          onClick={endTimer}
        >
          Stop
        </Button>
        {/* <Button id="rest" class="control-buttons" type="primary">
          Reset
        </Button> */}
      </div>
      <div>
        <table>
          <tbody id="time-table">
            <tr>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Elapsed (hr)</th>
              <th>Running Total</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Timer;

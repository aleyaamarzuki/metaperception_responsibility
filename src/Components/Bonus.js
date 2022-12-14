import React from "react";
import style from "./style/taskStyle.module.css";
import * as utils from "./utils.js";
import withRouter from "./withRouter.js";
import * as InsightSlider from "./DrawInsightSlider.js";
import astrodude from "./img/astronaut.png";

//import { DATABASE_URL } from "./config";

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
// THIS CODES THE LAST PAGE BEFORE QUESTIONNAIRES
// 1) Insight whether the first task had impact on second task
// 2) Amount of bonus earned for both tasks
// 3) Feedback box

class Bonus extends React.Component {
  //////////////////////////////////////////////////////////////////////////////////////////////
  // CONSTRUCTOR
  constructor(props) {
    super(props);

    //when deug
    const userID = 100;
    const date = 100;
    const startTime = 100;

    // const userID = this.props.state.userID;
    // const date = this.props.state.date;
    // const startTime = this.props.state.startTime;

    // var initialValue = utils.randomInt(6, 8);

    var totalBonus = 1.3;

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
    // SET STATES
    this.state = {
      // demo paramters
      userID: userID,
      date: date,
      startTime: startTime,
      astrodude: astrodude,
      ratingInitial: 3,
      feedbackL: [],
      // screen parameters
      instructScreen: true,
      instructNum: 1,
      totalBonus: totalBonus,
      debug: false,
    };

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    /* prevents page from going down when space bar is hit .*/
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 32 && e.target === document.body) {
        e.preventDefault();
      }
    });

    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////

    this.handleInstruct = this.handleInstruct.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //////////////////////////////////////////////////////////////////////////////////////////////
    //End constructor props
  }

  //for the feedback box
  handleChange(event) {
    this.setState({ feedback: event.target.value });
  }

  // This handles instruction screen within the component USING KEYBOARD
  handleInstruct(keyPressed) {
    var curInstructNum = this.state.instructNum;
    var whichButton = keyPressed;

    if (whichButton === 3 && curInstructNum === 1) {
      this.setState({ instructNum: curInstructNum + 1 });
    } else if (whichButton === 3 && curInstructNum === 2) {
      setTimeout(
        function () {
          this.redirectToNextTask();
        }.bind(this),
        0
      );
    }
  }

  // handle key keyPressed
  _handleInstructKey = (event) => {
    var keyPressed;

    switch (event.keyCode) {
      case 32:
        //    this is spacebar
        keyPressed = 3;
        this.handleInstruct(keyPressed);
        break;
      default:
    }
  };

  handleCallbackConf(callBackValue) {
    this.setState({ confValue: callBackValue });
  }

  handleSubmit(event) {
    var userID = this.state.userID;

    let feedback = {
      userID: this.state.userID,
      date: this.state.date,
      startTime: this.state.startTime,
      feedback: this.state.feedback,
    };

    //  try {
    //   fetch(`${DATABASE_URL}/feedback/` + userID, {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //    },
    //    body: JSON.stringify(quizbehaviour),
    //  });
    // } catch (e) {
    //    console.log("Cant post?");
    // }

    alert("Thanks for your feedback!");
    event.preventDefault();
  }

  // To ask them for the valence rating of the noises
  // before we start the task
  instructText(instructNum) {
    let instruct_text1 = (
      <div>
        Well done on completing both tasks!
        <br />
        <br />
        How much did you feel that your confidence in the first task influenced
        your confidence on the second task?
        <br />
        <br />
        <br />
        <br />
        <center>
          <InsightSlider.InsightSlider
            callBackValue={this.handleCallbackConf.bind(this)}
            initialValue={this.state.ratingInitial}
          />
          <br />
          <br />
          <center></center>
          Press the [SPACEBAR] to continue.
          <br /> <br />
          You will need to have moved the slider to continue.
        </center>
        <span className={style.astro}>
          <img src={this.state.astrodude} width={280} alt="astrodude" />
        </span>
      </div>
    );

    let instruct_text2 = (
      <div>
        <span>
          From the two tasks, you earned a bonus of £{this.state.totalBonus}.
          <br />
          <br />
          We would love to hear any comments you have about the tasks you have
          completed.
          <br /> <br />
          If you have any, please fill in the box below and click submit.
          <br />
          <br />
          <center>
            <form onSubmit={this.handleSubmit}>
              <label>
                <textarea
                  placeholder=" Were the task instructions clear? Did you encounter any problems?"
                  value={this.state.feedback}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <br />
              <input type="submit" value="Submit" />
            </form>
          </center>
          <br /> <br />
          <center>Press the [SPACEBAR] to continue.</center>
        </span>
      </div>
    );

    switch (instructNum) {
      case 1:
        return <div>{instruct_text1}</div>;
      case 2:
        return <div>{instruct_text2}</div>;
      default:
    }
  }

  redirectToNextTask() {
    this.props.navigate("/Questionnaires", {
      state: {
        userID: this.state.userID,
        date: this.state.date,
        startTime: this.state.startTime,
      },
    });

    console.log("UserID is: " + this.state.userID);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  ///////////////////////////////////////////////////////////////
  render() {
    let text;
    if (this.state.debug === false) {
      if (this.state.instructScreen === true) {
        document.addEventListener("keydown", this._handleInstructKey);
        text = <div> {this.instructText(this.state.instructNum)}</div>;
      }
    } else if (this.state.debug === true) {
      text = (
        <div>
          <p>
            <span>DEBUG MODE</span>
            <br />
            <span>
              Press [<strong>SPACEBAR</strong>] to skip to next section.
            </span>
          </p>
        </div>
      );
    }

    return (
      <div className={style.bg}>
        <div className={style.textFrame}>
          <div className={style.fontStyle}>{text}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(Bonus);
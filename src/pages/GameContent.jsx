import React from 'react';
import '../styles/GameContentStyle.css';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

class GameContent extends React.Component {
  state = {
    isTokenInvalid: false,
    questions: [],
    questionId: 0,
    answers: [],
    isClicked: false,
    willRedirect: false,
    time: 30,
  };

  componentDidMount() {
    this.getQuestions();
  }

  componentDidUpdate() {
    this.timer();
  }

  getAnswers() {
    const mn = 0.5;
    const { questionId, questions } = this.state;
    const correctAnswer = questions[questionId].correct_answer;
    const incorrectAnswer = questions[questionId].incorrect_answers;
    const answers = [...incorrectAnswer, correctAnswer].sort(() => Math.random() - mn);
    this.setState({ answers });
  }

  async getQuestions() {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    this.setState(
      { questions: data.results },
      () => {
        this.tokenValidation(data);
      },
    );
  }

  timer() {
    const { time } = this.state;
    const mN = 1000;
    this.interval = setTimeout(() => this.setState({ time: time - 1 }), mN);
    // return time > 0 && setTimeout(() => this.setState({ time: time - 1 }), mN);
  }

  tokenValidation(data) {
    const ik = 3;
    if (data.response_code === ik) {
      localStorage.removeItem('token');
      this.setState({ isTokenInvalid: true });
    } else {
      this.setState({ isTokenInvalid: false });
      this.getAnswers();
    }
  }

  handleClick = () => {
    this.setState({ isClicked: true });
    clearTimeout(this.interval);
    console.log(this.interval);
  };

  // timeCount() {
  //   const elem = document.getElementById('Timer');

  //   const timerId = setInterval(countdown, 1000);

  //   function countdown() {
  //     const timeSeconds = 30;
  //     if (timeSeconds === 0) {
  //       clearTimeout(timerId);
  //       doSomething();
  //     } else {
  //       elem.innerHTML = `${timeLeft} seconds remaining`;
  //       timeSeconds--;
  //     }
  //   }
  // }

  render() {
    const { isTokenInvalid,
      questions,
      questionId,
      answers,
      isClicked,
      willRedirect,
      time } = this.state;

    const magicNumber = -1;

    let answerId = magicNumber;

    return (
      <>
        {isTokenInvalid && <Redirect to="/" />}
        {willRedirect && <Redirect to="/feedback" />}
        {
          questions.length !== 0 && (
            <div>
              <div
                data-testid="question-category"
              >
                {questions[questionId].category}
              </div>

              <div data-testid="question-text">
                {questions[questionId].question}
              </div>

              <div data-testid="answer-options">
                {answers.map((ans, i) => {
                  if (ans !== questions[questionId].correct_answer) {
                    answerId += 1;
                    return (
                      <button
                        type="button"
                        key={ i }
                        data-testid={ `wrong-answer${answerId}` }
                        onClick={ this.handleClick }
                        className={ isClicked ? 'incorrectStyle' : '' }
                        disabled={ !time }
                      >
                        {ans}
                      </button>
                    );
                  }
                  return (
                    <button
                      type="button"
                      onClick={ this.handleClick }
                      key={ i }
                      data-testid="correct-answer"
                      className={ isClicked ? 'correctStyle' : '' }
                      disabled={ !time }
                    >
                      {ans}
                    </button>
                  );
                })}
              </div>

              <p>{`TIMER: ${time}`}</p>

              { isClicked && (
                <button
                  onClick={ () => {
                    const four = 4;
                    if (questionId < four) {
                      this.setState({ questionId: questionId + 1,
                        isClicked: false }, () => this.getAnswers());
                    } else {
                      this.setState({ willRedirect: true });
                    }
                  } }
                  data-testid="btn-next"
                  type="button"
                >
                  Next
                </button>)}

            </div>

          )
        }
      </>
    );
  }
}

export default GameContent;

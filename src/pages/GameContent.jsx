import React from 'react';
import '../styles/GameContentStyle.css';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sendPlayerScore from '../redux/actions/sendPlayerScore';

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

  handleClickIncorrect = () => {
    this.setState({ isClicked: true });
    clearInterval(this.interval);
  };

  handleClickCorrect = () => {
    const { dispatch } = this.props;
    this.setState({ isClicked: true });
    clearInterval(this.interval);
    const { questions, questionId, time } = this.state;
    const { difficulty } = questions[questionId];
    const ten = 10;
    if (difficulty === 'hard') {
      const three = 3;
      const points = ten + (time * three);
      dispatch(sendPlayerScore(points));
    } else if (difficulty === 'medium') {
      const two = 2;
      const points = ten + (time * two);
      dispatch(sendPlayerScore(points));
    } else {
      const one = 1;
      const points = ten + (time * one);
      dispatch(sendPlayerScore(points));
    }
  };

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

  timer() {
    const mN = 1000;
    this.interval = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.time > 0) {
          return { time: prevState.time - 1 };
        }
        clearInterval(this.interval);
        this.setState({ isClicked: true });
      });
    }, mN);
  }

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
                        onClick={ this.handleClickIncorrect }
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
                      onClick={ this.handleClickCorrect }
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
                    this.setState(({ time: 30 }));
                    this.timer();
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

GameContent.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(GameContent);

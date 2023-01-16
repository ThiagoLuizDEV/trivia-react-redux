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
  };

  componentDidMount() {
    this.getQuestions();
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

  render() {
    const { isTokenInvalid,
      questions,
      questionId,
      answers,
      isClicked,
      willRedirect } = this.state;

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
                        onClick={ () => this.setState({ isClicked: true }) }
                        className={ isClicked ? 'incorrectStyle' : '' }
                      >
                        {ans}
                      </button>
                    );
                  }
                  return (
                    <button
                      type="button"
                      onClick={ () => this.setState({ isClicked: true }) }
                      key={ i }
                      data-testid="correct-answer"
                      className={ isClicked ? 'correctStyle' : '' }
                    >
                      {ans}
                    </button>
                  );
                })}
              </div>

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

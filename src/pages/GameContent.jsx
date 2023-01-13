import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

class GameContent extends React.Component {
  state = {
    isTokenInvalid: false,
    questions: [],
    questionId: 0,
    answers: [],
  };

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    this.tokenValidation(data);
    this.setState({ questions: data.results }, () => this.getAnswers());
  }

  getAnswers() {
    const mn = 0.5;
    const { questionId, questions } = this.state;
    const correctAnswer = questions[questionId].correct_answer;
    const incorrectAnswer = questions[questionId].incorrect_answers;
    const answers = [...incorrectAnswer, correctAnswer].sort(() => Math.random() - mn);
    this.setState({ answers });
  }

  tokenValidation(data) {
    const errorCode = 3;
    if (data.response_code === errorCode) {
      localStorage.removeItem('token');
      this.setState({ isTokenInvalid: true });
    } else {
      this.setState({ isTokenInvalid: false });
    }
  }

  render() {
    const { isTokenInvalid, questions, questionId, answers } = this.state;
    return (
      <>
        {isTokenInvalid && <Redirect to="/" />}
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
              {answers.map((ans, i) => (
                <div
                  key={ i }
                  data-testid={
                    ans === questions[questionId].correct_answer ? 'correct-answer'
                      : `wrong-answear${i}`
                  }
                >
                  {ans}

                </div>
              ))}
            </div>
          )

        }
      </>
    );
  }
}

export default GameContent;

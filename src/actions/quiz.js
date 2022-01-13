import api from '../utils/api';
import { quizError } from './errors';

// Quiz Action
export const CHOOSE_AN_ANSWER = 'CHOOSE_AN_ANSWER';
export const SWITCH_TO_NEXT_QUESTION = 'SWITCH_TO_NEXT_QUESTION';

export const chooseAnAnswser = (updatedAnswerID) => ({
  type: CHOOSE_AN_ANSWER,
  updatedAnswerID,
});

export const switchToNextQuestion = (currentQuestion) => ({
  type: SWITCH_TO_NEXT_QUESTION,
  currentQuestion,
});

// -------------- Chargement d'une question et de ses réponses --------------
// On enregistre dans le store les questions et les réponses correspondants à la question actuelle
export const LOAD_QUESTION_AND_ANSWERS = 'LOAD_QUESTION_AND_ANSWERS';
export const loadQuestionAndAnswers = (question, answers) => ({
  type: LOAD_QUESTION_AND_ANSWERS,
  question,
  answers,
});
// Grâce à Redux-Thunk, on appelle l'API et on enregistre les données
// dans le store grâce à l'action LOAD_QUESTION_AND_ANSWERS
export const fetchQuestionAndAnswers = (questionId, answers) => (dispatch) => {
  api.post('/quiz/', {
    questionToAsk: questionId,
    answers,
  })
    .then((response) => {
      const { question, answers: newAnswers } = response.data;
      // On rajoute à action.answers une propriété booléenne "selected"
      // pour savoir si l'utilisateur a déjà répondu à la question
      const controlledAnswers = newAnswers.map((answer) => ({
        ...answer,
        selected: false,
      }));
      dispatch(loadQuestionAndAnswers(question, controlledAnswers));
    })
    .catch((error) => {
      const errorMessage = error.response.data.error;
      dispatch(quizError(errorMessage));
    });
};

// -------------- Chargement du nombre des questions --------------
// On enregistre dans le store le nombre de questions
export const QUIZ_INIT = 'QUIZ_INIT';
// On passe le nbOfQuestions à 1 dans le cas où on réinitialise sans appel à l'API
export const quizInit = (nbOfQuestions = 1) => ({
  type: QUIZ_INIT,
  nbOfQuestions,
});
// Grâce à Redux-Thunk, on appelle l'API et on enregistre le nombre de questions
// dans le store grâce à l'action LOAD_QUESTIONS_NUMBER
export const loadQuestionsNumber = () => (dispatch) => {
  api.get('questions/')
    .then((response) => {
      const { data: nbOfQuestions } = response;
      dispatch(quizInit(nbOfQuestions));
    })
    .catch((error) => {
      const errorMessage = error.response.data.error;
      dispatch(quizError(errorMessage));
    });
};

// -------------- Chargement des réponses --------------
// On enregistre dans le store les ids TMDB des résultats du quiz et on nettoie le state
export const END_QUIZ = 'END_QUIZ';
export const endQuiz = (tmdbIDs) => ({
  type: END_QUIZ,
  tmdbIDs,
});

// Si l'utilisateur le décide, on retire les réponses qu'il a déjà vues.
export const EDIT_QUIZ_ANSWERS = 'EDIT_QUIZ_ANSWERS';
export const editQuizAnswers = (tmdbIDs) => ({
  type: EDIT_QUIZ_ANSWERS,
  tmdbIDs,
});

// Grâce à Redux-Thunk, on appelle l'API TMDB et on enregistre les réponses
// dans le store grâce à l'action END_QUIZ
export const fetchQuizResults = (tags) => (dispatch) => {
  api.get('/searchmovies/', {
    params: tags,
  })
    .then((response) => {
      const { data: tmdbIDs } = response;
      dispatch(endQuiz(tmdbIDs));
    })
    .catch((error) => {
      const errorMessage = error.response.data.error;
      dispatch(quizError(errorMessage));
    });
};
// reset quiz (en test)
export const RESET_QUIZ = 'RESET_QUIZ';
export const resetQuiz = () => ({
  type: RESET_QUIZ,
});

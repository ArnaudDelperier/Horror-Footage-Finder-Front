import {
  CHOOSE_AN_ANSWER, SWITCH_TO_NEXT_QUESTION,
  LOAD_QUESTION_AND_ANSWERS, QUIZ_INIT,
  END_QUIZ, RESET_QUIZ,
} from '../actions/quiz';

import {
  QUIZ_ERROR,
} from '../actions/errors';

export const initialState = {
  isPlaying: false,
  // Intitulé de la question en cours (envoyée par l'API)
  question: {},
  // Etape du quiz
  currentQuestion: 1,
  // Tableau des réponses déjà prononcées par l'utilisateur
  savedAnswers: {},
  // Tableau des réponses à la question en cours (envoyées par l'API)
  currentAnswers: [],
  numberOfQuestions: 1,
  numberOfAnswers: 0,
  quizCompleted: false,
  errorAPI: {
    error: false,
    errorMessage: '',
  },
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUIZ_ERROR: {
      return {
        ...state,
        errorAPI: {
          error: true,
          errorMessage: action.errorMessage,
        },
      };
    }

    case CHOOSE_AN_ANSWER: {
    // On mappe sur les réponses du state pour retourner
    // les réponses avec la sélection de l'utilisateur suivant l'id de l'élément
    // passé en paramètre
      const updatedAnswers = state.currentAnswers.map((answer) => {
        // Si l'ID matche avec l'élément de la liste, on inverse sa propriété selected
        if (answer.id === action.updatedAnswerID) {
          return { ...answer, selected: !answer.selected };
        }
        // Sinon, on retourne l'élément de la liste brut
        return answer;
      });

      return {
        ...state,
        currentAnswers: updatedAnswers,
      };
    }

    case LOAD_QUESTION_AND_ANSWERS:
      return {
        ...state,
        question: action.question,
        currentAnswers: action.answers,
        numberOfAnswers: action.answers.length,
      };

    case QUIZ_INIT:
      return {
        ...initialState,
        isPlaying: true,
        numberOfQuestions: action.nbOfQuestions,
      };

    case SWITCH_TO_NEXT_QUESTION: {
      let answers;
      // On garde uniquement les élements selectionés
      answers = state.currentAnswers.filter((answer) => answer.selected === true);
      // Si aucune réponse n'est sélectionnée, on les sélectionne toutes
      if (answers.length === 0) {
        answers = state.currentAnswers.map((answer) => ({ ...answer, selected: true }));
      }

      // On retire les paramètres superflus des tags pour renvoyer seulement leur value
      const cleanedAnswers = answers.map((answer) => answer.value);

      return {
        ...state,
        savedAnswers: {
          ...state.savedAnswers,
          //! A modifier par action.currentQuestion,
          //! mais ça bug si on skip une question, si c'est possible
          [state.question.name]: cleanedAnswers,
          // [action.currentQuestion]: cleanedAnswers,
        },
        currentQuestion: state.currentQuestion + 1,
        numberOfAnswers: 0,
      };
    }

    case END_QUIZ:
      return {
        ...state,
        isPlaying: false,
        currentAnswers: [],
        currentQuestion: 1,
        question: {},
        quizCompleted: true,
      };

    // reset du quizz (action dispatch depuis le MovieButtons)
    case RESET_QUIZ:
      return initialState;

    default:
      return state;
  }
};

export default quizReducer;

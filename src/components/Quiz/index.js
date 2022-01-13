/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Header';
import Footer from '../Footer';

// SCSS
import './Quiz.scss';

// ACTIONS FROM REDUX
import {
  chooseAnAnswser, switchToNextQuestion,
  fetchQuestionAndAnswers, loadQuestionsNumber,
  fetchQuizResults, editQuizAnswers, resetQuiz,
} from '../../actions/quiz';
import { toggleGlitch } from '../../actions/ui';

// COMPONENT IMPORTS
import Button from '../Button';
import Divider from '../Divider';
import Arrow from '../Arrow';
import Error from '../Error';
import Toggle from '../Toggle';
import Glitch from '../Glitch';

// QUIZ COMPONENT
//! Renommer "currentQuestion" en "currentStep" pour clarifier la donnée
export const Quiz = ({
  question, onClickAnswer, onClickNextQuestion,
  currentQuestion, currentAnswers, savedAnswers, getQuestionAndAnswers,
  getNumberOfQuestions, numberOfQuestions,
  numberOfAnswers, getQuizResults, quizCompleted, firstResult,
  error, errorMessage, isLogged, excludeWatched,
  editQuizAnswersExcludingWatched, watched, quizResults, onResetQuiz,
  onToggleGlitch, glitch, toggleAnimations,
}) => {
  // On charge le nombre de questions une fois
  useEffect(() => {
    onToggleGlitch();
    getNumberOfQuestions();

    return () => {
      onResetQuiz();
    };
  }, []);

  // On veut vérifier si tous les éléments contenus dans l'array "watched"
  // sont présents dans l'array "savedAnswers"
  // uniquement quand quizCompleted change de valeur
  // On le met dans un useEffect pour éviter qu'il ne refasse le test à chaque rendu
  const [allResultsAreWatched, setAllResultsAreWatched] = useState(false);
  useEffect(() => {
    // On réinitialise le hook "allResultsAreWatched" au cas où on ait eu "true" à un précédent quiz
    setAllResultsAreWatched(false);
    // On ne lance la logique que si le quiz est terminé
    if (quizCompleted) {
      // On compare les deux tableaux
      const watchedAnswersAreInSavedAnswers = JSON.stringify(watched)
      === JSON.stringify(quizResults);
      // Si tous les éléments de "watched" sont présents dans "savedAnswers",
      // on l'indique dans le hook
      if (watchedAnswersAreInSavedAnswers) {
        setAllResultsAreWatched(true);
      }
    }
  }, [quizCompleted]);

  // Le lien vers le premier film change si on exclue ou non les films déjà vus.
  const [firstResultLink, setFirstResultLink] = useState(null);
  useEffect(() => {
    setFirstResultLink(firstResult);
  }, [firstResult]);
  // Fonction à passer au toggle
  const onClickToggleExclude = () => {
    const excludedQuizResults = quizResults.filter((movieID) => !watched.includes(movieID));
    setFirstResultLink(excludedQuizResults[0]);
  };

  // Grâce à la conjonction des deux logiques ci-dessus, on détermine le rendu à afficher
  const displayExcludeToggle = !allResultsAreWatched
    ? (
      <Toggle
        onClick={onClickToggleExclude}
        name="toggleExcludingWatched"
        textContent="Exclure les films déjà vus"
      />
    ) : (
      <div>Vous avez déjà vu tous les films de ce résultat.</div>
    );

  // A chaque fois que la question change, on relance une requête à l'API
  // qui nous retourne les réponses/tags en fonction des filtres précédents
  useEffect(() => {
    onToggleGlitch();
    // Si la currentQuestion ne dépasse pas le nombre de questions,
    // on charge une question et ses réponses dans le state
    //! A retravailler pour éviter un appel inutile en fin de quiz
    if (numberOfQuestions && (currentQuestion <= numberOfQuestions)) {
      getQuestionAndAnswers(currentQuestion, savedAnswers);
    } else {
      getQuizResults(savedAnswers, excludeWatched);
    }
  }, [currentQuestion, numberOfQuestions]);

  // Si la question ne contient qu'une seule réponse, c'est qu'elle n'a pas besoin
  // d'être posée : on peut directement passer à la prochaine question
  useEffect(() => {
    if (numberOfAnswers === 1) {
      onClickNextQuestion();
    }
  }, [numberOfAnswers]);

  // S'il y a une erreur de réponse API, on s'arrête là et on affiche un message d'erreur :
  if (error) {
    return <Error errorMessage={errorMessage} goBackToHome />;
  }

  // Si tout va bien, on continue :
  // On mappe sur les réponses de l'API pour leur donner forme avec le composant Button
  const answersList = currentAnswers.map((answer) => (
    <Button
      key={answer.id}
      onClick={() => onClickAnswer(answer.id)}
      className="quiz__answers-item"
      selected={answer.selected}
      textContent={answer.description}
      value={answer.value}
    />
  ));

  // A chaque rendu, on compte le nombre de réponses sélectionnées. Suivant ce nombre,
  // le texte de la question change.
  const numberOfSelectedAnswers = currentAnswers.filter((answer) => answer.selected === true);
  const nextQuestionText = numberOfSelectedAnswers.length === 0 ? 'Passer cette question (tout me va)' : 'Question suivante';

  // --------------------- RETURN COMPONENT ---------------------
  // On retourne les données traitées, suivant que l'utilisateur ait complété
  // ou non le quiz (quizCompleted)
  return (
    <>
      {(glitch && toggleAnimations) && <Glitch />}
      <Header />
      <div className="quiz">
        <div className="quiz__question">
          {quizCompleted ? 'Votre found footage n\'attend que vous.' : (
            <>
              {question.title}
              <div className="quiz__help">Vous pouvez sélectionner une ou plusieurs réponses.</div>
            </>
          )}

        </div>
        <div className="quiz__answers">
          {quizCompleted ? 'Cliquez sur le bouton pour voir le résultat.' : answersList}
        </div>

        <Divider />
        <div className="quiz__next-question">
          {quizCompleted ? (
            <div className="quiz__discover-results">
              {excludeWatched
                ? <Button onClick={() => { editQuizAnswersExcludingWatched(watched, quizResults); }} to={`/movie/${firstResultLink}`} textContent="Découvrir" />
                : <Button onClick={onToggleGlitch} to={`/movie/${firstResult}`} textContent="Découvrir" />}
              {isLogged && displayExcludeToggle}
            </div>
          ) : (
            <a onClick={onClickNextQuestion} type="button">
              <Arrow />
              {' '}
              {nextQuestionText}
            </a>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

Quiz.propTypes = {
  // Question & Réponses
  question: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  currentAnswers: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  savedAnswers: PropTypes.shape({
  }).isRequired,
  glitch: PropTypes.bool.isRequired,
  // Données du quiz
  currentQuestion: PropTypes.number.isRequired,
  numberOfQuestions: PropTypes.number.isRequired,
  numberOfAnswers: PropTypes.number.isRequired,
  quizCompleted: PropTypes.bool.isRequired,
  firstResult: PropTypes.number,
  isLogged: PropTypes.bool.isRequired,
  excludeWatched: PropTypes.bool.isRequired,
  watched: PropTypes.arrayOf(PropTypes.number),
  quizResults: PropTypes.arrayOf(PropTypes.number).isRequired,
  toggleAnimations: PropTypes.bool.isRequired,
  // Gestions des clics
  onClickAnswer: PropTypes.func.isRequired,
  onClickNextQuestion: PropTypes.func.isRequired,
  // Fonctions de dispatch
  getQuestionAndAnswers: PropTypes.func.isRequired,
  getNumberOfQuestions: PropTypes.func.isRequired,
  getQuizResults: PropTypes.func.isRequired,
  editQuizAnswersExcludingWatched: PropTypes.func.isRequired,
  onResetQuiz: PropTypes.func.isRequired,
  onToggleGlitch: PropTypes.func.isRequired,
  // Gestion des erreurs
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

Quiz.defaultProps = {
  firstResult: null,
  watched: [],
};

const mapStateToProps = (
  {
    quiz: {
      question,
      currentQuestion,
      currentAnswers,
      savedAnswers,
      numberOfQuestions,
      numberOfAnswers,
      quizCompleted,
      errorAPI: {
        error,
        errorMessage,
      },
    },
    movies: {
      quizResults: {
        tmdbIDs: quizResults,
        tmdbIDs: [firstResult],
      },
    },
    login: {
      isLogged,
    },
    ui: {
      toggles: {
        toggleExcludingWatched: excludeWatched,
        toggleAnimations,
      },
      watched,
      glitch,
    },
  },
) => ({
  question,
  currentQuestion,
  currentAnswers,
  savedAnswers,
  numberOfQuestions,
  numberOfAnswers,
  quizCompleted,
  firstResult,
  error,
  errorMessage,
  isLogged,
  excludeWatched,
  watched,
  quizResults,
  glitch,
  toggleAnimations,
});

const mapDispatchToProps = (dispatch) => ({
  onClickAnswer: (answerID) => {
    //! On peut mieux faire avec mergeProps ?
    dispatch(chooseAnAnswser(answerID));
  },
  onClickNextQuestion: (name) => {
    dispatch(switchToNextQuestion(name));
  },
  getQuestionAndAnswers: (currentQuestion, savedAnswers) => {
    dispatch(fetchQuestionAndAnswers(currentQuestion, savedAnswers));
  },
  getNumberOfQuestions: () => {
    dispatch(loadQuestionsNumber());
  },
  getQuizResults: (savedAnswers) => {
    // On transforme le tableau de réponses en une chaine de caractères
    for (const key in savedAnswers) {
      if (savedAnswers.hasOwnProperty(key)) {
        savedAnswers[key] = savedAnswers[key].join(',');
      }
    }
    dispatch(fetchQuizResults(savedAnswers));
  },
  editQuizAnswersExcludingWatched: (watched, quizResults) => {
    // On exclue de quizResults les films déjà vus présents dans watched
    const excludedQuizResults = quizResults.filter((movieID) => !watched.includes(movieID));
    // On modifie le state des quizResults en conséquence
    dispatch(editQuizAnswers(excludedQuizResults));
  },
  onResetQuiz: () => {
    dispatch(resetQuiz());
  },
  onToggleGlitch: () => {
    dispatch(toggleGlitch());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);

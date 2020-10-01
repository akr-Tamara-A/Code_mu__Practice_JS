import FormGuessNumber from "../components/FormGuessNumber.js";
import GameGuessCell from "../components/GameGuessCell.js";
import { formSelectors, formResultSelectors } from "../utils/constants.js";

  /** ---------------- Игра "Угадай число" ---------------- */
  const guessNumber = new FormGuessNumber(
    formSelectors.formGuessNumber,
    {
      handleFormSubmit: (formData, attempt, hiddenNumber) => {
        const userNumber = Number(formData.number);

        let answer;
        let attempts;
        if (userNumber < hiddenNumber) {
          answer = 'Введите число побольше'
        } else if (userNumber > hiddenNumber) {
          answer = 'Введите число поменьше'
        } else {
          answer = 'Вы угадали!'
        }

        guessNumber.addAttempt();

        guessNumber.setResult({
          answer: answer,
          attempts: attempt,
        });
      },
    },
    formResultSelectors.guessNumber
    );
    
    guessNumber.setEventListeners();
    

  /** ---------------- Игра "Угадай ячейку" ---------------- */
const gameGuessCell = new GameGuessCell(
  {gameSelector: formSelectors.formGuessCells,
  resultSelectors: formResultSelectors.guessCells},
);

gameGuessCell.renderCells();
gameGuessCell.setListeners();
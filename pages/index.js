import Form from "../components/Form.js";
import FormGuessNumber from "../components/FormGuessNumber.js";
import GameGuessCell from "../components/GameGuessCell.js";

import { formSelectors, formResultSelectors } from "../utils/constants.js";
import { randomNumber } from "../utils/utils.js";

/** ---------------- Калькулятор фигур ---------------- */

/** Форма подсчета площади и периметра квадрата */
const formSquare = new Form(
  formSelectors.square,
  {
    handleFormSubmit: (formData) => {
      const side = formData.sideOfSquare;
      const squareArea = side * side;
      const squarePerimeter = side * 4;
      formSquare.setResult({ area: squareArea, perimeter: squarePerimeter });
    },
  },
  formResultSelectors.square
);

formSquare.setEventListeners();

/** Форма подсчета площади и периметра прямоугольника */
const formRectangle = new Form(
  formSelectors.rectangle,
  {
    handleFormSubmit: (formData) => {
      const sideA = Number(formData.sideAOfRectangle);
      const sideB = Number(formData.sideBOfRectangle);
      const area = sideA * sideB;
      const perimeter = (sideA + sideB) * 2;
      formRectangle.setResult({ area: area, perimeter: perimeter });
    },
  },
  formResultSelectors.rectangle
);

formRectangle.setEventListeners();

/** Форма подсчета площади и периметра круга */
const formCircle = new Form(
  formSelectors.circle,
  {
    handleFormSubmit: (formData) => {
      const radius = Number(formData.radius);
      const area = (radius ** 2 * Math.PI).toFixed(3);
      const perimeter = (radius * 2 * Math.PI).toFixed(3);
      formCircle.setResult({ area: area, perimeter: perimeter });
    },
  },
  formResultSelectors.circle
);

formCircle.setEventListeners();

/** Форма подсчета площади и периметра треугольника */
const formTriangle = new Form(
  formSelectors.triangle,
  {
    handleFormSubmit: (formData) => {
      const sideA = Number(formData.sideA);
      const sideB = Number(formData.sideB);
      const sideC = Number(formData.sideC);
      const perimeter = sideA + sideB + sideC;
      const halfPerimetr = perimeter / 2;
      const area = Math.sqrt(
        halfPerimetr *
          (halfPerimetr - sideA) *
          (halfPerimetr - sideB) *
          (halfPerimetr - sideC)
      ).toFixed(3);
      formTriangle.setResult({ area: area, perimeter: perimeter });
    },
  },
  formResultSelectors.triangle
);

formTriangle.setEventListeners();

/** ---------------- Математические калькуляторы ---------------- */

/** Нахождение корней квадратного уравнения */
const formQuadratic = new Form(
  formSelectors.quadratic,
  {
    handleFormSubmit: (formData) => {
      const coefficientA = Number(formData.coefficientA);
      const coefficientB = Number(formData.coefficientB);
      const coefficientC = Number(formData.coefficientC);
      const discriminant = coefficientB ** 2 - 4 * coefficientA * coefficientC;

      if (discriminant > 0) {
        const root1 = (
          (coefficientB * -1 + Math.sqrt(discriminant)) /
          (2 * coefficientA)
        ).toFixed(3);
        const root2 = (
          (coefficientB * -1 - Math.sqrt(discriminant)) /
          (2 * coefficientA)
        ).toFixed(3);
        formQuadratic.setResult({
          quadraticRoot1: root1,
          quadraticRoot2: root2,
        });
      } else if (discriminant === 0) {
        const root = ((coefficientB * -1) / (2 * coefficientA)).toFixed(3);
        formQuadratic.setResult({
          quadraticRoot1: root,
          quadraticRoot2: "нет корня",
        });
      } else {
        formQuadratic.setResult({
          quadraticRoot1: "Нет корней",
          quadraticRoot2: "Нет корней",
        });
      }
    },
  },
  formResultSelectors.quadratic
);

formQuadratic.setEventListeners();

/** Проверка являются ли числа тройкой Пифагора */
const formPythTriple = new Form(
  formSelectors.pythTriple,
  {
    handleFormSubmit: (formData) => {
      let arr = [];
      arr[0] = Number(formData.coefficientA);
      arr[1] = Number(formData.coefficientB);
      arr[2] = Number(formData.coefficientC);
      arr.sort((num1, num2) => {
        if (num1 > num2) {
          return -1;
        }
        if (num1 < num2) {
          return 1;
        }
        return 0;
      });
      if (arr[0] ** 2 === arr[1] ** 2 + arr[2] ** 2) {
        formPythTriple.setResult({ isPythagorasTriple: "Да" });
      } else {
        formPythTriple.setResult({ isPythagorasTriple: "Нет" });
      }
    },
  },
  formResultSelectors.pythTriple
);

formPythTriple.setEventListeners();

/** Делители числа */
const formDivisors = new Form(
  formSelectors.divisors,
  {
    handleFormSubmit: (formData) => {
      const number = Number(formData.number);

      let arr = [];

      for (let i = 1; i <= number; i++) {
        if (number % i === 0) {
          arr.push(i);
        }
      }

      formDivisors.setResult({ divisors: arr.join(" ") });
    },
  },
  formResultSelectors.divisors
);

formDivisors.setEventListeners();

/** Общие делители двух чисел */
const formCoDivisors = new Form(
  formSelectors.coDivisors,
  {
    handleFormSubmit: (formData) => {
      const number1 = Number(formData.number1);
      const number2 = Number(formData.number2);

      let arr1 = [];
      let arr2 = [];
      let result = [];

      for (let i = 1; i <= number1; i++) {
        if (number1 % i === 0) {
          arr1.push(i);
        }
      }

      for (let i = 1; i <= number2; i++) {
        if (number2 % i === 0) {
          arr2.push(i);
        }
      }

      for (let elem of arr1) {
        if (arr2.indexOf(elem) !== -1) {
          result.push(elem);
        }
      }

      formCoDivisors.setResult({ divisors: result.join(" ") });
    },
  },
  formResultSelectors.coDivisors
);

formCoDivisors.setEventListeners();

/** Наибольший общий делитель двух чисел */
const formMaxCoDivisors = new Form(
  formSelectors.maxCoDivisors,
  {
    handleFormSubmit: (formData) => {
      const number1 = Number(formData.number1);
      const number2 = Number(formData.number2);

      let arr1 = [];
      let arr2 = [];
      let result = [];

      for (let i = 1; i < number1; i++) {
        if (number1 % i === 0) {
          arr1.push(i);
        }
      }

      for (let i = 1; i < number2; i++) {
        if (number2 % i === 0) {
          arr2.push(i);
        }
      }

      for (let elem of arr1) {
        if (arr2.indexOf(elem) !== -1) {
          result.push(elem);
        }
      }
      let maxDivisor = Math.max.apply(null, result);

      formMaxCoDivisors.setResult({ maxDivisor: maxDivisor });
    },
  },
  formResultSelectors.maxCoDivisors
);

formMaxCoDivisors.setEventListeners();

/** Наименьшее общее кратное двух чисел */
const formMinMultiple = new Form(
  formSelectors.formMinMultiple,
  {
    handleFormSubmit: (formData) => {
      const number1 = Number(formData.number1);
      const number2 = Number(formData.number2);

      let arr1 = [];
      let arr2 = [];
      let result = [];

      for (let i = 1; i < number1; i++) {
        if (number1 % i === 0) {
          arr1.push(i);
        }
      }

      for (let i = 1; i < number2; i++) {
        if (number2 % i === 0) {
          arr2.push(i);
        }
      }

      for (let elem of arr1) {
        if (arr2.indexOf(elem) !== -1) {
          result.push(elem);
        }
      }
      const maxDivisor = Math.max.apply(null, result);

      const minMultiple = (number1 * number2) / maxDivisor;

      formMinMultiple.setResult({ minMultiple: minMultiple });
    },
  },
  formResultSelectors.minMultiple
  );
  
  formMinMultiple.setEventListeners();
  
  /** ---------------- Анализатор текста ---------------- */
  
  const formTextAnalysis = new Form(
    formSelectors.formTextAnalysis,
    {
      handleFormSubmit: (formData) => {
        /** Количество слов в тексте */
        const arr1 = formData.toLowerCase().split(' ');
        const numberOfWords = arr1.length;

        /** Количество символов в тексте */
        const arr2 = formData.toLowerCase().split('');
        const numberOfCharacters = arr2.length;

        /** Количество символов (без пробелов) в тексте */
        const arr3 = arr2.filter((elem) => {
          if (elem !== ' ') {
            return true;
          } else {
            return false;
          }
        })
        const numberOfCharactersNotBsp = arr3.length;
        
        /** Процентное содержание символов */
        let arr4 = {};
        for (let elem of arr3) {
          if (!arr4[elem]) {
            arr4[elem] = 1;
          } else {
            arr4[elem]++;
          }
        }
        let arr5 = [];
        for (let key in arr4) {
          arr5.push(key + ': ' + arr4[key]);
        }
        const arr6 = arr5.sort((a, b) => {
          if (a < b) {
            return -1;
          } else if (a > b) {
            return 1;
          } else {
            return 0;
          }
        })
        const percentageOfCharacters = arr6.join(', ');

        formTextAnalysis.setResult({
          numberOfWords: numberOfWords,
          numberOfCharacters: numberOfCharacters,
          numberOfCharactersNotBsp: numberOfCharactersNotBsp,
          percentageOfCharacters: percentageOfCharacters,
        });
    },
  },
  formResultSelectors.formTextAnalysis
);

formTextAnalysis.setEventListeners();


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
    formResultSelectors.guessNumber,
    randomNumber(1, 100)
    );
    
    guessNumber.setEventListeners();
    

  /** ---------------- Игра "Угадай ячейку" ---------------- */
const gameGuessCell = new GameGuessCell(
  {gameSelector: formSelectors.formGuessCells,
  resultSelectors: formResultSelectors.guessCells},
  {rows: 10,
  columns: 10,
  hiddenCells: 10,
  time: 10}
);
gameGuessCell.renderCells();
gameGuessCell.setListeners();










import Form from "../components/Form.js";
import { formSelectors, formResultSelectors } from "../utils/constants.js";


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
  
import Form from "../components/Form.js";
import { formSelectors, formResultSelectors } from "../utils/constants.js";

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

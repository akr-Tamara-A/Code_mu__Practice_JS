
import Form from '../components/Form.js';

const formSquareSelector = '#formSquare';
const formRectangleSelector = '#formRectangle';
const formCircleSelector = '#formCircle';
const formTriangleSelector = '#formTriangle';
const formQuadraticSelector = '#quadratic';
const formPythTripleSelector = '#pythagorasTriple';

const formSquareResultSelectors = {
  area: '#resultArea',
  perimetr: '#resultPerimeter',
}

const formRectangleResultSelectors = {
  area: '#resultArea',
  perimetr: '#resultPerimeter',
}

const formCircleResultSelectors = {
  area: '#resultArea',
  perimetr: '#resultPerimeter',
}

const formTriangleResultSelectors = {
  area: '#resultArea',
  perimetr: '#resultPerimeter',
}

const formQuadraticResultSelectors = {
  quadraticRoot1: '#quadraticRoot1',
  quadraticRoot2: '#quadraticRoot2',
}

const formPythTripleResultSelectors = {
  isPythagorasTriple: '#isPythagorasTriple'
}



const formSquare = new Form(
  formSquareSelector, 
  {handleFormSubmit: (formData) => {
    const side = formData.sideOfSquare;
    const squareArea = side * side;
    const squarePerimeter = side *4;
    formSquare.setResult({area: squareArea, perimeter: squarePerimeter});
    }
  },
  formSquareResultSelectors)

formSquare.setEventListeners();


const formRectangle = new Form(
  formRectangleSelector, 
  {handleFormSubmit: (formData) => {
    const sideA = Number(formData.sideAOfRectangle);
    const sideB = Number(formData.sideBOfRectangle);
    const area = sideA * sideB;
    const perimeter = (sideA + sideB) * 2;
    formRectangle.setResult({area: area, perimeter: perimeter});
    }
  },
  formRectangleResultSelectors)

  formRectangle.setEventListeners();


const formCircle = new Form(
  formCircleSelector, 
  {handleFormSubmit: (formData) => {
    const radius = Number(formData.radius);
    const area = ((radius ** 2) * Math.PI).toFixed(3);
    const perimeter = (radius * 2 * Math.PI).toFixed(3);
    formCircle.setResult({area: area, perimeter: perimeter});
    }
  },
  formCircleResultSelectors)

  formCircle.setEventListeners();


const formTriangle = new Form(
  formTriangleSelector, 
  {handleFormSubmit: (formData) => {
    const sideA = Number(formData.sideA);
    const sideB = Number(formData.sideB);
    const sideC = Number(formData.sideC);
    const perimeter = sideA + sideB + sideC;
    const halfPerimetr = perimeter / 2;
    const area = (Math.sqrt(halfPerimetr * (halfPerimetr - sideA) * (halfPerimetr - sideB) * (halfPerimetr - sideC))).toFixed(3);
    formTriangle.setResult({area: area, perimeter: perimeter});
    }
  },
  formTriangleResultSelectors)

  formTriangle.setEventListeners();


const formQuadratic = new Form(
  formQuadraticSelector, 
  {handleFormSubmit: (formData) => {
    const coefficientA = Number(formData.coefficientA);
    const coefficientB = Number(formData.coefficientB);
    const coefficientC = Number(formData.coefficientC);
    const discriminant = (coefficientB ** 2) - (4 * coefficientA * coefficientC);

    if (discriminant > 0) {
      const root1 = (((coefficientB * -1) + Math.sqrt(discriminant)) / (2 * coefficientA)).toFixed(3);
      const root2 = (((coefficientB * -1) - Math.sqrt(discriminant)) / (2 * coefficientA)).toFixed(3);
      formQuadratic.setResult({quadraticRoot1: root1, quadraticRoot2: root2});
    } else if (discriminant === 0) {
      const root = (((coefficientB * -1) / (2 * coefficientA)).toFixed(3));
      formQuadratic.setResult({quadraticRoot1: root, quadraticRoot2: 'нет корня'});
    } else {
      formQuadratic.setResult({quadraticRoot1: 'Нет корней', quadraticRoot2: 'Нет корней'});
    }
  }},
  formQuadraticResultSelectors)
  
  formQuadratic.setEventListeners();
  
  
  

const formPythTriple = new Form(
  formPythTripleSelector, 
  {handleFormSubmit: (formData) => {
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
    })
    if ((arr[0] ** 2) === ((arr[1] ** 2) + (arr[2] ** 2))) {
      formPythTriple.setResult({isPythagorasTriple: 'Да'});
    } else {
      formPythTriple.setResult({isPythagorasTriple: 'Нет'});
    }
  }},
  formPythTripleResultSelectors)
  
  formPythTriple.setEventListeners();
  
  
  
  






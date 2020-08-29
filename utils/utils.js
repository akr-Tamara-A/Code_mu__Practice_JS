
/** Функция получения случайного числа */
export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
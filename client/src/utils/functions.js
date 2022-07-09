import { REGEX_NUMBER_VALID } from "./constants";

export const validNumber = (number) => {
  return number.match(REGEX_NUMBER_VALID);
};
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ValidateFn } from 'codelyzer/walkerFactory/walkerFn';

export function validateCityFn(c: AbstractControl): ValidationErrors | null {
  return null;
}

const validateCity: (cities: string[]) => ValidatorFn = (cities) => (c: AbstractControl) => {
  if (cities.includes(c.value.from) && cities.includes(c.value.to)) {
    return null;
  }

  return { city: true };
};

export const CustomValidators = {
  validateCity,
};

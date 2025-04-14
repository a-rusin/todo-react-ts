import { HandleChangeTypes } from "../models/HandleChange";
import {
  ValidatorConfig,
  ValidatorEnum,
  ValidatorResult,
} from "../models/ValidatorConfig";

export const validate = <T>(validatorConfig: ValidatorConfig, formValue: T) => {
  let errors: ValidatorResult = {};

  for (let formKey in formValue) {
    const validatorConfigItemRules = validatorConfig[formKey];
    if (validatorConfigItemRules) {
      for (let validatorKey in validatorConfigItemRules) {
        let errorMessage;

        switch (validatorKey) {
          case ValidatorEnum.isRequired:
            const isString =
              formValue[formKey] !== null &&
              typeof formValue[formKey] === "string" &&
              (formValue[formKey] as string).trim().length === 0;

            const isNull = formValue[formKey] === null;

            if (isString || isNull) {
              errorMessage = "Поле обязательно к заполнению";
            }
            break;

          default:
            break;
        }

        if (errorMessage && errors[formKey]) {
          errors[formKey].push(errorMessage);
        } else if (errorMessage) {
          errors[formKey] = [errorMessage];
        }
      }
    }
  }

  return errors;
};

import { useState } from "react";
import { HandleChangeTypes } from "../models/HandleChange";
import { validate } from "../utils/validate";
import { ValidatorConfig, ValidatorResult } from "../models/ValidatorConfig";

interface useFormProps<T> {
  defaultValue: T;
  onSubmit: (data: T) => void;
  validatorConfig?: ValidatorConfig;
}

export const useForm = <T extends Object>({
  defaultValue,
  onSubmit,
  validatorConfig,
}: useFormProps<T>) => {
  const [formValue, setFormValue] = useState(defaultValue);
  const [errors, setErrors] = useState<ValidatorResult>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validatorConfig) {
      const validateErrors = validate<T>(validatorConfig, formValue);
      setErrors(validateErrors);
      if (Object.keys(validateErrors).length === 0) {
        onSubmit(formValue);
      }
    } else {
      onSubmit(formValue);
    }
  };

  const handleReset = () => {
    setFormValue(defaultValue);
  };

  const handleChange = ({
    name,
    value,
  }: {
    name: string;
    value: HandleChangeTypes;
  }) => {
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return { formValue, handleSubmit, handleReset, handleChange, errors };
};

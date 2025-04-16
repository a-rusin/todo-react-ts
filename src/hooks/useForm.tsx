import { useEffect, useState } from "react";
import { HandleChangeTypes } from "../models/HandleChange";
import { validate } from "../utils/validate";
import { ValidatorConfig, ValidatorResult } from "../models/ValidatorConfig";
import { CreateAndUpateFormType } from "../models/CreateAndUpdate";

interface useFormProps<T> {
  defaultValue: T | undefined;
  onSubmit: (data: T, mode?: CreateAndUpateFormType) => void;
  validatorConfig?: ValidatorConfig;
}

export const useForm = <T extends Object>({
  defaultValue,
  onSubmit,
  validatorConfig,
}: useFormProps<T>) => {
  const [formValue, setFormValue] = useState(defaultValue);
  const [errors, setErrors] = useState<ValidatorResult>({});

  useEffect(() => {
    setFormValue(defaultValue);
  }, [defaultValue]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validatorConfig && formValue) {
      const validateErrors = validate<T>(validatorConfig, formValue);
      setErrors(validateErrors);
      if (Object.keys(validateErrors).length === 0) {
        onSubmit(formValue);
      }
    } else {
      if (formValue) {
        onSubmit(formValue);
      }
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
    setFormValue(
      (prev) =>
        prev && {
          ...prev,
          [name]: value,
        }
    );
  };

  return { formValue, handleSubmit, handleReset, handleChange, errors };
};

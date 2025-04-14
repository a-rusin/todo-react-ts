import { useState } from "react";
import { HandleChangeTypes } from "../models/HandleChange";

interface useFormProps<T> {
  defaultValue: T;
  onSubmit: (data: T) => void;
}

export const useForm = <T extends Object>({
  defaultValue,
  onSubmit,
}: useFormProps<T>) => {
  const [formValue, setFormValue] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValue);
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

  return { formValue, handleSubmit, handleReset, handleChange };
};

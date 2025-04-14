export enum ValidatorEnum {
  isRequired = "isRequired",
  email = "email",
}

export interface ValidatorConfig {
  [key: string]: {
    [key in ValidatorEnum]?: boolean;
  };
}

export interface ValidatorResult {
  [key: string]: string[];
}

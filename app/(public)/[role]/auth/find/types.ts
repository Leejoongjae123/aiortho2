export interface AuthFindIdFormValues {
  name: string;
  phoneNumber: string;
}

export interface AuthFindPasswordFormValues {
  name: string;
  phoneNumber: string;
  email: string;
}

export interface AuthFoundAccount {
  name: string;
  email: string;
}

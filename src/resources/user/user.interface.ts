interface User {
  email: string;
  name: string;
  password: string;
  role: string;

  isValidPassword(password: string): Promise<Error | boolean>;
}

export { User };

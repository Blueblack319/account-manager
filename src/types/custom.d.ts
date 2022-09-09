export {};

declare global {
  namespace Express {
    interface Request {
      user?: import('../resources/user/user.interface').default;
    }
  }
}

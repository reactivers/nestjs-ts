export interface AppError {
  message: string;
  status?: number;
}

export interface AppResponse<T extends object> {
  data?: T;
  error?: AppError;
}

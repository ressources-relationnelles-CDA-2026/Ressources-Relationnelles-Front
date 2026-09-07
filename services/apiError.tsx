export class ApiError extends Error {
  status: number;
  violations?: {
    propertyPath: string;
    message: string;
  }[];

  constructor(
    message: string,
    status: number,
    violations?: {
      propertyPath: string;
      message: string;
    }[],
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.violations = violations;
  }
}
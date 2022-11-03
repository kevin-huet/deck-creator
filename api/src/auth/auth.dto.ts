export class LoginRequestDTO {
  email: string;
  password: string;
}

export class RegisterRequestDTO {
  email: string;
  username: string;
  password: string;
}

export class ValidateRequestDTO {
  token: string;
}

export class ResponseDTO {
  status: number;
  error?: Array<string>;
  data: any;
}

export class VerificationCodeRequestDTO {
  code: string;
}

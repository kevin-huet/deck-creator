export class LoginRequestDTO {
  email: string;
  password: string;
  captcha: string;
}

export class RegisterRequestDTO {
  email: string;
  username: string;
  password: string;
  captcha: string;
}

export class UserDTO {
  id: number;
  username: string;
}

export class ValidateRequestDTO {
  user: UserDTO;
  status: number;
  error?: Array<string>;
}

export class ResponseDTO {
  status: number;
  error?: Array<string>;
  data: any;
}

export class VerificationCodeRequestDTO {
  code: string;
}

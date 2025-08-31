export class AuthRequest {
  email: string;
  password: string;
}

export class AuthResponse {
  id: string;
  name: string;
  token: string;
}

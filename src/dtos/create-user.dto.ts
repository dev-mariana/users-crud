export class CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserResponse {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at?: Date | null;
}

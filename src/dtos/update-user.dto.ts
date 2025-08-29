export class UpdateUserRequest {
  name: string;
  email: string;
  password: string;
}

export class UpdateUserResponse {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

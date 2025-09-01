export class UpdateUserRequest {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

export class UpdateUserResponse {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

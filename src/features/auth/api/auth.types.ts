export type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  status: number;
  message: string;
  user: User;
};

export type LoginResponse = {
  status: number;
  message: string;
  accessToken: string;
  user: User;
};

export type LogoutResponse = {
  status: number;
  message: string;
};

export type UsersResponse = {
  status: number;
  message: string;
  users: User[];
};

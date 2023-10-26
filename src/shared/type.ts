export type RegisterUserInfo = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type LoginUserInfo = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  token?: string;
  created_at: string;
  updated_at: string;
};

export type Contact = {
  name: string;
  phone: number;
  email: string;
  address: string;
};

export type ResponseContact = Contact & {
  user_id: string;
  id: number;
  photo?: string;
  created_at: string;
  updated_at: string;
};

export type ResponseRegister = { success: boolean; message: string };

export type ResponseLogin = {
  success: boolean;
  message: string;
  token: string;
  user: User;
};

export type ResponseRegisterError = {
  data: { errors: { email: string[] }; message: string };
  status: number;
};

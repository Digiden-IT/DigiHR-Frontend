export const userRole = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export type TUser = {
  id: string;
  name: string;
  role: string;
  email: string;
  iat: number;
  exp: number;
};

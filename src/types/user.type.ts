export const userRole = {
  ADMIN: "admin",
  USER: "user",
};

export type TUser = {
  userEmail: string;
  userID: string;
  userRole: string;
  iat: number;
  exp: number;
};

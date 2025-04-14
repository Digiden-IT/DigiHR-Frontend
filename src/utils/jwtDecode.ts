import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../types/jwt.type";

export const verifyToken = (token: string) => {
  return jwtDecode<CustomJwtPayload>(token);
};

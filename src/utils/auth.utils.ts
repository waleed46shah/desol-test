import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  _id: string;
  iat: number;
  exp: number;
}

export const getUserId = (): string | null => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = jwtDecode<DecodedToken>(token);

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }

    return decoded._id;
  } catch (error) {
    localStorage.removeItem("token");
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return getUserId() !== null;
};

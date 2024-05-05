import { authAPI } from "./api/authApi";
import { getItem } from "./handlers/tokenHandler";

export const verifyToken = async () => {
  if (!getItem("user")) return false;
  try {
    const res = await authAPI.verifyToken();
    if (!res.data) {
      return false;
    }
    return res.data.user;
  } catch (error) {
    return false;
  }
};

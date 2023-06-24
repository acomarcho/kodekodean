import axios from "axios";
import { User } from "@/lib/state/schema";

export const authenticateUser: () => Promise<null | User> = async () => {
  try {
    const res = await axios.get("/api/authenticate");
    return res.data.user as User;
  } catch (error) {
    return null;
  }
};

import { createContext } from "react";
import { User } from "@/lib/schema";

export const AuthContext = createContext<User>({
  id: -1,
  username: "",
  email: "",
  password: "",
});

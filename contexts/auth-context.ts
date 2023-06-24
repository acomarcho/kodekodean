import { createContext } from "react";
import { User } from "@/lib/state/schema";

export const AuthContext = createContext<User>({
  id: -1,
  username: "",
  email: "",
  password: "",
});

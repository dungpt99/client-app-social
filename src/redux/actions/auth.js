import { signIn } from "../../api/auth";

export function login(data) {
  return signIn(data);
}

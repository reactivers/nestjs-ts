import { SignUpUserDto } from "src/types/user.type";

export const testUser: SignUpUserDto = {
  username: "reactivers",
  firstName: "Reactivers",
  lastName: "Reactivers",
  password: "Reactivers",
};

export const invalidUsers: SignUpUserDto[] = [
  {
    username: "",
    firstName: "",
    lastName: "",
    password: "",
  },
  {
    username: "reactivers",
    firstName: "",
    lastName: "",
    password: "",
  },
  {
    username: "reactivers",
    firstName: "Reactivers",
    lastName: "",
    password: "",
  },
  {
    username: "reactivers",
    firstName: "Reactivers",
    lastName: "reactivers",
    password: "",
  },
];

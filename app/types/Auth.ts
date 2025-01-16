import User from "./User";

export interface Auth {
    error: boolean;
    user: User;
}
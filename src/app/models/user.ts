export interface User {
    fullName: string;
    email: string;
    password: string;
}
export interface UserLogin{
    user: User,
    token: {
    type: string,
    name: null|string,
    token: string,
    abilities: [
    string
    ],
    lastUsedAt: null|string,
    expiresAt: null|string
  }
}

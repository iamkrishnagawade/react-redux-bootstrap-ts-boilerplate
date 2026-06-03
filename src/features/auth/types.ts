export interface User {
  id: string;
  email: string;
}

export interface AuthSlice {
  isAuthenticated: boolean;
  user: User | null;
}

export interface AdminUserModel  {
  id?: number;
  username: string;
  password: string;
  role: string; // "SUPER_ADMIN" | "STAFF"
}

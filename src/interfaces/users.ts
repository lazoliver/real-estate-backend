export type UserRole = "ADMIN" | "AGENT" | "MANAGER";

export interface UserResponse {
  name: string;
  id: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  surname: string;
  password: string;
  firstLogon: boolean;
  role: UserRole;
  organizationId: string;
}

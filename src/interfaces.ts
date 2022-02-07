export interface UserInterface {
  email: string | (boolean | string)[];
  password: string;
}

export interface RoleInterface {
  SUPERADMIN: string;
  ADMIN: string;
  PLAYER: string;
  ORGANIZER: string;
  GUEST: string;
}

export interface ErrorInterface {
  message: string;
  statusCode: number;
}

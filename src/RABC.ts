import { AccessControl } from "accesscontrol";
import { Application } from "express";
import { RoleInterface } from "./interfaces";

export const ROLE: RoleInterface = {
  SUPERADMIN: "superadmin",
  ADMIN: "admin",
  PLAYER: "player",
  ORGANIZER: "organizer",
  GUEST: "guest",
};

const grantsObject = {
  [ROLE.SUPERADMIN]: {
    video: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
  },
  [ROLE.ADMIN]: {
    video: {
      "create:own": ["*"],
      "read:own": ["*"],
      "update:own": ["*"],
      "delete:own": ["*"],
    },
  },
  [ROLE.PLAYER]: {
    video: {
      "create:own": ["*"],
      "read:own": ["*"],
      "update:own": ["*"],
      "delete:own": ["*"],
    },
  },
  [ROLE.ORGANIZER]: {
    video: {
      "create:own": ["*"],
      "read:own": ["*"],
      "update:own": ["*"],
      "delete:own": ["*"],
    },
  },
  [ROLE.GUEST]: {
    video: {
      "create:own": ["*"],
      "read:own": ["*"],
      "update:own": ["*"],
      "delete:own": ["*"],
    },
  },
};

export default function RABC(app: Application) {
  const ac = new AccessControl(grantsObject);

  app.set("ac", ac);
}

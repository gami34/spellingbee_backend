"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLE = void 0;
const accesscontrol_1 = require("accesscontrol");
exports.ROLE = {
    SUPERADMIN: "superadmin",
    ADMIN: "admin",
    PLAYER: "player",
    ORGANIZER: "organizer",
    GUEST: "guest",
};
const grantsObject = {
    [exports.ROLE.SUPERADMIN]: {
        video: {
            "create:any": ["*"],
            "read:any": ["*"],
            "update:any": ["*"],
            "delete:any": ["*"],
        },
    },
    [exports.ROLE.ADMIN]: {
        video: {
            "create:own": ["*"],
            "read:own": ["*"],
            "update:own": ["*"],
            "delete:own": ["*"],
        },
    },
    [exports.ROLE.PLAYER]: {
        video: {
            "create:own": ["*"],
            "read:own": ["*"],
            "update:own": ["*"],
            "delete:own": ["*"],
        },
    },
    [exports.ROLE.ORGANIZER]: {
        video: {
            "create:own": ["*"],
            "read:own": ["*"],
            "update:own": ["*"],
            "delete:own": ["*"],
        },
    },
    [exports.ROLE.GUEST]: {
        video: {
            "create:own": ["*"],
            "read:own": ["*"],
            "update:own": ["*"],
            "delete:own": ["*"],
        },
    },
};
function RABC(app) {
    const ac = new accesscontrol_1.AccessControl(grantsObject);
    app.set("ac", ac);
}
exports.default = RABC;

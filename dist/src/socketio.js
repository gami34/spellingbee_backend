"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const logger_1 = __importDefault(require("./logger"));
class SocketManager {
    constructor() {
        this.users = [];
    }
    addUser(userParams) {
        const existingUser = this.existingUser(userParams.UUID);
        if (existingUser) {
            this.udpateSocketID(userParams.UUID, userParams.socketID);
            return { errorCode: 400, massage: "We notice ame reinitialization" };
        }
        const username = userParams.username.trim();
        const existUsername = this.existingUsername(username);
        if (existUsername) {
            return { errorCode: 400, massage: "username already exist" };
        }
        const room = userParams.room.trim();
        const user = Object.assign(Object.assign({}, userParams), { username, room });
        this.users.push(user);
        return { user };
    }
    removeUser(socketID) {
        const index = this.users.findIndex((user) => user.socketID === socketID);
        if (index !== -1) {
            this.users.splice(index, 1);
            return true;
        }
        return false;
    }
    getUser(socketID) {
        return this.users.find((user) => user.socketID === socketID);
    }
    getUsersInRoom(room) {
        return this.users.filter((user) => user.room === room);
    }
    existingUser(UUID) {
        return this.users.find((user) => user.UUID === UUID);
    }
    existingUsername(username) {
        return this.users.find((user) => user.username === username);
    }
    udpateSocketID(UUID, socketID) {
        this.users.find((user, index) => {
            const userClone = user;
            if (user.UUID === UUID) {
                userClone.socketID = socketID;
                this.users.splice(index, 1, userClone);
            }
            return user.UUID === UUID;
        });
    }
}
function socketIO(server, app) {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });
    const socketManaer = new SocketManager();
    const socket = io.on("connection", (socket) => {
        socket.join("anonymous");
        socket.on("join", ({ username, room }, cb) => {
            const { errorCode, massage, user } = socketManaer.addUser({
                username,
                room,
                UUID: JSON.stringify(new Date()),
                socketID: socket.id,
            });
            if (errorCode)
                return cb(massage);
            if (user === null || user === void 0 ? void 0 : user.room) {
                socket.join(user === null || user === void 0 ? void 0 : user.room);
                socket.emit("message", { username: "admin", text: `you are welocome to ${user === null || user === void 0 ? void 0 : user.room}` });
                const roomBroadcast = socket.broadcast.to(`${user === null || user === void 0 ? void 0 : user.room}`);
                roomBroadcast.emit("message", { username: "admin", text: `we have a new user ${user === null || user === void 0 ? void 0 : user.username}` });
            }
        });
        socket.on("signin", () => {
            socket.leave("anonymous");
            socket.join("authenticated");
        });
        socket.on("disconnect", () => {
            socket.leave("anonymous");
            socket.join("authenticated");
        });
    });
    logger_1.default.info("socketio connection now initiated");
    app.set("socket", socket);
    app.set("io", io);
}
exports.default = socketIO;

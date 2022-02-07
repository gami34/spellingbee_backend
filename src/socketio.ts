/* eslint-disable consistent-return */
import { Application } from "express";
import { Server, ServerOptions } from "socket.io";
import logger from "./logger";

interface UserInterface {
  socketID: string;
  UUID: string;
  username: string;
  room: string;
}

interface AddUserResponseInterface {
  errorCode?: number;
  massage?: string;
  user?: UserInterface;
}

class SocketManager {
  private users: UserInterface[];

  constructor() {
    this.users = [];
  }

  addUser(userParams: UserInterface): AddUserResponseInterface {
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
    const user = { ...userParams, username, room };
    this.users.push(user);
    return { user };
  }

  removeUser(socketID: string): boolean {
    const index = this.users.findIndex((user) => user.socketID === socketID);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }

  getUser(socketID: string) {
    return this.users.find((user) => user.socketID === socketID);
  }

  getUsersInRoom(room: string) {
    return this.users.filter((user) => user.room === room);
  }

  existingUser(UUID: string) {
    return this.users.find((user) => user.UUID === UUID);
  }

  existingUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  udpateSocketID(UUID: string, socketID: string) {
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

export default function socketIO(server: Partial<ServerOptions>, app: Application) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const socketManaer = new SocketManager();

  const socket = io.on("connection", (socket) => {
    // On a new real-time connection, add it to the anonymous channel
    socket.join("anonymous");

    console.log(`${socket.id} User connected`);

    socket.on("join", ({ username, room }, cb) => {
      const { errorCode, massage, user } = socketManaer.addUser({
        username,
        room,
        UUID: JSON.stringify(new Date()),
        socketID: socket.id,
      });
      if (errorCode) return cb(massage);
      if (user?.room) {
        socket.join(user?.room);
        socket.emit("message", { username: "admin", text: `you are welocome to ${user?.room}` });
        const roomBroadcast = socket.broadcast.to(`${user?.room}`);
        roomBroadcast.emit("message", { username: "admin", text: `we have a new user ${user?.username}` });
      }
    });

    socket.on("signin", () => {
      socket.leave("anonymous");
      socket.join("authenticated");
    });

    socket.on("disconnect", () => {
      console.log("a user as discsonncted");
      socket.leave("anonymous");
      socket.join("authenticated");
    });
  });

  logger.info("socketio connection now initiated");
  app.set("socket", socket);
  app.set("io", io);
}

// backend/lib/SocketIo.js

let ioInstance;

export function initSocket(server) {
  import("socket.io").then(({ Server }) => {
    const io = new Server(server, {
      cors: {
        origin: "http://localhost:5173",
        credentials: true,
      },
    });

    const userSocketMap = {};

    io.on("connection", (socket) => {
      const userId = socket.handshake.query.userId;
      if (userId) userSocketMap[userId] = socket.id;
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
      socket.on("disconnect", () => {
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
      });
    });

    ioInstance = io;
  });
}

export function getReciever(userId) {
  return ioInstance?.sockets?.adapter?.rooms?.get(userId);
}



// import { Server } from "socket.io";

// let connections = {};
// let messages = {};
// let timeOnline = {};

// export const connectToSocket = (server) => {
//   const io = new Server(server, {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"],
//       allowedHeaders:["*"],
//       credentials:true
//     }
//   });

//   io.on("connection", (socket) => {
//     console.log("something connected");

//     // JOIN CALL
//     socket.on("join-call", (path) => {
//       if (connections[path]===undefined) {
//         connections[path] = [];
//       }

//       connections[path].push(socket.id);
//       timeOnline[socket.id] = new Date();

//       // Send old messages
//       messages[path].forEach((msg) => {
//         io.to(socket.id).emit(
//           "chat-message",
//           msg.data,
//           msg.sender,
//           msg.socketId
//         );
//       });
//     });

//     // SIGNAL (WebRTC)
//     socket.on("signal", (toId, message) => {
//       io.to(toId).emit("signal", socket.id, message);
//     });

//     // CHAT MESSAGE
//     socket.on("chat-message", (data, sender) => {
//       let matchingRoom = "";

//       for (const room in connections) {
//         if (connections[room].includes(socket.id)) {
//           matchingRoom = room;
//           break;
//         }
//       }

//       if (matchingRoom) {
//         messages[matchingRoom].push({
//           sender,
//           data,
//           socketId: socket.id,
//         });

//         connections[matchingRoom].forEach((id) => {
//           io.to(id).emit("chat-message", data, sender, socket.id);
//         });

//         console.log("Message:", sender, data);
//       }
//     });

//     // DISCONNECT
//     socket.on("disconnect", () => {
//       console.log("User disconnected:", socket.id);

//       for (const room in connections) {
//         const index = connections[room].indexOf(socket.id);
//         if (index !== -1) {
//           connections[room].splice(index, 1);

//           connections[room].forEach((id) => {
//             io.to(id).emit("user-left", socket.id);
//           });

//           if (connections[room].length === 0) {
//             delete connections[room];
//             delete messages[room];
//           }
//           break;
//         }
//       }
//     });
//   });

//   return io;
// };

import { Server } from "socket.io"


let connections = {}
let messages = {}
let timeOnline = {}

export const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {

        console.log("SOMETHING CONNECTED")

        socket.on("join-call", (path) => {

            if (connections[path] === undefined) {
                connections[path] = []
            }
            connections[path].push(socket.id)

            timeOnline[socket.id] = new Date();

            // connections[path].forEach(elem => {
            //     io.to(elem)
            // })

            for (let a = 0; a < connections[path].length; a++) {
                io.to(connections[path][a]).emit("user-joined", socket.id, connections[path])
            }

            if (messages[path] !== undefined) {
                for (let a = 0; a < messages[path].length; ++a) {
                    io.to(socket.id).emit("chat-message", messages[path][a]['data'],
                        messages[path][a]['sender'], messages[path][a]['socket-id-sender'])
                }
            }

        })

        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        })

        socket.on("chat-message", (data, sender) => {

            const [matchingRoom, found] = Object.entries(connections)
                .reduce(([room, isFound], [roomKey, roomValue]) => {


                    if (!isFound && roomValue.includes(socket.id)) {
                        return [roomKey, true];
                    }

                    return [room, isFound];

                }, ['', false]);

            if (found === true) {
                if (messages[matchingRoom] === undefined) {
                    messages[matchingRoom] = []
                }

                messages[matchingRoom].push({ 'sender': sender, "data": data, "socket-id-sender": socket.id })
                console.log("message", matchingRoom, ":", sender, data)

                connections[matchingRoom].forEach((elem) => {
                    io.to(elem).emit("chat-message", data, sender, socket.id)
                })
            }

        })

        socket.on("disconnect", () => {

            var diffTime = Math.abs(timeOnline[socket.id] - new Date())

            var key

            for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {

                for (let a = 0; a < v.length; ++a) {
                    if (v[a] === socket.id) {
                        key = k

                        for (let a = 0; a < connections[key].length; ++a) {
                            io.to(connections[key][a]).emit('user-left', socket.id)
                        }

                        var index = connections[key].indexOf(socket.id)

                        connections[key].splice(index, 1)


                        if (connections[key].length === 0) {
                            delete connections[key]
                        }
                    }
                }

            }


        })


    })


    return io;
}





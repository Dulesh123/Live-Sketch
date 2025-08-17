// import { WebSocket, WebSocketServer } from "ws";
// import jwt from 'jsonwebtoken';
// import {prismaClient} from '@repo/db/client';
// const JWT_SECRET = "Dulesh@1234";
// const wss = new WebSocketServer({ port: 8000 });

// type User = {
//     userId: string;
//     ws: WebSocket;
//     rooms: string[];
// };

// let users: User[] = [];

// function checkUser(token: string): string | null {
//     try {
//         const validUser = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
//         if (!validUser || typeof validUser !== "object" || !validUser.id) return null;
//         return validUser.id;
//     } catch {
//         return null;
//     }
// }

// wss.on("connection", (ws, request) => {
//     const url = request.url;
//     if (!url) return;

//     const queryParams = new URLSearchParams(url.split('?')[1]);
//     const token = queryParams.get('token') as string;
//     const authUser = checkUser(token);
//     if (!authUser) {
//         ws.close();
//         return;
//     }

//     const userId = authUser;

//     // Remove existing user with same ID
//     users = users.filter(u => u.userId !== userId);
//     users.push({ userId, rooms: [], ws });

//     console.log(`User connected: ${userId}`);

//     ws.on("message", async (data) => {
//         let msgdata;
//         try {
//             msgdata = JSON.parse(data.toString());
//         } catch {
//             ws.send("Invalid JSON");
//             return;
//         }

//         const user = users.find(x => x.ws === ws);
//         if (!user) return;

//         if (msgdata.type === "join_room") {
//             if (!user.rooms.includes(msgdata.roomId)) {
//                 user.rooms.push(msgdata.roomId);
//                 console.log(`${userId} joined room ${msgdata.roomId}`);
//             }
//         }

//         if (msgdata.type === "leave_room") {
//             user.rooms = user.rooms.filter(x => x !== msgdata.room);
//         }

//         if (msgdata.type === "chat") {
//             const { roomId, message } = msgdata;
//             console.log(`Message to room ${roomId}: ${message}`);

//            try{
             
// await prismaClient.chat.create({
//     data:{
//         roomId:roomId,
//         userId:userId,
//         message:message

//     }
// })
//            }catch(e){
//             ws.send("something went wrong");
//            }
            
//             users.forEach(u => {
//                 if (u.rooms.includes(roomId)) {
//                     u.ws.send(JSON.stringify({
//                         type: "chat",
//                         roomId,
//                         message,
//                         from: userId
//                     }));
//                 }
//             });
//         }

//         console.log("All users:", users.map(u => ({ userId: u.userId, rooms: u.rooms })));
//     });

//     ws.on("close", () => {
//         users = users.filter(u => u.ws !== ws);
//         console.log(`User disconnected: ${userId}`);
//     });
// });



import { WebSocket, WebSocketServer } from "ws";
import jwt from 'jsonwebtoken';
import { prismaClient } from '@repo/db/client';

const JWT_SECRET = "Dulesh@1234";

const wss = new WebSocketServer({ port: 8000 });

type User = {
    userId: string;
    ws: WebSocket;
    rooms: string[];
};

let users: User[] = [];

// Verify JWT token and return user ID
function checkUser(token: string): string | null {
    try {
        const validUser = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
        if (!validUser || typeof validUser !== "object" || !validUser.id) return null;
        return validUser.id;
    } catch {
        return null;
    }
}

// Handle new connection
wss.on("connection", (ws, request) => {
    const url = request.url;
    if (!url) return;

    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') as string;
    const authUser = checkUser(token);

    if (!authUser) {
        ws.close();
        return;
    }

    const userId = authUser;

    // Remove any existing user with the same ID
    users = users.filter(u => u.userId !== userId);
    users.push({ userId, rooms: [], ws });

    console.log(`✅ User connected: ${userId}`);

    // Listen for messages from this user
    ws.on("message", async (data) => {
        let msgdata;
        try {
            msgdata = JSON.parse(data.toString());
        } catch {
            ws.send("❌ Invalid JSON");
            return;
        }

        const user = users.find(x => x.ws === ws);
        if (!user) return;

        // Handle room joining
        if (msgdata.type === "join_room") {
            const roomId = msgdata.roomId;
            if (!user.rooms.includes(roomId)) {
                user.rooms.push(roomId);
                console.log(`➕ ${userId} joined room ${roomId}`);
            }
        }

        // Handle room leaving
        if (msgdata.type === "leave_room") {
            const room = msgdata.room;
            user.rooms = user.rooms.filter(x => x !== room);
            console.log(`➖ ${userId} left room ${room}`);
        }

        // Handle chat messages
        if (msgdata.type === "chat") {
            const { roomId, message } = msgdata;
            console.log(`💬 Message to room ${roomId}: ${message}`);

            try {
                await prismaClient.chat.create({
                    data: {
                        roomId,
                        userId,
                        message
                    }
                });
            } catch (e) {
                ws.send("❌ Something went wrong saving chat");
            }

            users.forEach(u => {
                if (u.rooms.includes(roomId)) {
                    u.ws.send(JSON.stringify({
                        type: "chat",
                        roomId,
                        message,
                        from: userId
                    }));
                }
            });
        }

        // Handle Fabric.js canvas events
        if (msgdata.type === "canvas_event") {
            const { roomId, objectData, eventType } = msgdata;

            console.log(`🖌️ Canvas event in ${roomId} by ${userId}: ${eventType}`);

            users.forEach(u => {
                if (u.rooms.includes(roomId)) {
                    u.ws.send(JSON.stringify({
                        type: "canvas_event",
                        roomId,
                        eventType,
                        objectData,
                        from: userId
                    }));
                }
            });
        }

        console.log("🧑‍🤝‍🧑 Active users:", users.map(u => ({ userId: u.userId, rooms: u.rooms })));
    });

    // Handle user disconnect
    ws.on("close", () => {
        users = users.filter(u => u.ws !== ws);
        console.log(`❌ User disconnected: ${userId}`);
    });
});

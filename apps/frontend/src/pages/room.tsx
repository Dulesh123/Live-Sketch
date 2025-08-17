// CreateRoomPage.tsx
import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateRoomPage() {
  const [roomId, setRoomId] = useState("");
  const slugref=useRef<HTMLInputElement>(null);
  const naviagate=useNavigate();
  const slug=slugref.current?.value;
const token=localStorage.getItem('token');
console.log(token);
  const handleCreateRoom = async () => {
    console.log("Create Room clicked");
    // Add your create room logic here
const room=await axios.post('http://localhost:4000/draw-app/create-room',{
    
    slug:slug
},{
    headers:{
        token:token
    }
})

if(room){
    alert("Room created");
   
naviagate('/canvas');
}else{
    alert("Unable to create the room");
}
  };

  const handleJoinRoom = async () => {
    const room=await axios.post("http://localhost:4000/draw-app/join-room",{
      slug:slug
    },{
      headers:{
        token:token

      }
    })
    if(room){
      alert("you have joined " + slug);
      console.log(room.data.roomId);
      localStorage.setItem("roomId",room.data.roomId);
      naviagate('/canvas')
    }else{
      alert("unable to join "+ slug)
    }
    // Add your join room logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome</h1>

        <input
        ref={slugref}
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex flex-col gap-4">
          <button
            onClick={handleCreateRoom}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition duration-200"
          >
            Create Room
          </button>
          <button
            onClick={handleJoinRoom}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition duration-200"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}

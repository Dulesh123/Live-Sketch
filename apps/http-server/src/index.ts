import express from 'express';
import { prismaClient } from '@repo/db/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { Authmiddleware } from './Authmiddleware.js';
import { use } from 'react';
import cors from 'cors'
import { PrismaClient } from 'node_modules/@repo/db/generated/prisma/index.js';

dotenv.config();
// const JWT_SECRET="process.env.JWT_SECRET"
const JWT_SECRET="Dulesh@1234"
const app = express();
app.use(express.json());
app.use(cors());
app.post("/draw-app/signup", async (req, res) => {
  const { email, name, password } = req.body;
const hashpassword=await bcrypt.hash(password,5);
  
    try{
        const user = await prismaClient.user.create({
      data: {
        email,
        name,
        password:hashpassword
      }
    });
    }catch(e){
        console.log(e);
        res.status(500).send("Unable to signup")
    }
    res.status(200).send("user signed up successfully");
  
});
app.post("/draw-app/signin",async (req,res)=>{

  const{email,password}=req.body;
  try{
    const user=await prismaClient.user.findUnique({
      where:{
        email:email
      }
    });
    if(!user){
      return res.status(401).send("Invalid email or password");
    }
    const isValid=await bcrypt.compare(password,user.password);
    if(!isValid){
      return res.status(401).send("Invalid email or password");
    }
    const token=jwt.sign({id:user.id},JWT_SECRET);
    res.status(200).json({msg:"user signed in successfully",
     token: token
    });
    
    req.headers.token=token;
  }catch(e){
    console.log(e);
    res.status(500).send("Unable to signin");
  }
})

app.post("/draw-app/create-room",Authmiddleware,async (req,res)=>{
  const slug=req.body.slug as string;
  const userId=req.headers.userId as string;
  let user
try{
   user=await prismaClient.room.create({
    data:{
      slug:slug,
      adminId:userId

    }
  })
}catch(e){
  res.send(e);
}
res.json({
  msg:"room created",
  roomId:user?.id
})
})
app.post('/draw-app/join-room', Authmiddleware,async (req,res)=>{
  const slug=req.body.slug;
const room=await prismaClient.room.findFirst({
  where:{
    slug:slug
  }
})

if(room){
  res.json({
    roomId:room.id
  })
}else{
  res.send("unable to join room")
}
})


app.get("/draw-app/get-room", Authmiddleware, async (req, res) => {
  const roomId = Number(req.headers.roomId);

  const messages = await prismaClient.chat.findMany({
    where: {
      id: roomId,
    },
    orderBy: {
      id: "desc",
    },
    take: 50,
  });

  res.json({
    messages,
  });
});

app.listen(4000, () => {
  console.log("server is running at port 4000");
});

import express from "express";

const app = express();
import PORT = 3000;

app.use(express.json());

app.listen(PORT, ()=>{
    console.log(`Your port is runnnign at port ${3000}`);
})
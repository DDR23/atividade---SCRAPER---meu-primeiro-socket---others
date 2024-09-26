import express from "express";
import { config } from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import HandleScraper from './handlers/HandleScraper';

config();

const app = express();
app.use(express.json());

const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: process.env.URL_BACKEND as string } });
HandleScraper(io);

httpServer.listen(5000, () => console.log('servidor rodando'));

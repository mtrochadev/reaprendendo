// src/server.ts
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Criando o servidor HTTP que o Socket.io precisa 
const httpServer = createServer(app);

// Configurando o Socket.io com permissão de CORS para o Front-end
const io = new Server(httpServer, {
  cors: {
    origin: "*", // URL do front (ex: http://localhost:5173)
    methods: ["GET", "POST"]
  }
});

// conexão do WebSocket
io.on('connection', (socket) => {
  console.log(`Usuário conectado: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Usuário desconectado: ${socket.id}`);
  });
});

// Rota de teste HTTP 
app.get('/health', (req, res) => {
  res.json({ status: "OK", message: "Backend rodando perfeitamente!" });
});

// Injetando o 'io' nas requisições para que os controllers HTTP consigam emitir eventos em tempo real
app.use((req, res, next) => {
  req.io = io;
  return next();
});

// ATENÇÃO: Para o Socket.io funcionar
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

// Tipagem rápida para o Express reconhecer o req.io
declare global {
  namespace Express {
    interface Request {
      io: Server;
    }
  }
}
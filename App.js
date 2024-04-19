import express from 'express';
import Hello from './Hello.js';
import Lab5 from './Lab5.js';
import cors from "cors";
import CourseRoutes from './Kanbas/courses/routes.js';
import ModuleRoutes from "./Kanbas/modules/routes.js";
import mongoose from 'mongoose';
import UserRoutes from './Kanbas/Users/routes.js';
import session from "express-session";
import "dotenv/config";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
const db = mongoose.connection;
db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.on('disconnected', () => {
   console.log('MongoDB disconnected');
});

console.log(process.env.CONNECTION_STRING);


mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3006'
}));
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        //domain: process.env.HTTP_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));
CourseRoutes(app);
app.use(express.json());
UserRoutes(app);
ModuleRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);
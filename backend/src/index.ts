import 'dotenv/config'
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import connectDB from "./utils/db";
import router from "./route/user.route";

const app = express()

app.use(cors({
    credentials: true
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.get("/", ( _, res: express.Response)=>{
    res.status(200).json("test api")
})

app.use("/api", router);

const PORT = process.env.PORT || 3000;

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server is running at: http://localhost:${PORT}`)
    })
})
// src/index.ts
import cors from 'cors';
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

// npm run dev

/*
 * Load up and parse configuration details from
 * the `.env` file to the `process.env`
 * object of Node.js
 */
dotenv.config();

/*
 * Create an Express application and get the
 * value of the PORT environment variable
 * from the `process.env`
 */
const app: Express = express();
const port = process.env.PORT ?? 3000;
app.use(cors());

const tableData =
  Array.from({ length: 1000 }, (_, i) => (
    {
      "Header1": `Data ${i + 1}`,
      "Header2": `Data ${i + 1001}`
    }));

/* Define a route for the root path ("/")
 using the HTTP GET method */
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/tableData", (req: Request, res: Response) => {
  res.send(tableData);
});

/* Start the Express app and listen
 for incoming requests on the specified port */
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

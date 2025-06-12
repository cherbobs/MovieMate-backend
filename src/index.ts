// src/index.ts
import express, { Application, Request, Response } from "express";
import { supabase } from "./supabaseClient";
import cors from "cors";

const app: Application = express();

app.use(cors());

app.use(express.json());

// @ts-ignore
app.get("/", async (_req: Request, res: Response) => {
  const { data, error } = await supabase.from("films").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
  console.log(data)
});

// @ts-ignore
app.get("/users", async (_req: Request, res: Response) => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

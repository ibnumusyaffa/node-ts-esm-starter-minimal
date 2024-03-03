import { hello } from "@/constants/message.js"
import "dotenv/config"
import express, { NextFunction, Request, Response } from "express"

const app = express()
const PORT = process.env.PORT || 3000

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.send({ message: hello })
  } catch (error) {
    return next(error)
  }
})

app.use((err: Error, req: Request, res: Response) => {
  if (process.env.NODE_ENV === "development") {
    console.error(err)
  }
  res.status(500).send({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  })
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

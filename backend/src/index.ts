import express, { Request, Response } from "express"
import { User } from "./src/entity/user.entity"
import { myDataSource } from "./app-data-source"

// establish database connection
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

// create and setup express app
const app = express()
app.use(express.json())

// register routes
app.get("/users", async function (req: Request, res: Response) {
    const users = await myDataSource.getRepository(User).find()
    res.json(users)
})

app.get("/users/:id", async function (req: Request, res: Response) {
   
    const results = await myDataSource.getRepository(User).findOneBy({
        id: parseInt(req.params.id)
    })
    return res.send(results)
})

app.post("/users", async function (req: Request, res: Response) {
    const user = await myDataSource.getRepository(User).create(req.body)
    const results = await myDataSource.getRepository(User).save(user)
    return res.send(results)
})

// app.put("/users/:id", async function (req: Request, res: Response) {
//     const user = await myDataSource.getRepository(User).findOneBy({
//         id: req.params.id,
//     })
//     myDataSource.getRepository(User).merge(user, req.body)
//     const results = await myDataSource.getRepository(User).save(user)
//     return res.send(results)
// })


app.put("/users/:id", async function (req: Request, res: Response) {
  const user = await myDataSource.getRepository(User).findOneBy({
      id: parseInt(req.params.id),
  })

  if (user) {
      myDataSource.getRepository(User).merge(user, req.body)
      const results = await myDataSource.getRepository(User).save(user)
      return res.send(results)
  } else {
      return res.status(404).send("User not found")
  }
})


app.delete("/users/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(User).delete(req.params.id)
    return res.send(results)
})

// start express server
app.listen(3000, () => {
  console.log('Example app listening on port 3000')
})
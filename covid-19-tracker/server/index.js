import express from 'express';
import cors from 'cors'
import { User } from "./config.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const snapshot = await User.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});

app.get('/app/', (req, res) => {
    res.json({"message":"Your API works! (200)"})
    res.status(200)
    });    

app.post("/create", async (req, res) => {
  const data = req.body;
  await User.add({ data });
  res.json({ msg: "User Added" });
  res.status(200)
});

app.post("/update", async (req, res) => {
  const id = req.body.id;
  delete req.body.id;
  const data = req.body;
  await User.doc(id).update(data);
  res.send({ msg: "Updated" });
});

app.post("/delete", async (req, res) => {
  const id = req.body.id;
  await User.doc(id).delete();
  res.send({ msg: "Deleted" });
});

const server = app.listen(5000, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',5000))
});
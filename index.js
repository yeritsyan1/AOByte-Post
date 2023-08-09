import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";
import bcryptjs from "bcryptjs";

const app = express();
app.use(express.static("./my-posts/build"));
app.use(express.json());
app.use(cors());

const url = process.env.MONGO_DB_URL;
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
});

// sign up
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    await client.connect();

    const database = client.db("signup");
    const collection = await database.collection("users");

    const existingUser = await collection.findOne({ email });

    if (existingUser) {
     //   return res.status(400).send("This email is already registered.");
        return res.status(400).json({message: "This email is already registered."});
    }

    const hashPassword = bcryptjs.hashSync(password, 7);
    await collection.insertOne({ email, password: hashPassword });
    res.status(200).json({message: 'Congratulations your account has been created!'})
  } catch (err) {
    res.status(400).send("Sign up error");
  } finally {
    await client.close();
  }
});

// sign in
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    await client.connect();
    const database = client.db("signup");
    const collection = await database.collection("users");
    const user = await collection.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: `${email} not found.`, statusCode: 400 });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    return res.status(200).json({ message: "" });
  } catch (err) {
    res.status(400).json({ message: "Login error" });
  } finally {
    await client.close();
  }
});

app.listen(process.env.PORT || 3001);

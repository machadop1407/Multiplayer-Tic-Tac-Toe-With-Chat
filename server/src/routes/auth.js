import express from "express";
import bcrypt from "bcrypt";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const api_key = "nv2zh5h8pmyh";
const api_secret =
  "gf4wmuf9rj9vzfpvrdjkwr7qapwty64jdrb48qv7dmqejhrfhc6z94zr2atzcw4q";
const serverClient = StreamChat.getInstance(api_key, api_secret);

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
    res.json({ token, firstName, lastName, username, userId, hashedPassword });
  } catch (error) {
    res.json(error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const { users } = await serverClient.queryUsers({ name: username });

  if (!users.length) return res.status(400).json({ message: "User not found" });

  const success = await bcrypt.compare(password, users[0].hashedPassword);

  const token = serverClient.createToken(users[0].id);

  if (success) {
    res.status(200).json({
      token,
      firstName: users[0].firstName,
      lastName: users[0].lastName,
      username,
      userId: users[0].id,
    });
  } else {
    res.status(500).json({ message: "Incorrect password" });
  }
});

export { router };

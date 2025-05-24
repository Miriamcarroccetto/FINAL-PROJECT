import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { generateToken } from "../utils/generateToken.js";

const jwtSecretKey = process.env.JWT_SECRET_KEY;

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Credenziali non valide" });
    }

    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Credenziali non valide" });
    }

    const token = generateToken({ id: user._id, isAdmin: user.isAdmin})


   
    res.status(200).json({
      message: "Login effettuato con successo",
      token,
      user: {
        id: user._id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore interno del server" });
  }
};

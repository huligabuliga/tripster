import {User} from "../models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const register = async (req, res, next) => {
    try{
        const hash = bcrypt.hashSync(req.body.password, 10)
        const newUser = User({
            ...req.body,
            password: hash,
        });

        await newUser.save();
        res.status(201).send("user created")
    }catch(err){
        if (err.code === 11000) {
            res.status(400).json({ message: 'username already exists' });
          } else {
            res.status(500).json({ message: err.message });
          }


    }
}

export const login = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ message: 'user not found' });
      }
  
      const isCorrect = bcrypt.compareSync(req.body.password, user.password);
      if (!isCorrect) {
        return res.status(400).json({ message: 'password incorrect' });
      }
  
      // json web token
      const token = jwt.sign({
        id: user._id,
      }, process.env.JWT_SECRET);
  
      const { password, ...info } = user._doc;
  
      res.cookie('accessToken', token, {
        httpOnly: true,
      });
  
      res.status(200).json(info);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

export const logout = async (req, res) => {
    res.clearCookie("accessToken", {
        sameSite: "none",
        secure: true,

    })
    .status(200)
    .send("logged out")
}
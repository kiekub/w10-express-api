import { Router } from "express";
import { User } from "../../models/user.model.js";

export const router = Router();

// Read users
// path หมายถึง endpoint ได้ แต่path บางตัวเป็นแค่ทางผ่านไม่ใช่ endpoint
router.get("/", async (req, res, next) => {
    try {
        // 1. get users data from database
        const users = await User.find();
        // 2. Send response object back to client
        return res.status(200).json({ success: true, data: users });
        } catch (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
    }
);

// Create users
router.post("/", async (req, res, next) => {
     try {

        const { username, email, password, role } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({ 
            success: false, 
            error: "username, email and password are required" 
            });
        }

        const newUser = await User.create({ username, email, password, role });

        // แปลงจาก mongoDB เป็น obj
        const { password: _password, ...userWithoutPassword} = newUser.toObject();


        return res.status(201).json(userWithoutPassword);

        } catch(err) {
            next(err);
        }
    }
);

// Update users
router.put("/:id", async (req, res, next) => {
  try {
    //เอา data เดิมจาก id
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json("error: username, email and password are required!");
    }
    //สร้าง username , email , password อันใหม่
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: username,
        email: email,
        password: password,
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");
    //response ค่าใหม่กลับ username , email , password
    if (!updatedUser) {
      return res
        .status(404)
        .json({ error: " user , email and password are not completed" });
    }
    return res.status(200).json(updatedUser);
    
  } catch (err) {
    next(err);
  }
});

// Delete users 
router.delete("/:id", async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res
                .status(404)
                .json({ error: " user not found" });
        }
        return res.status(200).json({ success: true, data: deletedUser });
        } catch(err) {
            next(err);
        }
    }   
);

// Get single user
router.get("/:id", async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res
                .status(404)
                .json({ error: " user not found" });
        }
        return res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});
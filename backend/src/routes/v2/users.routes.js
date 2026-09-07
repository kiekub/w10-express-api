import { Router } from "express";
import { User } from "../../models/user.model";

export const router = Router();

// Read users
// path หมายถึง endpoint ได้ แต่path บางตัวเป็นแค่ทางผ่านไม่ใช่ endpoint
router.get("/", async (req, res, next) => {
    try {
        // 1. get users data from database
        const user = await User.find();
        // 2. Send response object back to client
            return res.status(200).json({ success: true, data: cleanUsers });
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
        const { passwod: _password, ...userWithoutPassword} = newUser.toObject();


        return res.status(201).json(userWithoutPassword);

        } catch(err) {
            next(err);
        }
    }
);

// Update users
router.put("/:id", (req, res, next) => {
    try {

        } catch (err) {
            next(err);
        }
    }
);

// Delete users 
router.delete("/:id", (req, res, next) => {
    try {

        } catch(err) {
            next(err);
        }
    }   
);
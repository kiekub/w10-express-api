import mongoose from "mongoose";
// import bcrypt from "bcrypt";

// เหมือนการสร้าง class Schema
const userSchema = new mongoose.Schema(
    {
        // สามารถทำ validate ก่อน frontend ได้ เช่น field user การเช็คการใส่ค่าต่างๆ
        username: { type: String, required: true, trim: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true, match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"] }, // แก้ไขตรงนี้แล้ว
        password: { type: String, required: true, minlength: 8, select: false }, // Protecting Password Leaks
    },

    // เป็น obj ในการสร้างเวลาในการสร้าง, แก้ไขข้อมูล
    { timestamps: true },
);

// userSchema.pre("save", async function () {
//   // 1. หากรหัสผ่านไม่ได้ถูกแก้ไข ให้หยุดทำงานตรงนี้ (Mongoose จะไปขั้นตอนต่อไปเอง)
//   if (!this.isModified("password")) return; 

//   try {
//     // 2. เข้ารหัสผ่านด้วย bcrypt พร้อมใช้คำสั่ง await 
//     this.password = await bcrypt.hash(this.password, 12); 
    
//     // ตรงนี้รันจบปุ๊บ ระบบจะส่งไม้ต่อเพื่อไปบันทึกลงฐานข้อมูลให้เองอัตโนมัติครับ
//   } catch (err) {
//     // 3. ถ้าเกิด Error ให้พ่นออกไปด้วยคำสั่ง throw
//     throw err; 
//   }
// });


export const User = mongoose.model("User", userSchema);
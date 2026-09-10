import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
    let token = req.cookies.accessToken;
    if(!token){
        return res.status(401).json({success: false, message: "Access denied, No token!👺"});
    }

    try {
        const dcodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.user = { _id: dcodedToken.userId };
        next();

    } catch(err){
      next(err);
    }


}
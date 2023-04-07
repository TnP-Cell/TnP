import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtverify = async (req, res, next) => {
  try {
    let token = req.headers.auth_token;
    var decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.userid = decoded.id;
    next();
  } catch (error) {
    res.json({ status: -1 });
  }
};

export default jwtverify;

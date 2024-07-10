import jwt from "jsonwebtoken";
const generateAuthToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWTPRIVATEKEY, {
    expiresIn: "1d",
  });
  return token;
};
export default generateAuthToken;

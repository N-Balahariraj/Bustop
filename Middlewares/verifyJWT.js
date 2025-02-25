const jwt = require("jsonwebtoken");
const UserModel = require("../Models/user.model.js");
require("dotenv").config();

const verifyAccessToken = (req, res, next) => {
  const accessToken = req.cookies.ACCESS_TOKEN;
  const accessSecret = process.env.ACCESS_TOKEN_SECRET;
//   console.log("accessToken : ",accessToken)

  jwt.verify(accessToken, accessSecret, async function (err, verifyedToken) {
    if (err) {
      res.status(401).send({ message: "Invalid JWT Token" });
      return;
    }
    try {
      const user = await UserModel.findById(verifyedToken.id);
      if(!user){
        throw new Error("Unable to fetch the user. Try logging in again")
      }
      req.user = user
      next()
    } 
    
    catch (error) {
        console.log("err : ",error)
        res.status(500).json({ message: "server not available", error: "err" });
    }
  });
};

const verifyRefreshToken = (req, res, next) => {

    const refreshToken = req.cookies.REFRESH_TOKEN 
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET

    jwt.verify(refreshToken,refreshSecret, async function (err, verifyedToken) {
        if (err) {
          res.status(401).send({ message: "Invalid JWT Token" });
          return;
        }
        
        try {
            const user = await UserModel.findById(verifyedToken.id)
            if(!user)
                throw new Error("Refresh token expired. Try logging in again")
            req.user = user
            next()
        } 
        
        catch (error) {
            console.log("err : ",error)
            res
              .status(500)
              .json({ message: "server not available", error: "err" });
        }
      }
    )
};

module.exports = { verifyAccessToken, verifyRefreshToken };

import User from "../schema/user.Schema.js";

import jwt from "jsonwebtoken";

 const isAuthenticated = async (req, res, next) => {
  try {

    // console.log(req.headers);


    const token = req.headers?.authorization;
    // console.log("hi");
    // console.log( `isAuthenticated =>${token}`);

    if (token === undefined) {
      return res.status(401).send({
        message: "places login first",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);

    // console.log(decoded);

    next();
    
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};


export default isAuthenticated
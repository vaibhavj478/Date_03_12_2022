
import User from "../schema/user.Schema.js";


export const createUser = async (req, res) => {
  try {
    let reqUser = req.body;
    if (reqUser.mobile.length !== 10 ) {
      res.status(200).send("Mobile length should be 10 digits");
      return;
    }

    // console.log(req.body);

    const { name, mobile } = reqUser;

    let oldUser = await User.findOne({mobile});
    console.log(name, mobile);
    // console.log(oldUser);

    if (oldUser) {
      res
        .status(400)
        .send("Account is already exits with this name and mobile");
    } else {
      if (name && mobile && reqUser.address) {
        let user = await User.create(reqUser);

        const token = await user.generateToken();

        console.log(token);

        const options = {
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };

        res.status(200).cookie("token", token, options).send({
          success: true,
          user: user,
        });
      } else {
        res.status(200).send("please if all Credentials");
        return;
      }
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }

  return;
};

export const getAllUser = async (req, res) => {
  try {
    let users = await User.find({});
    res.status(200).send({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = user.posts;
    const followers = user.followers;
    const userId = user._id;
    const following = user.following;

    await user.remove();

    const options = {
      expires: new Date(Date.now()),
      httpOnly: true,
    };

    res.cookie("token", null, options);

    res.status(200).send({
      success: true,
      message: "Profile Deleted",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { name, mobile } = req.body;

    const user = await User.findOne({ mobile })
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "user dose not exist",
      });
    }

    const isMatch = await user.isMatch(mobile);

    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid mobile number",
      });
    }

    // console.log("token");
    const token = await user.generateToken();

    // console.log("tokenEnd");

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).send({
      success: true,
      user: user,
      token: token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const options = {
      expires: new Date(Date.now()),
      httpOnly: true,
    };

    res.status(200).cookie("token", null, options).send({
      success: true,
      message: "Logged out",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(404).send({
        success: false,
        message: "please provide old and new password's",
      });
    }

    const isMatch = await user.matchPassword(oldPassword);

    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Incorrect Old password",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password updated",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name,mobile  , address } = req.body;
    console.log("hi");

    if (name) {
      user.name = name;
    }

    if (mobile) {
      user.mobile = mobile;
    }
    if (address) {
      user.address = address;
    }

    await user.save();
    console.log(user);

    res.status(200).send({
      success: true,
      message: "Profile updated",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    res.status(200).send({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

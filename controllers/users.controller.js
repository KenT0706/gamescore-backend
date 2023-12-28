const { log } = require("console");
const User = require("../models/user.js");
const { hashPassword } = require("../utils/bcrypt.util.js");

async function getAllUsers(req, res) {
  try {
    // Find all users (without pagination)
    const users = await User.findAll();

    // Send all users as response
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function getUserById(req, res) {
  try {
    // Find user by id
    const user = await User.findByPk(parseInt(req.params.userId));

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

// TO TEST: authorization on creating new user
async function createUser(req, res) {
  try {
    if (req.user.role !== "admin") {
      throw " Unauthorized";
    }

    const hashedPassword = hashPassword(req.body.password);

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function updateUser(req, res) {
  try {
    // User can only update their own profile
    // TESTING
    console.log("checking req", req);
    const user = await User.findByPk(parseInt(req.params.userId));
    console.log("Update User", user);
    console.log("apolo", user.id);
    if (user.id !== req.user.id) {
      throw "Cannot update other people's profile";
    } else {
      console.log("checkpoint 1", req.body.password);
      const hashedPassword = hashPassword(req.body.password);
      console.log("checkpoint 1.5", hashedPassword);
      const updatedUser = await User.update(
        {
          ...req.body,
          password: hashedPassword,
        },
        {
          where: {
            id: parseInt(req.params.userId),
          },
        }
      );
      console.log("checkpoint 2", updatedUser);
      // Send updated updatedUser as response
      res.json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function deleteUser(req, res) {
  try {
    // User can only delete their own profile
    // TESTING

    const user = await User.findByPk(parseInt(req.params.userId));
    console.log("Delete User: ", user);
    console.log(`req role: `, req.user.role);
    console.log(`params role: `, user.role);

    if (req.user.role !== "admin" && user.id !== req.user.id) {
      throw "Cannot delete other people's profile";
    } else {
      const user = await User.destroy({
        where: {
          id: parseInt(req.params.userId),
        },
      });
      // Send deleted user as response
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
async function verifyByUserId(req, res) {
  const user = await User.findByPk(parseInt(req.params.userId));
  
    // if (req.user.role != "admin") {
    //   throw "Unatheorized";
    // } else {
      console.log(req.body+ "hellow");
      const updatedUser = await User.update(
        req.body,
        {
          where: {
            id: parseInt(req.params.userId),
          },
        }
      );

      res.json(updatedUser);
    // }
    try {
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  verifyByUserId,
};

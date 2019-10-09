const User = require('./../models/User');


module.exports = {

  currUser: async (req, res, next) => {
    let id = req.params.id
    console.log('id', id)
    try {
      const user = await User.findById({
        _id: id
      })
      if (!user) {
        res.status(400).send({
          success: false,
          message: "User not found"
        });
      } else {
        res.status(200).json({
          user
        })
      }
    } catch (error) {
      res.json(error)
    }

  },

  account: async (req, res, next) => {
    try {
      let id = req.params.id
      const user = await User.findById({
        _id: id
      })
      if (!user) {
        res.status(400).send({
          success: false,
          message: "User not found"
        });
      } else {
        res.status(200).send({
          success: true,
          user
        })
      }
    } catch (error) {
      res.json(error)
    }
  },

  // google: async (req, res) => {

  // },

  deleteUser: (req, res, next) => {
    let id = req.params.id;
    User.deleteOne({
      _id: id
    }, (err, user) => {
      if (err) {
        res.status(400).json({
          error: "No user",
          err
        });
      } else {
        res.status(200).json({
          success: "User deleted",
          user
        });
      }
    })
  },
}

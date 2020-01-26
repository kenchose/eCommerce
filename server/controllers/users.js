const User = require('./../models/User');


module.exports = {

  currUser: async (req, res, next) => {
    let id = req.params.id
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

  editUser: async (req, res, next) => {
    const id = req.params.userId;
    const email = req.body.local.email;
    const user = await User.findById({
      _id: id
    });
    const emailExist = await User.findOne({
      "local.email": email
    })
    try {
      if (emailExist && emailExist.local.email !== user.local.email) {
        console.log('email exists and its not mine')
        res.status(200).json({
          error: "Email already registered",
          user: user
        })
      } else {
        if (!emailExist || emailExist.local.email === user.local.email) {
          console.log("email doesnt exist or email exist and it's current user")
          const currUser = await User.findByIdAndUpdate({
            _id: id
          }, req.body);
          if (!currUser) {
            console.log('cannot fin user')
            return res.status(400).json({
              errorMessage: "Could not find user"
            })
          } else {
            console.log('====edit user====')
            res.status(200).json({
              message: "Successfully edit user",
              user: currUser
            })
          }
        }
      }
    } catch (error) {
      console.log('is there a problem')
      res.json({
        errorMessage: error
      })
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

  logout: (req, res, next) => {
    req.logout();
    res.redirect('/cartify')
  }
}

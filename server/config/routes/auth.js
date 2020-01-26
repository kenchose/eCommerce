const router = require("express").Router();
const auth = require("./../../controllers/auth");
const {
  validateBody,
  schemas
} = require("./../../models/validation");
const passport = require("passport");
const passportAuth = require("./../passport");
// const passportGoogle = passport.authenticate("google", {
//   scope: ["profile", "email"],
//   session: false
// });
// const passportFacebook = passport.authenticate("facebook", {
//   scope: ["profile", "email"],
//   session: false
// })

router.post("/register", validateBody(schemas.authSchema), (req, res, next) => {
  auth.register(req, res, next);
});

router.post("/login", (req, res, next) => {
  auth.login(req, res, next);
});


// // google login route
// router.get("/google", passportGoogle);
// // callback route for google redirect
// // router.get(
// //   "/google/redirect",
// //   passport.authenticate("google", {
// //     failerRedirect: "/sign-in",
// //     successRedirect: "/cartify/products",
// //     session: false
// //   })
// // );

// // facebook login route
// router.post("/facebook", passport.authenticate("facebook", {
//   session: false
// }), (req, res, next) => {
//   auth.facebookOAuth(req, res, next);
// }),
// callback route for facebook redirect

module.exports = router;

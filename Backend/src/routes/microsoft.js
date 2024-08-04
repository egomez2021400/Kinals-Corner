const express = require("express");
const passport = require("passport");
const loginRouter = express.Router();

loginRouter.get(
  "/microsoft",
  passport.authenticate("auth-microsoft", {
    prompt: "select_account",
    session: false,
  })
);

loginRouter.get(
    "/microsoft/callback",
    passport.authenticate("auth-microsoft", {
      failureRedirect: "/auth/microsoft",
      session: false,
    }),
    (req, res) => {
      const userString = JSON.stringify(req.user)
      res.send(`<!DOCTYPE html>
      <html lang="en">
        <body>
        </body>
        <script>
          window.opener.postMessage(${userString}, 'http://localhost:5173')
        </script>
      </html>`)
    }
  );

module.exports = { loginRouter };

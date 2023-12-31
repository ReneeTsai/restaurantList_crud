const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//需要去尋找資料庫
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
//-----------------
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
//----------------
module.exports = (app) => {
  // 初始化 Passport 模組
  // 連結passport.session與express-session連結
  app.use(passport.initialize());
  app.use(passport.session());
  // 設定本地登入策略，以email當驗證
  // 1. 是否註冊
  // 2. 密碼/確認密碼是否一樣
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      (req, email, password, done) => {
        User.findOne({ email })
          .then((user) => {
            if (!user) {
              return done(null, false, req.flash("warning_msg", "此 Email 尚未註冊!"));
            }
            return bcrypt.compare(password, user.password).then((isMatch) => {
              if (!isMatch) {
                return done(null, false, req.flash("warning_msg", "此 Email 或 Password 不正確!"));
              }
              return done(null, user);
            });
          })
          .catch((err) => done(err, false));
      }
    )
  );
  // 設定序列化與反序列化
  // (serialize)：登入驗證通過，就把 user id 放進 session
  // (deserialize)：用 user id 去資料庫裡呼叫完整的 user 資料
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
  });
};

//facebool login
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK,
      profileFields: ["email", "displayName"],
    },
    (accessToken, refreshToken, profile, done) => {
      const { name, email } = profile._json;
      User.findOne({ email }).then((user) => {
        if (user) return done(null, user);
        const randomPassword = Math.random().toString(36).slice(-8);
        bcrypt
          .genSalt(10)
          .then((salt) => bcrypt.hash(randomPassword, salt))
          .then((hash) =>
            User.create({
              name,
              email,
              password: hash,
            })
          )
          .then((user) => done(null, user))
          .catch((err) => done(err, null));
      });
    }
  )
);

//google login
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
      profileFields: ["email", "displayName"],
    },
    (accessToken, refreshToken, profile, done) => {
      const { name, email } = profile._json;
      User.findOne({ email }).then((user) => {
        if (user) return done(null, user);
        const randomPassword = Math.random().toString(36).slice(-8);
        bcrypt
          .genSalt(10)
          .then((salt) => bcrypt.hash(randomPassword, salt))
          .then((hash) =>
            User.create({
              name,
              email,
              password: hash,
            })
          )
          .then((user) => done(null, user))
          .catch((err) => done(err, null));
      });
    }
  )
);

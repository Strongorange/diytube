import multer from "multer";

const middlewares = (req, res, next) => {
  res.locals.siteName = "DIYtube";
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.loggedInUser = req.session.user;
  next();
};

export const protectMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return res.redirect("/login");
  } else {
    return next();
  }
};

export const publicOnly = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const uploadAvatar = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 3000000,
  },
});

export const uploadVideo = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 100000000,
  },
});

export default middlewares;

const middlewares = (req, res, next) => {
  res.locals.siteName = "DIYtube";
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.loggedInUser = req.session.user;
  next();
};

export default middlewares;

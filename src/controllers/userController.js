import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const {
    body: { name, email, username, password, password2, location },
  } = req;
  const pageTitle = "Join";
  const exists = await User.exists({ $or: [{ email }, { username }] });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Email/username already taken",
    });
  }

  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Password Confirmation",
    });
  }
  try {
    await User.create({
      name,
      email,
      username,
      password,
      location,
    });
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: error._message,
    });
  }

  return res.redirect("/login");
};

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const {
    body: { username, password },
  } = req;
  const pageTitle = "Login";

  const user = await User.findOne({ username });
  if (!user) {
    return res
      .status(400)
      .render("login", { pageTitle, errorMessage: "user doesn't exists" });
  }

  const passwordOk = await bcrypt.compare(password, user.password);
  if (!passwordOk) {
    return res
      .status(400)
      .render("login", { pageTitle, errorMessage: "Wrong Password" });
  }

  req.session.loggedIn = true;
  req.session.user = user;

  return res.redirect("/");
};

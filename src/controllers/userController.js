import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

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

  const user = await User.findOne({ username, socialOnly: false });
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

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const startKakaoLogin = (req, res) => {
  const baseUrl = "https://kauth.kakao.com/oauth/authorize";
  const config = {
    client_id: process.env.K_CLIENT,
    redirect_uri: "http://localhost:5500/users/kakao/finish",
    response_type: "code",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    code: req.query.code,
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_CLIENT_SECRET,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  const tokenRequest = await (
    await fetch(finalUrl, {
      headers: {
        Accept: "application/json",
      },
      method: "POST",
    })
  ).json();

  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const userData = await (
      await fetch("https://api.github.com/user", {
        headers: {
          Accept: "application/json",
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    console.log("This is userData : ", userData);
    const emailData = await (
      await fetch("https://api.github.com/user/emails", {
        headers: {
          Accept: "application/json",
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    console.log("This is EmailData : ", emailData);
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        email: emailObj.email,
        socialOnly: true,
        name: userData.name,
        username: userData.login,
        password: "",
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
  } else {
    return res.redirect("/login");
  }
  return res.redirect("/");
};

export const finishKakaoLogin = async (req, res) => {
  const baseUrl = "https://kauth.kakao.com/oauth/token";
  const config = {
    grant_type: "authorization_code",
    client_id: process.env.K_CLIENT,
    redirect_uri: "http://localhost:5500/users/kakao/finish",
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  const tokenRequest = await (
    await fetch(finalUrl, {
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      method: "POST",
    })
  ).json();
  console.log(tokenRequest);

  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const url = "https://kapi.kakao.com/v2/user/me";
    const userData = await (
      await fetch(url, {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
        method: "POST",
      })
    ).json();
    console.log("This is USER DATA : ", userData);
    let user = await User.findOne({ email: userData.kakao_account.email });
    if (!user) {
      user = await User.create({
        email: userData.kakao_account.email,
        socialOnly: true,
        name: userData.properties.nickname,
        username: userData.properties.nickname,
        password: "",
        location: "",
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    console.log(user);
    return res.redirect("/");
  }
  return res.redirect("/login");
};

export const logOut = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

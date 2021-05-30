import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({});
  res.render("home", { pageTitle: "Home", videos });
};
export const search = (req, res) => res.send("Search Video");
export const see = (req, res) => {
  return res.send(`Watch Video #${req.params.id}`);
};
export const getEdit = (req, res) => {
  return res.render("edit", { pageTitle: "Edit Video" });
};

export const postEdit = (req, res) => {};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload Video" });

export const postUpload = (req, res) => {
  return res.redirect("/");
};

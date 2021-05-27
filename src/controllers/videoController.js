export const trending = (req, res) => res.send("Home Videos");
export const search = (req, res) => res.send("Search Video");
export const see = (req, res) => {
  console.log(req.params.id);
  return res.send(`Watch Video #${req.params.id}`);
};
export const editVideo = (req, res) => {
  console.log(req.params.id);
  return res.send(`Edit Video #${req.params.id}`);
};
export const deleteVideo = (req, res) => {
  console.log(req.params.id);
  return res.send(`Delete Video #${req.params.id}`);
};

export const upload = (req, res) => res.send("upload Video");

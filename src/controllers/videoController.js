export const trending = (req, res) => {
  const videos = [
    {
      title: "Video1",
      rating: 5,
      comments: 2,
      createdAt: "1 mins ago",
      views: 59,
      id: 1,
    },
    {
      title: "Video2",
      rating: 5,
      comments: 5,
      createdAt: "2 mins ago",
      views: 13,
      id: 2,
    },
    {
      title: "Video3",
      rating: 5,
      comments: 2,
      createdAt: "3 mins ago",
      views: 9,
      id: 3,
    },
  ];
  res.render("home", { pageTitle: "Home", videos });
};
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

export const upload = (req, res) => res.send("upload Video!");

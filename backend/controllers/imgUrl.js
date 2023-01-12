exports.getImgUrl = (req, res, next) => {
  const { imgUrl } = req.body;

  const isUrlValidValid = (imgUrl) =>
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
      imgUrl.trim(),
    );

  if (!isUrlValidValid(imgUrl)) {
    return res.status(422).json({ error: "Enter a valid URL" });
  } else {
    const id = imgUrl.split("/")[5];
    res.status(200).json({
      coverImageUrl: `https://drive.google.com/uc?export=view&id=${id}`,
    });
  }
};

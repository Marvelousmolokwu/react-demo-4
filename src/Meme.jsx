import React from "react";

const Meme = () => {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  function handleChange(e) {
    setMeme((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }
  const [allmemeImages, setAllmemeImages] = React.useState([]);
  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllmemeImages(data.data.memes));
  }, []);

  function getit() {
    const random_pic = Math.floor(Math.random() * allmemeImages.length);
    let url = allmemeImages[random_pic].url;
    setMeme((i) => ({ ...i, randomImage: url }));
  }
  return (
    <div className="meme">
      <form action="" className="form">
        <input
          type="text"
          name="topText"
          className="form--input"
          placeholder="top-text"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          name="bottomText"
          className="form--input"
          placeholder="buttom-text"
          value={meme.bottomText}
          onChange={handleChange}
        />
      </form>
      <button className="form-button" onClick={getit}>
        get a new meme image
      </button>

      <div className="memes">
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </div>
  );
};

export default Meme;

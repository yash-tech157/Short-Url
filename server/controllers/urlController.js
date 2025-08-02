const Url = require('../models/Url');
const shortid = require('shortid');

// POST /url/shorten
exports.createShortUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;
    if (!longUrl) return res.status(400).json({ error: 'URL is required' });

    let urlDoc = await Url.findOne({ longUrl });
    if (urlDoc) return res.json(urlDoc);

    const shortUrlCode = shortid.generate();
    const newUrl = new Url({ longUrl, shortUrlCode });
    await newUrl.save();

    res.json(newUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /:shortUrlCode
exports.redirectToLongUrl = async (req, res) => {
  try {
    const { shortUrlCode } = req.params;
    const url = await Url.findOne({ shortUrlCode });

    if (url) {
      url.clickCount++;
      await url.save();
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ error: 'Short URL not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /url/stats
exports.getAllStats = async (req, res) => {
  try {
    const urls = await Url.find();
    res.json(urls);
  } catch (err) {
    console.error("Error fetching stats:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /url/stats/:shortUrlCode
exports.getSingleStat = async (req, res) => {
  try {
    const { shortUrlCode } = req.params;
    const url = await Url.findOne({ shortUrlCode });

    if (url) {
      res.json(url);
    } else {
      res.status(404).json({ message: "Stats not found" });
    }
  } catch (err) {
    console.error("Error fetching stats:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

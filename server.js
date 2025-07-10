
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/thumbnail", async (req, res) => {
  const { videoId, quality } = req.query;

  if (!videoId || !quality) {
    return res.status(400).send("Missing videoId or quality");
  }

  const url = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;

  try {
    const response = await fetch(url);
    const content = await response.buffer();
    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Content-Disposition", `attachment; filename=${videoId}.jpg`);
    res.send(content);
  } catch (error) {
    res.status(500).send("Error fetching thumbnail");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

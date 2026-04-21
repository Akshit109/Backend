const urlModel = require('../Models/urlModel');
const { nanoid } = require('nanoid');

async function generateUrl(req, res) {
  console.log(req.body);

  const { actualurl } = req.body;
  console.log(actualurl);

  
  if (!actualurl) {
    return res.status(400).json({
      message: "Actual URL is required"
    });
  }

 
  const shortId = nanoid(6);

  
  const newUrl = await urlModel.create({
    shorturl: shortId,
    actualurl: actualurl
  });

  return res.status(201).json({
    message: "Short URL created",
    data: newUrl
  });
}

module.exports = { generateUrl };


const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors');
const path = require('path');
const { readFile } = require("fs/promises");
const authRoutes = require('./routes/authRoutes');
const {connectDB} = require('./db/db');
const googleTrends = require("google-trends-api");

const server = express();
const port = process.env.PORT;
server.use(express.static(path.join(__dirname, "client/build")));
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use("/api", authRoutes)
server.use("/images", express.static(path.join(__dirname, "public/images")));



connectDB();
server.post("/api", async(req, res) => {
    const products = await readFile("./Data/available-meals.json",'utf8', (err) =>{
        console.log("Error ",err);
        
    });
    
    res.json(JSON.parse(products))
});
server.get("/api", (req, res) => {
    console.log("my server")
});


server.get("/api/trends", async (req, res) => {
  console.log("My server 2")
});
server.post("/api/trends", async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    const results = await googleTrends.interestOverTime({
      keyword: q,
      startTime: new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000), // 5 years
    });
    try{
      const parsed = JSON.parse(results);
      res.json(parsed.default); // IMPORTANT
      
    }
    catch(errors){
                  console.log("Google returned HTML instead of JSON");

      res.status(500).json({error: "Google block the request"})

    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch trends" });
  }
});


server.listen(port, () => {
    console.log('Server connected successfully at https://test-project-gobd.onrender.com');

});

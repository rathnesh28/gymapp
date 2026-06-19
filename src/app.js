const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// routes
app.use("/api/auth", require("./routes/auth.routes"));

app.use("/api/members", require("./routes/member.routes"));
app.use("/api/packages", require("./routes/package.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
    
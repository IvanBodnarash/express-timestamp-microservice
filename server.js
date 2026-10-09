import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

app.get("/api{/:date}", (req, res) => {
  const date = req.params.date;
  const parsedDate = new Date(date);
  const isUnix = /^\d+$/.test(date);

  if (!date) {
    const currentDate = new Date();

    const currentDateUnix = Number(currentDate);
    const currentDateUtc = currentDate.toUTCString();

    res.json({ unix: currentDateUnix, utc: currentDateUtc });
  } else if (!isNaN(parsedDate)) {
    const unixDate = Number(parsedDate);
    const utcDate = parsedDate.toUTCString();

    res.json({ unix: unixDate, utc: utcDate });
  } else if (isUnix) {
    const unixDate = Number(date);
    const utcConvertedDate = new Date(unixDate).toUTCString();

    res.json({ unix: unixDate, utc: utcConvertedDate });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// Do not change code above this line

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

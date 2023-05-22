const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://bookmybus:be01o3wQSNQ9mZqw@cluster0.ez8whvv.mongodb.net/",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log(error);
  });

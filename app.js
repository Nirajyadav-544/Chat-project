const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

const Chat = require("./model/firstmodel.js");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "ejsfiles"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatapp");
}

main()
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.log("Error occurred in the database:", err);
  });


app.get("/", (req, res) => {
  res.redirect("/chats");
});


app.get("/chats", async (req, res) => {
  try {
    let result = await Chat.find({});
    res.render("1st.ejs", { result });
  } catch (err) {
    res.status(500).send("Error fetching chats");
  }
});


app.get("/new/chat", (req, res) => {
  res.render("new.ejs");
});


app.post("/newaddchat", async (req, res) => {
  try {
    let { from, to, msg } = req.body;
    let newchat = new Chat({
      from: from,
      to: to,
      msg: msg,
      create_at: new Date(),
    });

    await newchat.save();
    console.log("Chat saved successfully");
    res.redirect("/chats"); // FIXED: /chats (with 's')
  } catch (err) {
    console.log("Error saving chat:", err);
    res.status(500).send("Error saving chat");
  }
});


app.get("/update/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
      return res.status(404).send("Chat not found");
    }
    res.render("edit.ejs", { chat });
  } catch (err) {
    res.status(500).send("Invalid ID or Error fetching chat");
  }
});


app.put("/edit/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { msg: newmsg } = req.body;

    let update = await Chat.findByIdAndUpdate(
      id,
      { msg: newmsg },
      { runValidators: true, new: true }
    );

    console.log("Updated Chat:", update);
    res.redirect("/chats"); 
  } catch (err) {
    console.log("Error updating chat:", err);
    res.status(500).send("Error updating chat");
  }
});


app.delete("/update/:id", async (req, res) => {
  let { id } = req.params;

  try {
    let deletedchat = await Chat.findByIdAndDelete(id);

    if (!deletedchat) {
      return res.status(404).send("Chat not found");
    }
    res.redirect("/chats"); // FIXED: /chats (with 's')
  } catch (err) {
    res.status(500).send("Error deleting chat");
  }
});


app.listen(8080, () => {
  console.log(`Server running at: http://localhost:8080`);
});
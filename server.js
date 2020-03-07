const express = require("express");
const path = require("path");
const PORT = 3000;

const app = express();
//write code below
//set up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


const characters = [
  {
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  },
  {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  },
  {
    routeName: "obiwankenobi",
    name: "Obi Wan Kenobi",
    role: "Jedi",
    age: 50,
    forcePoints: 4000
  }
]

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view.html"))
})

app.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname, "add.html"))
})

app.get("/api/characters/:character", (req, res) => {
  const character = req.params.character;

  console.log(character)

  let found;

  characters.forEach(char => {
    // console.log(char)
    if (character === char.routeName) {
      found = char;
      return res.json(char)
    }
  })
  return res.json(false);
  // res.end();
})

app.post("/api/characters" , (req, res) => {
  const newCharacter = req.body;
  
  newCharacter.routename = req.body.name.split(" ").join("").toLowerCase();

  console.log(newCharacter)
  characters.push(newCharacter);
  res.json(newCharacter)
})

// app.get("/yoda" , (req, res) => {
//   res.json(yoda);
// })

// app.get("/darthmaul" , (req, res) => {
//   res.json(darthmaul);
// })

// app.get("/obiwankenobi" , (req, res) => {
//   res.json(obiwankenobi);
// })
// app.listen is always the last, write code above
app.listen(PORT, () => {
  console.log(`Server is listening port: ${PORT}`)
})
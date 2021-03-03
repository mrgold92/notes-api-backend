require('./mongo')
const Note = require('./models/Note')
const express = require('express');
const cors = require('cors')
const app = express()



app.use(cors())
app.use(express.json())

let notes = [
 
]


app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })

})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id;
  const note = notes.find(note => note.id === parseInt(id));
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.post('/api/notes', (req, res) => {
  const note = req.body;

  if(!note || !note.content){
    return res.status(404).json({
      error: 'note.content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids);

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }

  notes = notes.concat(newNote)
  res.json(newNote)
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter(note => note.id !== id);
  res.status(204).end()
})

app.use((req, res) => {
  res.status(404).json({
    error: "Not found"
  })
})
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});


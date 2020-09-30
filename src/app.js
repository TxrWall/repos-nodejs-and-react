const express = require("express");
const cors = require("cors");

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // listar
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  // inserir
  // title, url, uuid, techs e likes

  const { url, title, techs } = request.body;
  
  const repo = { 
    id: uuid(), 
    title, 
    url, 
    techs,
    likes:0
  }

  repositories.push(repo)

  return response.json(repo)
});

app.put("/repositories/:id", (request, response) => {
  // alterar
  // title, url e techs
  const { url, title, techs } = request.body
  const { id } = request.params
  
  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if(repoIndex === -1) {
    return response.status(400).json({ error: 'Repository not found.' })
  }

  const repo = {
    id,
    title,
    url,
    techs,
    likes: repositories[repoIndex].likes
  }

  repositories[repoIndex] = repo;

  return response.json(repo)
});

app.delete("/repositories/:id", (request, response) => {
  // deletar

  const { id } = request.params

  const repoIndex = repositories.findIndex(repo => repo.id == id)

  if(repoIndex === -1) {
    return response.status(400).json({ error: 'Repository not found.' })
  }

  const removedRepo = repositories.splice(repoIndex, 1)

  return response.status(204).json()
});

app.post("/repositories/:id/like", (request, response) => {
  // atualizar likes
  const { id } = request.params

  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if(repoIndex === -1) {
    return response.status(400).json({ error: 'Repository not found.' })
  }

  repositories[repoIndex].likes++

  return response.json(repositories[repoIndex])
});

module.exports = app;

import Fetch from "./fetch.js"
import Render from "./render.js"

const fetch = new Fetch()
const render = new Render()

render.createButtons()
render.createBook()

fetch.fetchQuiz().then((quiz) => {
  console.log(quiz)
  for (let i = 0; i < quiz.length; i++) {
    render.createPage(quiz[i].question, quiz[i].options, quiz[i].answer)
  }
  render.createInstructionPage("välkommen till skitroligt och extremt svårt quiz\n\n\nSkriv instruktioner här")
  render.createCover()
})


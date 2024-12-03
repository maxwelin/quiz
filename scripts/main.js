import FetchService from "./fetchService.js"
import Render from "./render.js"
import FormValidator from "./formValidator.js"

const formValidator = new FormValidator()
const fetch = new FetchService()
const render = new Render(formValidator)

render.createButtons()
render.createBook()


function getRandomQuizQuestion(){
  let questionsToRender = []
  while(questionsToRender.length < 10){
    
    let rnd = Math.floor(Math.random()*48) + 1
    let exists = false
  
    for (let i = 0; i < 10; i++) {
      if(questionsToRender[i] == rnd){
        exists = true
      }
    }
    if(!exists){
      questionsToRender.push(rnd)
    }
  }
  return questionsToRender
}

fetch.fetchQuiz().then((quiz) => {
  console.log(quiz)
  const randomQuestions = getRandomQuizQuestion()
  console.log(randomQuestions)
  for (let i = 0; i < 10; i++) {
    let rnd = randomQuestions[i]
    render.createPage(quiz[rnd].question, quiz[rnd].options, quiz[rnd].answer, quiz[rnd].img)
  }
  render.createInstructionPage("Någon typ av introduktionstext här..")
  render.createCover()
})


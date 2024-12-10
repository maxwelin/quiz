import {FetchService, QuizState} from "./utils.js"
import Render from "./render.js"
import FormValidator from "./formValidator.js"

const quizState= new QuizState()
const fetchService = new FetchService()
const formValidator = new FormValidator(quizState)
const render = new Render(formValidator, quizState)

render.createBook()
render.createButtons()

function getRandomQuizQuestion(){
  let questionsToRender = []

  while(questionsToRender.length < 10){
    let rnd = Math.floor(Math.random()*81) + 1
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

const newGame = () => {
  fetchService.fetchQuiz().then((quiz) => {
    const randomQuestions = getRandomQuizQuestion()
    render.createScorePage()
    for (let i = 0; i < 10; i++) {
      let rnd = randomQuestions[i]
      render.createPage(quiz[rnd].question, quiz[rnd].options, quiz[rnd].answer, quiz[rnd].img, [i])
    }
    render.createCover()
  })
}

newGame()


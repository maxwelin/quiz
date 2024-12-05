export class FetchService{
  fetchQuiz = async function(){
    const response = await fetch("./quiz.json")
    const quiz = await response.json()
    return quiz
  }
}

export class QuizState{
  score = 0
  clock = null
  timerStates = {}
}
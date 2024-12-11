
export default class Util{
  score = 0
  clock = null
  finished = false;

  fetchQuiz = async function(){
    const response = await fetch("./quiz.json")
    const quiz = await response.json()
    return quiz
  }

  getRandomQuizQuestion = () => {
    let quizQuestions = []
  
    while(quizQuestions.length < 10){
      const rnd = Math.floor(Math.random() * 81) + 1
    
      if(!quizQuestions.includes(rnd)){
        quizQuestions.push(rnd)
      }
    }
    return quizQuestions
  }
}

export default class Util{
  score = 0
  clock = null
  finished = false
  quizAnswers = []

  fetchQuiz = async function(){
    const response = await fetch("./quiz.json")
    const quiz = await response.json()
    return quiz
  }

  getRandomNumbers = () => {
    let randomNumberArray = []
  
    while(randomNumberArray.length < 10){
      const rnd = Math.floor(Math.random() * 81) + 1
    
      if(!randomNumberArray.includes(rnd)){
        randomNumberArray.push(rnd)
      }
    }
    return randomNumberArray
  }
}
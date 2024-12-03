export default class Fetch{

  fetchQuiz = async function(){
    const response = await fetch("./quiz.json")
    const quiz = await response.json()
    return quiz
  }
}
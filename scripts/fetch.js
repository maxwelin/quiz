export default class Fetch{

  fetchQuiz = async function(){
    const response = await fetch("./quiz.json")
    const data = await response.json()
    return data
  }
}
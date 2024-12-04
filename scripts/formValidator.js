
export default class FormValidator{
  constructor(){
    this.correct = "../img/correct.png"
  }

  submitEventListener = (button, form, answerP, answer, id) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      const formData = new FormData(form)
      const data = Object.fromEntries(formData.entries())
      
      if (!data.answer) {
        alert("Please select an answer!")
        return
      } else if (data.answer == answer.innerHTML) {
        console.log("bingo")
        this.correctAnswer(id)
        button.setAttribute("disabled", "true")
      } else {
        console.log("fel")
        this.wrongAnswer(id)
        button.setAttribute("disabled", "true")
      }
      answer.style.visibility = "visible"
      answerP.style.visibility = "visible"
    })
  }

  correctAnswer = (id) => {
    document.getElementById(`correct-stamp-${id}`).classList.add("active")
  }

  wrongAnswer = (id) => {
    document.getElementById(`wrong-stamp-${id}`).classList.add("active")
  }
}
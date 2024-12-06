
export default class FormValidator{
  constructor(quizState){
    this.quizState = quizState
    this.slap = new Audio("../img/punch.wav")
    this.jingle = new Audio("../img/success.mp3")
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
        this.quizState.score += 1
        this.correctAnswer(id, button)
      } else {
        this.wrongAnswer(id, button)
      }
      answer.style.visibility = "visible"
      answerP.style.visibility = "visible"
    })
  }

  correctAnswer = (id, button) => {
    clearInterval(this.quizState.clock)

    const timer = document.getElementById(`timer-p-${id}`)
    timer.style.visibility = "hidden"

    document.getElementById(`correct-stamp-${id}`).classList.add("active")
    document.getElementById(`thumb-${id}`).classList.add("active")
    button.setAttribute("disabled", "true")
    this.playJingleSound()

    setTimeout(() => {
      document.getElementById(`thumb-${id}`).classList.remove("active")
    }, 700)
  }

  wrongAnswer = (id, button) => {
    clearInterval(this.quizState.clock)

    const timer = document.getElementById(`timer-p-${id}`)
    timer.style.visibility = "hidden"

    document.getElementById(`wrong-stamp-${id}`).classList.add("active")
    document.getElementById(`hand-${id}`).classList.add("active")
    button.setAttribute("disabled", "true")
    this.playSlapSound()

    setTimeout(() => {
      document.getElementById(`hand-${id}`).classList.remove("active")
    }, 500)
  }

  timesUp = (id) => {
    clearInterval(this.quizState.clock)

    const timer = document.getElementById(`timer-p-${id}`)
    const submitBtn = timer.parentNode.querySelector("form .submit-btn")

    timer.style.visibility = "hidden"
    submitBtn.setAttribute("disabled", true)

    document.getElementById(`wrong-stamp-${id}`).classList.add("active")
    document.getElementById(`hand-${id}`).classList.add("active")
    document.getElementById(`correct-answer-p-${id}`).style.visibility = "visible"
    document.getElementById(`answer-p-${id}`).style.visibility = "visible"
    this.playSlapSound()

    setTimeout(() => {
      document.getElementById(`hand-${id}`).classList.remove("active")
    }, 450)
  }

  playSlapSound(){
    setTimeout(() => {
      this.slap.volume = 0.1
      this.slap.play()
    }, 60)
  }

  playJingleSound(){
    setTimeout(() => {
      this.jingle.volume = 0.1
      this.jingle.play()
    }, 60)
  }
  
}
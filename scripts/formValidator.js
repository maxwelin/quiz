
export default class FormValidator{
  constructor(quizState){
    this.quizState = quizState
    this.aww = new Audio("../media/sounds/aww.wav")
    this.wow = new Audio("../media/sounds/wow.wav")
    this.hmm = new Audio("../media/sounds/hmm.m4a")
    this.nice = new Audio("../media/sounds/nice.mp3")
    this.clap = new Audio("../media/sounds/clap.wav")
    this.slap = new Audio("../media/sounds/punch.wav")
    this.buzzer = new Audio("../media/sounds/buzzer.wav")
    this.jingle = new Audio("../media/sounds/success.mp3")
    this.applause = new Audio("../media/sounds/applause.wav")
  }

  submitEventListener = (button, form, paragraph, answerP, id) => {
    const answer = paragraph.innerHTML
    button.addEventListener("click", (e) => {
      e.preventDefault()
      
      const next = document.getElementById("next")
      const formData = new FormData(form)
      const data = Object.fromEntries(formData.entries())

      if (!data.answer) {
        paragraph.innerText = "Please select an answer!"
        paragraph.style.visibility = "visible"
        return
      }

      paragraph.innerHTML = answer

      if(data.answer == answerP.innerHTML) {
        this.quizState.score += 1
        this.correctAnswer(id, button)
        next.removeAttribute("disabled")
      } else {
        this.wrongAnswer(id, button)
        next.removeAttribute("disabled")
      }
      paragraph.style.visibility = "visible"
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
    const next = document.getElementById("next")
    const answer = document.getElementById(`correct-answer-p-${id}`)

    answer.innerHTML = "Correct answer:"

    timer.style.visibility = "hidden"
    submitBtn.setAttribute("disabled", true)
    next.removeAttribute("disabled")

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
    // setTimeout(() => {
    //   this.buzzer.volume = 0.05
    //   this.buzzer.play()
    // }, 300)
  }

  playJingleSound(){
    setTimeout(() => {
      this.jingle.volume = 0.1
      this.jingle.play()
    }, 60)
  }
  
}
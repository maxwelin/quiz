export default class FormValidator{

  submitEventListener = (button, form, answer) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      const formData = new FormData(form)
      const data = Object.fromEntries(formData.entries())
      
      if (!data.answer) {
        alert("Please select an answer!")
        return
      } else if (data.answer == answer.innerHTML) {
        console.log("bingo")
      } else {
        console.log("fel")
      }
      answer.style.visibility = "visible"
    })
  }
}
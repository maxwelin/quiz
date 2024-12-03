export default class Render{
  constructor(formValidator){
    this.formValidator = formValidator
  }
  root = document.getElementById("root")
  pageCount = 10
  
  createButtons = () => {
    const flipPageBtn = document.createElement("button")
    const openBookBtn = document.createElement("button")

    flipPageBtn.innerText = "Next"
    openBookBtn.innerText = "Start"

    flipPageBtn.setAttribute("id", "next")
    flipPageBtn.classList.add("button", "hidden")
    openBookBtn.setAttribute("id", "open")
    openBookBtn.classList.add("button")

    flipPageBtn.addEventListener("click", this.flipPage)
    openBookBtn.addEventListener("click", this.openBook)

    this.root.appendChild(flipPageBtn)
    this.root.appendChild(openBookBtn)
 }

  createBook = () => {
    const book = document.createElement("div")
    book.setAttribute("id", "book")
    const img = document.createElement("img")
    this.root.appendChild(book)
  }

  createCover = () => {
    const cover = document.createElement("div")
    const title = document.createElement("h1")
    const p = document.createElement("p")
    const img = document.createElement("img")
    img.setAttribute("src", "https://www.nhmagazine.com/content/uploads/2021/02/disney-castle-scaled.jpg")
    cover.setAttribute("id", "cover")
    title.setAttribute("id", "title")
    title.innerText = "DISNEY QUIZ"
    p.innerText = "Quizney??"

    cover.append(title, img, p)
    document.getElementById("book").appendChild(cover)
  }
  
  openBook = () => {
    const cover = document.getElementById("cover")
    cover.classList.add("flip")
    setTimeout(() => {
      cover.classList.add("flipped")
      document.querySelector("#cover").style.setProperty('--after-visibility', 'visible');
      document.querySelector("#cover p").style.visibility = "hidden"
    }, 150)
    document.getElementById("open").remove()
    document.getElementById("next").classList.remove("hidden")
  }
  
  flipPage = () => {
    const book = this.root.lastElementChild
    const btn = document.getElementById("next")
    btn.setAttribute("disabled", true)
    book.children[this.pageCount].classList.add("flip")
    setTimeout(() => {
      book.children[this.pageCount + 1].style.color = "rgba(0, 0, 0, 0.1)"
      book.children[this.pageCount + 1].style.zIndex = `${-this.pageCount}`
      if(book.children[this.pageCount + 1].childNodes[1]){
        book.children[this.pageCount + 1].childNodes[1].style.opacity = "0.1"
      }
      btn.removeAttribute("disabled")
    }, 300)
    this.pageCount -= 1
  }

  createAnswerForm = (page, options, pageIndex, answerP) => {
    const answerForm = document.createElement("form")
    const submit = document.createElement("input")

    answerForm.className = "answer-form"
    submit.className = "submit-btn"
    
    submit.setAttribute("type", "submit")
    submit.setAttribute("value", "Submit")

    for (let i = 0; i < 4; i++) {
      const container = document.createElement("div")
      
      const radioBtn = document.createElement("input")
      radioBtn.id = `btn-${[i]}-${pageIndex}`
      radioBtn.setAttribute("type", "radio")
      radioBtn.setAttribute("value", options[i])
      radioBtn.setAttribute("name", "answer")
      
      const label = document.createElement("label")
      label.innerText = options[i]
      
      label.appendChild(radioBtn)
      container.appendChild(label)
      
      answerForm.appendChild(container)
    }
    
    this.formValidator.submitEventListener(submit, answerForm, answerP)
    answerForm.appendChild(submit)
    page.appendChild(answerForm)
  }

  createPage = (question, options, answer, imgUrl) => {
    const page = document.createElement("div")
    const questionP = document.createElement("p")
    const answerP = document.createElement("p")
    const img = document.createElement("img")
    img.setAttribute("src", imgUrl)

    questionP.setAttribute("id", "questions-p")
    questionP.innerText = `${question}`
    page.setAttribute("class", "page")
    page.append(questionP)
    answerP.innerText = `Answer:\n${answer}`
    answerP.style.visibility = "hidden"

    this.createAnswerForm(page, options, this.pageCount, answerP)


    page.append(answerP, img)
    document.getElementById("book").appendChild(page)
  }

  createInstructionPage = (instrucitons) => {
    const page = document.createElement("div")
    const instrucitonParagraph = document.createElement("p")

    instrucitonParagraph.setAttribute("id", "instruciton-p")
    page.setAttribute("class", "page")

    instrucitonParagraph.innerText = `${instrucitons}`

    page.append(instrucitonParagraph)
    document.getElementById("book").appendChild(page)
  }
}
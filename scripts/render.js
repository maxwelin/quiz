export default class Render{
  constructor(formValidator){
    this.formValidator = formValidator
  }
  root = document.getElementById("root")
  pageCount = 10
  
  createElementWithAttribute = (element, attributeType, attributeValue) => {
    const ele = document.createElement(`${element}`)
    ele.setAttribute(`${attributeType}`, `${attributeValue}`)
    return ele
  }

  createElementWithInnerText = (element, innerText) => {
    const ele = document.createElement(`${element}`)
    ele.innerText = `${innerText}`
    return ele
  }

  createButtons = () => {
    const flipPageBtn = this.createElementWithAttribute("button", "id", "next")
    const flipPageBack = this.createElementWithAttribute("button", "id", "back")
    const openBookBtn = this.createElementWithAttribute("button", "id", "open")

    flipPageBtn.innerText = "Next"
    flipPageBack.innerText = "Back"
    openBookBtn.innerText = "Start"

    flipPageBtn.classList.add("button", "hidden")
    openBookBtn.classList.add("button")
    flipPageBack.classList.add("button")

    flipPageBtn.addEventListener("click", this.flipPage)
    flipPageBtn.addEventListener("click", () => {
      flipPageBack.style.visibility = "visible"
    })
    openBookBtn.addEventListener("click", this.openBook)
    flipPageBack.addEventListener("click", this.flipBack)

    this.root.appendChild(flipPageBtn)
    this.root.appendChild(flipPageBack)
    this.root.appendChild(openBookBtn)
 }

  createBook = () => {
    const book = this.createElementWithAttribute("div", "id", "book")
    this.root.appendChild(book)
  }

  createCover = () => {
    const cover = this.createElementWithAttribute("div", "id", "cover")
    const title = this.createElementWithAttribute("h1", "id", "title")
    const img = this.createElementWithAttribute("img", "src", "https://www.nhmagazine.com/content/uploads/2021/02/disney-castle-scaled.jpg")
    const p = this.createElementWithInnerText("p", "Quizney??")

    title.innerText = "DISNEY QUIZ"

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
      document.querySelector("#cover h1").style.visibility = "hidden"
    }, 150)

    document.getElementById("open").remove()
    document.getElementById("next").classList.remove("hidden")
  }
  
  lowerOpacityOnFlip = (book) => {
    if(book.children[this.pageCount + 1].querySelector(".active")){
      book.children[this.pageCount + 1].querySelector(".active").style.opacity = "0.1"
    }
    book.children[this.pageCount + 1].style.color = "rgba(0, 0, 0, 0.1)"
    book.children[this.pageCount + 1].style.zIndex = `${-this.pageCount}`
    if(book.children[this.pageCount + 1].childNodes[1]){
      book.children[this.pageCount + 1].childNodes[1].style.opacity = "0.1"
    }
  }

  UpOpacityOnFlipBack = (book) => {
    if(book.children[this.pageCount].querySelector(".active")){
      book.children[this.pageCount].querySelector(".active").style.opacity = "1"
    }
    book.children[this.pageCount].style.color = "rgba(0, 0, 0, 1)"
    book.children[this.pageCount].style.zIndex = 0
    if(book.children[this.pageCount].childNodes[1]){
      book.children[this.pageCount].childNodes[1].style.opacity = "1"
    }
  }

  flipPage = () => {
    const book = document.getElementById("book")
    const btn = document.getElementById("next")

    btn.setAttribute("disabled", true)
    book.children[this.pageCount].classList.add("flip")
    setTimeout(() => {
      this.lowerOpacityOnFlip(book)
      btn.removeAttribute("disabled")
    }, 300)
    this.pageCount -= 1
  }

  flipBack = () => {
    const book = document.getElementById("book")
    const btn = document.getElementById("back")

    if(book.children[this.pageCount + 1].id == "cover"){
      return
    }else{
      btn.setAttribute("disabled", true)
      book.children[this.pageCount + 1].classList.remove("flip")
      book.children[this.pageCount + 1].classList.remove("flipped")
      book.children[this.pageCount + 1].classList.add("flip-back")
      setTimeout(() => {
        this.UpOpacityOnFlipBack(book)
        btn.removeAttribute("disabled")
      }, 300)
      this.pageCount += 1
    }
  }

  createRadioButtons(form, pageIndex, options){
    for (let i = 0; i < 4; i++) {
      const container = document.createElement("div")
      
      const radioBtn = this.createElementWithAttribute("input", "type", "radio")
      radioBtn.id = `btn-${[i]}-${pageIndex}`

      radioBtn.setAttribute("value", options[i])
      radioBtn.setAttribute("name", "answer")
      
      const label = document.createElement("label")
      label.innerText = options[i]
      
      label.appendChild(radioBtn)
      container.appendChild(label)
      
      form.appendChild(container)
    }
  }

  createAnswerForm = (page, options, pageIndex, answerP, answer, id) => {
    const answerForm = this.createElementWithAttribute("form", "class", "answer-form")
    const submit = this.createElementWithAttribute("input", "class", "submit-btn")
    
    submit.setAttribute("type", "submit")
    submit.setAttribute("value", "Submit")

    this.createRadioButtons(answerForm, pageIndex, options)
    
    this.formValidator.submitEventListener(submit, answerForm, answerP, answer, id)
    answerForm.appendChild(submit)
    page.appendChild(answerForm)
  }
    
  createPage = (question, options, answer, imgUrl, id) => {
    const questionP = this.createElementWithAttribute("p", "id", "questions-p")
    const page = this.createElementWithAttribute("div", "class", "page")
    const img = this.createElementWithAttribute("img", "id", "background-image")
    const correctStamp = this.createElementWithAttribute("img", "id", `correct-stamp-${id}`)
    const wrongStamp = this.createElementWithAttribute("img", "id", `wrong-stamp-${id}`)
    const answerP = this.createElementWithInnerText("p", `${answer}`)
    const correctAnswer = this.createElementWithInnerText("p", "Correct answer:")

    questionP.innerText = `${question}`
    page.append(questionP)

    correctAnswer.style.visibility = "hidden"
    answerP.style.visibility = "hidden"
    answerP.id = "answer-p"

    correctStamp.setAttribute("src", "../img/correct.png")
    correctStamp.className = "stamp"
    wrongStamp.setAttribute("src", "../img/wrong.png")
    wrongStamp.className = "stamp"
    img.setAttribute("src", imgUrl)

    this.createAnswerForm(page, options, this.pageCount, correctAnswer, answerP, id)

    page.append(correctAnswer, answerP, img, correctStamp, wrongStamp)
    document.getElementById("book").appendChild(page)
  }

  createInstructionPage = (instrucitons) => {
    const page = this.createElementWithAttribute("div", "class", "page")
    const instrucitonParagraph = this.createElementWithAttribute("p", "id", "instruciton-p")

    instrucitonParagraph.innerText = `${instrucitons}`

    page.append(instrucitonParagraph)
    document.getElementById("book").appendChild(page)
  }
}
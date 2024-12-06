export default class Render{
  constructor(formValidator, quizState){
    this.formValidator = formValidator
    this.quizState = quizState
  }
  root = document.getElementById("root")
  pageCount = 10
  
  createElementWithAttribute = (element, attributeType, attributeValue) => {
    const e = document.createElement(`${element}`)
    e.setAttribute(`${attributeType}`, `${attributeValue}`)
    return e
  }

  createElementWithInnerText = (element, innerText) => {
    const e = document.createElement(`${element}`)
    e.innerText = `${innerText}`
    return e
  }
  
  createBook = () => {
    const book = this.createElementWithAttribute("div", "id", "book")
    this.root.appendChild(book)
  }

  createButtons = () => {
    const btnContainer = this.createElementWithAttribute("div", "id", "btn-container")
    const flipPageBtn = this.createElementWithAttribute("button", "id", "next")
    const flipPageBack = this.createElementWithAttribute("button", "id", "back")
    const openBookBtn = this.createElementWithAttribute("button", "id", "open")

    flipPageBtn.innerText = "Next🠊 "
    flipPageBack.innerText = "🠈Back"
    openBookBtn.innerText = "Start"

    flipPageBtn.classList.add("button", "hidden")
    openBookBtn.classList.add("button")
    flipPageBack.classList.add("button")

    flipPageBtn.setAttribute("disabled", true)

    flipPageBtn.addEventListener("click", this.flipPage)
    openBookBtn.addEventListener("click", this.openBook)
    flipPageBack.addEventListener("click", this.flipBack)

    btnContainer.append(flipPageBack, openBookBtn, flipPageBtn)
    this.root.appendChild(btnContainer)
 }


  createCover = () => {
    const cover = this.createElementWithAttribute("div", "id", "cover")
    const title = this.createElementWithAttribute("h1", "id", "title")
    const img = this.createElementWithAttribute("img", "src", "../img/cover.jpg");
    const p = this.createElementWithInnerText("p", "Quizney??")

    title.innerText = "DISNEY QUIZ"

    cover.append(title, img, p)
    document.getElementById("book").appendChild(cover)
  }
  
  openBook = () => {
    const book = document.getElementById("book")
    const cover = document.getElementById("cover")
    cover.classList.add("flip")

    this.countdown(book.children[this.pageCount].querySelector(".timer"))

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
    const nextBtn = document.getElementById("next")
    const backBtn = document.getElementById("back")

    if(!book.children[this.pageCount - 1]){
      return
    } 
    if(book.children[this.pageCount - 1].id == "score-page"){
      this.getScore()
      this.stopCountdown()
      this.quizState.finished = true;
      document.getElementById("back").style.visibility = "visible"
    }
    nextBtn.setAttribute("disabled", true)
    backBtn.setAttribute("disabled", true)

    book.children[this.pageCount].classList.add("flip")
    this.countdown(book.children[this.pageCount - 1].querySelector(".timer"))

    setTimeout(() => {
      this.lowerOpacityOnFlip(book)
        if(this.quizState.finished){
          nextBtn.removeAttribute("disabled")
          backBtn.removeAttribute("disabled")
        }
      }, 300)
      this.pageCount -= 1
  }

  flipBack = () => {
    this.stopCountdown()
    const book = document.getElementById("book")
    const nextBtn = document.getElementById("next")
    const backBtn = document.getElementById("back")

    if(book.children[this.pageCount + 1].id == "cover"){
      return
    }else{
      nextBtn.setAttribute("disabled", true)
      backBtn.setAttribute("disabled", true)

      book.children[this.pageCount + 1].classList.remove("flip")
      book.children[this.pageCount + 1].classList.remove("flipped")
      book.children[this.pageCount + 1].classList.add("flip-back")
      setTimeout(() => {
        this.UpOpacityOnFlipBack(book)
        nextBtn.removeAttribute("disabled")
        backBtn.removeAttribute("disabled")
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

  stopCountdown = () => {
    clearInterval(this.quizState.clock);
    this.quizState.clock = null;
  }

  countdown = (p) => {
    this.stopCountdown()
    let timer = 10
    if(p){
      this.quizState.clock = setInterval(() => {
        console.log(timer)
        if(timer < 5){
          p.style.color = "red"
        }
        
        timer -= 1
        p.innerText = timer
        
        if(timer < 1){
          clearInterval(this.quizState.clock)
          this.formValidator.timesUp(p.id.slice(-1), )
        }
      }, 1000)
    }
  }

  createPage = (question, options, answer, imgUrl, id) => {
    const questionP = this.createElementWithAttribute("p", "id", "questions-p")
    const timerP = this.createElementWithAttribute("p", "id", `timer-p-${id}`)
    const page = this.createElementWithAttribute("div", "class", "page")
    const img = this.createElementWithAttribute("img", "id", "background-image")
    const hand = this.createElementWithAttribute("img", "id", `hand-${id}`)
    const thumb = this.createElementWithAttribute("img", "id", `thumb-${id}`)
    const correctStamp = this.createElementWithAttribute("img", "id", `correct-stamp-${id}`)
    const wrongStamp = this.createElementWithAttribute("img", "id", `wrong-stamp-${id}`)
    const answerP = this.createElementWithInnerText("p", `${answer}`)
    const correctAnswer = this.createElementWithInnerText("p", "Correct answer:")

    timerP.className = "timer"
    questionP.innerText = `${question}`
    page.append(questionP)

    correctAnswer.style.visibility = "hidden"
    answerP.style.visibility = "hidden"
    correctAnswer.id = `correct-answer-p-${id}`
    answerP.id = `answer-p-${id}`

    correctStamp.setAttribute("src", "../img/correct.png")
    correctStamp.className = "stamp"
    wrongStamp.setAttribute("src", "../img/wrong.png")
    wrongStamp.className = "stamp"
    hand.setAttribute("src", "../img/hand.png")
    hand.className = "hand"
    thumb.setAttribute("src", "../img/thumb.png")
    thumb.className = "thumb"
    img.setAttribute("src", imgUrl)

    this.createAnswerForm(page, options, this.pageCount, correctAnswer, answerP, id)

    page.append(correctAnswer, timerP, answerP, img, correctStamp, wrongStamp, hand, thumb)
    document.getElementById("book").appendChild(page)
  }

  playSound = (sound) => {
    if(sound == this.formValidator.nice){
      setTimeout(() => {
        sound.volume = 0.2
        sound.play()
      }, 800)
    } else {
      setTimeout(() => {
        sound.volume = 0.2
        sound.play()
      }, 200)
    }
  }

  getScore = () => {
    const scoreParagraph = document.getElementById("score-p")
    let comment = ""
    const score = this.quizState.score
    switch (true) {
      case score === 0:
        comment = "Did you even try?\n\nEmbarrassing.."
        this.playSound(this.formValidator.aww)
        break
      case score < 5:
        comment = "You scored below average.\n\nTry again and do better!"
        this.playSound(this.formValidator.clap)
        break
      case score === 5:
        comment = "You scored 5 out of 10,\n\nkeep practicing and you'll improve."
        this.playSound(this.formValidator.hmm)
        break
      case score === 6 || score === 7:
        comment = "Great effort,\nyou scored above average.\n\nKeep practicing!"
        this.playSound(this.formValidator.applause)
        break
      case score === 8 || score === 9:
        comment = "Great job,\nyou're getting there.\n\nKeep it up!"
        this.playSound(this.formValidator.wow)
        break
      case score === 10:
        comment = "Perfect score,\nyou nailed it!\n\nNice."
        this.playSound(this.formValidator.nice)
        break
    }
    scoreParagraph.innerText = `${this.quizState.score} / 10\n\n${comment}`
  }

  createScorePage = () => {
    const page = this.createElementWithAttribute("div", "class", "page")
    const p = this.createElementWithInnerText("p", "YOUR SCORE:")
    const scoreP = this.createElementWithAttribute("p", "id", "score-p")
    const img = this.createElementWithAttribute("img", "src", "https://img.freepik.com/premium-vector/colorful-fireworks-display-night-sky-with-stars_1300528-72611.jpg")

    page.id = "score-page"

    page.append(p, scoreP, img)
    document.getElementById("book").appendChild(page)
  }
}
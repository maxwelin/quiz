export default class DOMManager{
  constructor(formValidator, util){
    this.formValidator = formValidator
    this.util = util
  }

  root = document.getElementById("root")
  pageCount = null

  newGame = () => {
    const book = document.getElementById("book"),
          open = document.getElementById("open"),
          back = document.getElementById("back"),
          flip = document.getElementById("next"),
          again = document.getElementById("again")

    this.util.finished = false;
    this.util.score = 0;
    this.pageCount = 10;

    flip.classList.add("hidden")
    back.classList.add("hidden")
    again.classList.add("hidden")
    open.classList.remove("hidden")
    
    back.setAttribute("disabled", true)
    flip.setAttribute("disabled", true)
    
    while (book.children.length > 0) {
      book.firstElementChild.remove()
    }
    this.createQuiz()
  }
  
  createQuiz = () => {
    let quizQuestions = this.util.getRandomQuizQuestion()
    
    this.util.fetchQuiz().then((quiz) => {
      this.createScorePage()
      for (let i = 0; i < 10; i++) {
        let rnd = quizQuestions[i]
        this.createPage(quiz[rnd].question, quiz[rnd].options, quiz[rnd].answer, quiz[rnd].img, [i])
      }
      this.createCover()
    })
  }
  
  createElementWithAttribute = (element, attributeType, attributeValue) => {
    const e = document.createElement(`${element}`)
    e.setAttribute(`${attributeType}`, `${attributeValue}`)
    return e
  }

  createElementWithInnerText = (element, innerText) => {
    const e = document.createElement(element)
    e.innerText = `${innerText}`
    return e
  }
  
  createBook = () => {
    const book = this.createElementWithAttribute("div", "id", "book")
    this.root.appendChild(book)
  }

  createButton = (element, attribute, attributeValue, innerText, className, eventListener) => {
    const btn = this.createElementWithAttribute(element, attribute, attributeValue)
    btn.innerText = innerText
    btn.classList.add(className)
    btn.addEventListener("click", eventListener)
    return btn
  }

  createButtons = () => {
    const btnContainer = this.createElementWithAttribute("div", "id", "btn-container")
    const openBookBtn = this.createButton("button", "id", "open", "Start", "button", this.openBook)
    const againBtn = this.createButton("button", "id", "again", "Restart", "button", this.newGame)
    const flipPageBtn = this.createButton("button", "id", "next", "Next🠊", "button", this.flipPage)
    const flipPageBackBtn = this.createButton("button", "id", "back", "🠈Back", "button", this.flipBack)

    btnContainer.append(flipPageBackBtn, againBtn, openBookBtn, flipPageBtn)
    this.root.appendChild(btnContainer)
 }


  createCover = () => {
    const cover = this.createElementWithAttribute("div", "id", "cover")
    const title = this.createElementWithAttribute("h1", "id", "title")
    const img = this.createElementWithAttribute("img", "src", "../media/img/cover.jpg");
    const p = this.createElementWithInnerText("p", "Quizney??")

    title.innerText = "DISNEY QUIZ"

    cover.append(title, img, p)
    document.getElementById("book").appendChild(cover)
  }

  placeholder = () => {
    console.log("new game started")
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

    document.getElementById("open").classList.add("hidden")
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

  increaseOpacityOnFlipBack = (book) => {
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
      this.util.finished = true;
      document.getElementById("back").classList.remove("hidden")
      document.getElementById("again").classList.remove("hidden")
    }

    nextBtn.setAttribute("disabled", true)
    backBtn.setAttribute("disabled", true)

    book.children[this.pageCount].classList.add("flip")
    this.countdown(book.children[this.pageCount - 1].querySelector(".timer"))

    setTimeout(() => {
      this.lowerOpacityOnFlip(book)
        if(this.util.finished){
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
        this.increaseOpacityOnFlipBack(book)
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
    clearInterval(this.util.clock);
    this.util.clock = null;
  }

  countdown = (p) => {
    this.stopCountdown()

    let timer = 10

    if(p){
      this.util.clock = setInterval(() => {
        if(timer < 4){
          p.style.color = "red"
        }
        
        p.innerText = timer
        timer -= 1
        
        if(timer < 0){
          clearInterval(this.util.clock)
          this.formValidator.timesUp(p.id.slice(-1), )
        }
      }, 1000)
    }
  }

  setImgSrc = (correctStamp, wrongStamp, hand, thumb, img, imgUrl) => {
    correctStamp.setAttribute("src", "../media/img/correct.png")
    correctStamp.className = "stamp"
    wrongStamp.setAttribute("src", "../media/img/wrong.png")
    wrongStamp.className = "stamp"
    hand.setAttribute("src", "../media/img/hand.png")
    hand.className = "hand"
    thumb.setAttribute("src", "../media/img/thumb.png")
    thumb.className = "thumb"
    img.setAttribute("src", imgUrl)
  }

  createPage = (question, options, answer, imgUrl, id) => {
    const answerP = this.createElementWithInnerText("p", `${answer}`),
          page = this.createElementWithAttribute("div", "class", "page"),
          hand = this.createElementWithAttribute("img", "id", `hand-${id}`),
          thumb = this.createElementWithAttribute("img", "id", `thumb-${id}`),
          timerP = this.createElementWithAttribute("p", "id", `timer-p-${id}`),
          questionP = this.createElementWithAttribute("p", "id", "questions-p"),
          img = this.createElementWithAttribute("img", "id", "background-image"),
          correctAnswer = this.createElementWithInnerText("p", "Correct answer:"),
          wrongStamp = this.createElementWithAttribute("img", "id", `wrong-stamp-${id}`),
          correctStamp = this.createElementWithAttribute("img", "id", `correct-stamp-${id}`)

    timerP.className = "timer"
    questionP.innerText = `${question}`
    page.append(questionP)
    
    correctAnswer.id = `correct-answer-p-${id}`
    answerP.id = `answer-p-${id}`
    correctAnswer.style.visibility = "hidden"
    answerP.style.visibility = "hidden"

    this.setImgSrc(correctStamp, wrongStamp, hand, thumb, img, imgUrl)
    this.createAnswerForm(page, options, this.pageCount, correctAnswer, answerP, id)
    page.append(correctAnswer, timerP, answerP, img, correctStamp, wrongStamp, hand, thumb)
    
    document.getElementById("book").appendChild(page)
  }

  playSound = (sound) => {
    if(sound == this.formValidator.nice){
      setTimeout(() => {
        sound.volume = 0.3
        sound.play()
      }, 800)
    } else if(sound == this.formValidator.okay){
      setTimeout(() => {
        sound.volume = 0.1
        sound.play()
      }, 600)
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
    const score = this.util.score
    if(!this.util.finished){
    
      switch (true) {
        case score === 0:
          comment = "Did you even try?\n\nEmbarrassing.."
          this.playSound(this.formValidator.aww)
          break
          case score < 5:
            comment = "Impressive...\n\nTry again and do better!"
        this.playSound(this.formValidator.clap)
        break
        case score === 5:
          comment = "Meh\n\nKeep practicing and you'll improve."
          this.playSound(this.formValidator.hmm)
          this.playSound(this.formValidator.clap)
          break
          case score === 6 || score === 7:
            comment = "Great effort,\nyou scored above average.\n\nNot bad!"
            this.playSound(this.formValidator.okay)
            this.playSound(this.formValidator.applause)
            break
            case score === 8 || score === 9:
              comment = "Great job,\nyou're getting there.\n\nKeep it up!"
        this.playSound(this.formValidator.wow)
        this.playSound(this.formValidator.applause)
        break
        case score === 10:
          comment = "Perfect score,\nyou nailed it!\n\nNice."
          this.playSound(this.formValidator.nice)
          break
        }
        scoreParagraph.innerText = `${this.util.score} / 10\n\n${comment}`
    }
  }
      
  createScorePage = () => {
    const page = this.createElementWithAttribute("div", "class", "page")
    const p = this.createElementWithInnerText("p", "YOUR SCORE:")
    const scoreP = this.createElementWithAttribute("p", "id", "score-p")
    const img = this.createElementWithAttribute("img", "src", "https://i.pinimg.com/736x/12/cf/61/12cf617f448c04012caf3c50b77614fc.jpg")

    page.id = "score-page"

    page.append(p, scoreP, img)
    document.getElementById("book").appendChild(page)
  }
}
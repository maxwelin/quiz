export default class Render{
  root = document.getElementById("root")
  pageCount = 20
  
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
    this.root.appendChild(book)
  }

  createCover = () => {
    const cover = document.createElement("div")
    const title = document.createElement("p")
    cover.setAttribute("id", "cover")
    title.setAttribute("id", "title")
    title.innerText = "wow jätteroligt quiz du vill verkligen inte missa det här"

    cover.appendChild(title)
    document.getElementById("book").appendChild(cover)
  }
  
  openBook = () => {
    const cover = document.getElementById("cover")
    cover.classList.add("flip")
    setTimeout(() => {
      cover.classList.add("flipped")
    }, 300)
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
      btn.removeAttribute("disabled")
    }, 300)
    this.pageCount -= 1
  }

  createPage = (question, options, answer) => {
    const page = document.createElement("div")
    const questionParagraph = document.createElement("p")
    const answerParagraph = document.createElement("p")

    questionParagraph.setAttribute("id", "questions-p")
    answerParagraph.setAttribute("id", "answer-p")

    page.setAttribute("class", "page")
    questionParagraph.innerText = `
    ${question}\n\n
    A: ${options[0]}\n
    B: ${options[1]}\n
    C: ${options[2]}\n
    D: ${options[3]}\n`

    answerParagraph.innerText = `\n${answer}`

    page.append(questionParagraph, answerParagraph)
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
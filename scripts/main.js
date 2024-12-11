import Util from "./Util.js"
import DOMManager from "./DOMManager.js"
import FormValidator from "./FormValidator.js"

const util = new Util()
const formValidator = new FormValidator(util)
const domManager = new DOMManager(formValidator, util)

domManager.createBook()
domManager.createButtons()
domManager.newGame()


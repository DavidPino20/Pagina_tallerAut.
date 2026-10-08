class TypeEffect {
    constructor (target, options = {}) {

        this.element = (typeof target === "string")
            ? document.querySelector(target)
        : target

        if (!this.element) {
            throw new Error
            (`Can't find ${target} on HTML Node`)
    }

this.words = options.Words || []
this.typeSpeed = options.typeSpeed || 200
this.deleteSpeed = options.deleteSpeed || 50
this.delay = options.delay || 3000
this.loop = options.loop ?? true
this.cursor = options.cursor ?? true

    this.wordIndex = 0
     this.charIndex = 0
//A variable to listen word status
     this.isDeleting = false

     if (this.cursor){
        this.element.classList.add("has-cursor")
     }
//continue typing, deleting funtions
     this.type()

    }

type() {

    const currentWord = this.words[this.wordIndex]
//stop typing animation when writing star
    this.element.classList.add("is-animatig")

    if(!this.isDeleting){
        this.element.textContent = 
            currentWord.substring(0, this.charIndex++)
    } else {
        this.element.textContent = 
            currentWord.substring(0, this.charIndex--)
    }

    // determine speed according to the text typing status
     let speed =  this.isDeleting
        ? this.deleteSpeed
        : this.typeSpeed

        if (!this.isDeleting && this.charIndex == currentWord.length + 1 ){
            speed = this.delay
             
            this.isDeleting = true

    this.element.classList.remove("is-animatig")

        
        }

}

}


const TypeElement = document.querySelector("texto-naranja")

new TypeEffect(typeElement, {

    Words: ["hola, mundo"],
    cursor: true

})




//https://www.youtube.com/watch?v=XUafrJiHI0g&t=25s
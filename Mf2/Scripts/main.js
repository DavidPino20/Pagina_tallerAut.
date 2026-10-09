class TypeEffect {
    constructor(target, options = {}) {
        this.element = typeof target === "string"
            ? document.querySelector(target)
            : target;

        if (!this.element) {
            console.error("No se encontró el elemento del texto animado.");
            return;
        }

        this.words = options.Words || [];
        this.typeSpeed = options.typeSpeed || 100;
        this.deleteSpeed = options.deleteSpeed || 50;
        this.delay = options.delay || 1800;
        this.loop = options.loop ?? true;
        this.cursor = options.cursor ?? true;

        if (this.words.length === 0) return;

        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;

        if (this.cursor) {
            this.element.classList.add("has-cursor");
        }

        this.type();
    }

    type() {
        const currentWord = this.words[this.wordIndex];

        if (!this.isDeleting) {
            this.charIndex++;
            this.element.textContent = currentWord.substring(0, this.charIndex);
        } else {
            this.charIndex--;
            this.element.textContent = currentWord.substring(0, this.charIndex);
        }

        let speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.charIndex >= currentWord.length) {
            this.isDeleting = true;
            speed = this.delay;
        } else if (this.isDeleting && this.charIndex <= 0) {
            this.isDeleting = false;
            this.wordIndex++;

            if (this.wordIndex >= this.words.length) {
                if (!this.loop) return;
                this.wordIndex = 0;
            }

            speed = 400;
        }

        setTimeout(() => this.type(), speed);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const typeElement = document.querySelector(".texto-naranja");

    if (typeElement) {
        new TypeEffect(typeElement, {
            Words: ["de confianza", "con experiencia", "seguras"],
            typeSpeed: 100,
            deleteSpeed: 50,
            delay: 1800,
            cursor: true
        });
    }
});
//https://www.youtube.com/watch?v=XUafrJiHI0g&t=25s
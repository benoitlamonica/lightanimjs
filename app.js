class LightAnim {
    constructor() {
        this.wrapper = document.querySelector('.wrapper-lightjs');
        this.domObjects = []
        let head = document.querySelector('head');
        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './css/main.css');
        head.appendChild(link);
        this.listEffect = [
            "fadeInUp",
            "fadeInDown",
            "zoom-bump",
            "anim",
            "no-opacity",
            "rotate360"
        ]
    }

    setClassCustom(domObject, classAttr) {

        let classes = domObject.getAttribute('class');

        let classToSave = [];
        if (classes !== null) {
            let arrayClasses = classes.trim().split(" ");
            arrayClasses.forEach(classe => {
                if (!this.listEffect.includes(classe)) {
                    classToSave.push(classe);

                }
            })
        }

        let stringClassToSave = classToSave.join(" ");
        let newClassAttr = stringClassToSave + " " + classAttr;
        let newClassAttrClean = newClassAttr.trim();
        domObject.setAttribute('class', newClassAttrClean);
    }

    anim(domObject, effect) {
        let objectDom = {
            domObject: domObject,
            effect: effect
        }
        this.domObjects.push(objectDom);
        this.setClassCustom(domObject, 'anim ' + effect);
        return this;
    }

    scrollTo(section) {
        let newArray = [];

        this.domObjects.forEach(domArray => {
            let newObject = domArray;

            if (Object.keys(domArray).length === 2) {
                newObject = {
                    ...domArray,
                    section: section
                }
            }
            newArray.push(newObject);
        });

        this.domObjects = newArray;
        this.applyScroll();
    }

    applyScroll() {
        console.log(this.domObjects);
        this.wrapper.addEventListener('scroll', () => {
            this.domObjects.forEach(domArray => {
                this.setClassCustom(domArray.domObject, 'anim no-opacity');
                if (domArray.section.offsetTop === this.wrapper.scrollTop) {
                    this.setClassCustom(domArray.domObject, 'anim ' + domArray.effect);
                }
            })
        })
    }

}

export default LightAnim;
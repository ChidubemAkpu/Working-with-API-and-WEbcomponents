// Use the fetch api to populate DOM.

let theTag = document.querySelector('select');
 if (!localStorage.length){
    let myCountries = async (url) =>{
        const response = await fetch(url);
        const myData = await response.json();
        const onlyCountries = myData.map(a => {
            let eachOne = a['altSpellings'][2];
            return eachOne;
        })
        let neatCountries = onlyCountries.filter(Boolean);
        return neatCountries;
    }
    
    let theCountries = myCountries('https://restcountries.com/v3.1/all');
    theCountries.then(a =>{
    
        function doThis() {
            a.forEach(b => {
                let option = document.createElement('option');
                option.innerHTML = b;
                theTag.append(option);
            })
        }
        doThis();
        localStorage.setItem('all', a);
        
    })
    
 } else {
    let myCache = localStorage.getItem('all').split(',');
    console.log(myCache)
    myCache.forEach(b => {
        let option = document.createElement('option');
        option.innerHTML = b;
        theTag.append(option);
    })
}

//Build my own web components.

class TimeFormatted extends HTMLElement{
    render(){
        let date = Date.now();
        this.setAttribute('date-time', date)
        this.innerHTML = new Intl.DateTimeFormat('default', {
            year: this.getAttribute('year') || undefined,
            month: this.getAttribute('Month') || undefined,
            day: this.getAttribute('day') || undefined,
            hour: this.getAttribute('hour') || undefined,
            minute: this.getAttribute('minute') || undefined,
            second: this.getAttribute('second') || undefined,
            timeZoneName: this.getAttribute('time-zone-name') || undefined,
        }).format(date)
    }

    connectedCallback() {
        if (this.rendered){
            return 
        }
        this.render()
        this.rendered  = true;
        setInterval(() => this.render(), 1000)
    }

    static get observedAttributes(){
        return ['date-time', 'year', 'month', 'day', 'hour', 'minute', 'time-zone-name']
    }

    attributeChangedCallback(name, oldValue, newValue){
        this.render()
    }
}


class HelloButton extends HTMLButtonElement{
    constructor(){
        super();
        this.theStuff = 'Hello'
        this.addEventListener('click', () => alert(this.theStuff));
    }
}

class HiButton extends HelloButton{
    constructor(){
        super();
        this.theStuff = 'Hi!';
    }
}

customElements.define('hello-button', HelloButton, {extends: 'button'});
customElements.define('hi-button', HiButton, {extends: 'button'});

// shadow DOM


customElements.define('show-hello', class extends HTMLElement{
    connectedCallback(){
        const shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `<p>Hello. ${this.getAttribute('name')} </p>`
    }
})


elem.onclick = function() {
    elem.attachShadow({mode: 'open'});
    elem.shadowRoot.append(tmpl.content.cloneNode(true));
    elem.shadowRoot.getElementById('message').innerHTML = 'Hello from the shadowa'

}

 








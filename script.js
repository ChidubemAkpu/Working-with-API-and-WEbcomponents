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
 






let inputtag = document.querySelector('#inputtag');
let searchbtn = document.querySelector('#searchbtn');
let loading = document.querySelector('.loading');
let result = document.querySelector('.result');
let audio = document.querySelector('audio');
let audiodiv = document.querySelector('.audiodiv');

// console.log(suggestionwant)
let api = "b724877d-44ba-4e40-94ae-2d1542d42f0d";
searchbtn.addEventListener("click", function (e) {
    e.preventDefault()
    let word = inputtag.value;
    main(word);
})

document.addEventListener("keydown", function (e) {
    if (e.code == "NumpadEnter") {
        let word = inputtag.value;
        main(word);
    }

})
function main(word) {
    inputtag.value = "";
    result.innerHTML = "";
    audio.src = "";
    audio.controls = false;
    if (word == "") {
        alert("Firstly Enter Some Word");
    }
    else {

        getmeaning(word);
    }
}
async function getmeaning(word) {
    loading.style.display = "block";
    let response = await fetch(`https:/www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${api}`);
    const data = await response.json();
    if (!data.length) {
        loading.style.display = "none";
        result.innerHTML = "No result Found";
    }
    if (typeof (data[0]) == "string") {
        loading.style.display = "none";
        let heading = document.createElement('h3');
        heading.innerHTML = "Do You Mean???";
        result.appendChild(heading);
        let suggestiondiv = document.createElement('div');
        result.appendChild(suggestiondiv);
        data.forEach(element => {
            let suggestion = document.createElement('a');
            suggestion.innerHTML = element;
            suggestiondiv.appendChild(suggestion);
        });
        let suggestionwant = document.querySelectorAll('.result a');
        suggestionwant.forEach(element => {
            element.addEventListener("click", function (e) {
                e.preventDefault()
                console.log("jai ho");
                let word = element.innerHTML;
                console.log(word);
                main(word);
            })
        });
    } else {
        loading.style.display = "none";
        let p = document.createElement('p');
        p.innerHTML = data[0].shortdef[0];
        result.appendChild(p);
        let audioname = data[0].hwi.prs[0].sound.audio;
        if (audioname) {
            render(audioname);
            // console.log(audioname)
        }
    }
}
function render(audioname) {
    let subfolder = audioname.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${audioname}.wav?key=${api}`;
    audio.src = soundSrc;
    audio.controls = true;
}
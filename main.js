const names = getSavedNames();

let myForm = document.querySelector("#test-form");
myForm.addEventListener("submit", function (e) {
    e.preventDefault();

    names.push({
        id: uuidv4(),
        firstName: e.target.elements.firstName.value
    })
    e.target.elements.firstName.value = ""
    //myForm.reset();

    saveNamesToLS(names)

});

// Vypisování zpět do stránky
let buttonToList = document.querySelector(".to-list");
buttonToList.addEventListener("click", function(event) {
    document.querySelector(".list-names").innerHTML = ""; //jinak by se znovu po vypiš vypsala jmena vicekrat za sebou

    let namesFromStorage = localStorage.getItem("names");
    let namesFromStorageJSON = JSON.parse(namesFromStorage);

    namesFromStorageJSON.forEach(function (oneObject) {
        const oneNameHtml = generateHTML(oneObject);
        document.querySelector(".list-names").appendChild(oneNameHtml);
    });

});

// funkce načítající data z localStorage

function getSavedNames() {
    const myNames = localStorage.getItem("names")

    if (myNames !== null) {
        return JSON.parse(myNames)
        // pokud jsou pri nacteni stranky v local storage nejaka data, prevede je to na .......
    } else {
        return []
    }
};

// funkce ukladajici jmeno z formulare do localStorage (pri odeslani)  

function saveNamesToLS(oneName) {
    localStorage.setItem("names", JSON.stringify(oneName))
};

// generovani html struktury, kterou umístíme do stránky po kliknutí na tlačítko vypiš

function generateHTML(oneName) {
    const newDiv = document.createElement("div");
    const newSpan = document.createElement("span");
    const buttonErase = document.createElement("button");

    // nastaveni mazaciho tlacitka
    buttonErase.textContent = "Vymazat";
    newDiv.appendChild(buttonErase);

    buttonErase.addEventListener("click", function (event) {
        removeName(names, oneName.id);
        saveNamesToLS(names);
        toListAgain()
    });

    newSpan.textContent = oneName.firstName;
    newDiv.appendChild(newSpan);

    return newDiv
};

// pomoci Id najit jmeno a pomoci splice ho odstranit

function removeName(ourNames, idName) {
    const index = ourNames.findIndex(function (nameWantToCheck) {
        return nameWantToCheck.id === idName
    }) // pokud se nic nevyhleda - index -1

    if (index > -1) {
        ourNames.splice(index, 1)
    }
};

// po smazani jmena z ls potřebuju změnu promitnout pomoci fce do html, at se nezobrazuji dale i smazana jmena

function toListAgain() {
    document.querySelector(".list-names").innerHTML = "";

    let newData = getSavedNames();

    newData.forEach(onlyOneName => {
        const newContent = generateHTML(onlyOneName);
        document.querySelector(".list-names").appendChild(newContent)
    })
};
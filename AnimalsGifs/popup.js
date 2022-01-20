// event listener pour activer l'extension quand on clique sur le bouton
let button = document.getElementById("HighlightAnimals");

button.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: main,
  });
});

function main() {
  var liste = [
    "Ant",
    "Antelope",
    "Baboon",
    "Bat",
    "Beagle",
    "Bear",
    "Bird",
    "Butterfly",
    "Cat",
    "Caterpillar",
    "Chicken",
    "Cow",
    "Dog",
    "Dolphin",
    "Donkey",
    "Eagle",
    "Elephant",
    "Fish",
    "Fly",
    "Fox",
    "Frog",
    "Gerbil",
    "Goose",
    "Gopher",
    "Gorilla",
    "Heron",
    "Honey Bee",
    "Horn Shark",
    "Horse",
    "Ibis",
    "Iguana",
    "Impala",
    "Jackal",
    "Jaguar",
    "Javanese",
    "Jellyfish",
    "Kakapo",
    "Kangaroo",
    "King Penguin",
    "Kiwi",
    "Koala",
    "Lemming",
    "Lemur",
    "Leopard",
    "Saola",
    "Scorpion",
    "Snake",
    "Swan",
    "Tuatara",
    "Turkey",
    "Zebra",
  ];
  console.log("début");
  alert("I will show you gifs of those animals: " + liste.toString());
  var newPush = prompt("You can add some words, separated by a space: ");
  if (newPush.includes(" ")) {
    newPush = newPush.split(' ')
    liste = liste.concat(newPush)
  }
  else {
    liste.push(newPush)
  }
  alert("Your new list: " + liste)
  // on boucle sur la liste pour highlight chaque mot trouve dans la page
  for (element of liste) {
    highlight(element);
  }
  console.log("fini");

  // permet de mettre en evidence les mots trouvés dans la page
  function highlight(search) {
    if (document.body.innerText.includes(search) === false) {
      return;
    }
    var paragraph = document.getElementsByTagName("p");
    // on boucle sur tous les paragraphes de la page pour y chercher
    // le terme et le remplacer par lui-même entouré de balises <mark></mark>
    for (par of paragraph) {
      /* search = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); //https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex

    var re = new RegExp(search, "g"); */
      par.innerHTML = par.innerHTML.replace(
        search,
        `<mark class="animal">$&</mark>`
      );
    }
  }

  // on boucle sur chaque mot surligné pour lui ajouter un ID et un event listener
  var animals = document.getElementsByClassName("animal");
  let i = 0;

  for (anim of animals) {
    anim.id = i.toString();
    let currEl = document.getElementById(i.toString());
    currEl.addEventListener(
      "click",
      e => { e.stopImmediatePropagation();
        showPopup(currEl);
      }
    );
    i++;
  }

  var myGif;

  function showPopup(element) {
    var gif = document.createElement("img");
    var close = document.createElement("button")
    gif.id = element.innerText + element.id;
    element.appendChild(gif);
    element.appendChild(close);
    element.style.position = "relative";
    gif.style.position = "absolute";
    gif.style.top = "15px";
    gif.style.left = "5px";
    close.innerText = "X"
    close.style.position = "absolute";
    close.style.textAlign = "center";
    close.style.top = "15px";
    close.style.left = "5px";
    close.style.height = "auto";
    close.style.border = "solid 1px white"
    close.style.backgroundColor = "red"
    close.style.color = "white"
    myGif = gif;
    getGif(element.innerText);
    close.addEventListener("click", e => { e.stopImmediatePropagation();
      console.log("closing")
      element.removeChild(myGif)
      element.removeChild(close)
    })
  }

  function getGif(searchterm) {
    var gifurl = "https://api.giphy.com/v1/gifs/search?api_key=lNEB9ueK0HjLAyPTh0pTfO6hAfRb09Sx&q=" + searchterm + "&limit=1&offset=0&rating=g&lang=en";
    // essayer avec axios
    fetch(gifurl).then(function(result) {
      return result.json();
    }).then(function(response) {
      callBackGetSuccess(response)
    });
  }

  var callBackGetSuccess = function(d) {
    console.log(d);
    myGif.src = d.data[0].images.fixed_height_small.url;
  };
}

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
 var liste = ["Ant","Antelope","Baboon","Bat","Beagle","Bear","Bird","Butterfly","Cat","Caterpillar","Chicken","Cow","Dog","Dolphin","Donkey","Eagle","Fish","Fly","Fox","Frog","Gerbil","Goose","Gopher","Gorilla","Heron","Honey Bee","Horn Shark","Horse","Ibis","Iguana","Impala","Jackal","Jaguar","Javanese","Jellyfish","Kakapo","Kangaroo","King Penguin","Kiwi","Koala","Lemming","Lemur","Leopard","Saola","Scorpion","Snake","Swan","Tuatara","Turkey","Zebra",""] 
  console.log("début")

  // on boucle sur la liste pour highlight chaque mot trouve dans la page
  for (element of liste) {
    highlight(element);
  }
  console.log("fini")

  // permet de mettre en evidence les mots trouvés dans la page 
  function highlight(search) {
    if (document.body.innerText.includes(search) === false) {
      return 
    }
    var paragraph = document.getElementsByTagName("p");
    // on boucle sur tous les paragraphes de la page pour y chercher 
    // le terme et le remplacer par lui-même entouré de balises <mark></mark>
    for (par of paragraph) {
    /* search = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); //https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex

    var re = new RegExp(search, "g"); */
    par.innerHTML = par.innerHTML.replace(search, `<mark class="animal">$&</mark>`);
    }
  }
}

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
  var liste = ["oasis", "gazelle"]; // a modifier pour inclure liste d'animaux 

  // on boucle sur la liste pour highlight chaque mot trouve dans la page
  for (element of liste) {
    highlight(element);
  }

  // permet de mettre en evidence les mots trouvés dans la page 
  function highlight(search) {
    var paragraph = document.getElementsByTagName("p");
    // on boucle sur tous les paragraphes de la page pour y chercher 
    // le terme et le remplacer par lui-même entouré de balises <mark></mark>
    for (p of paragraph) {
      search = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); //https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex

      var re = new RegExp(search, "g");

      p.innerHTML = p.innerHTML.replace(re, `<mark class="animal">$&</mark>`);
    }
  }
}

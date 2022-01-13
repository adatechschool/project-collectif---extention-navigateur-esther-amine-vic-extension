let button = document.getElementById("HighlightAnimals")

button.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: main,
    });
  });

function main() { var liste = ["oasis", "gazelle"]
 
for (element of liste) {
    highlight(element)
}

function highlight(search) {
 var paragraph = document.getElementsByTagName('p');

 for (p of paragraph) {
 search = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); //https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex

 var re = new RegExp(search, 'g');

 p.innerHTML = p.innerHTML.replace(re, `<mark>$&</mark>`);
 }
}

}

  

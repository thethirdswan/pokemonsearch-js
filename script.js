const searchButton = document.getElementById("search-button");
const container = document.getElementById("container");
let pokemonData = [];

searchButton.addEventListener("click", () => {
  clear()
  const input = document.getElementById("search-input").value.toLowerCase();
  const filter = /[^a-zA-Z0-9\s]+/g;
  let dirty = input.split("")
  if (input == "") {
    alert("Please enter name or ID")
    return;
  } else {
    for (let i = 0; i < dirty.length; i++) {
      if (filter.test(dirty[i]) == true) {
        dirty.splice(i, 1)
      }
    }
  }
  let clean = dirty.join("").replaceAll(/\s/g, "-")

  const link = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/" + clean
  
  fetch(link)
  .then((res) => res.json())
  .then((data) => {
      pokemonData = data;
      displayData(pokemonData)
    })
  .catch((err) => alert("Pokémon not found"));
})

function displayData(data) {
  const img = document.createElement("img")
  img.setAttribute("src", data.sprites.front_default)
  img.setAttribute("id", "sprite")
  container.insertBefore(img, document.getElementById("pokemon-name"))
  const monsterName = data.name.toUpperCase()
  document.getElementById("pokemon-name").innerText += monsterName;
  document.getElementById("pokemon-id").innerText += data.id;
  document.getElementById("weight").innerText += data.weight;
  document.getElementById("height").innerText += data.height
  const monstertypes = data.types
  const typeContainer = document.getElementById("types");
  monstertypes.forEach((type) => {
    let typeName = type.type.name.toUpperCase()
    const monsterType = document.createElement("p")
    monsterType.innerText = typeName;
    typeContainer.append(monsterType)
  })
  const monsterstats = data.stats
    document.getElementById("hp").innerText += monsterstats[0].base_stat;
    document.getElementById("attack").innerText += monsterstats[1].base_stat;
    document.getElementById("defense").innerText += monsterstats[2].base_stat;
    document.getElementById("special-attack").innerText += monsterstats[3].base_stat;
    document.getElementById("special-defense").innerText += monsterstats[4].base_stat;
    document.getElementById("speed").innerText += monsterstats[5].base_stat;
}

function clear() {
  if (document.getElementById("sprite") != undefined ) {
    document.getElementById("sprite").remove()
  }
  document.getElementById("pokemon-name").innerText = ""
  document.getElementById("pokemon-id").innerText = ""
  document.getElementById("weight").innerText = ""
  document.getElementById("height").innerText = ""
  document.getElementById("types").innerText = ""
  document.getElementById("hp").innerText = ""
  document.getElementById("attack").innerText = ""
  document.getElementById("defense").innerText = ""
  document.getElementById("special-attack").innerText = ""
  document.getElementById("special-defense").innerText = ""
  document.getElementById("speed").innerText = ""
}
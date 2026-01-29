export function getCanineBreeds() {
  return fetch("https://api.thedogapi.com/v1/breeds", {
    method: "GET",
    headers: {
      "x-api-key":
        "live_5svkRgOyWadRJv2cY1CruDv2TtoPMx38PhCFljF5vZ58sqzvCm9c65JFx3p5p2El",
    },
  });
}

export function getCanineByBreed(name) {
  return fetch(`https://api.thedogapi.com/v1/breeds/search?q=${name}`, {
    method: "GET",
    headers: {
      "x-api-key":
        "live_5svkRgOyWadRJv2cY1CruDv2TtoPMx38PhCFljF5vZ58sqzvCm9c65JFx3p5p2El",
    },
  });
}

export function getCaninePics() {
  return fetch("https://api.thedogapi.com/v1/images/search?limit=10", {
    method: "GET",
    headers: {
      "x-api-key":
        "live_5svkRgOyWadRJv2cY1CruDv2TtoPMx38PhCFljF5vZ58sqzvCm9c65JFx3p5p2El",
    },
  });
}

export function getOneCaninePic(id) {
  return fetch(`https://api.thedogapi.com/v1/images/${id}`, {
    method: "GET",
    headers: {
      "x-api-key":
        "live_5svkRgOyWadRJv2cY1CruDv2TtoPMx38PhCFljF5vZ58sqzvCm9c65JFx3p5p2El",
    },
  });
}

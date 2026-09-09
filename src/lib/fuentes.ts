export type FuenteOficial = {
  nombre: string;
  url: string;
  nota: string;
};

export function fuentesOficiales(nombreCientifico: string, nombreComun?: string): FuenteOficial[] {
  const frase = [nombreCientifico, nombreComun].filter(Boolean).join(" ");
  const q = encodeURIComponent(frase);
  const cientifico = encodeURIComponent(nombreCientifico);
  return [
    {
      nombre: "Google",
      url: `https://www.google.com/search?q=${q}+planta+cuidado`,
      nota: "Primera verificación. Compara fotos y fichas antes de confirmar.",
    },
    {
      nombre: "Google Imágenes",
      url: `https://www.google.com/search?tbm=isch&q=${cientifico}`,
      nota: "Contrasta la foto de tu patio con imágenes de la especie.",
    },
    {
      nombre: "Royal Horticultural Society",
      url: `https://www.rhs.org.uk/plants/search-results?query=${cientifico}`,
      nota: "Caridad hortícola del Reino Unido. Fichas de cultivo revisadas.",
    },
    {
      nombre: "Missouri Botanical Garden",
      url: `https://www.missouribotanicalgarden.org/PlantFinder/PlantFinderProfileResults.aspx?basic=${cientifico}`,
      nota: "Plant Finder del jardín botánico de Misuri.",
    },
    {
      nombre: "Kew · Plants of the World Online",
      url: `https://powo.science.kew.org/results?q=${cientifico}`,
      nota: "Royal Botanic Gardens, Kew. Nombre científico y distribución.",
    },
    {
      nombre: "UC IPM",
      url: `https://ipm.ucanr.edu/PMG/menu.homegarden.html`,
      nota: "Universidad de California. Plagas y manejo integrado.",
    },
  ];
}

export function busquedaGooglePorNombre(nombre: string): FuenteOficial[] {
  const n = nombre.trim();
  if (n.length < 2) return [];
  const q = encodeURIComponent(`${n} planta cuidado`);
  const img = encodeURIComponent(`${n} planta`);
  return [
    {
      nombre: "Google Lens",
      url: "https://lens.google.com/",
      nota: "Identifica la planta con la foto. Sube la imagen en Lens y vuelve con el nombre.",
    },
    {
      nombre: "Google",
      url: `https://www.google.com/search?q=${q}`,
      nota: "Busca por el nombre que escribiste. Compara fotos y fichas.",
    },
    {
      nombre: "Google Imágenes",
      url: `https://www.google.com/search?tbm=isch&q=${img}`,
      nota: "Contrasta con la foto de tu patio.",
    },
    {
      nombre: "Google · nombre científico",
      url: `https://www.google.com/search?q=${encodeURIComponent(`${n} nombre científico`)}`,
      nota: "Para confirmar el nombre botánico antes de agregarla.",
    },
  ];
}

export function enlacesLens(nombre?: string): FuenteOficial[] {
  return [
    {
      nombre: "Google Lens",
      url: "https://lens.google.com/",
      nota: "Abre Lens. Sube la misma foto para que Google nombre la planta.",
    },
    {
      nombre: "Google Imágenes",
      url: `https://www.google.com/search?tbm=isch&q=${encodeURIComponent((nombre ?? "planta").trim() || "planta")}`,
      nota: "Compara fotos. El enlace de una imagen es opcional.",
    },
  ];
}

import type { Especie } from "./tipos";

const POR_ID: Record<string, string> = {
  "aloe-vera": "sábila, zábila",
  aloe: "sábila, zábila",
  "ficus-elastica": "gomero, hule",
  gomero: "gomero, hule",
  "monstera-deliciosa": "costilla de Adán, piñanona",
  potos: "potos, pothos",
  "sansevieria-trifasciata": "lengua de suegra, espada de San Jorge",
  sansevieria: "lengua de suegra",
  "epipremnum-aureum": "potos",
  "codiaeum-variegatum": "croto",
  croton: "croto",
  "hibiscus-rosa-sinensis": "cayena, flor de Jamaica",
  hibisco: "cayena",
  "bougainvillea-glabra": "veranera, papelillo",
  bugambilia: "veranera, papelillo",
  "plumeria-rubra": "sacuanjoche",
  plumeria: "sacuanjoche",
  "mangifera-indica": "mango",
  mango: "mango",
  "persea-americana": "aguacate",
  aguacate: "aguacate",
  "carica-papaya": "papaya, papayón",
  papaya: "papaya",
  "musa-paradisiaca": "plátano, guineo",
  banano: "guineo, plátano",
  "coffea-arabica": "cafeto, café",
  cafe: "cafeto",
  "theobroma-cacao": "cacao",
  cacao: "cacao",
  "citrus-sinensis": "naranjo",
  naranjo: "naranjo",
  "citrus-limon": "limón, limonero",
  limon: "limón",
  "psidium-guajava": "guayaba, guayabo",
  guayaba: "guayaba",
  "annona-muricata": "guanábana",
  guanabana: "guanábana",
  "annona-squamosa": "anona",
  anona: "anona",
  "manilkara-zapota": "nispero, chicozapote",
  nispero: "níspero",
  "spondias-purpurea": "jocote",
  jocote: "jocote",
  "byrsonima-crassifolia": "nance",
  nance: "nance",
  "cocos-nucifera": "coco, palmera de coco",
  coco: "coco",
  "zea-mays": "maíz",
  maiz: "maíz",
  "phaseolus-vulgaris": "frijol",
  frijol: "frijol",
  "capsicum-annuum": "chiltoma, chile dulce",
  chile: "chiltoma, chile",
  "solanum-lycopersicum": "tomate",
  tomate: "tomate",
  "ocimum-basilicum": "albahaca",
  albahaca: "albahaca",
  "mentha-spicata": "hierbabuena",
  menta: "hierbabuena",
  "cymbopogon-citratus": "zacate limón, te de limón",
  "lemon-grass": "zacate limón",
  "aloe-barbadensis": "sábila",
  "opuntia-ficus-indica": "tuna, nopal",
  nopal: "tuna",
  "rosa-sp": "rosa",
  rosa: "rosa",
  "tagetes-erecta": "flor de muerto, clavelón",
  cempasuchil: "flor de muerto",
  "zinnia-elegans": "catalina",
  "ixora-coccinea": "ixora, cruz de Malta",
  ixora: "ixora",
  "codiaeum": "croto",
  "dracaena-fragrans": "palo de Brasil, tronquito de la felicidad",
  "yucca-gigantea": "yuca de jardín, izote",
  yuca: "yuca",
  "manihot-esculenta": "yuca",
  "colocasia-esculenta": "quequisque, malanga",
  malanga: "quequisque, malanga",
  "xanthosoma-sagittifolium": "quequisque",
  "anthurium-andraeanum": "anturio",
  anturio: "anturio",
  "orchidaceae": "orquídea",
  orquidea: "orquídea",
  "euphorbia-pulcherrima": "pascua, flor de pascua",
  pascua: "flor de pascua",
  "dieffenbachia-seguine": "cana de indio, dieffenbachia",
  dieffenbachia: "cana de indio",
  "schefflera-actinophylla": "cheflera",
  cheflera: "cheflera",
  "ficus-benjamina": "laurel de la India, ficus",
  "cedrela-odorata": "cedro",
  cedro: "cedro",
  "swietenia-macrophylla": "caoba",
  caoba: "caoba",
  "enterolobium-cyclocarpum": "guanacaste",
  guanacaste: "guanacaste",
  "tabebuia-rosea": "roble de savana, macuelizo",
  roble: "roble de savana",
  "cochlospermum-vitifolium": "poro-poro, tecomasuche",
  "cordia-alliodora": "laurel",
  "pterocarpus-officinalis": "sangredrago",
};

const POR_CIENTIFICO: Record<string, string> = {
  "aloe vera": "sábila, zábila",
  "ficus elastica": "gomero, hule",
  "monstera deliciosa": "costilla de Adán, piñanona",
  "epipremnum aureum": "potos",
  "dracaena trifasciata": "lengua de suegra",
  "sansevieria trifasciata": "lengua de suegra",
  "hibiscus rosa-sinensis": "cayena",
  "bougainvillea glabra": "veranera, papelillo",
  "plumeria rubra": "sacuanjoche",
  "euphorbia pulcherrima": "flor de pascua",
  "manihot esculenta": "yuca",
  "colocasia esculenta": "quequisque, malanga",
  "capsicum annuum": "chiltoma",
  "cymbopogon citratus": "zacate limón",
  "spondias purpurea": "jocote",
  "annona muricata": "guanábana",
  "byrsonima crassifolia": "nance",
  "enterolobium cyclocarpum": "guanacaste",
  "tabebuia rosea": "roble de savana",
};

function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function nombreEnNicaragua(opts: { id?: string; comun?: string; cientifico?: string }) {
  if (opts.id && POR_ID[opts.id]) return POR_ID[opts.id];
  const cien = norm(opts.cientifico ?? "");
  if (cien && POR_CIENTIFICO[cien]) return POR_CIENTIFICO[cien];
  const comun = norm(opts.comun ?? "");
  if (!comun) return "";
  for (const [clave, alias] of Object.entries(POR_ID)) {
    if (comun.includes(norm(clave)) || norm(alias).includes(comun)) return alias;
  }
  for (const [clave, alias] of Object.entries(POR_CIENTIFICO)) {
    if (cien.includes(clave) || comun.includes(clave)) return alias;
  }
  return opts.comun?.trim() || "";
}

export function nombreNicaraguaDeEspecie(e: Pick<Especie, "id" | "nombreComun" | "nombreCientifico">) {
  return nombreEnNicaragua({ id: e.id, comun: e.nombreComun, cientifico: e.nombreCientifico });
}

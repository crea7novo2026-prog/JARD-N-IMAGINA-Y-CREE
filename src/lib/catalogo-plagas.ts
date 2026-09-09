import type { Plaga } from "./tipos";

export const CATALOGO_PLAGAS: Plaga[] = [
  {
    id: "pulgon",
    nombre: "Pulgón",
    signos: [
      "Colonias verdes, negras o amarillas en brotes tiernos",
      "Hojas enrolladas y pegajosas (melaza)",
      "Hormigas subiendo por el tallo",
    ],
    temporada: "Seca-lluviosa de transición; brotes nuevos todo el año en interior",
    tratamientosOrganicos: [
      "Chorros de agua a presión en el envés",
      "Jabón potásico al 1–2 % al atardecer",
      "Liberar mariquitas o crisopas si el patio lo permite",
    ],
    tratamientosQuimicos: [
      "Uso responsable: imidacloprid solo en infestaciones graves, lejos de floración y polinizadores",
    ],
    prevencion: "Evita nitrógeno de más; ventila; revisa brotes dos veces por semana.",
    tiposRelacionados: ["huerto", "flor", "interior", "exterior"],
  },
  {
    id: "cochinilla-algodonosa",
    nombre: "Cochinilla algodonosa",
    signos: [
      "Motas blancas algodonosas en axilas y raíces superficiales",
      "Planta deslucida aunque el riego sea correcto",
      "Melaza y fumagina negra",
    ],
    temporada: "Ambientes secos de interior; invierno con calefacción",
    tratamientosOrganicos: [
      "Hisopo con alcohol isopropílico al 70 %",
      "Aceite de neem en tres pases semanales",
      "Revisar la maceta: a veces vive en la raíz",
    ],
    tratamientosQuimicos: [
      "Uso responsable: jabón insecticida sistémico etiquetado para ornamentales, no en hortalizas de hoja",
    ],
    prevencion: "Cuarentena de plantas nuevas 14 días. No reutilices sustrato infestado.",
    tiposRelacionados: ["interior", "suculenta", "flor"],
  },
  {
    id: "arana-roja",
    nombre: "Araña roja",
    signos: [
      "Punteado fino amarillo en el haz",
      "Telaraña tenue en el envés",
      "Hojas que se secan de borde a centro",
    ],
    temporada: "Meses secos y calurosos; interior con aire acondicionado",
    tratamientosOrganicos: [
      "Sube humedad ambiental y lava el envés",
      "Aceite de neem + jabón potásico",
      "Ácaros depredadores si hay vivero",
    ],
    tratamientosQuimicos: [
      "Uso responsable: acaricida específico (no insecticida genérico); rota modo de acción",
    ],
    prevencion: "Humedad estable, no pulverices a pleno sol, separa plantas apiñadas.",
    tiposRelacionados: ["interior", "flor", "huerto"],
  },
  {
    id: "mosca-blanca",
    nombre: "Mosca blanca",
    signos: [
      "Nube de insectos blancos al mover la planta",
      "Envés con puntos y melaza",
      "Hojas amarillas de abajo hacia arriba",
    ],
    temporada: "Calor húmedo; invernaderos y patios cerrados",
    tratamientosOrganicos: [
      "Trampas amarillas adhesivas",
      "Neem al envés cada 5 días",
      "Aspirar adultos por la mañana",
    ],
    tratamientosQuimicos: [
      "Uso responsable: jabón insecticida o aceite hortícola; evita piretroides repetidos",
    ],
    prevencion: "Malla anti-insectos en semillero; no fumes plantas con exceso de abono.",
    tiposRelacionados: ["huerto", "flor", "interior"],
  },
  {
    id: "trips",
    nombre: "Trips",
    signos: [
      "Rayas plateadas en pétalos y hojas",
      "Puntos negros de excremento",
      "Brotes deformes",
    ],
    temporada: "Seca caliente; flores abiertas",
    tratamientosOrganicos: [
      "Trampas azules adhesivas",
      "Neem + spinosad biológico en flores no comestibles inmediatas",
      "Retira flores muy dañadas",
    ],
    tratamientosQuimicos: [
      "Uso responsable: spinosad comercial según etiqueta; respeta intervalo de seguridad en huerto",
    ],
    prevencion: "Revisa capullos; evita traer ramos silvestres al interior.",
    tiposRelacionados: ["flor", "huerto", "interior"],
  },
  {
    id: "cochinilla-escudo",
    nombre: "Cochinilla de escudo",
    signos: [
      "Caparazones ovalados pegados al tallo",
      "Ramas que se secan sin motivo aparente",
      "Melaza en el piso de la maceta",
    ],
    temporada: "Todo el año en cítricos y ficus",
    tratamientosOrganicos: [
      "Raspa escudos con uña o cepillo suave",
      "Aceite mineral en invierno vegetativo",
      "Poda de ramas muy cubiertas",
    ],
    tratamientosQuimicos: [
      "Uso responsable: aceite parafílico etiquetado para cítricos, lejos de floración",
    ],
    prevencion: "Inspección mensual de ramas interiores; no dejes polvo grueso en el follaje.",
    tiposRelacionados: ["arbol", "interior", "exterior"],
  },
  {
    id: "minador",
    nombre: "Minador de hoja",
    signos: [
      "Galerías serpentinas claras en la hoja",
      "Larva visible a contraluz",
      "Hojas que se secan en parches",
    ],
    temporada: "Invierno-primavera en cítricos y tomate",
    tratamientosOrganicos: [
      "Aprieta la galería con los dedos para matar la larva",
      "Retira hojas muy minadas",
      "Neem preventivo en brotes nuevos",
    ],
    tratamientosQuimicos: [
      "Uso responsable: abamectina solo si el brote nuevo se pierde por completo",
    ],
    prevencion: "No riegues el follaje al mediodía; mantén vigor sin exceso de nitrógeno.",
    tiposRelacionados: ["arbol", "huerto"],
  },
  {
    id: "oruga",
    nombre: "Oruga y gusano cogollero",
    signos: [
      "Agujeros irregulares en hoja y fruto",
      "Excremento oscuro en axilas",
      "Cogollos comidos en maíz y tomate",
    ],
    temporada: "Lluvias y luna creciente de cultivo",
    tratamientosOrganicos: [
      "Recolección manual al atardecer",
      "Bacillus thuringiensis (Bt) en hojas tiernas",
      "Malla en semillero",
    ],
    tratamientosQuimicos: [
      "Uso responsable: Bt comercial o spinosad; no uses organofosforados de amplio espectro",
    ],
    prevencion: "Revisa envés cada dos días en temporada de mariposas.",
    tiposRelacionados: ["huerto", "flor"],
  },
  {
    id: "babosa",
    nombre: "Caracol y babosa",
    signos: [
      "Rastro plateado en sustrato y hojas",
      "Agujeros grandes en lechuga y hostas",
      "Actividad nocturna",
    ],
    temporada: "Lluvias y madrugadas húmedas",
    tratamientosOrganicos: [
      "Cebos de cerveza enterrados",
      "Ceniza o cascarilla de huevo alrededor del cuello",
      "Recolección con linterna",
    ],
    tratamientosQuimicos: [
      "Uso responsable: metaldehído lejos de mascotas y niños; prefiere fosfato férrico",
    ],
    prevencion: "No dejes tablas ni hojarasca pegada al cuello de la planta.",
    tiposRelacionados: ["huerto", "flor", "exterior"],
  },
  {
    id: "oidio",
    nombre: "Oídio",
    signos: [
      "Polvo blanco en haz de hoja",
      "Hojas que se abarquillan y secan",
      "Brotes que no abren bien",
    ],
    temporada: "Días cálidos y noches frescas; poca ventilación",
    tratamientosOrganicos: [
      "Leche diluida 1:10 en las primeras manchas",
      "Bicarbonato de potasio etiquetado",
      "Poda de densidades",
    ],
    tratamientosQuimicos: [
      "Uso responsable: azufre mojable lejos de calor extremo; no mezclar con aceite",
    ],
    prevencion: "Sol de mañana, espacio entre macetas, riega el sustrato no la hoja.",
    tiposRelacionados: ["huerto", "flor", "interior"],
  },
  {
    id: "mildiu",
    nombre: "Mildiu",
    signos: [
      "Manchas aceitosas en el haz",
      "Felpa gris en el envés",
      "Colapso rápido en tomate y pepino",
    ],
    temporada: "Lluvias prolongadas",
    tratamientosOrganicos: [
      "Retira hojas bajas que tocan el suelo",
      "Cola de caballo o decocción de ajo preventiva",
      "Mejora drenaje de inmediato",
    ],
    tratamientosQuimicos: [
      "Uso responsable: cobre (caldo bordelés) según etiqueta, no en floración intensa",
    ],
    prevencion: "Tutorado, mulch, no mojar follaje al atardecer.",
    tiposRelacionados: ["huerto", "flor"],
  },
  {
    id: "pudricion-raiz",
    nombre: "Pudrición de raíz",
    signos: [
      "Hojas blandas con sustrato mojado",
      "Mal olor en la maceta",
      "Raíces negras y quebradizas",
    ],
    temporada: "Invierno y lluvias; macetas sin drenaje",
    tratamientosOrganicos: [
      "Saca la planta, corta raíces negras, deja secar 12 h",
      "Sustrato nuevo y maceta limpia",
      "Riego medido por peso de maceta",
    ],
    tratamientosQuimicos: [
      "Uso responsable: fungicida a base de fosetil solo si queda tejido vivo",
    ],
    prevencion: "Agujeros de drenaje, sustrato aireado, nunca plato con agua estancada.",
    tiposRelacionados: ["interior", "suculenta", "huerto"],
  },
  {
    id: "antracnosis",
    nombre: "Antracnosis",
    signos: [
      "Manchas hundidas en hoja y fruto",
      "Bordes oscuros con centro gris",
      "Caída prematura de fruto",
    ],
    temporada: "Lluvias y salpicadura de suelo",
    tratamientosOrganicos: [
      "Retira frutos y hojas manchados",
      "Mulch para evitar salpicadura",
      "Cobre suave al inicio de lluvias",
    ],
    tratamientosQuimicos: [
      "Uso responsable: fungicida cúprico rotado; lava herramientas",
    ],
    prevencion: "No trabajes el huerto con follaje mojado.",
    tiposRelacionados: ["arbol", "huerto", "flor"],
  },
  {
    id: "fusarium",
    nombre: "Fusarium",
    signos: [
      "Marchitez de un lado de la planta",
      "Corte del tallo con vasos oscuros",
      "No se recupera con riego",
    ],
    temporada: "Suelos cálidos y cansados",
    tratamientosOrganicos: [
      "Elimina la planta y no siembres la misma familia 2 años",
      "Compost maduro y rotación",
      "Solariza canteros vacíos",
    ],
    tratamientosQuimicos: [
      "Uso responsable: no hay cura fiable; desinfecta herramientas con alcohol",
    ],
    prevencion: "Semilla sana, sustrato nuevo, no reutilizar tierra de tomate enfermo.",
    tiposRelacionados: ["huerto"],
  },
  {
    id: "nematodos",
    nombre: "Nematodos",
    signos: [
      "Nudos en raíces",
      "Planta enana pese al abono",
      "Marchitez al mediodía que se recupera de noche",
    ],
    temporada: "Suelos arenosos cálidos",
    tratamientosOrganicos: [
      "Siembra de tagetes o ruda como ruptura",
      "Materia orgánica abundante",
      "Solarización de cantero",
    ],
    tratamientosQuimicos: [
      "Uso responsable: evitar nematocidas domésticos tóxicos; prioriza rotación",
    ],
    prevencion: "No muevas tierra de un cantero enfermo a otro.",
    tiposRelacionados: ["huerto", "arbol"],
  },
  {
    id: "hormiga",
    nombre: "Hormiga granívora y pastora",
    signos: [
      "Caminos hacia pulgones",
      "Semillas desaparecidas del semillero",
      "Tierra amontonada en el cuello",
    ],
    temporada: "Seca; nidos cerca de macetas",
    tratamientosOrganicos: [
      "Rompe el nido con agua hirviendo lejos de raíces",
      "Canela o borato en caminos, no sobre hortaliza",
      "Controla primero el pulgón que pastorean",
    ],
    tratamientosQuimicos: [
      "Uso responsable: cebo de ácido bórico fuera del alcance de niños y mascotas",
    ],
    prevencion: "Patas de mesa en agua; no dejes fruta madura en el patio.",
    tiposRelacionados: ["huerto", "exterior", "interior"],
  },
  {
    id: "mosquita-hongo",
    nombre: "Mosquita del hongo",
    signos: [
      "Mosquitas negras que salen al regar",
      "Larvas blancas en los primeros 2 cm de sustrato",
      "Plántulas que se caen",
    ],
    temporada: "Interior húmedo todo el año",
    tratamientosOrganicos: [
      "Deja secar la capa superficial",
      "Capa de arena o gravilla",
      "Trampas amarillas y nematodes Steinernema si hay vivero",
    ],
    tratamientosQuimicos: [
      "Uso responsable: Bacillus israelensis en riego, no insecticidas de amplio espectro",
    ],
    prevencion: "Riego por abajo; no dejes materia en descomposición en la superficie.",
    tiposRelacionados: ["interior", "huerto"],
  },
  {
    id: "roya",
    nombre: "Roya",
    signos: [
      "Pústulas naranjas en el envés",
      "Hojas que se caen de abajo hacia arriba",
      "Tallos débiles en rosa y hibisco",
    ],
    temporada: "Humedad alta con rocío matutino",
    tratamientosOrganicos: [
      "Retira hojas afectadas al suelo",
      "Mejora aire y sol de mañana",
      "Bicarbonato o cola de caballo al inicio",
    ],
    tratamientosQuimicos: [
      "Uso responsable: fungicida cúprico o tebuconazol etiquetado para ornamentales",
    ],
    prevencion: "No mojes el follaje de noche; rastrilla hojarasca.",
    tiposRelacionados: ["flor", "arbol", "exterior"],
  },
  {
    id: "mancha-bacteriana",
    nombre: "Mancha bacteriana",
    signos: [
      "Manchas aceitosas con halo amarillo",
      "Fruto con costras",
      "Se agrava con lluvia",
    ],
    temporada: "Lluvias y salpicadura",
    tratamientosOrganicos: [
      "Elimina tejido enfermo y no compostes frutos podridos",
      "Cobre al inicio de síntomas",
      "Riego al pie",
    ],
    tratamientosQuimicos: [
      "Uso responsable: cobre según etiqueta; no hay antibiótico doméstico seguro",
    ],
    prevencion: "Semilla tratada, rotación, no trabajar mojado.",
    tiposRelacionados: ["huerto"],
  },
  {
    id: "fumagina",
    nombre: "Fumagina",
    signos: [
      "Polvo negro que se raspa sobre la hoja",
      "Siempre asociada a pulgón o cochinilla",
      "Fotosíntesis reducida",
    ],
    temporada: "Después de infestaciones de chupadores",
    tratamientosOrganicos: [
      "Lava con agua y jabón suave",
      "Trata la plaga que produce melaza",
      "Mejora luz y ventilación",
    ],
    tratamientosQuimicos: [
      "Uso responsable: no fumes el hollín; ataca el insecto primario",
    ],
    prevencion: "Control temprano de pulgón y cochinilla.",
    tiposRelacionados: ["interior", "arbol", "exterior"],
  },
];

export function plagaPorId(id: string): Plaga | undefined {
  return CATALOGO_PLAGAS.find((p) => p.id === id);
}

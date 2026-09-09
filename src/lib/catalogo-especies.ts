import type { AfinidadesLunares, Especie } from "./tipos";

const AF_HOJA: AfinidadesLunares = {
	regar: "creciente",
	fertilizar: "creciente",
	podar: "menguante",
	sembrar: "nueva",
	plagar: "llena"
};
const AF_FRUTO: AfinidadesLunares = {
	regar: "creciente",
	fertilizar: "creciente",
	podar: "menguante",
	sembrar: "creciente",
	plagar: "llena"
};
const AF_RAIZ: AfinidadesLunares = {
	regar: "menguante",
	fertilizar: "menguante",
	podar: "menguante",
	sembrar: "menguante",
	plagar: "llena"
};
const AF_SUC: AfinidadesLunares = {
	regar: "menguante",
	fertilizar: "creciente",
	podar: "menguante",
	sembrar: "nueva",
	plagar: "cualquier"
};
const AF_FLOR: AfinidadesLunares = {
	regar: "creciente",
	fertilizar: "creciente",
	podar: "menguante",
	sembrar: "creciente",
	plagar: "llena"
};
function e(b: Partial<Especie> & Pick<Especie, "id" | "nombreComun" | "nombreCientifico" | "familia" | "tipo" | "luz" | "waterFreqDays" | "waterNotes" | "tipoFertilizante" | "diasFrecuenciaFertilizante" | "temporadaFertilizante" | "suelo" | "humedad" | "tempMinC" | "tempMaxC" | "podarCuando" | "trasplantarCuando" | "moonAffinity" | "plagasComunes" | "consejosCuidado" | "problemas">): Especie {
	return {
		toxicidad: "ninguna_conocida",
		...b
	};
}
export const CATALOGO_ESPECIES = [
	e({
		id: "monstera-deliciosa",
		nombreComun: "Costilla de Adán",
		nombreCientifico: "Monstera deliciosa",
		familia: "Araceae",
		tipo: "interior",
		toxicidad: "mascotas_y_ninos",
		luz: "Luz filtrada brillante; evita sol directo de mediodía",
		waterFreqDays: 8,
		waterNotes: "Riega cuando los 3 cm superiores estén secos. Menos en meses frescos.",
		tipoFertilizante: "Equilibrado 10-10-10 diluido",
		diasFrecuenciaFertilizante: 28,
		temporadaFertilizante: "Marzo a octubre",
		suelo: "Sustrato aireado con corteza y perlita",
		humedad: "Media-alta",
		tempMinC: 15,
		tempMaxC: 32,
		podarCuando: "Tallas largas o hojas rotas, luna menguante",
		trasplantarCuando: "Cada 2 años o cuando las raíces salgan por abajo",
		moonAffinity: AF_HOJA,
		plagasComunes: [
			"cochinilla-algodonosa",
			"arana-roja",
			"mosquita-hongo"
		],
		consejosCuidado: [
			"Un tutor con musgo ayuda a las hojas adultas a fenestrarse.",
			"Limpia el polvo del follaje una vez al mes.",
			"No cortes las raíces aéreas: búscalas hacia el tutor.",
			"Gira la maceta un cuarto cada dos semanas."
		],
		problemas: [{
			sintoma: "Hojas sin agujeros",
			causa: "Poca luz o planta joven",
			solucion: "Acércala a una ventana este y ofrece tutor."
		}, {
			sintoma: "Hojas amarillas blandas",
			causa: "Exceso de riego",
			solucion: "Deja secar y revisa drenaje."
		}]
	}),
	e({
		id: "potos",
		nombreComun: "Potos",
		nombreCientifico: "Epipremnum aureum",
		familia: "Araceae",
		tipo: "interior",
		toxicidad: "mascotas_y_ninos",
		luz: "De sombra luminosa a luz media",
		waterFreqDays: 9,
		waterNotes: "Prefiere secarse un poco entre riegos.",
		tipoFertilizante: "Foliar o líquido 20-20-20 a media dosis",
		diasFrecuenciaFertilizante: 30,
		temporadaFertilizante: "Todo el año en interior, más suave en diciembre-febrero",
		suelo: "Universal ligero",
		humedad: "Media",
		tempMinC: 14,
		tempMaxC: 34,
		podarCuando: "Cuando se despuebla la base",
		trasplantarCuando: "Cada 18–24 meses",
		moonAffinity: AF_HOJA,
		plagasComunes: ["cochinilla-algodonosa", "arana-roja"],
		consejosCuidado: [
			"Esquejes en agua enraízan en 10–14 días.",
			"El variegado pide más luz que el verde liso.",
			"Si pierde color, súbele la luz, no el abono."
		],
		problemas: [{
			sintoma: "Hojas pálidas",
			causa: "Poca luz",
			solucion: "Muévela más cerca de la ventana."
		}, {
			sintoma: "Puntas secas",
			causa: "Aire acondicionado",
			solucion: "Agrupa plantas o usa bandeja con gravilla."
		}]
	}),
	e({
		id: "spathiphyllum",
		nombreComun: "Cuna de Moisés",
		nombreCientifico: "Spathiphyllum wallisii",
		familia: "Araceae",
		tipo: "interior",
		toxicidad: "mascotas_y_ninos",
		luz: "Sombra luminosa; nunca sol directo",
		waterFreqDays: 6,
		waterNotes: "Se dobla cuando tiene sed; no la dejes así seguido.",
		tipoFertilizante: "Rico en fósforo en floración",
		diasFrecuenciaFertilizante: 21,
		temporadaFertilizante: "Abril a noviembre",
		suelo: "Turba con perlita, siempre húmedo no encharcado",
		humedad: "Alta",
		tempMinC: 16,
		tempMaxC: 30,
		podarCuando: "Retira espátulas marrones desde la base",
		trasplantarCuando: "Cuando el cepellón empuje la maceta",
		moonAffinity: AF_FLOR,
		plagasComunes: [
			"cochinilla-algodonosa",
			"pulgon",
			"mosquita-hongo"
		],
		consejosCuidado: [
			"Agua sin cloro si puedes dejarla reposar.",
			"Las flores verdes indican poca luz.",
			"Divide matas densas en primavera."
		],
		problemas: [{
			sintoma: "Puntas quemadas",
			causa: "Sales o cloro",
			solucion: "Riega a fondo y cambia el tercio superior de tierra."
		}, {
			sintoma: "No florece",
			causa: "Poca luz o maceta enorme",
			solucion: "Luz media y maceta justa."
		}]
	}),
	e({
		id: "ficus-elastica",
		nombreComun: "Ficus robusta",
		nombreCientifico: "Ficus elastica",
		familia: "Moraceae",
		tipo: "interior",
		toxicidad: "mascotas",
		luz: "Luz brillante filtrada",
		waterFreqDays: 10,
		waterNotes: "Riego profundo y luego espera sequedad superficial.",
		tipoFertilizante: "Equilibrado líquido",
		diasFrecuenciaFertilizante: 28,
		temporadaFertilizante: "Marzo a septiembre",
		suelo: "Universal con buen drenaje",
		humedad: "Media",
		tempMinC: 14,
		tempMaxC: 33,
		podarCuando: "Para ramificar, corte sobre nudo en menguante",
		trasplantarCuando: "Cada 2–3 años",
		moonAffinity: AF_HOJA,
		plagasComunes: ["cochinilla-escudo", "arana-roja"],
		consejosCuidado: [
			"El látex mancha: usa guantes al podar.",
			"No la mudes de sitio cada semana.",
			"Limpia hojas grandes con paño húmedo."
		],
		problemas: [{
			sintoma: "Caída de hojas inferiores",
			causa: "Cambio brusco de luz o riego irregular",
			solucion: "Estabiliza sitio y calendario."
		}, {
			sintoma: "Hojas opacas",
			causa: "Polvo",
			solucion: "Limpieza mensual."
		}]
	}),
	e({
		id: "ficus-lyrata",
		nombreComun: "Ficus lira",
		nombreCientifico: "Ficus lyrata",
		familia: "Moraceae",
		tipo: "interior",
		toxicidad: "mascotas",
		luz: "Mucha luz indirecta; ventana este u oeste con cortina",
		waterFreqDays: 8,
		waterNotes: "Riega todo el cepellón y vacía el plato.",
		tipoFertilizante: "Equilibrado suave",
		diasFrecuenciaFertilizante: 28,
		temporadaFertilizante: "Crecimiento activo",
		suelo: "Suelto, rico, con perlita",
		humedad: "Media-alta",
		tempMinC: 16,
		tempMaxC: 32,
		podarCuando: "Para formar copa, en primavera",
		trasplantarCuando: "Cuando deje de crecer y el agua pase de largo",
		moonAffinity: AF_HOJA,
		plagasComunes: ["arana-roja", "cochinilla-escudo"],
		consejosCuidado: [
			"Odian las corrientes frías.",
			"Un solo sitio estable vale más que abono extra.",
			"Si pierde hojas nuevas, revisa riego no luz."
		],
		problemas: [{
			sintoma: "Manchas marrones",
			causa: "Riego irregular",
			solucion: "Pesa la maceta; riega solo al aligerar."
		}, {
			sintoma: "Tronco pelado",
			causa: "Poca luz inferior",
			solucion: "Poda de formación y más luz."
		}]
	}),
	e({
		id: "sansevieria",
		nombreComun: "Lengua de suegra",
		nombreCientifico: "Dracaena trifasciata",
		familia: "Asparagaceae",
		tipo: "suculenta",
		toxicidad: "mascotas",
		luz: "De sombra a sol suave",
		waterFreqDays: 18,
		waterNotes: "Mejor pecar de seco. En invierno, aún menos.",
		tipoFertilizante: "Cactus, media dosis",
		diasFrecuenciaFertilizante: 60,
		temporadaFertilizante: "Abril a agosto",
		suelo: "Arenoso y drenante",
		humedad: "Baja",
		tempMinC: 12,
		tempMaxC: 35,
		podarCuando: "Solo hojas dañadas",
		trasplantarCuando: "Cuando rompa la maceta",
		moonAffinity: AF_SUC,
		plagasComunes: ["cochinilla-algodonosa", "pudricion-raiz"],
		consejosCuidado: [
			"Maceta de barro ayuda a evaporar.",
			"No dejes agua en el cogollo.",
			"Hijos laterales se separan en seco."
		],
		problemas: [{
			sintoma: "Base blanda",
			causa: "Pudrición",
			solucion: "Corta lo sano y deja callo 2 días."
		}, {
			sintoma: "Hojas arrugadas",
			causa: "Sed extrema",
			solucion: "Riego profundo único."
		}]
	}),
	e({
		id: "zz",
		nombreComun: "Planta ZZ",
		nombreCientifico: "Zamioculcas zamiifolia",
		familia: "Araceae",
		tipo: "interior",
		toxicidad: "mascotas_y_ninos",
		luz: "Sombra a luz media",
		waterFreqDays: 16,
		waterNotes: "Los rizomas guardan agua; espera sequedad real.",
		tipoFertilizante: "Equilibrado muy diluido",
		diasFrecuenciaFertilizante: 45,
		temporadaFertilizante: "Mayo a septiembre",
		suelo: "Muy drenante",
		humedad: "Baja-media",
		tempMinC: 15,
		tempMaxC: 34,
		podarCuando: "Tallos amarillos desde la base",
		trasplantarCuando: "Cada 3 años",
		moonAffinity: AF_SUC,
		plagasComunes: ["cochinilla-algodonosa", "pudricion-raiz"],
		consejosCuidado: [
			"Crece lento: no la fuerces con abono.",
			"Hojas brillantes se limpian con agua, no con aceite.",
			"Tolera oficinas con luz floja."
		],
		problemas: [{
			sintoma: "Tallos arrugados",
			causa: "Sed o pudrición de rizoma",
			solucion: "Saca y revisa: si está firme, riega; si está blando, corta."
		}, {
			sintoma: "Hojas caídas",
			causa: "Frío",
			solucion: "Aléjala de A/C directo."
		}]
	}),
	e({
		id: "filodendro-corazon",
		nombreComun: "Filodendro corazón",
		nombreCientifico: "Philodendron hederaceum",
		familia: "Araceae",
		tipo: "interior",
		toxicidad: "mascotas_y_ninos",
		luz: "Luz media filtrada",
		waterFreqDays: 8,
		waterNotes: "Mantén ligeramente húmedo, no empapado.",
		tipoFertilizante: "Líquido equilibrado",
		diasFrecuenciaFertilizante: 28,
		temporadaFertilizante: "Crecimiento activo",
		suelo: "Rico y aireado",
		humedad: "Media-alta",
		tempMinC: 15,
		tempMaxC: 32,
		podarCuando: "Guías largas para densificar",
		trasplantarCuando: "Anual si crece fuerte",
		moonAffinity: AF_HOJA,
		plagasComunes: ["pulgon", "cochinilla-algodonosa"],
		consejosCuidado: [
			"Pinza puntas para que se ponga tupido.",
			"Tutor o cesta colgante, ambos funcionan.",
			"Hojas pequeñas = poca luz."
		],
		problemas: [{
			sintoma: "Hojas amarillas",
			causa: "Riego excesivo",
			solucion: "Seca y ventila."
		}, {
			sintoma: "Entrenudos largos",
			causa: "Busca luz",
			solucion: "Acércala a la ventana."
		}]
	}),
	e({
		id: "calathea-orbifolia",
		nombreComun: "Calatea orbifolia",
		nombreCientifico: "Calathea orbifolia",
		familia: "Marantaceae",
		tipo: "interior",
		toxicidad: "ninguna_conocida",
		luz: "Sombra luminosa, sin sol directo",
		waterFreqDays: 6,
		waterNotes: "Agua blanda; no dejes secar del todo.",
		tipoFertilizante: "Suave, media dosis",
		diasFrecuenciaFertilizante: 30,
		temporadaFertilizante: "Abril a septiembre",
		suelo: "Ácido ligero, siempre aireado",
		humedad: "Alta",
		tempMinC: 17,
		tempMaxC: 29,
		podarCuando: "Hojas secas desde la base",
		trasplantarCuando: "Cuando el rizoma asome",
		moonAffinity: AF_HOJA,
		plagasComunes: ["arana-roja", "mosquita-hongo"],
		consejosCuidado: [
			"El agua dura quema los bordes.",
			"Humedad constante evita ácaros.",
			"No la pongas junto a una ventana de sol fuerte."
		],
		problemas: [{
			sintoma: "Bordes tostados",
			causa: "Sales o aire seco",
			solucion: "Agua de lluvia o filtrada; sube humedad."
		}, {
			sintoma: "Hojas enrolladas de día",
			causa: "Sed o calor",
			solucion: "Riego y sombra."
		}]
	}),
	e({
		id: "maranta",
		nombreComun: "Planta de la oración",
		nombreCientifico: "Maranta leuconeura",
		familia: "Marantaceae",
		tipo: "interior",
		toxicidad: "ninguna_conocida",
		luz: "Luz baja a media",
		waterFreqDays: 6,
		waterNotes: "Sustrato fresco; reduce en meses frescos.",
		tipoFertilizante: "Equilibrado diluido",
		diasFrecuenciaFertilizante: 28,
		temporadaFertilizante: "Crecimiento",
		suelo: "Ligero y ligeramente ácido",
		humedad: "Alta",
		tempMinC: 16,
		tempMaxC: 30,
		podarCuando: "Tallos rastreros desordenados",
		trasplantarCuando: "Cada 1–2 años",
		moonAffinity: AF_HOJA,
		plagasComunes: ["arana-roja", "mosquita-hongo"],
		consejosCuidado: [
			"Las hojas se cierran de noche: es normal.",
			"Esquejes de nudo enraízan fácil.",
			"Evita platos con agua quieta."
		],
		problemas: [{
			sintoma: "Manchas pálidas",
			causa: "Sol directo",
			solucion: "Retira de la ventana oeste."
		}, {
			sintoma: "Crecimiento rastrero flojo",
			causa: "Poco abono o maceta agotada",
			solucion: "Trasplante y dosis suave."
		}]
	}),
	e({
		id: "aloe-vera",
		nombreComun: "Sábila / Aloe vera",
		nombreCientifico: "Aloe vera",
		familia: "Asphodelaceae",
		tipo: "suculenta",
		toxicidad: "mascotas",
		luz: "Sol de mañana o luz muy brillante",
		waterFreqDays: 14,
		waterNotes: "Riego profundo y sequía entre veces.",
		tipoFertilizante: "Cactus bajo nitrógeno",
		diasFrecuenciaFertilizante: 60,
		temporadaFertilizante: "Seca no extrema",
		suelo: "Mineral, grava + tierra",
		humedad: "Baja",
		tempMinC: 10,
		tempMaxC: 38,
		podarCuando: "Hojas exteriores usadas o secas",
		trasplantarCuando: "Cuando los hijuelos llenen la maceta",
		moonAffinity: AF_SUC,
		plagasComunes: ["cochinilla-algodonosa", "pudricion-raiz"],
		consejosCuidado: [
			"Corta hojas maduras desde la base, no el centro.",
			"El gel se usa fresco; no es sustituto médico.",
			"Pleno sol nicaragüense de mediodía puede quemar."
		],
		problemas: [{
			sintoma: "Hojas delgadas y curvadas",
			causa: "Poca luz o sed",
			solucion: "Más sol de mañana y un riego profundo."
		}, {
			sintoma: "Centro podrido",
			causa: "Agua en la roseta",
			solucion: "Riega el suelo, no el cogollo."
		}]
	}),
	e({
		id: "haworthia",
		nombreComun: "Haworthia",
		nombreCientifico: "Haworthia attenuata",
		familia: "Asphodelaceae",
		tipo: "suculenta",
		luz: "Luz brillante sin sol crudo",
		waterFreqDays: 16,
		waterNotes: "Poco y al sustrato, nunca al centro.",
		tipoFertilizante: "Cactus",
		diasFrecuenciaFertilizante: 60,
		temporadaFertilizante: "Primavera-verano",
		suelo: "Muy mineral",
		humedad: "Baja",
		tempMinC: 10,
		tempMaxC: 34,
		podarCuando: "Hojas secas exteriores",
		trasplantarCuando: "Cuando la colonia desborde",
		moonAffinity: AF_SUC,
		plagasComunes: ["cochinilla-algodonosa", "pudricion-raiz"],
		consejosCuidado: [
			"Prefiere maceta baja y ancha.",
			"Las ventanas de la hoja se opacan con polvo.",
			"Invierno casi sin riego."
		],
		problemas: [{
			sintoma: "Color rojo-café",
			causa: "Estrés solar",
			solucion: "Filtra el mediodía."
		}, {
			sintoma: "Estiramiento",
			causa: "Poca luz",
			solucion: "Más brillo, no más agua."
		}]
	}),
	e({
		id: "echeveria",
		nombreComun: "Echeveria",
		nombreCientifico: "Echeveria elegans",
		familia: "Crassulaceae",
		tipo: "suculenta",
		luz: "Sol de mañana intenso",
		waterFreqDays: 12,
		waterNotes: "Mojar sustrato y secar por completo.",
		tipoFertilizante: "Cactus bajo N",
		diasFrecuenciaFertilizante: 45,
		temporadaFertilizante: "Crecimiento",
		suelo: "Grava volcánica + tierra",
		humedad: "Baja",
		tempMinC: 8,
		tempMaxC: 36,
		podarCuando: "Hojas basales secas; decapitar si se ahiló",
		trasplantarCuando: "Roseta inestable",
		moonAffinity: AF_SUC,
		plagasComunes: ["cochinilla-algodonosa", "pulgon"],
		consejosCuidado: [
			"El cuello seco evita hongos.",
			"Hijos se separan con callo de un día.",
			"Lluvia constante pide techo."
		],
		problemas: [{
			sintoma: "Roseta abierta y pálida",
			causa: "Poca luz",
			solucion: "Más sol gradual."
		}, {
			sintoma: "Tallo negro",
			causa: "Pudrición",
			solucion: "Corta por sano y deja callo."
		}]
	}),
	e({
		id: "opuntia",
		nombreComun: "Tuna / nopal ornamental",
		nombreCientifico: "Opuntia ficus-indica",
		familia: "Cactaceae",
		tipo: "suculenta",
		luz: "Sol pleno",
		waterFreqDays: 16,
		waterNotes: "Riego profundo y escaso.",
		tipoFertilizante: "Bajo nitrógeno",
		diasFrecuenciaFertilizante: 60,
		temporadaFertilizante: "Inicio de lluvias",
		suelo: "Arenoso, calizo aceptable",
		humedad: "Baja",
		tempMinC: 8,
		tempMaxC: 40,
		podarCuando: "Cladodios dañados con herramienta gruesa",
		trasplantarCuando: "Cuando la maceta se vuelque",
		moonAffinity: AF_SUC,
		plagasComunes: ["cochinilla-algodonosa", "pudricion-raiz"],
		consejosCuidado: [
			"Usa pinzas y guantes: las gloquidias se clavan.",
			"El nopal verdura es la misma familia, distinto manejo de cosecha.",
			"No riegues tras un corte."
		],
		problemas: [{
			sintoma: "Cladodio blando",
			causa: "Hongos por lluvia",
			solucion: "Corta, sella al aire, reduce riego."
		}, {
			sintoma: "No florece",
			causa: "Poca luz o nitrógeno alto",
			solucion: "Sol pleno y abono de cactus."
		}]
	}),
	e({
		id: "agave",
		nombreComun: "Agave",
		nombreCientifico: "Agave angustifolia",
		familia: "Asparagaceae",
		tipo: "suculenta",
		luz: "Sol pleno",
		waterFreqDays: 18,
		waterNotes: "Muy tolerante a sequía.",
		tipoFertilizante: "Poco; compost al inicio de lluvias",
		diasFrecuenciaFertilizante: 90,
		temporadaFertilizante: "Inicio de lluvias",
		suelo: "Pedregoso",
		humedad: "Baja",
		tempMinC: 8,
		tempMaxC: 40,
		podarCuando: "Hojas basales secas; cuidado con la espina",
		trasplantarCuando: "Solo jóvenes; adultos a tierra",
		moonAffinity: AF_SUC,
		plagasComunes: ["pudricion-raiz", "cochinilla-algodonosa"],
		consejosCuidado: [
			"Florece una vez y muere: es su ciclo.",
			"Hijuelos alrededor se trasplantan en seco.",
			"Drena como si fuera cactus."
		],
		problemas: [{
			sintoma: "Centro blando",
			causa: "Picudo o pudrición",
			solucion: "Revisa galerías; si hay larva, elimina la planta."
		}, {
			sintoma: "Hojas pálidas",
			causa: "Sombra",
			solucion: "Sol directo gradual."
		}]
	}),
	e({
		id: "lavanda",
		nombreComun: "Lavanda",
		nombreCientifico: "Lavandula angustifolia",
		familia: "Lamiaceae",
		tipo: "flor",
		luz: "Sol pleno, 6 h mínimo",
		waterFreqDays: 7,
		waterNotes: "Deja secar entre riegos; odia pies mojados.",
		tipoFertilizante: "Bajo nitrógeno, un poco de compost",
		diasFrecuenciaFertilizante: 45,
		temporadaFertilizante: "Inicio de floración",
		suelo: "Arenoso, alcalino, muy drenado",
		humedad: "Baja",
		tempMinC: 8,
		tempMaxC: 34,
		podarCuando: "Tras floración, nunca a madera vieja desnuda",
		trasplantarCuando: "Joven, en menguante",
		moonAffinity: AF_FLOR,
		plagasComunes: ["oidio", "pudricion-raiz"],
		consejosCuidado: [
			"En trópico húmedo vive mejor en maceta alta.",
			"Poda ligera mantiene forma leñosa.",
			"No la riegues por la noche."
		],
		problemas: [{
			sintoma: "Base leñosa sin hojas",
			causa: "Poda tardía o sombra",
			solucion: "Sol y recorte de verde, no de palo seco."
		}, {
			sintoma: "Hongos",
			causa: "Lluvia constante",
			solucion: "Techo parcial y más espacio."
		}]
	}),
	e({
		id: "romero",
		nombreComun: "Romero",
		nombreCientifico: "Salvia rosmarinus",
		familia: "Lamiaceae",
		tipo: "huerto",
		luz: "Sol pleno",
		waterFreqDays: 8,
		waterNotes: "Seco entre riegos; no empapes el cuello.",
		tipoFertilizante: "Compost ligero",
		diasFrecuenciaFertilizante: 45,
		temporadaFertilizante: "Crecimiento",
		suelo: "Drenante, pobre a medio",
		humedad: "Baja",
		tempMinC: 8,
		tempMaxC: 36,
		podarCuando: "Cosecha frecuente de puntas",
		trasplantarCuando: "Cuando el leño llene la maceta",
		moonAffinity: AF_HOJA,
		plagasComunes: ["oidio", "arana-roja"],
		consejosCuidado: [
			"Cosecha de mañana, ramas no leñosas.",
			"Esqueje semileñoso en arena.",
			"No le gusta el plato con agua."
		],
		problemas: [{
			sintoma: "Hojas caídas y negras",
			causa: "Pudrición",
			solucion: "Sustrato nuevo y menos riego."
		}, {
			sintoma: "Pocas hojas",
			causa: "Sombra",
			solucion: "Sol directo."
		}]
	}),
	e({
		id: "albahaca",
		nombreComun: "Albahaca",
		nombreCientifico: "Ocimum basilicum",
		familia: "Lamiaceae",
		tipo: "huerto",
		luz: "Sol 5–6 h",
		waterFreqDays: 3,
		waterNotes: "Suelo fresco; no mojes las hojas al mediodía.",
		tipoFertilizante: "Rico en nitrógeno suave",
		diasFrecuenciaFertilizante: 14,
		temporadaFertilizante: "Todo el ciclo",
		suelo: "Rico, húmedo, drenado",
		humedad: "Media",
		tempMinC: 16,
		tempMaxC: 34,
		podarCuando: "Pellizca flores para alargar hoja",
		trasplantarCuando: "De semillero a maceta a las 4 semanas",
		moonAffinity: AF_HOJA,
		plagasComunes: [
			"pulgon",
			"oidio",
			"babosa"
		],
		consejosCuidado: [
			"Cosecha por arriba para ramificar.",
			"Reponer cada 3–4 meses da mejor sabor.",
			"No la juntes con ruda: se llevan mal en maceta chica."
		],
		problemas: [{
			sintoma: "Hojas negras",
			causa: "Frío o riego nocturno",
			solucion: "Sol y riego matutino."
		}, {
			sintoma: "Sabor flojo",
			causa: "Poca luz o exceso de agua",
			solucion: "Más sol, menos riego."
		}]
	}),
	e({
		id: "menta",
		nombreComun: "Menta",
		nombreCientifico: "Mentha spicata",
		familia: "Lamiaceae",
		tipo: "huerto",
		luz: "Sol o semi-sombra",
		waterFreqDays: 3,
		waterNotes: "Le gusta humedad constante.",
		tipoFertilizante: "Compost",
		diasFrecuenciaFertilizante: 21,
		temporadaFertilizante: "Lluvias y crecimiento",
		suelo: "Rico y fresco",
		humedad: "Alta",
		tempMinC: 10,
		tempMaxC: 34,
		podarCuando: "Corta a 5 cm cuando florezca",
		trasplantarCuando: "Contén rizomas cada año",
		moonAffinity: AF_HOJA,
		plagasComunes: [
			"oidio",
			"pulgon",
			"roya"
		],
		consejosCuidado: [
			"Siempre en maceta: invade el cantero.",
			"Renueva mata cada 2 años.",
			"Cosecha antes de flor para más aroma."
		],
		problemas: [{
			sintoma: "Polvo blanco",
			causa: "Oídio por densidad",
			solucion: "Airea y corta a rase."
		}, {
			sintoma: "Hojas pequeñas",
			causa: "Maceta agotada",
			solucion: "Tierra nueva."
		}]
	}),
	e({
		id: "hierbabuena",
		nombreComun: "Hierbabuena",
		nombreCientifico: "Mentha × piperita",
		familia: "Lamiaceae",
		tipo: "huerto",
		luz: "Semi-sombra en costa caliente",
		waterFreqDays: 3,
		waterNotes: "No dejes secar del todo.",
		tipoFertilizante: "Compost",
		diasFrecuenciaFertilizante: 21,
		temporadaFertilizante: "Crecimiento",
		suelo: "Fresco y rico",
		humedad: "Alta",
		tempMinC: 10,
		tempMaxC: 33,
		podarCuando: "Cosecha frecuente",
		trasplantarCuando: "Anual para contener",
		moonAffinity: AF_HOJA,
		plagasComunes: [
			"oidio",
			"roya",
			"pulgon"
		],
		consejosCuidado: [
			"Más aromática que la menta común si hay fresco nocturno.",
			"Separa de la menta para no hibridar sabores.",
			"Riego al pie."
		],
		problemas: [{
			sintoma: "Tallo rastrero débil",
			causa: "Poca luz",
			solucion: "Más sol de mañana."
		}, {
			sintoma: "Sabor amargo",
			causa: "Floración o calor extremo",
			solucion: "Poda y sombra parcial."
		}]
	}),
	e({
		id: "oregano",
		nombreComun: "Orégano",
		nombreCientifico: "Origanum vulgare",
		familia: "Lamiaceae",
		tipo: "huerto",
		luz: "Sol pleno",
		waterFreqDays: 6,
		waterNotes: "Deja secar la superficie.",
		tipoFertilizante: "Poco; sabor baja con nitrógeno",
		diasFrecuenciaFertilizante: 40,
		temporadaFertilizante: "Inicio de lluvias",
		suelo: "Drenante",
		humedad: "Baja-media",
		tempMinC: 10,
		tempMaxC: 36,
		podarCuando: "Tras flor, deja leño bajo",
		trasplantarCuando: "Cada 2 años",
		moonAffinity: AF_HOJA,
		plagasComunes: ["arana-roja", "pulgon"],
		consejosCuidado: [
			"El estrés hídrico leve concentra aroma.",
			"Seca ramos a la sombra.",
			"Poda para que no se abra el centro."
		],
		problemas: [{
			sintoma: "Planta leñosa hueca",
			causa: "Sin poda",
			solucion: "Corte de rejuvenecimiento en menguante."
		}, {
			sintoma: "Hojas pálidas",
			causa: "Sombra",
			solucion: "Sol directo."
		}]
	}),
	e({
		id: "perejil",
		nombreComun: "Perejil",
		nombreCientifico: "Petroselinum crispum",
		familia: "Apiaceae",
		tipo: "huerto",
		luz: "Sol de mañana, sombra de tarde en trópico",
		waterFreqDays: 3,
		waterNotes: "Constante, sin encharcar.",
		tipoFertilizante: "Compost rico",
		diasFrecuenciaFertilizante: 18,
		temporadaFertilizante: "Todo el ciclo",
		suelo: "Fresco, profundo",
		humedad: "Media",
		tempMinC: 10,
		tempMaxC: 32,
		podarCuando: "Cosecha hojas externas",
		trasplantarCuando: "Mal de semillero a sitio final pronto",
		moonAffinity: AF_HOJA,
		plagasComunes: [
			"pulgon",
			"babosa",
			"oidio"
		],
		consejosCuidado: [
			"Es bienal: el segundo año florece y amarga.",
			"Siembra densa y ralea.",
			"No le gusta el trasplante tardío."
		],
		problemas: [{
			sintoma: "Amarillo general",
			causa: "Calor o falta de nitrógeno",
			solucion: "Sombra de tarde y compost."
		}, {
			sintoma: "Flor prematura",
			causa: "Estrés hídrico",
			solucion: "Riego estable; resiembra."
		}]
	}),
	e({
		id: "cilantro",
		nombreComun: "Cilantro",
		nombreCientifico: "Coriandrum sativum",
		familia: "Apiaceae",
		tipo: "huerto",
		luz: "Sol suave o semi-sombra",
		waterFreqDays: 3,
		waterNotes: "No dejes secar en flor.",
		tipoFertilizante: "Compost liviano",
		diasFrecuenciaFertilizante: 18,
		temporadaFertilizante: "Ciclo corto",
		suelo: "Suelto",
		humedad: "Media",
		tempMinC: 12,
		tempMaxC: 32,
		podarCuando: "Cosecha hoja joven; deja unas plantas a semilla",
		trasplantarCuando: "Mejor siembra directa",
		moonAffinity: AF_HOJA,
		plagasComunes: ["pulgon", "babosa"],
		consejosCuidado: [
			"En calor sube a flor en días; siembra cada 3 semanas.",
			"La semilla es el coriandro de cocina.",
			"Sombra de mediodía alarga la hoja."
		],
		problemas: [{
			sintoma: "Tallo floral de inmediato",
			causa: "Calor",
			solucion: "Siembra en meses más frescos o con malla."
		}, {
			sintoma: "Hojas amarillas",
			causa: "Suelo pobre",
			solucion: "Compost."
		}]
	}),
	e({
		id: "tomate",
		nombreComun: "Tomate",
		nombreCientifico: "Solanum lycopersicum",
		familia: "Solanaceae",
		tipo: "huerto",
		luz: "Sol 6–8 h",
		waterFreqDays: 3,
		waterNotes: "Constante al pie; irregularidad parte el fruto.",
		tipoFertilizante: "Rico en potasio al cuajar",
		diasFrecuenciaFertilizante: 14,
		temporadaFertilizante: "Tras el primer racimo",
		suelo: "Rico, profundo, mullido",
		humedad: "Media",
		tempMinC: 15,
		tempMaxC: 34,
		podarCuando: "Chupones en indeterminadas",
		trasplantarCuando: "Cuando tenga 4–5 hojas verdaderas",
		moonAffinity: AF_FRUTO,
		plagasComunes: [
			"pulgon",
			"mosca-blanca",
			"mildiu",
			"oruga",
			"mancha-bacteriana"
		],
		consejosCuidado: [
			"Tutor desde el día del trasplante.",
			"Mulch para humedad pareja.",
			"No mojes el follaje al atardecer."
		],
		problemas: [{
			sintoma: "Fruto partido",
			causa: "Lluvia tras sequía",
			solucion: "Riego uniforme y mulch."
		}, {
			sintoma: "Flores que caen",
			causa: "Calor >34 °C o falta de polen",
			solucion: "Sombra de mediodía y agita la planta."
		}]
	}),
	e({
		id: "jalapeno",
		nombreComun: "Chile jalapeño",
		nombreCientifico: "Capsicum annuum",
		familia: "Solanaceae",
		tipo: "huerto",
		luz: "Sol pleno",
		waterFreqDays: 4,
		waterNotes: "Algo de sequía leve concentra picante.",
		tipoFertilizante: "Equilibrado, luego potasio",
		diasFrecuenciaFertilizante: 18,
		temporadaFertilizante: "Hasta cuaje",
		suelo: "Drenante y fértil",
		humedad: "Media",
		tempMinC: 16,
		tempMaxC: 36,
		podarCuando: "Puntas para ramificar al inicio",
		trasplantarCuando: "Tras 6–8 hojas",
		moonAffinity: AF_FRUTO,
		plagasComunes: [
			"pulgon",
			"mosca-blanca",
			"arana-roja"
		],
		consejosCuidado: [
			"Cosecha verdes o maduros rojos.",
			"En maceta grande rinde más de un año.",
			"No abones nitrógeno al final."
		],
		problemas: [{
			sintoma: "Flores caídas",
			causa: "Estrés hídrico o calor",
			solucion: "Riego al pie y sombra de 12 a 15 h."
		}, {
			sintoma: "Hojas enrolladas",
			causa: "Pulgón o ácaro",
			solucion: "Revisa envés."
		}]
	}),
	e({
		id: "serrano",
		nombreComun: "Chile serrano",
		nombreCientifico: "Capsicum annuum var. serrano",
		familia: "Solanaceae",
		tipo: "huerto",
		luz: "Sol pleno",
		waterFreqDays: 4,
		waterNotes: "Regular, sin charco.",
		tipoFertilizante: "Equilibrado",
		diasFrecuenciaFertilizante: 18,
		temporadaFertilizante: "Crecimiento y cuaje",
		suelo: "Fértil drenante",
		humedad: "Media",
		tempMinC: 16,
		tempMaxC: 36,
		podarCuando: "Limpieza de ramas bajas",
		trasplantarCuando: "Plántula de 15 cm",
		moonAffinity: AF_FRUTO,
		plagasComunes: [
			"pulgon",
			"mosca-blanca",
			"arana-roja"
		],
		consejosCuidado: [
			"Más picante si madura en planta.",
			"Tutor ligero si carga mucho.",
			"Cosecha continua estimula flor."
		],
		problemas: [{
			sintoma: "Frutos chicos",
			causa: "Maceta pequeña",
			solucion: "Pasa a 20 L."
		}, {
			sintoma: "Manchas en hoja",
			causa: "Hongo por lluvia",
			solucion: "Airea y cobre preventivo."
		}]
	}),
	e({
		id: "pimiento",
		nombreComun: "Pimiento",
		nombreCientifico: "Capsicum annuum",
		familia: "Solanaceae",
		tipo: "huerto",
		luz: "Sol 6 h",
		waterFreqDays: 4,
		waterNotes: "Constante al cuajar.",
		tipoFertilizante: "Potasio y calcio",
		diasFrecuenciaFertilizante: 16,
		temporadaFertilizante: "Desde flor",
		suelo: "Rico",
		humedad: "Media",
		tempMinC: 16,
		tempMaxC: 34,
		podarCuando: "Puntas tempranas",
		trasplantarCuando: "6–8 hojas",
		moonAffinity: AF_FRUTO,
		plagasComunes: [
			"pulgon",
			"mosca-blanca",
			"mildiu"
		],
		consejosCuidado: [
			"Necesita más agua que el chile picante.",
			"Calcio evita pudrición apical.",
			"No lo plantes donde hubo tomate enfermo."
		],
		problemas: [{
			sintoma: "Punta del fruto negra",
			causa: "Pudrición apical por calcio/riego",
			solucion: "Riego pareja y cáscara de huevo compostada."
		}, {
			sintoma: "Poco color",
			causa: "Poca luz o cosecha temprana",
			solucion: "Deja madurar en planta."
		}]
	}),
	e({
		id: "pepino",
		nombreComun: "Pepino",
		nombreCientifico: "Cucumis sativus",
		familia: "Cucurbitaceae",
		tipo: "huerto",
		luz: "Sol pleno",
		waterFreqDays: 2,
		waterNotes: "Mucha agua al formar fruto.",
		tipoFertilizante: "Equilibrado luego potasio",
		diasFrecuenciaFertilizante: 14,
		temporadaFertilizante: "Tras primeras flores",
		suelo: "Rico, mullido",
		humedad: "Media-alta",
		tempMinC: 16,
		tempMaxC: 35,
		podarCuando: "Guía principal sobre 1.5 m si hay tutor",
		trasplantarCuando: "Mejor siembra directa",
		moonAffinity: AF_FRUTO,
		plagasComunes: [
			"mildiu",
			"pulgon",
			"mosca-blanca",
			"oidio"
		],
		consejosCuidado: [
			"Enrejado ahorra espacio y hongos.",
			"Cosecha seguido para que siga produciendo.",
			"Flores macho tempranas son normales."
		],
		problemas: [{
			sintoma: "Fruto amargo",
			causa: "Sed o calor",
			solucion: "Riego diario en carga."
		}, {
			sintoma: "Hojas con felpa",
			causa: "Mildiu",
			solucion: "Retira y cobre; no mojes hoja."
		}]
	}),
	e({
		id: "calabaza",
		nombreComun: "Calabaza",
		nombreCientifico: "Cucurbita moschata",
		familia: "Cucurbitaceae",
		tipo: "huerto",
		luz: "Sol pleno",
		waterFreqDays: 3,
		waterNotes: "Profundo, no superficial.",
		tipoFertilizante: "Compost abundante",
		diasFrecuenciaFertilizante: 21,
		temporadaFertilizante: "Antes de guía larga",
		suelo: "Muy fértil",
		humedad: "Media",
		tempMinC: 16,
		tempMaxC: 36,
		podarCuando: "Corta puntas si invade el paso",
		trasplantarCuando: "Siembra directa",
		moonAffinity: AF_FRUTO,
		plagasComunes: [
			"oruga",
			"oidio",
			"pulgon"
		],
		consejosCuidado: [
			"Deja 1–3 frutos por guía para tamaño.",
			"Pone una tabla bajo el fruto contra pudrición.",
			"Abejas hacen el cuaje: no fumes en flor."
		],
		problemas: [{
			sintoma: "Fruto que se pudre al piso",
			causa: "Humedad de suelo",
			solucion: "Mulch seco y soporte."
		}, {
			sintoma: "Solo flores macho",
			causa: "Nitrógeno alto o días cortos",
			solucion: "Espera y baja el abono foliar."
		}]
	}),
	e({
		id: "lechuga",
		nombreComun: "Lechuga",
		nombreCientifico: "Lactuca sativa",
		familia: "Asteraceae",
		tipo: "huerto",
		luz: "Sol de mañana, sombra de tarde",
		waterFreqDays: 2,
		waterNotes: "Nunca dejes secar; se amarga.",
		tipoFertilizante: "Nitrógeno suave",
		diasFrecuenciaFertilizante: 14,
		temporadaFertilizante: "Todo el ciclo corto",
		suelo: "Fresco, rico",
		humedad: "Media-alta",
		tempMinC: 8,
		tempMaxC: 30,
		podarCuando: "Cosecha hoja a hoja o mata entera",
		trasplantarCuando: "A las 3–4 semanas de siembra",
		moonAffinity: AF_HOJA,
		plagasComunes: [
			"babosa",
			"pulgon",
			"oruga"
		],
		consejosCuidado: [
			"Siembra escalonada cada 15 días.",
			"Calor la hace subir a flor.",
			"Malla contra babosas de noche."
		],
		problemas: [{
			sintoma: "Sabor amargo",
			causa: "Calor o floración",
			solucion: "Cosecha joven y da sombra."
		}, {
			sintoma: "Agujeros",
			causa: "Babosa",
			solucion: "Ronda nocturna."
		}]
	}),
	e({
		id: "espinaca",
		nombreComun: "Espinaca",
		nombreCientifico: "Spinacia oleracea",
		familia: "Amaranthaceae",
		tipo: "huerto",
		luz: "Sol suave",
		waterFreqDays: 3,
		waterNotes: "Fresco constante.",
		tipoFertilizante: "Nitrógeno orgánico",
		diasFrecuenciaFertilizante: 14,
		temporadaFertilizante: "Ciclo",
		suelo: "Rico y fresco",
		humedad: "Media",
		tempMinC: 8,
		tempMaxC: 28,
		podarCuando: "Hojas externas",
		trasplantarCuando: "Mejor directa",
		moonAffinity: AF_HOJA,
		plagasComunes: [
			"minador",
			"pulgon",
			"mildiu"
		],
		consejosCuidado: [
			"En Nicaragua rinde mejor en meses frescos o con malla.",
			"No esperes mata enorme: cosecha joven.",
			"Suelo suelto evita raíces torcidas."
		],
		problemas: [{
			sintoma: "Sube a flor",
			causa: "Días largos y calor",
			solucion: "Variedad tropical o sombra."
		}, {
			sintoma: "Manchas",
			causa: "Mildiu",
			solucion: "Aire y no mojar hoja."
		}]
	}),
	e({
		id: "acelga",
		nombreComun: "Acelga",
		nombreCientifico: "Beta vulgaris var. cicla",
		familia: "Amaranthaceae",
		tipo: "huerto",
		luz: "Sol o semi",
		waterFreqDays: 3,
		waterNotes: "Regular.",
		tipoFertilizante: "Compost",
		diasFrecuenciaFertilizante: 21,
		temporadaFertilizante: "Todo el año casi",
		suelo: "Profundo",
		humedad: "Media",
		tempMinC: 8,
		tempMaxC: 34,
		podarCuando: "Hojas externas a 3 cm del cuello",
		trasplantarCuando: "Plántula de 10 cm",
		moonAffinity: AF_HOJA,
		plagasComunes: [
			"minador",
			"pulgon",
			"babosa"
		],
		consejosCuidado: [
			"Deja siempre 4–5 hojas centrales.",
			"Soporta más calor que la espinaca.",
			"Penca de colores pide la misma agua."
		],
		problemas: [{
			sintoma: "Hojas duras",
			causa: "Sed o vejez",
			solucion: "Riego y cosecha más seguida."
		}, {
			sintoma: "Galerías",
			causa: "Minador",
			solucion: "Aplasta galería y retira hoja."
		}]
	}),
	e({
		id: "rabano",
		nombreComun: "Rábano",
		nombreCientifico: "Raphanus sativus",
		familia: "Brassicaceae",
		tipo: "huerto",
		luz: "Sol",
		waterFreqDays: 2,
		waterNotes: "Humedad pareja o se pone leñoso.",
		tipoFertilizante: "Poco; suelo ya fértil",
		diasFrecuenciaFertilizante: 21,
		temporadaFertilizante: "Pre-siembra",
		suelo: "Suelto sin terrones",
		humedad: "Media",
		tempMinC: 10,
		tempMaxC: 32,
		podarCuando: "No; cosecha a los 25–35 días",
		trasplantarCuando: "Nunca: siembra directa",
		moonAffinity: AF_RAIZ,
		plagasComunes: ["pulgon", "babosa"],
		consejosCuidado: [
			"Ralea a 5 cm.",
			"Siembra cada 10 días.",
			"Las hojas también se comen jóvenes."
		],
		problemas: [{
			sintoma: "Solo hoja, sin raíz",
			causa: "Sombra o nitrógeno alto",
			solucion: "Sol y menos abono."
		}, {
			sintoma: "Rajado",
			causa: "Lluvia tras sequía",
			solucion: "Riego estable."
		}]
	}),
	e({
		id: "zanahoria",
		nombreComun: "Zanahoria",
		nombreCientifico: "Daucus carota",
		familia: "Apiaceae",
		tipo: "huerto",
		luz: "Sol",
		waterFreqDays: 3,
		waterNotes: "Parejo; costra seca impide nacer.",
		tipoFertilizante: "Poco nitrógeno",
		diasFrecuenciaFertilizante: 30,
		temporadaFertilizante: "Pre-siembra con compost maduro",
		suelo: "Suelto, profundo, sin piedras",
		humedad: "Media",
		tempMinC: 10,
		tempMaxC: 32,
		podarCuando: "Ralea",
		trasplantarCuando: "No",
		moonAffinity: AF_RAIZ,
		plagasComunes: ["babosa", "nematodos"],
		consejosCuidado: [
			"Siembra superficial y mantén húmedo 10 días.",
			"Ralea en dos pases.",
			"Estiércol fresco tuerce la raíz."
		],
		problemas: [{
			sintoma: "Raíces cortas y patas",
			causa: "Suelo duro",
			solucion: "Cama elevada mullida."
		}, {
			sintoma: "Hombros verdes",
			causa: "Sol en el cuello",
			solucion: "Aporca tierra."
		}]
	}),
	e({
		id: "cebolla",
		nombreComun: "Cebolla",
		nombreCientifico: "Allium cepa",
		familia: "Amaryllidaceae",
		tipo: "huerto",
		luz: "Sol pleno",
		waterFreqDays: 4,
		waterNotes: "Reduce riego al secar el cuello.",
		tipoFertilizante: "Equilibrado al inicio",
		diasFrecuenciaFertilizante: 21,
		temporadaFertilizante: "Primeros 40 días",
		suelo: "Suelto",
		humedad: "Media",
		tempMinC: 10,
		tempMaxC: 34,
		podarCuando: "No cortes hoja verde",
		trasplantarCuando: "De almácigo a 15 cm",
		moonAffinity: AF_RAIZ,
		plagasComunes: ["trips", "pudricion-raiz"],
		consejosCuidado: [
			"Para bulbo: deja de regar cuando la hoja se acueste.",
			"Cebollín se cosecha joven.",
			"Sol directo engrosa."
		],
		problemas: [{
			sintoma: "Bulbo chico",
			causa: "Sombra o siembra tarde",
			solucion: "Sol y espacio de 10 cm."
		}, {
			sintoma: "Cuello podrido",
			causa: "Lluvia en cosecha",
			solucion: "Cosecha en seco y cura a la sombra."
		}]
	}),
	e({
		id: "ajo",
		nombreComun: "Ajo",
		nombreCientifico: "Allium sativum",
		familia: "Amaryllidaceae",
		tipo: "huerto",
		luz: "Sol",
		waterFreqDays: 5,
		waterNotes: "Moderado; seco al madurar.",
		tipoFertilizante: "Compost al plantar",
		diasFrecuenciaFertilizante: 40,
		temporadaFertilizante: "Primer mes",
		suelo: "Suelto",
		humedad: "Media-baja",
		tempMinC: 8,
		tempMaxC: 32,
		podarCuando: "Corta escapes florales si buscas diente",
		trasplantarCuando: "Diente directo",
		moonAffinity: AF_RAIZ,
		plagasComunes: ["trips", "pudricion-raiz"],
		consejosCuidado: [
			"Planta el diente más grande, punta arriba.",
			"En trópico elige ajo de clima cálido o usa como verde.",
			"Cura 10 días a la sombra."
		],
		problemas: [{
			sintoma: "Dientes chicos",
			causa: "Calor o suelo pobre",
			solucion: "Compost y sol; acepta ciclos cortos."
		}, {
			sintoma: "Moho",
			causa: "Cosecha húmeda",
			solucion: "Secado aireado."
		}]
	}),
	e({
		id: "fresa",
		nombreComun: "Fresa",
		nombreCientifico: "Fragaria × ananassa",
		familia: "Rosaceae",
		tipo: "huerto",
		luz: "Sol 5–6 h",
		waterFreqDays: 3,
		waterNotes: "Al pie; fruto mojado se pudre.",
		tipoFertilizante: "Rico en potasio",
		diasFrecuenciaFertilizante: 18,
		temporadaFertilizante: "Antes y durante flor",
		suelo: "Ácido ligero",
		humedad: "Media",
		tempMinC: 8,
		tempMaxC: 32,
		podarCuando: "Estolones de más y hojas viejas",
		trasplantarCuando: "Cada 2 años la mata madre",
		moonAffinity: AF_FRUTO,
		plagasComunes: [
			"babosa",
			"oidio",
			"antracnosis",
			"pulgon"
		],
		consejosCuidado: [
			"Paja o viruta bajo el fruto.",
			"Renueva con estolones sanos.",
			"En calor da mejor en maceta elevada."
		],
		problemas: [{
			sintoma: "Fruto con moho",
			causa: "Humedad en contacto",
			solucion: "Mulch seco y más aire."
		}, {
			sintoma: "Hojas con polvo",
			causa: "Oídio",
			solucion: "Airea y corta densidades."
		}]
	}),
	e({
		id: "rosa",
		nombreComun: "Rosa",
		nombreCientifico: "Rosa spp.",
		familia: "Rosaceae",
		tipo: "flor",
		luz: "Sol 5 h mínimo",
		waterFreqDays: 4,
		waterNotes: "Profundo al pie, no a la flor.",
		tipoFertilizante: "Específico para rosal o 10-10-10",
		diasFrecuenciaFertilizante: 21,
		temporadaFertilizante: "Crecimiento y flor",
		suelo: "Rico, profundo",
		humedad: "Media",
		tempMinC: 10,
		tempMaxC: 34,
		podarCuando: "Tras flor, corte a 5 hojas; fuerte en menguante",
		trasplantarCuando: "Reposo o inicio de lluvias",
		moonAffinity: AF_FLOR,
		plagasComunes: [
			"pulgon",
			"roya",
			"oidio",
			"cochinilla-escudo"
		],
		consejosCuidado: [
			"Corta flores pasadas para repetir.",
			"No mojes capullos de noche.",
			"Guantes: las espinas no perdonan."
		],
		problemas: [{
			sintoma: "Pústulas naranjas",
			causa: "Roya",
			solucion: "Retira hoja y mejora sol de mañana."
		}, {
			sintoma: "Pulgón en capullo",
			causa: "Brote tierno",
			solucion: "Jabón potásico al atardecer."
		}]
	}),
	e({
		id: "geranio",
		nombreComun: "Geranio",
		nombreCientifico: "Pelargonium hortorum",
		familia: "Geraniaceae",
		tipo: "flor",
		luz: "Sol de mañana",
		waterFreqDays: 5,
		waterNotes: "Deja secar un poco.",
		tipoFertilizante: "Rico en potasio",
		diasFrecuenciaFertilizante: 18,
		temporadaFertilizante: "Floración",
		suelo: "Drenante",
		humedad: "Baja-media",
		tempMinC: 10,
		tempMaxC: 34,
		podarCuando: "Flores secas y tallos largos",
		trasplantarCuando: "Anual",
		moonAffinity: AF_FLOR,
		plagasComunes: [
			"oruga",
			"oidio",
			"mosca-blanca"
		],
		consejosCuidado: [
			"Pellizca para compactar.",
			"Hojas amarillas bajas son normales al envejecer.",
			"No le gusta el plato lleno."
		],
		problemas: [{
			sintoma: "Pocas flores",
			causa: "Nitrógeno o sombra",
			solucion: "Sol y abono de flor."
		}, {
			sintoma: "Tallo negro",
			causa: "Hongo",
			solucion: "Corta a tejido sano."
		}]
	}),
	e({
		id: "petunia",
		nombreComun: "Petunia",
		nombreCientifico: "Petunia × atkinsiana",
		familia: "Solanaceae",
		tipo: "flor",
		luz: "Sol pleno",
		waterFreqDays: 3,
		waterNotes: "Diario en maceta de balcón.",
		tipoFertilizante: "Floración, alto P-K",
		diasFrecuenciaFertilizante: 10,
		temporadaFertilizante: "Mientras florezca",
		suelo: "Ligero",
		humedad: "Media",
		tempMinC: 12,
		tempMaxC: 34,
		podarCuando: "Poda a la mitad si se alarga",
		trasplantarCuando: "Al comprar, a maceta mayor",
		moonAffinity: AF_FLOR,
		plagasComunes: [
			"oruga",
			"pulgon",
			"oidio"
		],
		consejosCuidado: [
			"Retira flores pasadas cada dos días.",
			"Lluvia fuerte las afea: sacude agua.",
			"Alimenta seguido en jardinera."
		],
		problemas: [{
			sintoma: "Plantas larguiruchas",
			causa: "Poca luz",
			solucion: "Sol y recorte."
		}, {
			sintoma: "Agujeros en flor",
			causa: "Oruga",
			solucion: "Revisa de noche."
		}]
	}),
	e({
		id: "bugambilia",
		nombreComun: "Bugambilia",
		nombreCientifico: "Bougainvillea spectabilis",
		familia: "Nyctaginaceae",
		tipo: "flor",
		luz: "Sol pleno",
		waterFreqDays: 7,
		waterNotes: "Estrés hídrico leve induce flor.",
		tipoFertilizante: "Bajo nitrógeno, alto potasio",
		diasFrecuenciaFertilizante: 30,
		temporadaFertilizante: "Antes de florones",
		suelo: "Pobre a medio, drenante",
		humedad: "Baja",
		tempMinC: 12,
		tempMaxC: 38,
		podarCuando: "Tras la florada fuerte",
		trasplantarCuando: "Joven; odia que le muevan la raíz adulta",
		moonAffinity: AF_FLOR,
		plagasComunes: ["pulgon", "cochinilla-escudo"],
		consejosCuidado: [
			"Las brácteas son el color; la flor es chica y blanca.",
			"Enmaceta justa florece más.",
			"Tutor o pared caliente."
		],
		problemas: [{
			sintoma: "Solo hoja verde",
			causa: "Nitrógeno o poca luz",
			solucion: "Sol y deja de abonar hoja."
		}, {
			sintoma: "Caída de brácteas",
			causa: "Cambio de sitio",
			solucion: "No la mudes en flor."
		}]
	}),
	e({
		id: "jazmin",
		nombreComun: "Jazmín",
		nombreCientifico: "Jasminum officinale",
		familia: "Oleaceae",
		tipo: "flor",
		luz: "Sol de mañana",
		waterFreqDays: 5,
		waterNotes: "Regular en flor.",
		tipoFertilizante: "Equilibrado",
		diasFrecuenciaFertilizante: 21,
		temporadaFertilizante: "Pre-flor",
		suelo: "Rico drenante",
		humedad: "Media",
		tempMinC: 10,
		tempMaxC: 34,
		podarCuando: "Tras flor, no en capullo",
		trasplantarCuando: "Tras floración",
		moonAffinity: AF_FLOR,
		plagasComunes: ["pulgon", "cochinilla-algodonosa"],
		consejosCuidado: [
			"El aroma sale de noche: ubícalo cerca de la ventana.",
			"Guía las ramas; no las dejes en ovillo.",
			"Riego irregular cae botón."
		],
		problemas: [{
			sintoma: "Botones que no abren",
			causa: "Sed o calor seco",
			solucion: "Riego y humedad."
		}, {
			sintoma: "Hojas pegajosas",
			causa: "Pulgón",
			solucion: "Jabón y revisión de hormigas."
		}]
	}),
	e({
		id: "lantana",
		nombreComun: "Lantana",
		nombreCientifico: "Lantana camara",
		familia: "Verbenaceae",
		tipo: "flor",
		toxicidad: "mascotas_y_ninos",
		luz: "Sol pleno",
		waterFreqDays: 6,
		waterNotes: "Rústica una vez prendida.",
		tipoFertilizante: "Poco",
		diasFrecuenciaFertilizante: 40,
		temporadaFertilizante: "Inicio de lluvias",
		suelo: "Cualquiera drenante",
		humedad: "Baja-media",
		tempMinC: 12,
		tempMaxC: 38,
		podarCuando: "Fuerte en menguante para forma",
		trasplantarCuando: "Joven",
		moonAffinity: AF_FLOR,
		plagasComunes: ["pulgon", "mosca-blanca"],
		consejosCuidado: [
			"Atrae mariposas; bayas tóxicas para niños.",
			"Poda evita que se vuelva leñosa hueca.",
			"Tolera olvido de riego mejor que geranio."
		],
		problemas: [{
			sintoma: "Pocas umbelas",
			causa: "Sombra",
			solucion: "Sol directo."
		}, {
			sintoma: "Mosaico en hoja",
			causa: "Virus por insectos",
			solucion: "Elimina mata y controla chupadores."
		}]
	}),
	e({
		id: "cempasuchil",
		nombreComun: "Cempasúchil",
		nombreCientifico: "Tagetes erecta",
		familia: "Asteraceae",
		tipo: "flor",
		luz: "Sol pleno",
		waterFreqDays: 4,
		waterNotes: "Moderado.",
		tipoFertilizante: "Equilibrado",
		diasFrecuenciaFertilizante: 18,
		temporadaFertilizante: "Hasta flor llena",
		suelo: "Medio",
		humedad: "Media",
		tempMinC: 12,
		tempMaxC: 36,
		podarCuando: "Flores secas",
		trasplantarCuando: "Plántula de 10 cm",
		moonAffinity: AF_FLOR,
		plagasComunes: ["babosa", "pulgon"],
		consejosCuidado: [
			"Aliado del huerto: repele algunos nematodos.",
			"Siembra 8 semanas antes de noviembre si buscas altar.",
			"No le gusta la sombra de muros."
		],
		problemas: [{
			sintoma: "Tallos caídos",
			causa: "Babosa o exceso de agua",
			solucion: "Revisa de noche; drena."
		}, {
			sintoma: "Flor chica",
			causa: "Sombra o densidad",
			solucion: "Ralea y da sol."
		}]
	}),
	e({
		id: "nochebuena",
		nombreComun: "Nochebuena",
		nombreCientifico: "Euphorbia pulcherrima",
		familia: "Euphorbiaceae",
		tipo: "flor",
		toxicidad: "mascotas_y_ninos",
		luz: "Luz brillante; noches largas para colorear",
		waterFreqDays: 5,
		waterNotes: "No dejes el papel de regalo sin drenaje.",
		tipoFertilizante: "Equilibrado en crecimiento",
		diasFrecuenciaFertilizante: 21,
		temporadaFertilizante: "Tras las fiestas, si la guardas",
		suelo: "Ligero",
		humedad: "Media",
		tempMinC: 14,
		tempMaxC: 32,
		podarCuando: "En enero-febrero a 15 cm si la quieres otro año",
		trasplantarCuando: "Tras la poda de invierno",
		moonAffinity: AF_FLOR,
		plagasComunes: ["mosca-blanca", "cochinilla-algodonosa"],
		consejosCuidado: [
			"El color son brácteas; pide 12–14 h de oscuridad para enrojecer.",
			"El látex irrita la piel.",
			"Quita el foil de vivero el primer día."
		],
		problemas: [{
			sintoma: "Hojas que caen al llevarla a casa",
			causa: "Corriente o sequía de vivero",
			solucion: "Sitio estable y riego."
		}, {
			sintoma: "No enrojece al año siguiente",
			causa: "Luz artificial de noche",
			solucion: "Armario oscuro 8 semanas."
		}]
	}),
	e({
		id: "phalaenopsis",
		nombreComun: "Orquídea mariposa",
		nombreCientifico: "Phalaenopsis spp.",
		familia: "Orchidaceae",
		tipo: "interior",
		luz: "Luz este filtrada; nunca sol de mediodía",
		waterFreqDays: 7,
		waterNotes: "Riega corteza, no el corazón. Agua sin cal.",
		tipoFertilizante: "Orquídeas, 1/4 de dosis",
		diasFrecuenciaFertilizante: 14,
		temporadaFertilizante: "Tras flor y en hoja nueva",
		suelo: "Corteza de pino, no tierra de jardín",
		humedad: "Alta",
		tempMinC: 16,
		tempMaxC: 30,
		podarCuando: "Vara seca por encima de un nudo si sigue verde",
		trasplantarCuando: "Cada 2 años, corteza desecha",
		moonAffinity: AF_FLOR,
		plagasComunes: ["cochinilla-algodonosa", "pudricion-raiz"],
		consejosCuidado: [
			"Raíces verdes = hidratadas; plateadas = toca riego.",
			"Hielo encima de la maceta no es buen método.",
			"Descanso fresco nocturno ayuda a florar."
		],
		problemas: [{
			sintoma: "Corazón negro",
			causa: "Agua estancada",
			solucion: "Riega de mañana y seca el cogollo."
		}, {
			sintoma: "Arrugas en hoja",
			causa: "Raíz podrida o sed",
			solucion: "Revisa corteza y raíces."
		}]
	}),
	e({
		id: "jade",
		nombreComun: "Árbol de jade",
		nombreCientifico: "Crassula ovata",
		familia: "Crassulaceae",
		tipo: "suculenta",
		luz: "Sol de mañana",
		waterFreqDays: 14,
		waterNotes: "Hojas gordas = espera. Hojas blandas = riega.",
		tipoFertilizante: "Cactus",
		diasFrecuenciaFertilizante: 45,
		temporadaFertilizante: "Crecimiento",
		suelo: "Mineral",
		humedad: "Baja",
		tempMinC: 10,
		tempMaxC: 35,
		podarCuando: "Para formar arbolito",
		trasplantarCuando: "Cada 2–3 años, maceta pesada",
		moonAffinity: AF_SUC,
		plagasComunes: ["cochinilla-algodonosa", "pudricion-raiz"],
		consejosCuidado: [
			"Tronco leñoso pide maceta estable.",
			"El sol colorea los bordes de rojo.",
			"Esqueje de hoja o tallo con callo."
		],
		problemas: [{
			sintoma: "Caída de hojas",
			causa: "Riego de más o mudanza",
			solucion: "Seca y no la muevas."
		}, {
			sintoma: "Tallo blando",
			causa: "Pudrición",
			solucion: "Corta y re-enraíza la copa."
		}]
	}),
	e({
		id: "areca",
		nombreComun: "Palma areca",
		nombreCientifico: "Dypsis lutescens",
		familia: "Arecaceae",
		tipo: "interior",
		luz: "Luz brillante filtrada",
		waterFreqDays: 6,
		waterNotes: "Fresco, nunca charco.",
		tipoFertilizante: "Palmeras o equilibrado",
		diasFrecuenciaFertilizante: 28,
		temporadaFertilizante: "Crecimiento",
		suelo: "Rico y drenante",
		humedad: "Alta",
		tempMinC: 15,
		tempMaxC: 33,
		podarCuando: "Solo frondas secas enteras",
		trasplantarCuando: "Cuando el cepellón empuje",
		moonAffinity: AF_HOJA,
		plagasComunes: ["arana-roja", "cochinilla-escudo"],
		consejosCuidado: [
			"Puntas secas = sales o aire seco.",
			"No cortes hojas a medio secar por la mitad.",
			"Gira la maceta."
		],
		problemas: [{
			sintoma: "Puntas marrones",
			causa: "Flúor/cloro o sequedad",
			solucion: "Agua reposada y humedad."
		}, {
			sintoma: "Ácaro",
			causa: "Aire seco",
			solucion: "Ducha al envés."
		}]
	}),
	e({
		id: "kentia",
		nombreComun: "Palma kentia",
		nombreCientifico: "Howea forsteriana",
		familia: "Arecaceae",
		tipo: "interior",
		luz: "Media; tolera menos luz que areca",
		waterFreqDays: 8,
		waterNotes: "Deja secar un poco la superficie.",
		tipoFertilizante: "Palmeras suave",
		diasFrecuenciaFertilizante: 35,
		temporadaFertilizante: "Crecimiento",
		suelo: "Drenante",
		humedad: "Media-alta",
		tempMinC: 14,
		tempMaxC: 32,
		podarCuando: "Frondas secas al tronco",
		trasplantarCuando: "Poco frecuente; odia el desturbe",
		moonAffinity: AF_HOJA,
		plagasComunes: ["cochinilla-escudo", "arana-roja"],
		consejosCuidado: [
			"Crece lento: no la fuerces.",
			"Maceta proporcional, no enorme.",
			"Limpia polvo de pinnas."
		],
		problemas: [{
			sintoma: "Frondas nuevas abortadas",
			causa: "Frío o sequía",
			solucion: "Estabilidad térmica y riego."
		}, {
			sintoma: "Escudos en raquis",
			causa: "Cochinilla",
			solucion: "Aceite y raspado."
		}]
	}),
	e({
		id: "helecho-boston",
		nombreComun: "Helecho Boston",
		nombreCientifico: "Nephrolepis exaltata",
		familia: "Nephrolepidaceae",
		tipo: "interior",
		luz: "Sombra luminosa",
		waterFreqDays: 4,
		waterNotes: "No dejes secar el cepellón.",
		tipoFertilizante: "Suave",
		diasFrecuenciaFertilizante: 28,
		temporadaFertilizante: "Crecimiento",
		suelo: "Turba aireada",
		humedad: "Alta",
		tempMinC: 14,
		tempMaxC: 30,
		podarCuando: "Frondas secas desde la base",
		trasplantarCuando: "Cuando el rizoma asome",
		moonAffinity: AF_HOJA,
		plagasComunes: ["cochinilla-algodonosa", "arana-roja"],
		consejosCuidado: [
			"Baño de ducha tibia mensual.",
			"Cuelga o eleva: odia el piso frío.",
			"Divide matas en primavera."
		],
		problemas: [{
			sintoma: "Cinta de frondas crujientes",
			causa: "Aire seco",
			solucion: "Bandeja húmeda y riego."
		}, {
			sintoma: "Centro ralo",
			causa: "Edad o poca luz",
			solucion: "Divide y da más claridad."
		}]
	}),
	e({
		id: "cinta",
		nombreComun: "Cinta / lazo de amor",
		nombreCientifico: "Chlorophytum comosum",
		familia: "Asparagaceae",
		tipo: "interior",
		luz: "Luz media a brillante",
		waterFreqDays: 7,
		waterNotes: "Tolera olvido breve.",
		tipoFertilizante: "Equilibrado",
		diasFrecuenciaFertilizante: 30,
		temporadaFertilizante: "Crecimiento",
		suelo: "Universal",
		humedad: "Media",
		tempMinC: 12,
		tempMaxC: 33,
		podarCuando: "Hojas secas y estolones de más",
		trasplantarCuando: "Cuando las raíces empujen",
		moonAffinity: AF_HOJA,
		plagasComunes: ["cochinilla-algodonosa", "pulgon"],
		consejosCuidado: [
			"Los hijuelos se plantan aún unidos o sueltos.",
			"Puntas secas por sales: lava el sustrato.",
			"Muy buena en cocina con luz."
		],
		problemas: [{
			sintoma: "Puntas marrones",
			causa: "Sales o sequía",
			solucion: "Agua reposada y no dejes seco crónico."
		}, {
			sintoma: "Pierde variegado",
			causa: "Poca luz",
			solucion: "Más brillo."
		}]
	}),
	e({
		id: "begonia",
		nombreComun: "Begonia",
		nombreCientifico: "Begonia semperflorens",
		familia: "Begoniaceae",
		tipo: "flor",
		toxicidad: "mascotas",
		luz: "Sol de mañana o sombra brillante",
		waterFreqDays: 4,
		waterNotes: "Al sustrato, no al tallo carnoso.",
		tipoFertilizante: "Floración",
		diasFrecuenciaFertilizante: 18,
		temporadaFertilizante: "Flor",
		suelo: "Ligero",
		humedad: "Media",
		tempMinC: 14,
		tempMaxC: 32,
		podarCuando: "Flores pasadas",
		trasplantarCuando: "Cepellón lleno",
		moonAffinity: AF_FLOR,
		plagasComunes: [
			"oidio",
			"babosa",
			"pulgon"
		],
		consejosCuidado: [
			"Tallo suculento: pudre si se moja de noche.",
			"Excelente orla de patio.",
			"Retira flor seca para seguir."
		],
		problemas: [{
			sintoma: "Polvo blanco",
			causa: "Oídio",
			solucion: "Aire y menos aspersión."
		}, {
			sintoma: "Tallo blando",
			causa: "Hongo",
			solucion: "Corta y drena."
		}]
	}),
	e({
		id: "impatiens",
		nombreComun: "Alegría / Impatiens",
		nombreCientifico: "Impatiens walleriana",
		familia: "Balsaminaceae",
		tipo: "flor",
		luz: "Sombra luminosa; sol quema",
		waterFreqDays: 3,
		waterNotes: "Siempre fresco.",
		tipoFertilizante: "Floración suave",
		diasFrecuenciaFertilizante: 14,
		temporadaFertilizante: "Flor continua",
		suelo: "Rico y fresco",
		humedad: "Alta",
		tempMinC: 14,
		tempMaxC: 32,
		podarCuando: "Cuando se pone larga",
		trasplantarCuando: "Al comprar",
		moonAffinity: AF_FLOR,
		plagasComunes: [
			"pulgon",
			"mildiu",
			"babosa"
		],
		consejosCuidado: [
			"Ideal bajo aleros y patios.",
			"No aguanta mediodía nicaragüense.",
			"Siembra o compra mata nueva cada temporada si el mildiu llega."
		],
		problemas: [{
			sintoma: "Colapso súbito",
			causa: "Mildiu del impatiens",
			solucion: "Elimina y no replantes ahí 1 año."
		}, {
			sintoma: "Pocas flores",
			causa: "Nitrógeno o poca luz de calidad",
			solucion: "Abono de flor y claridad."
		}]
	}),
	e({
		id: "hortensia",
		nombreComun: "Hortensia",
		nombreCientifico: "Hydrangea macrophylla",
		familia: "Hydrangeaceae",
		tipo: "flor",
		luz: "Sol de mañana, sombra de tarde",
		waterFreqDays: 3,
		waterNotes: "Sedienta en flor.",
		tipoFertilizante: "Ácido si buscas azul",
		diasFrecuenciaFertilizante: 21,
		temporadaFertilizante: "Pre-flor",
		suelo: "Ácido, rico",
		humedad: "Alta",
		tempMinC: 8,
		tempMaxC: 30,
		podarCuando: "Según tipo; no cortes yemas de año",
		trasplantarCuando: "Tras flor",
		moonAffinity: AF_FLOR,
		plagasComunes: ["pulgon", "oidio"],
		consejosCuidado: [
			"El color azul pide suelo ácido y aluminio disponible.",
			"En trópico caliente sufre: busca microclima fresco.",
			"Mulch grueso."
		],
		problemas: [{
			sintoma: "Flores que se queman",
			causa: "Sol de tarde",
			solucion: "Malla o muro este."
		}, {
			sintoma: "Hojas amarillas con nervio verde",
			causa: "Clorosis férrica",
			solucion: "Quelato de hierro."
		}]
	}),
	e({
		id: "gardenia",
		nombreComun: "Gardenia",
		nombreCientifico: "Gardenia jasminoides",
		familia: "Rubiaceae",
		tipo: "flor",
		luz: "Sol de mañana",
		waterFreqDays: 5,
		waterNotes: "Agua blanda; no dejes secar en botón.",
		tipoFertilizante: "Ácido",
		diasFrecuenciaFertilizante: 21,
		temporadaFertilizante: "Pre-flor",
		suelo: "Ácido",
		humedad: "Alta",
		tempMinC: 14,
		tempMaxC: 32,
		podarCuando: "Tras flor",
		trasplantarCuando: "Tras flor, con cepellón intacto",
		moonAffinity: AF_FLOR,
		plagasComunes: ["cochinilla-algodonosa", "pulgon"],
		consejosCuidado: [
			"Botón que cae = riego irregular o cambio de sitio.",
			"Suelo calizo la clora.",
			"Aroma fuerte de noche."
		],
		problemas: [{
			sintoma: "Botones momificados",
			causa: "Trips o sequía",
			solucion: "Revisa y riega pareja."
		}, {
			sintoma: "Hojas amarillas",
			causa: "pH alto",
			solucion: "Tierra ácida y agua de lluvia."
		}]
	}),
	e({
		id: "azalea",
		nombreComun: "Azalea",
		nombreCientifico: "Rhododendron simsii",
		familia: "Ericaceae",
		tipo: "flor",
		toxicidad: "mascotas_y_ninos",
		luz: "Luz brillante sin sol crudo",
		waterFreqDays: 4,
		waterNotes: "Cepellón nunca seco; agua blanda.",
		tipoFertilizante: "Ácido para acidófilas",
		diasFrecuenciaFertilizante: 21,
		temporadaFertilizante: "Tras flor",
		suelo: "Ácido, pino o turba",
		humedad: "Alta",
		tempMinC: 8,
		tempMaxC: 28,
		podarCuando: "Tras flor, forma suave",
		trasplantarCuando: "Tras flor, maceta baja",
		moonAffinity: AF_FLOR,
		plagasComunes: ["arana-roja", "oidio"],
		consejosCuidado: [
			"En trópico es planta de altura o patio fresco.",
			"No uses tierra de jardín calcárea.",
			"Descanso fresco ayuda a florar."
		],
		problemas: [{
			sintoma: "Hojas que se caen en masa",
			causa: "Cepellón seco una vez",
			solucion: "Remoja la maceta 20 min."
		}, {
			sintoma: "No florece",
			causa: "Poda tardía o calor",
			solucion: "No cortes yemas; busca fresco."
		}]
	}),
	e({
		id: "limon",
		nombreComun: "Limón",
		nombreCientifico: "Citrus limon",
		familia: "Rutaceae",
		tipo: "arbol",
		luz: "Sol pleno",
		waterFreqDays: 5,
		waterNotes: "Profundo; no encharques el cuello.",
		tipoFertilizante: "Cítricos (N y microelementos)",
		diasFrecuenciaFertilizante: 28,
		temporadaFertilizante: "Crecimiento y cuaje",
		suelo: "Fértil drenante",
		humedad: "Media",
		tempMinC: 8,
		tempMaxC: 38,
		podarCuando: "Chupones y ramas cruzadas en menguante",
		trasplantarCuando: "Joven cada 2 años; adulto a tierra",
		moonAffinity: AF_FRUTO,
		plagasComunes: [
			"minador",
			"cochinilla-escudo",
			"pulgon",
			"hormiga"
		],
		consejosCuidado: [
			"El minador ataca brote tierno: revisa cada semana.",
			"Riego irregular tira fruto pequeño.",
			"Hierro quelatado si amarillea con nervio verde."
		],
		problemas: [{
			sintoma: "Hojas amarillas nuevas",
			causa: "Falta de hierro o riego",
			solucion: "Quelato y riego profundo."
		}, {
			sintoma: "Fruto que cae",
			causa: "Sed o falta de polinización",
			solucion: "Agua pareja; no fumes en flor."
		}]
	}),
	e({
		id: "naranjo",
		nombreComun: "Naranjo",
		nombreCientifico: "Citrus × sinensis",
		familia: "Rutaceae",
		tipo: "arbol",
		luz: "Sol pleno",
		waterFreqDays: 5,
		waterNotes: "Igual que el limón, un poco más de volumen.",
		tipoFertilizante: "Cítricos",
		diasFrecuenciaFertilizante: 28,
		temporadaFertilizante: "Pre-flor y cuaje",
		suelo: "Fértil",
		humedad: "Media",
		tempMinC: 8,
		tempMaxC: 38,
		podarCuando: "Tras cosecha, limpia centro",
		trasplantarCuando: "Joven",
		moonAffinity: AF_FRUTO,
		plagasComunes: [
			"minador",
			"cochinilla-escudo",
			"mosca-blanca"
		],
		consejosCuidado: [
			"Necesita más espacio que el limón de patio.",
			"Cosecha al color y al peso, no solo al naranja.",
			"Evita herbicida al pie."
		],
		problemas: [{
			sintoma: "Corteza agrietada",
			causa: "Sol en tronco joven",
			solucion: "Pinta con cal agrícola."
		}, {
			sintoma: "Hojas con galerías",
			causa: "Minador",
			solucion: "Pellizca galería en hoja nueva."
		}]
	}),
	e({
		id: "aguacate",
		nombreComun: "Aguacate",
		nombreCientifico: "Persea americana",
		familia: "Lauraceae",
		tipo: "arbol",
		luz: "Sol",
		waterFreqDays: 6,
		waterNotes: "Profundo; no tolera pie mojado permanente.",
		tipoFertilizante: "Equilibrado + zinc y boro",
		diasFrecuenciaFertilizante: 30,
		temporadaFertilizante: "Pre-flor",
		suelo: "Drenante, nunca arcilla pesada sola",
		humedad: "Media",
		tempMinC: 8,
		tempMaxC: 36,
		podarCuando: "Forma en los primeros 3 años",
		trasplantarCuando: "Del semillero a bolsa grande con cuidado de raíz",
		moonAffinity: AF_FRUTO,
		plagasComunes: [
			"antracnosis",
			"pudricion-raiz",
			"cochinilla-escudo"
		],
		consejosCuidado: [
			"El hueso en vaso enseña el árbol, no garantiza fruto bueno.",
			"Variedad injertada rinde antes.",
			"Viento quiebra ramas cargadas: tutor joven."
		],
		problemas: [{
			sintoma: "Hojas quemadas en punta",
			causa: "Sales o viento",
			solucion: "Riego profundo de lavado."
		}, {
			sintoma: "Fruto con manchas",
			causa: "Antracnosis",
			solucion: "Cosecha seca y cobre preventivo."
		}]
	}),
	e({
		id: "granado",
		nombreComun: "Granado",
		nombreCientifico: "Punica granatum",
		familia: "Lythraceae",
		tipo: "arbol",
		luz: "Sol pleno",
		waterFreqDays: 7,
		waterNotes: "Riego al cuajar; sequía extrema parte el fruto.",
		tipoFertilizante: "Equilibrado",
		diasFrecuenciaFertilizante: 30,
		temporadaFertilizante: "Pre-flor",
		suelo: "Pobre a medio, drenante",
		humedad: "Baja-media",
		tempMinC: 8,
		tempMaxC: 40,
		podarCuando: "Chupones basales",
		trasplantarCuando: "Joven",
		moonAffinity: AF_FRUTO,
		plagasComunes: ["pulgon", "mosca-blanca"],
		consejosCuidado: [
			"Tolera calor seco mejor que el aguacate.",
			"Poda abierta entra sol al fruto.",
			"Fruto partido = lluvia tardía."
		],
		problemas: [{
			sintoma: "Granada abierta",
			causa: "Riego irregular",
			solucion: "Mulch y agua pareja al pintar."
		}, {
			sintoma: "Pocas flores",
			causa: "Sombra o nitrógeno",
			solucion: "Sol y menos abono foliar."
		}]
	}),
	e({
		id: "olivo",
		nombreComun: "Olivo",
		nombreCientifico: "Olea europaea",
		familia: "Oleaceae",
		tipo: "arbol",
		luz: "Sol pleno",
		waterFreqDays: 10,
		waterNotes: "Seco entre riegos.",
		tipoFertilizante: "Bajo N en maceta",
		diasFrecuenciaFertilizante: 45,
		temporadaFertilizante: "Primavera",
		suelo: "Calizo drenante",
		humedad: "Baja",
		tempMinC: 5,
		tempMaxC: 38,
		podarCuando: "Tras cosecha o a fines de seca",
		trasplantarCuando: "Poco; maceta terracota",
		moonAffinity: AF_FRUTO,
		plagasComunes: ["cochinilla-escudo", "fumagina"],
		consejosCuidado: [
			"En trópico húmedo vive mejor en maceta alta y sol.",
			"El fruto pide frío invernal que Managua no siempre da.",
			"Valor ornamental seguro; cosecha no garantizada."
		],
		problemas: [{
			sintoma: "Hojas con hollín",
			causa: "Fumagina por cochinilla",
			solucion: "Lava y trata escudo."
		}, {
			sintoma: "No fructifica",
			causa: "Falta de frío o polinizador",
			solucion: "Disfruta la copa; no fuerces con abono."
		}]
	}),
	e({
		id: "hierba-luisa",
		nombreComun: "Hierba luisa",
		nombreCientifico: "Cymbopogon citratus",
		familia: "Poaceae",
		tipo: "huerto",
		luz: "Sol",
		waterFreqDays: 4,
		waterNotes: "Fresco; aguanta algo de sequía adulta.",
		tipoFertilizante: "Compost",
		diasFrecuenciaFertilizante: 30,
		temporadaFertilizante: "Lluvias",
		suelo: "Rico",
		humedad: "Media",
		tempMinC: 12,
		tempMaxC: 38,
		podarCuando: "Cosecha de tallos externos",
		trasplantarCuando: "Divide la mata cada 2 años",
		moonAffinity: AF_HOJA,
		plagasComunes: ["arana-roja", "roya"],
		consejosCuidado: [
			"El tallo blanco de la base es lo que se cocina.",
			"Mata grande pide maceta de 30 cm.",
			"Corta a 15 cm para rebrotar."
		],
		problemas: [{
			sintoma: "Centro seco",
			causa: "Edad de mata",
			solucion: "Divide y tira el corazón viejo."
		}, {
			sintoma: "Puntas quemadas",
			causa: "Sol + sed",
			solucion: "Riego profundo."
		}]
	}),
	e({
		id: "ruda",
		nombreComun: "Ruda",
		nombreCientifico: "Ruta graveolens",
		familia: "Rutaceae",
		tipo: "huerto",
		toxicidad: "ninos",
		luz: "Sol",
		waterFreqDays: 7,
		waterNotes: "Poco; se pudre fácil.",
		tipoFertilizante: "Casi nada",
		diasFrecuenciaFertilizante: 60,
		temporadaFertilizante: "Inicio de lluvias",
		suelo: "Pobre drenante",
		humedad: "Baja",
		tempMinC: 10,
		tempMaxC: 36,
		podarCuando: "Forma; usa guantes",
		trasplantarCuando: "Joven",
		moonAffinity: AF_HOJA,
		plagasComunes: ["pulgon"],
		consejosCuidado: [
			"El jugo + sol puede quemar la piel.",
			"Planta de borde; no la uses sin criterio tradicional informado.",
			"Suelo pobre da más aroma."
		],
		problemas: [{
			sintoma: "Base podrida",
			causa: "Riego",
			solucion: "Seco y maceta de barro."
		}, {
			sintoma: "Hojas quemadas",
			causa: "Fitofotodermatitis en la persona, no en la planta",
			solucion: "Guantes y manga."
		}]
	}),
	e({
		id: "nopal-verdura",
		nombreComun: "Nopal verdura",
		nombreCientifico: "Opuntia ficus-indica",
		familia: "Cactaceae",
		tipo: "huerto",
		luz: "Sol pleno",
		waterFreqDays: 12,
		waterNotes: "Menos que una hortaliza de hoja.",
		tipoFertilizante: "Compost ligero",
		diasFrecuenciaFertilizante: 45,
		temporadaFertilizante: "Inicio de lluvias",
		suelo: "Arenoso",
		humedad: "Baja",
		tempMinC: 8,
		tempMaxC: 40,
		podarCuando: "Cosecha cladodios tiernos",
		trasplantarCuando: "Penca con callo de 5 días",
		moonAffinity: AF_SUC,
		plagasComunes: ["cochinilla-algodonosa"],
		consejosCuidado: [
			"Cosecha pencas jóvenes de 15–20 cm.",
			"Pasa el cuchillo por las areolas para quitar espinas.",
			"No riegues tras plantar la penca."
		],
		problemas: [{
			sintoma: "Penca babosa",
			causa: "Lluvia y hongo",
			solucion: "Corta a sano y techo."
		}, {
			sintoma: "Cochinilla blanca",
			causa: "Pulgón lanígero del nopal",
			solucion: "Cepillo y neem."
		}]
	}),
	e({
		id: "pitahaya",
		nombreComun: "Pitahaya",
		nombreCientifico: "Hylocereus undatus",
		familia: "Cactaceae",
		tipo: "huerto",
		luz: "Sol con tutor; joven con algo de sombra",
		waterFreqDays: 7,
		waterNotes: "Más agua en flor y fruto.",
		tipoFertilizante: "Orgánico + potasio en flor",
		diasFrecuenciaFertilizante: 21,
		temporadaFertilizante: "Pre-flor",
		suelo: "Drenante con materia orgánica",
		humedad: "Media",
		tempMinC: 12,
		tempMaxC: 38,
		podarCuando: "Guías que no suben el tutor",
		trasplantarCuando: "Esqueje con callo",
		moonAffinity: AF_FRUTO,
		plagasComunes: [
			"hormiga",
			"antracnosis",
			"pudricion-raiz"
		],
		consejosCuidado: [
			"Necesita poste o árbol tutor.",
			"Flor nocturna: a veces se poliniza a mano.",
			"Poda abre el centro y entra sol al fruto."
		],
		problemas: [{
			sintoma: "Flor que no cuaja",
			causa: "Falta de polinizador",
			solucion: "Pincel de una flor a otra de noche."
		}, {
			sintoma: "Tallo amarillo",
			causa: "Sol crudo en planta joven o pudrición",
			solucion: "Sombra temporal o drena."
		}]
	}),
	e({
		id: "clerodendro-china",
		nombreComun: "Clerodendro rosa",
		nombreCientifico: "Clerodendrum chinense",
		familia: "Lamiaceae",
		tipo: "flor",
		luz: "Sol de mañana o semi",
		waterFreqDays: 5,
		waterNotes: "Regular en flor.",
		tipoFertilizante: "Equilibrado",
		diasFrecuenciaFertilizante: 28,
		temporadaFertilizante: "Lluvias",
		suelo: "Rico",
		humedad: "Media",
		tempMinC: 14,
		tempMaxC: 34,
		podarCuando: "Tras florada para contener",
		trasplantarCuando: "Joven; se esparce por hijuelos",
		moonAffinity: AF_FLOR,
		plagasComunes: ["pulgon", "mosca-blanca"],
		consejosCuidado: [
			"Aroma dulce; puede escaparse de la cerca.",
			"Poda mantiene arbusto y no enredadera caótica.",
			"Buen seto de patio nicaragüense."
		],
		problemas: [{
			sintoma: "Invadió el vecino",
			causa: "Rizomas",
			solucion: "Barrera y poda de raíz."
		}, {
			sintoma: "Pocas flores",
			causa: "Sombra densa",
			solucion: "Aclara el árbol de arriba."
		}]
	}),
	e({
		id: "clerodendro-rojo",
		nombreComun: "Clerodendro rojo",
		nombreCientifico: "Clerodendrum speciosissimum",
		familia: "Lamiaceae",
		tipo: "flor",
		luz: "Sol o semi",
		waterFreqDays: 5,
		waterNotes: "No dejes secar en florones.",
		tipoFertilizante: "Equilibrado",
		diasFrecuenciaFertilizante: 28,
		temporadaFertilizante: "Pre-flor",
		suelo: "Rico",
		humedad: "Media",
		tempMinC: 14,
		tempMaxC: 34,
		podarCuando: "Después de los racimos",
		trasplantarCuando: "Mata joven",
		moonAffinity: AF_FLOR,
		plagasComunes: ["pulgon", "oruga"],
		consejosCuidado: [
			"Racimos erectos rojos: retira los secos.",
			"Riego irregular cae flor.",
			"Tutor ligero si el viento azota."
		],
		problemas: [{
			sintoma: "Hojas comidas",
			causa: "Oruga",
			solucion: "Revisa envés al atardecer."
		}, {
			sintoma: "Amarilleo",
			causa: "Pies mojados",
			solucion: "Drena."
		}]
	}),
	e({
		id: "hibisco",
		nombreComun: "Hibisco / cayena",
		nombreCientifico: "Hibiscus rosa-sinensis",
		familia: "Malvaceae",
		tipo: "flor",
		luz: "Sol 5 h",
		waterFreqDays: 4,
		waterNotes: "Sediento en flor y calor.",
		tipoFertilizante: "Alto potasio",
		diasFrecuenciaFertilizante: 18,
		temporadaFertilizante: "Casi todo el año en trópico",
		suelo: "Rico",
		humedad: "Media",
		tempMinC: 12,
		tempMaxC: 36,
		podarCuando: "Forma en menguante; no dejes leño hueco",
		trasplantarCuando: "Cuando deje de brotar con fuerza",
		moonAffinity: AF_FLOR,
		plagasComunes: [
			"pulgon",
			"cochinilla-algodonosa",
			"mosca-blanca"
		],
		consejosCuidado: [
			"Flor de un día: es normal que caiga al atardecer.",
			"Botón que no abre suele ser pulgón.",
			"Poda anual densa da más flor."
		],
		problemas: [{
			sintoma: "Botones momificados",
			causa: "Pulgón o trips",
			solucion: "Revisa y jabón."
		}, {
			sintoma: "Hojas amarillas de golpe",
			causa: "Sed o mudanza",
			solucion: "Riego y sitio fijo."
		}]
	}),
	e({
		id: "croton",
		nombreComun: "Crotón",
		nombreCientifico: "Codiaeum variegatum",
		familia: "Euphorbiaceae",
		tipo: "interior",
		toxicidad: "mascotas_y_ninos",
		luz: "Mucha luz para mantener color",
		waterFreqDays: 6,
		waterNotes: "Parejo; odia sequía y charco.",
		tipoFertilizante: "Equilibrado",
		diasFrecuenciaFertilizante: 21,
		temporadaFertilizante: "Crecimiento",
		suelo: "Rico drenante",
		humedad: "Alta",
		tempMinC: 16,
		tempMaxC: 34,
		podarCuando: "Para densificar",
		trasplantarCuando: "Cepellón lleno",
		moonAffinity: AF_HOJA,
		plagasComunes: ["arana-roja", "cochinilla-algodonosa"],
		consejosCuidado: [
			"El látex irrita.",
			"Sin luz se vuelve verde liso.",
			"No la mudes cada semana."
		],
		problemas: [{
			sintoma: "Caída de hojas bajas",
			causa: "Cambio de ambiente",
			solucion: "Estabilidad 3 semanas."
		}, {
			sintoma: "Telaraña",
			causa: "Araña roja",
			solucion: "Ducha y humedad."
		}]
	}),
	e({
		id: "dieffenbachia",
		nombreComun: "Dieffenbachia",
		nombreCientifico: "Dieffenbachia seguine",
		familia: "Araceae",
		tipo: "interior",
		toxicidad: "mascotas_y_ninos",
		luz: "Media",
		waterFreqDays: 8,
		waterNotes: "Deja secar un poco.",
		tipoFertilizante: "Equilibrado",
		diasFrecuenciaFertilizante: 28,
		temporadaFertilizante: "Crecimiento",
		suelo: "Rico",
		humedad: "Media-alta",
		tempMinC: 16,
		tempMaxC: 32,
		podarCuando: "Si se despuebla, corta y re-enraíza copa",
		trasplantarCuando: "Anual o bianual",
		moonAffinity: AF_HOJA,
		plagasComunes: ["cochinilla-algodonosa", "arana-roja"],
		consejosCuidado: [
			"Savias tóxicas: lejos de niños que muerden hojas.",
			"Tallo viejo se puede acodar.",
			"Luz media mantiene el moteado."
		],
		problemas: [{
			sintoma: "Tallo pelado",
			causa: "Edad y poca luz",
			solucion: "Decapita y planta la copa."
		}, {
			sintoma: "Hojas llorosas",
			causa: "Riego de más",
			solucion: "Seca."
		}]
	}),
	e({
		id: "aglaonema",
		nombreComun: "Aglaonema",
		nombreCientifico: "Aglaonema commutatum",
		familia: "Araceae",
		tipo: "interior",
		toxicidad: "mascotas",
		luz: "Baja a media; ideales de oficina",
		waterFreqDays: 9,
		waterNotes: "Más seca que húmeda.",
		tipoFertilizante: "Suave",
		diasFrecuenciaFertilizante: 35,
		temporadaFertilizante: "Crecimiento",
		suelo: "Aireado",
		humedad: "Media",
		tempMinC: 16,
		tempMaxC: 32,
		podarCuando: "Hojas bajas viejas",
		trasplantarCuando: "Cada 2 años",
		moonAffinity: AF_HOJA,
		plagasComunes: ["cochinilla-algodonosa", "mosquita-hongo"],
		consejosCuidado: [
			"Las variedades rosadas piden un poco más de luz.",
			"Frío de A/C mancha la hoja.",
			"Crece lento: paciencia."
		],
		problemas: [{
			sintoma: "Bordes amarillos",
			causa: "Frío o sales",
			solucion: "Aléjala del A/C; lava sustrato."
		}, {
			sintoma: "Pudrición",
			causa: "Riego",
			solucion: "Seco y aire."
		}]
	}),
	e({
		id: "anturio",
		nombreComun: "Anturio",
		nombreCientifico: "Anthurium andraeanum",
		familia: "Araceae",
		tipo: "interior",
		toxicidad: "mascotas_y_ninos",
		luz: "Brillante filtrada",
		waterFreqDays: 6,
		waterNotes: "Húmedo, no encharcado.",
		tipoFertilizante: "Rico en fósforo en flor",
		diasFrecuenciaFertilizante: 21,
		temporadaFertilizante: "Casi anual en trópico",
		suelo: "Corteza + turba",
		humedad: "Alta",
		tempMinC: 16,
		tempMaxC: 32,
		podarCuando: "Espátulas verdes viejas",
		trasplantarCuando: "Raíces aéreas desbordadas",
		moonAffinity: AF_FLOR,
		plagasComunes: ["cochinilla-algodonosa", "pulgon"],
		consejosCuidado: [
			"La “flor” es una espata; dura semanas.",
			"Limpia hojas con agua, no con cera.",
			"Raíces aéreas se cubren con musgo."
		],
		problemas: [{
			sintoma: "Espata verde",
			causa: "Poca luz",
			solucion: "Más claridad."
		}, {
			sintoma: "Puntas quemadas",
			causa: "Sales",
			solucion: "Agua blanda."
		}]
	}),
	e({
		id: "camedor",
		nombreComun: "Palma camedor",
		nombreCientifico: "Chamaedorea elegans",
		familia: "Arecaceae",
		tipo: "interior",
		luz: "Sombra luminosa",
		waterFreqDays: 7,
		waterNotes: "Fresco.",
		tipoFertilizante: "Palmeras suave",
		diasFrecuenciaFertilizante: 35,
		temporadaFertilizante: "Crecimiento",
		suelo: "Rico ligero",
		humedad: "Media-alta",
		tempMinC: 14,
		tempMaxC: 32,
		podarCuando: "Frondas secas",
		trasplantarCuando: "Poco frecuente",
		moonAffinity: AF_HOJA,
		plagasComunes: ["arana-roja", "cochinilla-escudo"],
		consejosCuidado: [
			"Nativa de sotobosque: no la pongas a sol.",
			"Racimos de semilla naranja no piden corte inmediato.",
			"Grupos de varios tallos se ven mejor."
		],
		problemas: [{
			sintoma: "Puntas secas",
			causa: "Aire seco",
			solucion: "Humedad y agua reposada."
		}, {
			sintoma: "Ácaros",
			causa: "Calefacción o A/C",
			solucion: "Ducha."
		}]
	}),
	e({
		id: "bambu-suerte",
		nombreComun: "Bambú de la suerte",
		nombreCientifico: "Dracaena sanderiana",
		familia: "Asparagaceae",
		tipo: "interior",
		toxicidad: "mascotas",
		luz: "Luz media; no sol",
		waterFreqDays: 10,
		waterNotes: "Si va en agua, cámbiala cada 7–10 días.",
		tipoFertilizante: "Una gota de líquido al mes en agua",
		diasFrecuenciaFertilizante: 30,
		temporadaFertilizante: "Todo el año suave",
		suelo: "Agua limpia o tierra ligera",
		humedad: "Media",
		tempMinC: 15,
		tempMaxC: 32,
		podarCuando: "Puntas amarillas",
		trasplantarCuando: "Si pasa a tierra, maceta chica",
		moonAffinity: AF_HOJA,
		plagasComunes: ["cochinilla-algodonosa"],
		consejosCuidado: [
			"No es bambú verdadero.",
			"El agua estancada pudre el palo.",
			"Luz baja lo mantiene verde; sol lo quema."
		],
		problemas: [{
			sintoma: "Hojas amarillas",
			causa: "Cloro o sol",
			solucion: "Agua reposada y sombra."
		}, {
			sintoma: "Tallo blando",
			causa: "Pudrición",
			solucion: "Corta por sano y renueva el vaso."
		}]
	}),
	e({
		id: "dracena-marginata",
		nombreComun: "Dracena marginata",
		nombreCientifico: "Dracaena marginata",
		familia: "Asparagaceae",
		tipo: "interior",
		toxicidad: "mascotas",
		luz: "Brillante a media",
		waterFreqDays: 12,
		waterNotes: "Prefiere pecar de seca.",
		tipoFertilizante: "Equilibrado suave",
		diasFrecuenciaFertilizante: 35,
		temporadaFertilizante: "Crecimiento",
		suelo: "Drenante",
		humedad: "Baja-media",
		tempMinC: 14,
		tempMaxC: 33,
		podarCuando: "Para ramificar el tronco",
		trasplantarCuando: "Cada 2–3 años",
		moonAffinity: AF_HOJA,
		plagasComunes: ["arana-roja", "cochinilla-escudo"],
		consejosCuidado: [
			"Puntas secas por flúor: agua reposada.",
			"El corte de copa rebrotará yemas.",
			"No la riegues por calendario rígido si el A/C seca."
		],
		problemas: [{
			sintoma: "Caída de hojas bajas",
			causa: "Normal lenta; acelerada por riego",
			solucion: "Revisa humedad."
		}, {
			sintoma: "Ácaro",
			causa: "Aire seco",
			solucion: "Ducha."
		}]
	}),
	e({
		id: "yucca",
		nombreComun: "Yuca de interior",
		nombreCientifico: "Yucca elephantipes",
		familia: "Asparagaceae",
		tipo: "interior",
		luz: "Sol o luz muy fuerte",
		waterFreqDays: 14,
		waterNotes: "Seca entre riegos.",
		tipoFertilizante: "Equilibrado bajo",
		diasFrecuenciaFertilizante: 45,
		temporadaFertilizante: "Crecimiento",
		suelo: "Arenoso",
		humedad: "Baja",
		tempMinC: 10,
		tempMaxC: 36,
		podarCuando: "Copa si se va al techo",
		trasplantarCuando: "Maceta pesada cuando se vuelque",
		moonAffinity: AF_SUC,
		plagasComunes: ["cochinilla-escudo", "pudricion-raiz"],
		consejosCuidado: [
			"Tronco pesado: base ancha.",
			"Hojas punzantes: lejos de pasillos estrechos.",
			"Más sol, menos agua."
		],
		problemas: [{
			sintoma: "Tronco blando abajo",
			causa: "Pudrición",
			solucion: "Difícil de salvar; corta copa sana."
		}, {
			sintoma: "Hojas pálidas",
			causa: "Poca luz",
			solucion: "Ventana sur o patio."
		}]
	}),
	e({
		id: "strelitzia",
		nombreComun: "Ave del paraíso",
		nombreCientifico: "Strelitzia reginae",
		familia: "Strelitziaceae",
		tipo: "exterior",
		luz: "Sol de mañana a pleno",
		waterFreqDays: 6,
		waterNotes: "Más agua en flor.",
		tipoFertilizante: "Rico en potasio",
		diasFrecuenciaFertilizante: 21,
		temporadaFertilizante: "Pre-flor",
		suelo: "Rico",
		humedad: "Media",
		tempMinC: 8,
		tempMaxC: 36,
		podarCuando: "Hojas rotas y flores secas",
		trasplantarCuando: "Cuando el rizoma parta la maceta — florece algo estresada",
		moonAffinity: AF_FLOR,
		plagasComunes: ["cochinilla-algodonosa", "pulgon"],
		consejosCuidado: [
			"Florece más en maceta justa que en tierra suelta de más.",
			"Divide rizomas con sierra limpia.",
			"Viento rompe las paletas: sitio algo resguardado."
		],
		problemas: [{
			sintoma: "Solo hoja, sin flor",
			causa: "Poca luz o maceta enorme",
			solucion: "Sol y no trasplantes de más."
		}, {
			sintoma: "Hojas rasgadas",
			causa: "Viento",
			solucion: "Normal leve; mueve si es extremo."
		}]
	}),
	e({
		id: "heliconia",
		nombreComun: "Heliconia",
		nombreCientifico: "Heliconia rostrata",
		familia: "Heliconiaceae",
		tipo: "exterior",
		luz: "Sol o semi en costa",
		waterFreqDays: 3,
		waterNotes: "Agua abundante en lluvias y calor.",
		tipoFertilizante: "Orgánico abundante",
		diasFrecuenciaFertilizante: 21,
		temporadaFertilizante: "Crecimiento",
		suelo: "Rico, húmedo, drenado",
		humedad: "Alta",
		tempMinC: 14,
		tempMaxC: 36,
		podarCuando: "Pseudotallos floridos ya secos",
		trasplantarCuando: "Divide matas cada 2–3 años",
		moonAffinity: AF_FLOR,
		plagasComunes: ["pulgon", "babosa"],
		consejosCuidado: [
			"Planta de trópico húmedo: mulch grueso.",
			"Corta el tallo que ya floreció a ras.",
			"Viento rompe las brácteas."
		],
		problemas: [{
			sintoma: "Pocas pinzas",
			causa: "Sombra o mata vieja",
			solucion: "Sol y división."
		}, {
			sintoma: "Hojas amarillas",
			causa: "Charco permanente",
			solucion: "Drena; heliconia quiere fresco no pantano parado."
		}]
	}),
	e({
		id: "syngonium",
		nombreComun: "Singonio",
		nombreCientifico: "Syngonium podophyllum",
		familia: "Araceae",
		tipo: "interior",
		toxicidad: "mascotas_y_ninos",
		luz: "Media",
		waterFreqDays: 7,
		waterNotes: "Ligeramente húmedo.",
		tipoFertilizante: "Equilibrado",
		diasFrecuenciaFertilizante: 28,
		temporadaFertilizante: "Crecimiento",
		suelo: "Aireado",
		humedad: "Media",
		tempMinC: 15,
		tempMaxC: 33,
		podarCuando: "Guías para densificar",
		trasplantarCuando: "Anual",
		moonAffinity: AF_HOJA,
		plagasComunes: ["arana-roja", "pulgon"],
		consejosCuidado: [
			"La hoja cambia de forma con la edad.",
			"Tutor o colgante.",
			"Variegado pide más luz."
		],
		problemas: [{
			sintoma: "Bordes secos",
			causa: "Aire seco",
			solucion: "Humedad."
		}, {
			sintoma: "Verde liso",
			causa: "Poca luz",
			solucion: "Más brillo."
		}]
	}),
	e({
		id: "pilea",
		nombreComun: "Pilea",
		nombreCientifico: "Pilea peperomioides",
		familia: "Urticaceae",
		tipo: "interior",
		luz: "Brillante filtrada",
		waterFreqDays: 8,
		waterNotes: "Deja secar un poco.",
		tipoFertilizante: "Suave",
		diasFrecuenciaFertilizante: 28,
		temporadaFertilizante: "Crecimiento",
		suelo: "Ligero",
		humedad: "Media",
		tempMinC: 13,
		tempMaxC: 30,
		podarCuando: "Hijos para regalar",
		trasplantarCuando: "Cuando salgan muchos hijuelos",
		moonAffinity: AF_HOJA,
		plagasComunes: ["cochinilla-algodonosa", "mosquita-hongo"],
		consejosCuidado: [
			"Gira la maceta: se inclina a la luz.",
			"Hijos laterales se separan con raíz propia.",
			"No la ahogues."
		],
		problemas: [{
			sintoma: "Hojas curvas hacia abajo",
			causa: "Riego de más o poco",
			solucion: "Pesa la maceta."
		}, {
			sintoma: "Manchas blancas",
			causa: "Edema por agua irregular",
			solucion: "Riego más estable."
		}]
	}),
	e({
		id: "peperomia",
		nombreComun: "Peperomia",
		nombreCientifico: "Peperomia obtusifolia",
		familia: "Piperaceae",
		tipo: "interior",
		luz: "Media a brillante",
		waterFreqDays: 10,
		waterNotes: "Hojas carnosas: menos agua.",
		tipoFertilizante: "Suave",
		diasFrecuenciaFertilizante: 35,
		temporadaFertilizante: "Crecimiento",
		suelo: "Muy aireado",
		humedad: "Media",
		tempMinC: 15,
		tempMaxC: 32,
		podarCuando: "Puntas para forma",
		trasplantarCuando: "Raro; maceta chica",
		moonAffinity: AF_SUC,
		plagasComunes: ["cochinilla-algodonosa", "pudricion-raiz"],
		consejosCuidado: [
			"Maceta baja le sienta bien.",
			"Esqueje de hoja en arena.",
			"No le gusta el frío de noche junto a la ventana."
		],
		problemas: [{
			sintoma: "Tallo negro",
			causa: "Pudrición",
			solucion: "Corta y reduce riego."
		}, {
			sintoma: "Hojas arrugadas",
			causa: "Sed",
			solucion: "Un riego profundo."
		}]
	}),
	e({
		id: "coleo",
		nombreComun: "Coleo",
		nombreCientifico: "Coleus scutellarioides",
		familia: "Lamiaceae",
		tipo: "flor",
		luz: "Mañana de sol; color pide luz",
		waterFreqDays: 3,
		waterNotes: "No dejes secar.",
		tipoFertilizante: "Equilibrado",
		diasFrecuenciaFertilizante: 14,
		temporadaFertilizante: "Crecimiento",
		suelo: "Rico fresco",
		humedad: "Media",
		tempMinC: 14,
		tempMaxC: 34,
		podarCuando: "Pellizca flores y puntas",
		trasplantarCuando: "Crece rápido: 1–2 veces por temporada",
		moonAffinity: AF_HOJA,
		plagasComunes: ["pulgon", "babosa"],
		consejosCuidado: [
			"El valor está en la hoja, no en la flor.",
			"Esqueje en agua en una semana.",
			"Sol de mediodía lava el color."
		],
		problemas: [{
			sintoma: "Color apagado",
			causa: "Poca luz o exceso de N",
			solucion: "Más sol de mañana."
		}, {
			sintoma: "Caída al mediodía",
			causa: "Sed",
			solucion: "Riego; se recupera si no es crónica."
		}]
	}),
	e({
		id: "alocasia",
		nombreComun: "Alocasia",
		nombreCientifico: "Alocasia amazonica",
		familia: "Araceae",
		tipo: "interior",
		toxicidad: "mascotas_y_ninos",
		luz: "Brillante filtrada",
		waterFreqDays: 6,
		waterNotes: "Fresco en hoja; reduce si entra en reposo.",
		tipoFertilizante: "Equilibrado",
		diasFrecuenciaFertilizante: 21,
		temporadaFertilizante: "Hoja activa",
		suelo: "Aireado rico",
		humedad: "Alta",
		tempMinC: 17,
		tempMaxC: 32,
		podarCuando: "Hojas amarillas al rizoma",
		trasplantarCuando: "Cuando el cormo asome",
		moonAffinity: AF_HOJA,
		plagasComunes: ["arana-roja", "cochinilla-algodonosa"],
		consejosCuidado: [
			"Puede perder hoja en meses secos: el cormo vive.",
			"Humedad alta evita ácaros.",
			"Savia irritante."
		],
		problemas: [{
			sintoma: "Gota en la punta",
			causa: "Guttación normal",
			solucion: "Nada; no es pudrición."
		}, {
			sintoma: "Ácaro en envés",
			causa: "Aire seco",
			solucion: "Ducha y humedad."
		}]
	}),
	e({
		id: "plumeria",
		nombreComun: "Flor de mayo / plumeria",
		nombreCientifico: "Plumeria rubra",
		familia: "Apocynaceae",
		tipo: "arbol",
		toxicidad: "mascotas",
		luz: "Sol pleno",
		waterFreqDays: 8,
		waterNotes: "Poco en reposo; más en flor.",
		tipoFertilizante: "Alto fósforo pre-flor",
		diasFrecuenciaFertilizante: 28,
		temporadaFertilizante: "Antes de las lluvias",
		suelo: "Drenante",
		humedad: "Baja-media",
		tempMinC: 10,
		tempMaxC: 38,
		podarCuando: "Forma en seca, nunca en plena flor si puedes evitarlo",
		trasplantarCuando: "Esqueje grueso con callo largo",
		moonAffinity: AF_FLOR,
		plagasComunes: ["pulgon", "roya"],
		consejosCuidado: [
			"Árbol clásico de patio nicaragüense.",
			"Látex irritante.",
			"Flor de mayo pide sol y suelo que no se encharque."
		],
		problemas: [{
			sintoma: "Ramas sin hoja en seca",
			causa: "Reposo normal",
			solucion: "Reduce riego; espera lluvias."
		}, {
			sintoma: "Puntas negras",
			causa: "Hongo por lluvia",
			solucion: "Corta a sano."
		}]
	}),
	e({
		id: "ixora",
		nombreComun: "Ixora",
		nombreCientifico: "Ixora coccinea",
		familia: "Rubiaceae",
		tipo: "flor",
		luz: "Sol",
		waterFreqDays: 5,
		waterNotes: "Regular.",
		tipoFertilizante: "Ácido suave",
		diasFrecuenciaFertilizante: 21,
		temporadaFertilizante: "Casi anual",
		suelo: "Ligeramente ácido",
		humedad: "Media",
		tempMinC: 14,
		tempMaxC: 36,
		podarCuando: "Tras umbelas para compactar",
		trasplantarCuando: "Seto joven",
		moonAffinity: AF_FLOR,
		plagasComunes: ["cochinilla-escudo", "pulgon"],
		consejosCuidado: [
			"Seto bajo de sol.",
			"Suelo calizo amarillea.",
			"Cosecha umbelas secas."
		],
		problemas: [{
			sintoma: "Hojas amarillas",
			causa: "pH alto",
			solucion: "Tierra ácida y hierro."
		}, {
			sintoma: "Pocas bolas de flor",
			causa: "Sombra o poda a destiempo",
			solucion: "Sol y poda justo tras flor."
		}]
	}),
	e({
		id: "cafe",
		nombreComun: "Cafeto",
		nombreCientifico: "Coffea arabica",
		familia: "Rubiaceae",
		tipo: "interior",
		luz: "Filtro de árbol; no sol de mediodía",
		waterFreqDays: 5,
		waterNotes: "Fresco, agua blanda.",
		tipoFertilizante: "Ácido suave",
		diasFrecuenciaFertilizante: 28,
		temporadaFertilizante: "Crecimiento",
		suelo: "Ácido rico",
		humedad: "Alta",
		tempMinC: 14,
		tempMaxC: 32,
		podarCuando: "Para forma de arbusto",
		trasplantarCuando: "Cuando las raíces asomen",
		moonAffinity: AF_FRUTO,
		plagasComunes: [
			"cochinilla-escudo",
			"pulgon",
			"roya"
		],
		consejosCuidado: [
			"En maceta es planta de patio sombreado.",
			"Flor blanca olorosa; grano tarda meses.",
			"Roya del café: retira hoja y airea."
		],
		problemas: [{
			sintoma: "Hojas con polvo naranja",
			causa: "Roya",
			solucion: "Retira y mejora aire."
		}, {
			sintoma: "Puntas secas",
			causa: "Sales",
			solucion: "Agua de lluvia."
		}]
	}),
	e({
		id: "mango",
		nombreComun: "Mango",
		nombreCientifico: "Mangifera indica",
		familia: "Anacardiaceae",
		tipo: "arbol",
		luz: "Sol pleno",
		waterFreqDays: 7,
		waterNotes: "Joven más frecuente; adulto rústico.",
		tipoFertilizante: "Orgánico al inicio de lluvias",
		diasFrecuenciaFertilizante: 40,
		temporadaFertilizante: "Pre-flor si hay manejo",
		suelo: "Profundo drenante",
		humedad: "Media",
		tempMinC: 10,
		tempMaxC: 40,
		podarCuando: "Tras cosecha, abre copa",
		trasplantarCuando: "Solo muy joven",
		moonAffinity: AF_FRUTO,
		plagasComunes: [
			"antracnosis",
			"cochinilla-escudo",
			"hormiga"
		],
		consejosCuidado: [
			"Árbol grande: no es planta de sala.",
			"Antracnosis en flor: cobre al inicio de seca-lluvia.",
			"Variedad injertada da antes."
		],
		problemas: [{
			sintoma: "Flor se pone negra",
			causa: "Antracnosis",
			solucion: "Preventivo y no mojar flor."
		}, {
			sintoma: "Fruto con hilera de savia",
			causa: "Mosca u hongo",
			solucion: "Cosecha oportuna y saneamiento de frutos caídos."
		}]
	}),
	e({
		id: "guayaba",
		nombreComun: "Guayaba",
		nombreCientifico: "Psidium guajava",
		familia: "Myrtaceae",
		tipo: "arbol",
		luz: "Sol",
		waterFreqDays: 6,
		waterNotes: "Regular en fruto.",
		tipoFertilizante: "Orgánico",
		diasFrecuenciaFertilizante: 30,
		temporadaFertilizante: "Pre-flor",
		suelo: "Cualquiera razonable",
		humedad: "Media",
		tempMinC: 10,
		tempMaxC: 38,
		podarCuando: "Tras cosecha",
		trasplantarCuando: "Joven",
		moonAffinity: AF_FRUTO,
		plagasComunes: ["mosca-blanca", "antracnosis"],
		consejosCuidado: [
			"Árbol de patio que perdona.",
			"Fruto maduro atrae moscas: cosecha seguido.",
			"Poda baja facilita la recolección."
		],
		problemas: [{
			sintoma: "Fruto agusanado",
			causa: "Mosca de la fruta",
			solucion: "Recoge caídos; bolsa el fruto."
		}, {
			sintoma: "Hojas con mancha",
			causa: "Hongo",
			solucion: "Airea la copa."
		}]
	}),
	e({
		id: "papaya",
		nombreComun: "Papaya",
		nombreCientifico: "Carica papaya",
		familia: "Caricaceae",
		tipo: "huerto",
		luz: "Sol",
		waterFreqDays: 4,
		waterNotes: "No encharques el cuello.",
		tipoFertilizante: "Rico y frecuente",
		diasFrecuenciaFertilizante: 18,
		temporadaFertilizante: "Todo el crecimiento",
		suelo: "Suelto fértil",
		humedad: "Media",
		tempMinC: 14,
		tempMaxC: 38,
		podarCuando: "Hojas viejas; no despuntar el meristemo",
		trasplantarCuando: "Muy joven o siembra directa",
		moonAffinity: AF_FRUTO,
		plagasComunes: ["arana-roja", "oidio"],
		consejosCuidado: [
			"Planta de vida corta: 2–4 años de buena cosecha.",
			"Hermafrodita injertada o varias plantas por si hay machos.",
			"Mulch sin tocar el tallo."
		],
		problemas: [{
			sintoma: "Hojas como mosaico",
			causa: "Virus por insectos",
			solucion: "Elimina planta; controla pulgón."
		}, {
			sintoma: "Cuello podrido",
			causa: "Charco",
			solucion: "Cama alta."
		}]
	}),
	e({
		id: "chaya",
		nombreComun: "Chaya",
		nombreCientifico: "Cnidoscolus aconitifolius",
		familia: "Euphorbiaceae",
		tipo: "huerto",
		toxicidad: "ninos",
		luz: "Sol",
		waterFreqDays: 5,
		waterNotes: "Rústica.",
		tipoFertilizante: "Compost",
		diasFrecuenciaFertilizante: 40,
		temporadaFertilizante: "Lluvias",
		suelo: "Cualquiera",
		humedad: "Media",
		tempMinC: 12,
		tempMaxC: 40,
		podarCuando: "Cosecha de rama; siempre cocida",
		trasplantarCuando: "Estaca gruesa",
		moonAffinity: AF_HOJA,
		plagasComunes: ["pulgon"],
		consejosCuidado: [
			"Nunca se come cruda: hierve 15 min y tira el agua.",
			"Algunas variedades pican al cortar: manga larga.",
			"Arbusto de patio muy nicaragüense."
		],
		problemas: [{
			sintoma: "Hojas duras",
			causa: "Sequía",
			solucion: "Riego y cosecha de brote nuevo."
		}, {
			sintoma: "Pocas hojas",
			causa: "Sombra",
			solucion: "Sol."
		}]
	}),
	e({
		id: "chipilin",
		nombreComun: "Chipilín",
		nombreCientifico: "Crotalaria longirostrata",
		familia: "Fabaceae",
		tipo: "huerto",
		luz: "Sol",
		waterFreqDays: 4,
		waterNotes: "Regular.",
		tipoFertilizante: "Poco; fija algo de nitrógeno",
		diasFrecuenciaFertilizante: 30,
		temporadaFertilizante: "Tras siembra",
		suelo: "Suelto",
		humedad: "Media",
		tempMinC: 14,
		tempMaxC: 36,
		podarCuando: "Cosecha de punta para que no se ponga leñoso",
		trasplantarCuando: "Siembra directa",
		moonAffinity: AF_HOJA,
		plagasComunes: ["pulgon", "oruga"],
		consejosCuidado: [
			"Hoja de sopas y tamales.",
			"Cosecha brotes tiernos.",
			"Resiembra cada temporada si se adelgaza."
		],
		problemas: [{
			sintoma: "Se pone palo",
			causa: "Sin poda",
			solucion: "Corte bajo y resiembra."
		}, {
			sintoma: "Pulgón en punta",
			causa: "Brote tierno",
			solucion: "Agua a presión."
		}]
	}),
	e({
		id: "jamaica",
		nombreComun: "Flor de Jamaica",
		nombreCientifico: "Hibiscus sabdariffa",
		familia: "Malvaceae",
		tipo: "huerto",
		luz: "Sol",
		waterFreqDays: 4,
		waterNotes: "Más agua al formar cáliz.",
		tipoFertilizante: "Equilibrado",
		diasFrecuenciaFertilizante: 21,
		temporadaFertilizante: "Antes de flor",
		suelo: "Suelto",
		humedad: "Media",
		tempMinC: 14,
		tempMaxC: 36,
		podarCuando: "Cosecha cálices rojos",
		trasplantarCuando: "Plántula",
		moonAffinity: AF_FLOR,
		plagasComunes: ["pulgon", "oruga"],
		consejosCuidado: [
			"Se cosecha el cáliz, no el pétalo solo.",
			"Seca a la sombra para el fresco.",
			"Ciclo de temporada: resiembra."
		],
		problemas: [{
			sintoma: "Cáliz chico",
			causa: "Sombra o densidad",
			solucion: "Ralea y sol."
		}, {
			sintoma: "Oruga en flor",
			causa: "Temporada",
			solucion: "Revisión diaria."
		}]
	}),
	e({
		id: "jengibre",
		nombreComun: "Jengibre",
		nombreCientifico: "Zingiber officinale",
		familia: "Zingiberaceae",
		tipo: "huerto",
		luz: "Semi-sombra",
		waterFreqDays: 4,
		waterNotes: "Fresco en hoja; seco al cosechar rizoma.",
		tipoFertilizante: "Orgánico",
		diasFrecuenciaFertilizante: 21,
		temporadaFertilizante: "Mientras hay tallo",
		suelo: "Rico mullido",
		humedad: "Alta",
		tempMinC: 16,
		tempMaxC: 34,
		podarCuando: "Al secarse el follaje, cosecha",
		trasplantarCuando: "Trozos de rizoma con yema",
		moonAffinity: AF_RAIZ,
		plagasComunes: ["babosa", "pudricion-raiz"],
		consejosCuidado: [
			"Siembra trozo con ojo visible.",
			"8–10 meses a rizoma maduro.",
			"Sombra de plátano le sienta bien."
		],
		problemas: [{
			sintoma: "Rizoma podrido",
			causa: "Charco",
			solucion: "Cama alta."
		}, {
			sintoma: "Pocas cañas",
			causa: "Sombra extrema o semilla vieja",
			solucion: "Más claridad y yema fresca."
		}]
	}),
	e({
		id: "epazote",
		nombreComun: "Epazote",
		nombreCientifico: "Dysphania ambrosioides",
		familia: "Amaranthaceae",
		tipo: "huerto",
		luz: "Sol o semi",
		waterFreqDays: 4,
		waterNotes: "Rústico.",
		tipoFertilizante: "Casi nada",
		diasFrecuenciaFertilizante: 40,
		temporadaFertilizante: "Si acaso compost",
		suelo: "Cualquiera",
		humedad: "Media",
		tempMinC: 12,
		tempMaxC: 38,
		podarCuando: "Cosecha de punta",
		trasplantarCuando: "Se resiembra solo",
		moonAffinity: AF_HOJA,
		plagasComunes: ["pulgon"],
		consejosCuidado: [
			"Aroma fuerte: una ramita basta en frijoles.",
			"Puede volverse maleza útil.",
			"No es planta de interior."
		],
		problemas: [{
			sintoma: "Sabor excesivo",
			causa: "Planta adulta",
			solucion: "Usa brote joven."
		}, {
			sintoma: "Se seca",
			causa: "Maceta chica al sol",
			solucion: "Más volumen de tierra."
		}]
	}),
	e({
		id: "ficus-benjamina",
		nombreComun: "Ficus benjamina",
		nombreCientifico: "Ficus benjamina",
		familia: "Moraceae",
		tipo: "interior",
		toxicidad: "mascotas",
		luz: "Brillante estable",
		waterFreqDays: 8,
		waterNotes: "Regular; odia mudanzas.",
		tipoFertilizante: "Equilibrado",
		diasFrecuenciaFertilizante: 28,
		temporadaFertilizante: "Crecimiento",
		suelo: "Universal",
		humedad: "Media",
		tempMinC: 14,
		tempMaxC: 33,
		podarCuando: "Forma; látex irritante",
		trasplantarCuando: "Cada 2 años",
		moonAffinity: AF_HOJA,
		plagasComunes: ["cochinilla-escudo", "arana-roja"],
		consejosCuidado: [
			"Si tira hoja al llegar a casa, espera 3 semanas.",
			"Sitio fijo vale más que abono.",
			"Puede vivir en patio si no hay viento frío."
		],
		problemas: [{
			sintoma: "Defoliación",
			causa: "Cambio de luz",
			solucion: "No la muevas otra vez."
		}, {
			sintoma: "Escudos",
			causa: "Cochinilla",
			solucion: "Aceite y revisión de ramas internas."
		}]
	}),
	e({
		id: "pachira",
		nombreComun: "Castaño de la suerte",
		nombreCientifico: "Pachira aquatica",
		familia: "Malvaceae",
		tipo: "interior",
		luz: "Brillante",
		waterFreqDays: 8,
		waterNotes: "Deja secar un poco; no es planta de vaso eterno.",
		tipoFertilizante: "Equilibrado",
		diasFrecuenciaFertilizante: 30,
		temporadaFertilizante: "Crecimiento",
		suelo: "Rico drenante",
		humedad: "Media",
		tempMinC: 14,
		tempMaxC: 34,
		podarCuando: "Para mantener el trenzado visible",
		trasplantarCuando: "Cuando el tronco pida base",
		moonAffinity: AF_HOJA,
		plagasComunes: ["cochinilla-algodonosa", "arana-roja"],
		consejosCuidado: [
			"El trenzado es vivero; el árbol real es de humedal.",
			"Si va en agua, cámbiala y lava raíces.",
			"Puntas secas por sales."
		],
		problemas: [{
			sintoma: "Hojas que caen",
			causa: "Riego o mudanza",
			solucion: "Estabilidad."
		}, {
			sintoma: "Moho en trenza",
			causa: "Agua en el palo",
			solucion: "Riega suelo no tronco."
		}]
	}),
	e({
		id: "kalanchoe",
		nombreComun: "Kalanchoe",
		nombreCientifico: "Kalanchoe blossfeldiana",
		familia: "Crassulaceae",
		tipo: "suculenta",
		toxicidad: "mascotas",
		luz: "Sol de mañana",
		waterFreqDays: 12,
		waterNotes: "Suculenta de flor: seca entre riegos.",
		tipoFertilizante: "Cactus",
		diasFrecuenciaFertilizante: 30,
		temporadaFertilizante: "Pre-flor",
		suelo: "Mineral",
		humedad: "Baja",
		tempMinC: 12,
		tempMaxC: 34,
		podarCuando: "Varas secas",
		trasplantarCuando: "Tras flor",
		moonAffinity: AF_FLOR,
		plagasComunes: ["pulgon", "oidio"],
		consejosCuidado: [
			"Para volver a florar: noches largas 6 semanas.",
			"No dejes agua en el plato.",
			"Hojas carnosas se quiebran fácil."
		],
		problemas: [{
			sintoma: "No reflora",
			causa: "Luz nocturna",
			solucion: "Oscuridad de 14 h."
		}, {
			sintoma: "Tallo largo",
			causa: "Poca luz",
			solucion: "Sol de mañana."
		}]
	}),
	e({
		id: "sedum",
		nombreComun: "Sedum",
		nombreCientifico: "Sedum morganianum",
		familia: "Crassulaceae",
		tipo: "suculenta",
		luz: "Sol de mañana",
		waterFreqDays: 14,
		waterNotes: "Muy poco.",
		tipoFertilizante: "Cactus",
		diasFrecuenciaFertilizante: 60,
		temporadaFertilizante: "Crecimiento",
		suelo: "Mineral",
		humedad: "Baja",
		tempMinC: 8,
		tempMaxC: 35,
		podarCuando: "Guías rotas se replantan",
		trasplantarCuando: "Maceta colgante cuando pese",
		moonAffinity: AF_SUC,
		plagasComunes: ["cochinilla-algodonosa", "pudricion-raiz"],
		consejosCuidado: [
			"Las “cuentas” que caen enraízan.",
			"Riego por abajo evita manchas.",
			"Pleno sol de mediodía quema."
		],
		problemas: [{
			sintoma: "Tiras ralas",
			causa: "Poca luz",
			solucion: "Más brillo."
		}, {
			sintoma: "Base negra",
			causa: "Pudrición",
			solucion: "Corta y callo."
		}]
	})
];

type Overlay = { extra: Especie[]; ocultos: string[] };
let overlay: Overlay = { extra: [], ocultos: [] };

export function setCatalogoOverlay(siguiente: Overlay) {
  overlay = {
    extra: siguiente.extra ?? [],
    ocultos: siguiente.ocultos ?? [],
  };
}

export function catalogoEfectivo(): Especie[] {
  const mapa = new Map(CATALOGO_ESPECIES.map((x) => [x.id, x]));
  for (const x of overlay.extra) mapa.set(x.id, x);
  for (const id of overlay.ocultos) {
    if (!overlay.extra.some((x) => x.id === id)) mapa.delete(id);
  }
  return [...mapa.values()];
}

export function especiePorId(id: string) {
  return catalogoEfectivo().find((x) => x.id === id);
}
function sinAcento(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const ALIAS: Record<string, string[]> = {
  sabila: ["aloe-vera", "sabila"],
  "aloe vera": ["aloe-vera"],
  "lengua de suegra": ["sansevieria"],
  sansevieria: ["sansevieria"],
  "palo de agua": ["dracena", "palma-areca"],
  "oreja de elefante": ["alocasia", "colocasia"],
  money: ["pothos", "epipremnum"],
  poto: ["pothos", "epipremnum"],
  pothos: ["pothos", "epipremnum"],
  zz: ["zz", "zamioculcas"],
  "planta zz": ["zz", "zamioculcas"],
  "arbol de jade": ["jade"],
  "noche buena": ["nochebuena"],
  "flor de pascua": ["nochebuena"],
  buganvilia: ["bugambilia"],
  bugambilia: ["bugambilia"],
  "hierba buena": ["hierbabuena", "menta"],
  tomate: ["tomate"],
  jitomate: ["tomate"],
  chile: ["chile-jalapeno", "chile-serrano"],
  limon: ["limon"],
  naranja: ["naranjo"],
  aguacate: ["aguacate"],
  palta: ["aguacate"],
};

export function buscarEspecies(q: string) {
  const n = sinAcento(q);
  const base = catalogoEfectivo();
  if (!n) return base;
  const aliasIds = new Set(
    Object.entries(ALIAS)
      .filter(([k]) => n.includes(k) || k.includes(n))
      .flatMap(([, ids]) => ids),
  );
  return base
    .map((x) => {
      const bolsa = sinAcento(`${x.nombreComun} ${x.nombreCientifico} ${x.id} ${x.familia}`);
      let puntos = 0;
      if (aliasIds.has(x.id) || [...aliasIds].some((id) => x.id.includes(id))) puntos += 8;
      if (bolsa === n) puntos += 10;
      if (sinAcento(x.nombreComun) === n) puntos += 9;
      if (sinAcento(x.nombreComun).startsWith(n)) puntos += 6;
      if (bolsa.startsWith(n)) puntos += 5;
      if (bolsa.includes(n)) puntos += 4;
      const partes = n.split(" ").filter((p) => p.length > 2);
      if (partes.length && partes.every((p) => bolsa.includes(p))) puntos += 3;
      return { x, puntos };
    })
    .filter((r) => r.puntos > 0)
    .sort((a, b) => b.puntos - a.puntos)
    .map((r) => r.x);
}

export function pistaPorNombreArchivo(nombre: string): string[] {
  const n = sinAcento(nombre.replace(/\.[a-z0-9]+$/i, ""));
  if (n.length < 3) return [];
  return buscarEspecies(n).slice(0, 6).map((x) => x.id);
}

export function listaBreveCatalogo(): string {
  return catalogoEfectivo()
    .map((x) => `${x.id}|${x.nombreComun}|${x.nombreCientifico}`)
    .join("\n");
}

export function especieEnBlanco(parcial: { nombreComun: string; nombreCientifico?: string }): Especie {
  const slug = parcial.nombreComun
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  return {
    id: `autor-${slug || "especie"}-${Date.now().toString(36)}`,
    nombreComun: parcial.nombreComun.trim(),
    nombreCientifico: (parcial.nombreCientifico || parcial.nombreComun).trim(),
    familia: "Por documentar",
    tipo: "interior",
    toxicidad: "ninguna_conocida",
    luz: "Luz filtrada brillante",
    waterFreqDays: 7,
    waterNotes: "Riega cuando el sustrato esté seco al tacto.",
    tipoFertilizante: "Equilibrado diluido",
    diasFrecuenciaFertilizante: 28,
    temporadaFertilizante: "Época de crecimiento",
    suelo: "Sustrato suelto y drenado",
    humedad: "Media",
    tempMinC: 14,
    tempMaxC: 32,
    podarCuando: "Luna menguante, ramas secas",
    trasplantarCuando: "Cuando la maceta se quede chica",
    moonAffinity: {
      regar: "creciente",
      fertilizar: "creciente",
      podar: "menguante",
      sembrar: "nueva",
      plagar: "llena",
    },
    plagasComunes: [],
    consejosCuidado: ["Observa la hoja y anota en la bitácora."],
    problemas: [],
  };
}

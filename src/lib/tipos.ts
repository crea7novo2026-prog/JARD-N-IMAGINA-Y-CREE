export type TipoEspecie =
  | "interior"
  | "exterior"
  | "huerto"
  | "suculenta"
  | "arbol"
  | "flor";

export type FaseLunarNombre =
  | "nueva"
  | "creciente"
  | "llena"
  | "menguante";

export type AfinidadLunar = FaseLunarNombre | "cualquier";

export type UbicacionPlanta = "interior" | "patio" | "huerto" | "balcon";

export type TamanoMaceta = "chica" | "mediana" | "grande";

export type Toxicidad = "mascotas" | "ninos" | "mascotas_y_ninos" | "ninguna_conocida";

export type AfinidadesLunares = {
  regar: AfinidadLunar;
  fertilizar: AfinidadLunar;
  podar: AfinidadLunar;
  sembrar: AfinidadLunar;
  plagar: AfinidadLunar;
};

export type ProblemaEspecie = {
  sintoma: string;
  causa: string;
  solucion: string;
};

export type Especie = {
  id: string;
  nombreComun: string;
  nombreCientifico: string;
  familia: string;
  tipo: TipoEspecie;
  toxicidad: Toxicidad;
  luz: string;
  waterFreqDays: number;
  waterNotes: string;
  tipoFertilizante: string;
  diasFrecuenciaFertilizante: number;
  temporadaFertilizante: string;
  suelo: string;
  humedad: string;
  tempMinC: number;
  tempMaxC: number;
  podarCuando: string;
  trasplantarCuando: string;
  moonAffinity: AfinidadesLunares;
  plagasComunes: string[];
  consejosCuidado: string[];
  problemas: ProblemaEspecie[];
};

export type Plaga = {
  id: string;
  nombre: string;
  signos: string[];
  temporada: string;
  tratamientosOrganicos: string[];
  tratamientosQuimicos: string[];
  prevencion: string;
  tiposRelacionados: TipoEspecie[];
};

export type EntradaBitacora = {
  id: string;
  plantaId?: string;
  fechaIso: string;
  tipo:
    | "riego"
    | "fertilizante"
    | "poda"
    | "trasplante"
    | "plaga"
    | "observacion"
    | "cosecha"
    | "otro";
  titulo: string;
  nota: string;
  fotoDataUrl?: string;
};

export type Planta = {
  id: string;
  especieId: string;
  apodo: string;
  nombrePropio?: string;
  ubicacion: UbicacionPlanta;
  tamanoMaceta: TamanoMaceta;
  fechaAdquisicion: string;
  fotoDataUrl?: string;
  ultimoRiego?: string;
  ultimoFertilizante?: string;
  ultimaPoda?: string;
  intervaloRiegoAprendido?: number;
  notasPersonales: string;
  creadaEn: string;
};

export type Conocimiento = {
  id: string;
  especieId?: string;
  plantaId?: string;
  titulo: string;
  cuerpo: string;
  actualizadoEn: string;
};

export type FichaAutor = {
  especieId: string;
  cuerpo: string;
  fuentes: string;
  actualizadoEn: string;
};

export type ArchivoAutor = {
  id: string;
  nombre: string;
  tipo: string;
  texto?: string;
  url?: string;
  especieIds: string[];
  creadoEn: string;
};

export type VentaEspecie = {
  especieId: string;
  precio: string;
  nota: string;
  foto?: string;
};

export type OfertaVenta = {
  id: string;
  plantaId?: string | null;
  titulo: string;
  detalle: string;
  precio: string;
  pagoUrl: string;
  foto?: string | null;
  actualizadoEn: string;
};

export type AjustesApp = {
  nombreMostrar: string;
  demoPro: boolean;
  recordatoriosActivos: boolean;
  ciudad: string;
  codigoJardin: string;
  syncEn?: string;
  modoAutor: boolean;
  claveAcceso: string;
  codigoActualizacion: string;
  codigoPublicacion: string;
  packEn?: string;
  enlacePago: string;
  claveSelectiva: string;
  correoCliente: string;
  paisCliente: string;
  telefonoCliente: string;
  clienteListo: boolean;
};

export type EstadoJardin = {
  plantas: Planta[];
  bitacora: EntradaBitacora[];
  conocimiento: Conocimiento[];
  fichasAutor: FichaAutor[];
  ajustes: AjustesApp;
};


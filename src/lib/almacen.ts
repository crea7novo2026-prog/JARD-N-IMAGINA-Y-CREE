import { create } from "zustand";
import { persist } from "zustand/middleware";
import { aprenderIntervalo } from "./cuidados";
import { setCatalogoOverlay } from "./catalogo-especies";
import type {
  AjustesApp,
  ArchivoAutor,
  Conocimiento,
  EntradaBitacora,
  Especie,
  FichaAutor,
  OfertaVenta,
  Planta,
  VentaEspecie,
} from "./tipos";
import { uid } from "./utils";

const LIMITE_GRATIS = 15;

type CopiaJardin = {
  version: number;
  exportadoEn: string;
  plantas: Planta[];
  bitacora: EntradaBitacora[];
  conocimiento: Conocimiento[];
  fichasAutor: FichaAutor[];
  catalogoExtra: Especie[];
  catalogoOcultos: string[];
  vitrina: OfertaVenta[];
  archivosAutor: ArchivoAutor[];
  ventasEspecie: VentaEspecie[];
  ajustes: AjustesApp;
};

type Estado = {
  listo: boolean;
  plantas: Planta[];
  bitacora: EntradaBitacora[];
  conocimiento: Conocimiento[];
  fichasAutor: FichaAutor[];
  catalogoExtra: Especie[];
  catalogoOcultos: string[];
  vitrina: OfertaVenta[];
  archivosAutor: ArchivoAutor[];
  ventasEspecie: VentaEspecie[];
  ajustes: AjustesApp;
  hidratar: () => void;
  esPro: () => boolean;
  puedeAgregar: () => boolean;
  agregarPlanta: (
    p: Omit<Planta, "id" | "creadaEn" | "notasPersonales"> & { notasPersonales?: string },
  ) => Planta | null;
  actualizarPlanta: (id: string, parche: Partial<Planta>) => void;
  borrarPlanta: (id: string) => void;
  registrar: (e: Omit<EntradaBitacora, "id">) => void;
  borrarEntrada: (id: string) => void;
  guardarConocimiento: (c: Omit<Conocimiento, "id" | "actualizadoEn"> & { id?: string }) => void;
  borrarConocimiento: (id: string) => void;
  guardarFichaAutor: (f: FichaAutor) => void;
  guardarEspecieCatalogo: (e: Especie) => void;
  quitarEspecieCatalogo: (id: string) => void;
  restaurarEspecieCatalogo: (id: string) => void;
  setVitrina: (lista: OfertaVenta[]) => void;
  guardarOfertaVitrina: (o: OfertaVenta) => void;
  guardarArchivoAutor: (a: ArchivoAutor) => void;
  borrarArchivoAutor: (id: string) => void;
  guardarVentaEspecie: (v: VentaEspecie) => void;
  aplicarPaqueteAutor: (
    fichas: FichaAutor[],
    notas?: Conocimiento[],
    extra?: Especie[],
    ocultos?: string[],
  ) => void;
  asegurarCodigoPublicacion: () => string;
  setAjustes: (parche: Partial<AjustesApp>) => void;
  activarDemoPro: () => void;
  asegurarCodigo: () => string;
  exportarJson: () => string;
  importarJson: (texto: string) => { ok: boolean; error?: string };
  aplicarCopia: (data: Partial<CopiaJardin>, conservarFotosLocales?: boolean) => void;
  copiaParaNube: () => CopiaJardin;
};

const ajustesIniciales: AjustesApp = {
  nombreMostrar: "",
  demoPro: false,
  recordatoriosActivos: true,
  ciudad: "Managua",
  codigoJardin: "",
  modoAutor: false,
  claveAcceso: "LUNA-DIARIO",
  codigoActualizacion: "",
  codigoPublicacion: "",
  enlacePago: "",
  claveSelectiva: "",
  correoCliente: "",
  paisCliente: "505",
  telefonoCliente: "",
  clienteListo: false,
};

export function codigoNuevo(): string {
  const cuerpo = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `LUNA-${cuerpo}`;
}

function aplicarOverlay(extra: Especie[], ocultos: string[]) {
  setCatalogoOverlay({ extra, ocultos });
}

export const useJardin = create<Estado>()(
  persist(
    (set, get) => ({
      listo: false,
      plantas: [],
      bitacora: [],
      conocimiento: [],
      fichasAutor: [],
      catalogoExtra: [],
      catalogoOcultos: [],
      vitrina: [],
      archivosAutor: [],
      ventasEspecie: [],
      ajustes: ajustesIniciales,
      hidratar: () => {
        const s = get();
        aplicarOverlay(s.catalogoExtra, s.catalogoOcultos);
        set({ listo: true });
      },
      esPro: () => get().ajustes.demoPro,
      puedeAgregar: () => get().ajustes.demoPro || get().plantas.length < LIMITE_GRATIS,
      agregarPlanta: (datos) => {
        if (!get().puedeAgregar()) return null;
        const planta: Planta = {
          notasPersonales: "",
          ...datos,
          id: uid("pl"),
          creadaEn: new Date().toISOString(),
        };
        set({ plantas: [planta, ...get().plantas] });
        return planta;
      },
      actualizarPlanta: (id, parche) => {
        set({
          plantas: get().plantas.map((p) => (p.id === id ? { ...p, ...parche } : p)),
        });
      },
      borrarPlanta: (id) => {
        set({
          plantas: get().plantas.filter((p) => p.id !== id),
          bitacora: get().bitacora.filter((b) => b.plantaId !== id),
          conocimiento: get().conocimiento.filter((c) => c.plantaId !== id),
        });
      },
      registrar: (e) => {
        const entrada: EntradaBitacora = { ...e, id: uid("bt") };
        const bitacora = [entrada, ...get().bitacora];
        const plantas = get().plantas.map((p) => {
          if (p.id !== e.plantaId) return p;
          const next = { ...p };
          if (e.tipo === "riego") {
            next.ultimoRiego = e.fechaIso;
            next.intervaloRiegoAprendido = aprenderIntervalo(next, bitacora);
          }
          if (e.tipo === "fertilizante") next.ultimoFertilizante = e.fechaIso;
          if (e.tipo === "poda") next.ultimaPoda = e.fechaIso;
          return next;
        });
        set({ bitacora, plantas });
      },
      borrarEntrada: (id) => set({ bitacora: get().bitacora.filter((b) => b.id !== id) }),
      guardarConocimiento: (c) => {
        const ahora = new Date().toISOString();
        const lista = get().conocimiento;
        if (c.id) {
          set({
            conocimiento: lista.map((x) =>
              x.id === c.id ? { ...x, ...c, actualizadoEn: ahora } : x,
            ),
          });
          return;
        }
        set({
          conocimiento: [
            { ...c, id: uid("cn"), actualizadoEn: ahora },
            ...lista,
          ],
        });
      },
      borrarConocimiento: (id) =>
        set({ conocimiento: get().conocimiento.filter((c) => c.id !== id) }),
      guardarFichaAutor: (f) => {
        const lista = get().fichasAutor.filter((x) => x.especieId !== f.especieId);
        set({ fichasAutor: [{ ...f, actualizadoEn: new Date().toISOString() }, ...lista] });
      },
      guardarEspecieCatalogo: (e) => {
        const extra = [e, ...get().catalogoExtra.filter((x) => x.id !== e.id)];
        const ocultos = get().catalogoOcultos.filter((id) => id !== e.id);
        aplicarOverlay(extra, ocultos);
        set({ catalogoExtra: extra, catalogoOcultos: ocultos });
      },
      quitarEspecieCatalogo: (id) => {
        const extra = get().catalogoExtra.filter((x) => x.id !== id);
        const ocultos = [...new Set([...get().catalogoOcultos, id])];
        aplicarOverlay(extra, ocultos);
        set({ catalogoExtra: extra, catalogoOcultos: ocultos });
      },
      restaurarEspecieCatalogo: (id) => {
        const ocultos = get().catalogoOcultos.filter((x) => x !== id);
        aplicarOverlay(get().catalogoExtra, ocultos);
        set({ catalogoOcultos: ocultos });
      },
      setVitrina: (lista) => set({ vitrina: lista }),
      guardarOfertaVitrina: (o) =>
        set({ vitrina: [o, ...get().vitrina.filter((x) => x.id !== o.id)] }),
      guardarArchivoAutor: (a) =>
        set({ archivosAutor: [a, ...get().archivosAutor.filter((x) => x.id !== a.id)] }),
      borrarArchivoAutor: (id) =>
        set({ archivosAutor: get().archivosAutor.filter((x) => x.id !== id) }),
      guardarVentaEspecie: (v) =>
        set({
          ventasEspecie: [v, ...get().ventasEspecie.filter((x) => x.especieId !== v.especieId)],
        }),
      aplicarPaqueteAutor: (fichas, notas, extra, ocultos) => {
        const mapa = new Map(get().fichasAutor.map((x) => [x.especieId, x]));
        for (const f of fichas) {
          const local = mapa.get(f.especieId);
          if (!local || (f.actualizadoEn && f.actualizadoEn >= (local.actualizadoEn ?? ""))) {
            mapa.set(f.especieId, f);
          }
        }
        const catalogoExtra = extra ?? get().catalogoExtra;
        const catalogoOcultos = ocultos ?? get().catalogoOcultos;
        aplicarOverlay(catalogoExtra, catalogoOcultos);
        set({
          fichasAutor: [...mapa.values()],
          conocimiento: notas?.length ? notas : get().conocimiento,
          catalogoExtra,
          catalogoOcultos,
        });
      },
      asegurarCodigoPublicacion: () => {
        const actual = get().ajustes.codigoPublicacion;
        if (actual) return actual;
        const codigo = `AUT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
        set({ ajustes: { ...get().ajustes, codigoPublicacion: codigo } });
        return codigo;
      },
      setAjustes: (parche) => set({ ajustes: { ...get().ajustes, ...parche } }),
      activarDemoPro: () => set({ ajustes: { ...get().ajustes, demoPro: true } }),
      asegurarCodigo: () => {
        const actual = get().ajustes.codigoJardin;
        if (actual) return actual;
        const codigo = codigoNuevo();
        set({ ajustes: { ...get().ajustes, codigoJardin: codigo } });
        return codigo;
      },
      exportarJson: () => JSON.stringify(get().copiaParaNube(), null, 2),
      copiaParaNube: () => ({
        version: 2,
        exportadoEn: new Date().toISOString(),
        plantas: get().plantas,
        bitacora: get().bitacora,
        conocimiento: get().conocimiento,
        fichasAutor: get().fichasAutor,
        catalogoExtra: get().catalogoExtra,
        catalogoOcultos: get().catalogoOcultos,
        vitrina: get().vitrina,
        archivosAutor: get().archivosAutor,
        ventasEspecie: get().ventasEspecie,
        ajustes: get().ajustes,
      }),
      aplicarCopia: (data, conservarFotosLocales = true) => {
        if (!Array.isArray(data.plantas) || !Array.isArray(data.bitacora)) return;
        const locales = get().plantas;
        const fotos = new Map(locales.map((p) => [p.id, p.fotoDataUrl]));
        const plantas = data.plantas.map((p) => ({
          ...p,
          fotoDataUrl:
            p.fotoDataUrl || (conservarFotosLocales ? fotos.get(p.id) : undefined),
        }));
        const extra = Array.isArray(data.catalogoExtra) ? data.catalogoExtra : get().catalogoExtra;
        const ocultos = Array.isArray(data.catalogoOcultos) ? data.catalogoOcultos : get().catalogoOcultos;
        aplicarOverlay(extra, ocultos);
        set({
          plantas,
          bitacora: data.bitacora,
          conocimiento: Array.isArray(data.conocimiento) ? data.conocimiento : get().conocimiento,
          fichasAutor: Array.isArray(data.fichasAutor) ? data.fichasAutor : get().fichasAutor,
          catalogoExtra: extra,
          catalogoOcultos: ocultos,
          vitrina: Array.isArray(data.vitrina) ? data.vitrina : get().vitrina,
          archivosAutor: Array.isArray(data.archivosAutor) ? data.archivosAutor : get().archivosAutor,
          ventasEspecie: Array.isArray(data.ventasEspecie) ? data.ventasEspecie : get().ventasEspecie,
          ajustes: { ...ajustesIniciales, ...get().ajustes, ...data.ajustes },
        });
      },
      importarJson: (texto) => {
        try {
          const data = JSON.parse(texto) as Partial<CopiaJardin>;
          if (!Array.isArray(data.plantas) || !Array.isArray(data.bitacora)) {
            return { ok: false, error: "El archivo no parece una copia del Diario y Luna." };
          }
          get().aplicarCopia(data, true);
          return { ok: true };
        } catch {
          return { ok: false, error: "JSON ilegible." };
        }
      },
    }),
    {
      name: "lunaplantar-v1",
      partialize: (s) => ({
        plantas: s.plantas,
        bitacora: s.bitacora,
        conocimiento: s.conocimiento,
        fichasAutor: s.fichasAutor,
        catalogoExtra: s.catalogoExtra,
        catalogoOcultos: s.catalogoOcultos,
        vitrina: s.vitrina,
        archivosAutor: s.archivosAutor,
        ventasEspecie: s.ventasEspecie,
        ajustes: s.ajustes,
      }),
      onRehydrateStorage: () => (estado) => {
        estado?.hidratar();
      },
      merge: (persistido, actual) => {
        const p = (persistido ?? {}) as Partial<Estado>;
        return {
          ...actual,
          ...p,
          conocimiento: p.conocimiento ?? actual.conocimiento,
          fichasAutor: p.fichasAutor ?? actual.fichasAutor,
          catalogoExtra: p.catalogoExtra ?? actual.catalogoExtra,
          catalogoOcultos: p.catalogoOcultos ?? actual.catalogoOcultos,
          vitrina: p.vitrina ?? actual.vitrina,
          archivosAutor: p.archivosAutor ?? actual.archivosAutor,
          ventasEspecie: p.ventasEspecie ?? actual.ventasEspecie,
          ajustes: { ...ajustesIniciales, ...actual.ajustes, ...p.ajustes },
        };
      },
    },
  ),
);

export { LIMITE_GRATIS };

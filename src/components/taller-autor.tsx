import { useMemo, useState } from "react";
import {
  buscarEspecies,
  catalogoEfectivo,
  especieEnBlanco,
  especiePorId,
} from "@/lib/catalogo-especies";
import { useJardin } from "@/lib/almacen";
import { BaseAutor } from "@/components/base-autor";
import { ListaClientes } from "@/components/lista-clientes";
import { CLAVE_AUTOR_DEFECTO, CORREO_AUTOR } from "@/lib/marca";
import { mailtoCambioClave } from "@/lib/pdf-clientes";
import { publicarJardin } from "@/lib/servidor/sincronizar";
import type { TipoEspecie } from "@/lib/tipos";

export function TallerAutor() {
  const clave = useJardin((s) => s.ajustes.claveAcceso || CLAVE_AUTOR_DEFECTO);
  const setAjustes = useJardin((s) => s.setAjustes);
  const fichas = useJardin((s) => s.fichasAutor);
  const guardar = useJardin((s) => s.guardarFichaAutor);
  const conocimiento = useJardin((s) => s.conocimiento);
  const asegurar = useJardin((s) => s.asegurarCodigoPublicacion);
  const codigo = useJardin((s) => s.ajustes.codigoPublicacion);
  const claveSelectiva = useJardin((s) => s.ajustes.claveSelectiva);
  const enlacePago = useJardin((s) => s.ajustes.enlacePago);
  const [paso, setPaso] = useState("");
  const [ok, setOk] = useState(false);
  const [nuevaClave, setNuevaClave] = useState("");
  const [q, setQ] = useState("");
  const [especieId, setEspecieId] = useState<string>();
  const [cuerpo, setCuerpo] = useState("");
  const [fuentes, setFuentes] = useState("");
  const [msg, setMsg] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [altaComun, setAltaComun] = useState("");
  const [altaCientifico, setAltaCientifico] = useState("");
  const [altaTipo, setAltaTipo] = useState<TipoEspecie>("interior");
  const [altaRiego, setAltaRiego] = useState("7");
  const [altaNotas, setAltaNotas] = useState("");
  const guardarEsp = useJardin((s) => s.guardarEspecieCatalogo);
  const quitarEsp = useJardin((s) => s.quitarEspecieCatalogo);
  const restaurarEsp = useJardin((s) => s.restaurarEspecieCatalogo);
  const extra = useJardin((s) => s.catalogoExtra);
  const ocultos = useJardin((s) => s.catalogoOcultos);
  const vivo = catalogoEfectivo();

  const lista = useMemo(() => buscarEspecies(q).slice(0, 20), [q]);
  const especie = especieId ? especiePorId(especieId) : undefined;

  function abrir() {
    if (paso.trim() !== clave) {
      setMsg("Clave incorrecta. Solo el autor entra aquí.");
      return;
    }
    setOk(true);
    setAjustes({ modoAutor: true });
    setMsg("");
  }

  function elegir(id: string) {
    setEspecieId(id);
    const ya = useJardin.getState().fichasAutor.find((x) => x.especieId === id);
    setCuerpo(ya?.cuerpo ?? "");
    setFuentes(ya?.fuentes ?? "");
  }

  async function publicar() {
    setOcupado(true);
    const cod = asegurar();
    const packEn = new Date().toISOString();
    setAjustes({ packEn });
    const st = useJardin.getState();
    const carga = JSON.stringify({
      tipo: "paquete-autor",
      exportadoEn: packEn,
      fichasAutor: st.fichasAutor,
      conocimiento: st.conocimiento,
      catalogoExtra: st.catalogoExtra,
      catalogoOcultos: st.catalogoOcultos,
      vitrina: st.vitrina,
      ventasEspecie: st.ventasEspecie,
      archivosAutor: st.archivosAutor.map((a) => ({ ...a, url: a.tipo === "enlace" ? a.url : undefined })),
    });
    const destinos = [cod, st.ajustes.claveSelectiva, "ABBA-ROSEUS"].filter(Boolean) as string[];
    let okNube = false;
    for (const d of destinos) {
      const r = await publicarJardin({ data: { codigo: d, carga } });
      if (r.ok) okNube = true;
    }
    setOcupado(false);
    setMsg(
      okNube
        ? "Actualización enviada a todos los enlaces y claves que compartiste. Quien recargue la ve."
        : "Sin red. Quedó en este aparato; vuelve a publicar cuando haya internet.",
    );
  }

  if (!ok) {
    return (
      <main className="px-5 pb-8 pt-8">
        <p className="text-xs uppercase tracking-[0.16em] text-silenciado">Solo el autor</p>
        <h1 className="mt-1 text-2xl font-semibold">Taller de investigación</h1>
        <p className="mt-2 text-sm text-silenciado">
          Mantenimiento de la app. Solo entra con tu clave. Lo que publiques aquí es lo que ven los clientes
          en las otras ventanas.
        </p>
        <input
          value={paso}
          onChange={(e) => setPaso(e.target.value)}
          type="password"
          placeholder="Clave de autor"
          className="mt-5 h-12 w-full rounded-lg bg-superficie px-3 font-mono text-sm outline-none"
        />
        <button type="button" onClick={abrir} className="mt-3 h-12 w-full rounded-lg bg-luna text-sm font-semibold text-fondo">
          Entrar al taller
        </button>
        <a
          href={mailtoCambioClave()}
          className="mt-3 flex h-11 items-center justify-center rounded-lg bg-superficie text-sm"
        >
          Pedir cambio de clave por correo
        </a>
        {msg && <p className="mt-3 text-sm text-alerta">{msg}</p>}
      </main>
    );
  }

  return (
    <main className="px-5 pb-10 pt-8">
      <p className="text-xs uppercase tracking-[0.16em] text-luna">Taller del autor</p>
      <h1 className="mt-1 text-2xl font-semibold">Alimentar el diario</h1>
      <p className="mt-2 text-sm text-silenciado">
        Lo que escribas se guarda en este aparato (sirve sin internet). Al publicar, las apps con tu código
        de actualización lo reciben al unísono cuando hay red.
      </p>

      <section className="mt-5 rounded-xl bg-superficie p-4">
        <p className="text-sm font-medium">Código de actualización</p>
        <p className="mt-2 font-mono text-xl text-luna">{codigo || "Se crea al publicar"}</p>
        <p className="mt-2 text-xs text-silenciado">Ese código se lo das a quien te compró la app.</p>
        <button
          type="button"
          disabled={ocupado}
          onClick={() => void publicar()}
          className="mt-3 h-12 w-full rounded-lg bg-luna text-sm font-semibold text-fondo disabled:opacity-60"
        >
          Publicar y actualizar todos los enlaces
        </button>
      </section>

      <BaseAutor />
      <ListaClientes />

      <section className="mt-5 rounded-xl bg-superficie p-4">
        <p className="text-sm font-medium">Claves que solo tú ves</p>
        <p className="mt-1 text-xs text-silenciado">
          No salen en Ajustes del cliente. Generas una y se la das a quien elijas.
        </p>
        <p className="mt-3 text-xs text-silenciado">Cambiar clave de autor en este aparato</p>
        <input
          value={nuevaClave}
          onChange={(e) => setNuevaClave(e.target.value)}
          type="password"
          placeholder="Nueva clave (mínimo 6 caracteres)"
          className="mt-1 h-11 w-full rounded-lg bg-superficie-2 px-3 font-mono text-sm outline-none"
        />
        <button
          type="button"
          className="mt-2 h-11 w-full rounded-lg bg-superficie-2 text-sm"
          onClick={() => {
            if (nuevaClave.trim().length < 6) {
              setMsg("La clave nueva debe tener al menos 6 caracteres.");
              return;
            }
            setAjustes({ claveAcceso: nuevaClave.trim() });
            setNuevaClave("");
            setMsg("Clave de autor actualizada en este aparato.");
          }}
        >
          Guardar clave nueva
        </button>
        <a
          href={mailtoCambioClave()}
          className="mt-2 flex h-11 items-center justify-center rounded-lg bg-superficie-2 text-sm"
        >
          Avisar el cambio a {CORREO_AUTOR}
        </a>
        <p className="mt-3 text-xs text-silenciado">Clave selectiva para clientes</p>
        <p className="font-mono text-lg text-luna">{claveSelectiva || "Aún no hay"}</p>
        <button
          type="button"
          className="mt-2 h-11 w-full rounded-lg bg-superficie-2 text-sm"
          onClick={() => {
            const nueva = `SEL-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
            setAjustes({ claveSelectiva: nueva });
            setMsg(`Clave para compartir en privado: ${nueva}`);
          }}
        >
          Generar clave para una persona
        </button>
        <label className="mt-3 block text-xs text-silenciado">
          Enlace de cobro (PayPal)
          <input
            value={enlacePago}
            onChange={(e) => setAjustes({ enlacePago: e.target.value.trim() })}
            placeholder="https://paypal.me/tuusuario"
            className="mt-1 h-11 w-full rounded-lg bg-superficie-2 px-3 text-sm outline-none"
          />
        </label>
      </section>

      <section className="mt-5 space-y-3 rounded-xl bg-superficie p-4">
        <h2 className="text-base font-semibold">Catálogo de referencia</h2>
        <p className="text-xs text-silenciado">
          Agrega o quita especies cuando quieras. Queda en este aparato (sirve sin red). Publica para que las
          apps con tu código AUT-… lo reciban.
        </p>
        <p className="text-xs text-silenciado">
          Vivas: {vivo.length} · Añadidas por ti: {extra.length} · Ocultas: {ocultos.length}
        </p>
        <input
          value={altaComun}
          onChange={(e) => setAltaComun(e.target.value)}
          placeholder="Nombre común (ej. Guanábana)"
          className="h-11 w-full rounded-lg bg-superficie-2 px-3 text-sm outline-none"
        />
        <input
          value={altaCientifico}
          onChange={(e) => setAltaCientifico(e.target.value)}
          placeholder="Nombre científico (opcional)"
          className="h-11 w-full rounded-lg bg-superficie-2 px-3 text-sm outline-none"
        />
        <div className="grid grid-cols-2 gap-2">
          <select
            value={altaTipo}
            onChange={(e) => setAltaTipo(e.target.value as TipoEspecie)}
            className="h-11 rounded-lg bg-superficie-2 px-2 text-sm"
          >
            {(["interior", "huerto", "flor", "suculenta", "arbol", "exterior"] as TipoEspecie[]).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <input
            value={altaRiego}
            onChange={(e) => setAltaRiego(e.target.value)}
            inputMode="numeric"
            placeholder="Días entre riegos"
            className="h-11 rounded-lg bg-superficie-2 px-3 text-sm outline-none"
          />
        </div>
        <textarea
          value={altaNotas}
          onChange={(e) => setAltaNotas(e.target.value)}
          placeholder="Notas de riego y cuidado de referencia"
          className="min-h-20 w-full rounded-lg bg-superficie-2 p-3 text-sm outline-none"
        />
        <button
          type="button"
          className="h-12 w-full rounded-lg bg-luna text-sm font-semibold text-fondo"
          onClick={() => {
            if (!altaComun.trim()) {
              setMsg("Pon al menos el nombre común.");
              return;
            }
            const base = especieEnBlanco({
              nombreComun: altaComun.trim(),
              nombreCientifico: altaCientifico.trim() || undefined,
            });
            guardarEsp({
              ...base,
              tipo: altaTipo,
              waterFreqDays: Math.max(2, Number(altaRiego) || 7),
              waterNotes: altaNotas.trim() || base.waterNotes,
            });
            setAltaComun("");
            setAltaCientifico("");
            setAltaNotas("");
            setMsg("Especie agregada al catálogo. Publica para enviarla a los clientes.");
          }}
        >
          Agregar especie al catálogo
        </button>

        <ul className="max-h-64 space-y-2 overflow-auto">
          {buscarEspecies(q).slice(0, 40).map((e) => (
            <li key={e.id} className="flex items-center justify-between gap-2 rounded-lg bg-superficie-2 px-3 py-2">
              <button type="button" className="min-w-0 text-left text-xs" onClick={() => elegir(e.id)}>
                <span className="block font-medium">{e.nombreComun}</span>
                <span className="block italic text-silenciado">{e.nombreCientifico}</span>
              </button>
              <button
                type="button"
                className="shrink-0 text-xs text-alerta"
                onClick={() => {
                  quitarEsp(e.id);
                  setMsg(`Quitada del catálogo: ${e.nombreComun}`);
                }}
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
        {ocultos.length > 0 && (
          <div>
            <p className="text-xs font-medium">Ocultas (se pueden devolver)</p>
            <ul className="mt-2 space-y-1">
              {ocultos.map((id) => (
                <li key={id} className="flex items-center justify-between text-xs">
                  <span>{id}</span>
                  <button type="button" className="text-luna" onClick={() => restaurarEsp(id)}>
                    Restaurar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar especie a documentar"
        className="mt-5 h-12 w-full rounded-lg bg-superficie px-3 text-sm outline-none"
      />
      <div className="mt-3 grid grid-cols-2 gap-2">
        {lista.map((e) => (
          <button
            key={e.id}
            type="button"
            onClick={() => elegir(e.id)}
            className={`rounded-lg px-3 py-2 text-left text-xs ${
              especieId === e.id ? "bg-luna text-fondo" : "bg-superficie"
            }`}
          >
            {e.nombreComun}
          </button>
        ))}
      </div>

      {especie && (
        <section className="mt-5 space-y-2">
          <h2 className="text-base font-semibold">{especie.nombreComun}</h2>
          <p className="text-xs italic text-silenciado">{especie.nombreCientifico}</p>
          <textarea
            value={cuerpo}
            onChange={(e) => setCuerpo(e.target.value)}
            placeholder="Tu investigación: riego real, suelo, luna, plaga vista hoy…"
            className="min-h-36 w-full rounded-xl bg-superficie p-3 text-sm outline-none"
          />
          <input
            value={fuentes}
            onChange={(e) => setFuentes(e.target.value)}
            placeholder="De dónde lo sacaste (Google, vivero, libro, patio)"
            className="h-11 w-full rounded-lg bg-superficie px-3 text-sm outline-none"
          />
          <button
            type="button"
            className="h-12 w-full rounded-lg bg-superficie-2 text-sm font-medium"
            onClick={() => {
              guardar({
                especieId: especie.id,
                cuerpo: cuerpo.trim(),
                fuentes: fuentes.trim(),
                actualizadoEn: new Date().toISOString(),
              });
              setMsg("Guardado en el aparato. Publica para que llegue a los clientes.");
            }}
          >
            Guardar en este aparato
          </button>
        </section>
      )}

      {fichas.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-semibold">Ya documentadas ({fichas.length})</h2>
          <ul className="mt-2 space-y-2">
            {fichas.slice(0, 30).map((f) => (
              <li key={f.especieId} className="rounded-lg bg-superficie p-3 text-sm">
                <p className="font-medium">{especiePorId(f.especieId)?.nombreComun ?? f.especieId}</p>
                <p className="line-clamp-3 text-xs text-silenciado">{f.cuerpo}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
      <p className="mt-4 text-xs text-silenciado">{conocimiento.length} notas de comunidad también viajan en el paquete.</p>
      {msg && <p className="mt-3 text-sm text-ok">{msg}</p>}
    </main>
  );
}

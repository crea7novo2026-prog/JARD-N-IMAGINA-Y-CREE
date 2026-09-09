import { Camera, Images } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useJardin } from "@/lib/almacen";
import { especiePorId } from "@/lib/catalogo-especies";
import { comprimirFoto } from "@/lib/foto";
import { CLAVE_AUTOR_DEFECTO, SALA_VIVERO, VIVERO_NOMBRE, WHATSAPP_VENTA_URL, enlaceWhatsAppPedido } from "@/lib/marca";
import { listarOfertas, publicarOferta, retirarOferta } from "@/lib/servidor/comunidad";
import { publicarJardin } from "@/lib/servidor/sincronizar";
import { hacerPedido, listarPedidos, marcarPedido } from "@/lib/servidor/vivero";
import { MarcadorFoto } from "./marcador-foto";

type Oferta = {
  id: string;
  planta_id: string | null;
  titulo: string;
  detalle: string;
  precio: string;
  pago_url: string;
  foto?: string | null;
};
type Pedido = {
  id: string;
  oferta_id: string;
  titulo: string;
  cliente: string;
  contacto: string;
  cantidad: number;
  nota: string;
  cuando: string;
  estado: string;
};

export function PantallaVivero() {
  const setAjustes = useJardin((s) => s.setAjustes);
  const guardarOferta = useJardin((s) => s.guardarOfertaVitrina);
  const vitrinaRemota = useJardin((s) => s.vitrina);
  const ajustes = useJardin((s) => s.ajustes);
  const plantas = useJardin((s) => s.plantas);
  const sala = SALA_VIVERO;
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [aviso, setAviso] = useState("");
  const [mostrarAlta, setMostrarAlta] = useState(false);
  const [republicando, setRepublicando] = useState(false);
  const [claveAlta, setClaveAlta] = useState("");
  const [autorOk, setAutorOk] = useState(false);
  const [precio, setPrecio] = useState("");
  const [tituloLibre, setTituloLibre] = useState("");
  const [plantaId, setPlantaId] = useState(plantas[0]?.id ?? "");
  const [fotoNueva, setFotoNueva] = useState<string>();
  const [elegida, setElegida] = useState<Oferta | null>(null);
  const [cliente, setCliente] = useState(ajustes.nombreMostrar);
  const [contacto, setContacto] = useState("");
  const [cantidad, setCantidad] = useState("1");
  const [cuando, setCuando] = useState("");
  const [nota, setNota] = useState("");
  const fotoRef = useRef<HTMLInputElement>(null);
  const archivoRef = useRef<HTMLInputElement>(null);

  async function ponerFoto(f?: File) {
    if (!f) return;
    setFotoNueva(await comprimirFoto(f));
  }

  const vitrina = [
    ...vitrinaRemota.map((o) => ({
      id: o.id,
      planta_id: o.plantaId ?? null,
      titulo: o.titulo,
      detalle: o.detalle,
      precio: o.precio,
      pago_url: o.pagoUrl,
      foto: o.foto,
    })),
    ...ofertas.filter((o) => !vitrinaRemota.some((x) => x.id === o.id)),
  ];

  async function cargar() {
    if (!sala) return;
    try {
      const [o, p] = await Promise.all([
        listarOfertas({ data: { sala } }),
        listarPedidos({ data: { sala } }),
      ]);
      if (o.ok) setOfertas(o.items);
      if (p.ok) setPedidos(p.items);
    } catch {
      setAviso("Sin red. El vivero vuelve al reconectar.");
    }
  }

  useEffect(() => {
    void cargar();
    const id = window.setInterval(() => void cargar(), 5000);
    return () => window.clearInterval(id);
  }, [sala]);

  const mias = useMemo(
    () =>
      plantas.map((p) => ({
        id: p.id,
        etiqueta: `${p.nombrePropio || p.apodo} · ${especiePorId(p.especieId)?.nombreComun ?? ""}`,
      })),
    [plantas],
  );

  const plantaSel = plantas.find((x) => x.id === plantaId);

  async function volverAPublicar() {
    setRepublicando(true);
    const lista = useJardin.getState().vitrina;
    const carga = JSON.stringify({
      tipo: "vitrina",
      exportadoEn: new Date().toISOString(),
      ofertas: lista,
    });
    const nube = await publicarJardin({ data: { codigo: SALA_VIVERO, carga } });
    const sel = useJardin.getState().ajustes.claveSelectiva;
    if (sel) await publicarJardin({ data: { codigo: sel, carga } });
    let okTabla = 0;
    for (const o of lista) {
      const r = await publicarOferta({
        data: {
          sala: SALA_VIVERO,
          id: o.id,
          plantaId: o.plantaId ?? undefined,
          titulo: o.titulo,
          detalle: o.detalle,
          precio: o.precio,
          pagoUrl: o.pagoUrl || ajustes.enlacePago,
          foto: o.foto ?? undefined,
          claveAutor: CLAVE_AUTOR_DEFECTO,
        },
      });
      if (r.ok) okTabla += 1;
    }
    setRepublicando(false);
    setAviso(
      nube.ok
        ? `Ofertas en el aire. ${okTabla} planta(s) llegarán a todos los enlaces al recargar.`
        : (nube.error ?? "No se pudo publicar. Revisa la red."),
    );
    void cargar();
  }

  return (
    <main className="px-5 pb-10 pt-8">
      <p className="text-xs uppercase tracking-[0.16em] text-luna">Para todos los clientes</p>
      <h1 className="mt-1 font-serif text-3xl leading-tight text-luna">{VIVERO_NOMBRE}</h1>
      <p className="mt-2 text-sm text-silenciado">
        Estas son las plantas que el vivero tiene en oferta ahora. Sin clave. Toca Quiero comprarla.
      </p>

      {autorOk ? (
        <div className="mt-5 space-y-2">
          <button
            type="button"
            className="flex h-14 w-full items-center justify-center rounded-xl bg-luna text-sm font-semibold text-fondo"
            onClick={() => setMostrarAlta((v) => !v)}
          >
            Agregar planta
          </button>
          <button
            type="button"
            disabled={republicando}
            className="flex h-12 w-full items-center justify-center rounded-xl bg-superficie text-sm font-medium disabled:opacity-60"
            onClick={() => void volverAPublicar()}
          >
            {republicando ? "Publicando en todos los enlaces…" : "Volver a publicar ofertas"}
          </button>
        </div>
      ) : (
        <section className="mt-5 rounded-xl bg-superficie p-4">
          <p className="text-sm">Publicar es solo del autor</p>
          <input
            value={claveAlta}
            onChange={(e) => setClaveAlta(e.target.value)}
            placeholder="Tu clave de autor"
            className="mt-2 h-11 w-full rounded-lg bg-superficie-2 px-3 font-mono text-sm outline-none"
          />
          <button
            type="button"
            className="mt-2 h-11 w-full rounded-lg bg-superficie-2 text-sm"
            onClick={() => {
              if (claveAlta.trim() !== (ajustes.claveAcceso || CLAVE_AUTOR_DEFECTO) && claveAlta.trim() !== CLAVE_AUTOR_DEFECTO) {
                setAviso("Esa clave no abre la publicación.");
                return;
              }
              setAutorOk(true);
              setAjustes({ modoAutor: true });
              setMostrarAlta(true);
              setAviso("");
            }}
          >
            Soy el autor
          </button>
        </section>
      )}

      {autorOk && mostrarAlta && (
        <section className="mt-3 rounded-xl bg-superficie p-4">
          <h2 className="text-sm font-semibold">Foto y precio de lo que vendes</h2>
          <select
            value={plantaId}
            onChange={(e) => setPlantaId(e.target.value)}
            className="mt-3 h-11 w-full rounded-lg bg-superficie-2 px-2 text-sm"
          >
            <option value="">Planta suelta (solo foto nueva)</option>
            {mias.map((p) => (
              <option key={p.id} value={p.id}>
                {p.etiqueta}
              </option>
            ))}
          </select>
          <input
            value={tituloLibre}
            onChange={(e) => setTituloLibre(e.target.value)}
            placeholder="Nombre en la vitrina"
            className="mt-2 h-11 w-full rounded-lg bg-superficie-2 px-3 text-sm outline-none"
          />
          <input
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Precio (ej. $8)"
            className="mt-2 h-11 w-full rounded-lg bg-superficie-2 px-3 text-sm outline-none"
          />
          <input
            value={ajustes.enlacePago}
            onChange={(e) => setAjustes({ enlacePago: e.target.value.trim() })}
            placeholder="PayPal (opcional) https://paypal.me/…"
            className="mt-2 h-11 w-full rounded-lg bg-superficie-2 px-3 text-sm outline-none"
          />
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              type="button"
              className="flex h-11 items-center justify-center gap-1 rounded-lg bg-superficie-2 text-sm"
              onClick={() => fotoRef.current?.click()}
            >
              <Camera className="size-4" /> Cámara
            </button>
            <button
              type="button"
              className="flex h-11 items-center justify-center gap-1 rounded-lg bg-superficie-2 text-sm"
              onClick={() => archivoRef.current?.click()}
            >
              <Images className="size-4" /> Archivo
            </button>
          </div>
          <input
            ref={fotoRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => void ponerFoto(e.target.files?.[0])}
          />
          <input
            ref={archivoRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => void ponerFoto(e.target.files?.[0])}
          />
          {(fotoNueva || plantaSel?.fotoDataUrl) && (
            <MarcadorFoto
              src={fotoNueva || plantaSel?.fotoDataUrl}
              alt=""
              className="mt-3 max-h-40 w-full rounded-lg"
            />
          )}
          <button
            type="button"
            className="mt-3 h-12 w-full rounded-lg bg-luna text-sm font-semibold text-fondo"
            onClick={async () => {
              const pago = useJardin.getState().ajustes.enlacePago || WHATSAPP_VENTA_URL;
              const titulo =
                tituloLibre.trim() ||
                (plantaSel ? plantaSel.nombrePropio || plantaSel.apodo : "");
              if (!titulo) {
                setAviso("Pon el nombre de la planta.");
                return;
              }
              const r = await publicarOferta({
                data: {
                  sala,
                  plantaId: plantaSel?.id,
                  titulo,
                  detalle: plantaSel ? (especiePorId(plantaSel.especieId)?.nombreCientifico ?? "") : "",
                  precio: precio.trim() || "Consultar",
                  pagoUrl: pago,
                  foto: fotoNueva || plantaSel?.fotoDataUrl,
                  claveAutor: CLAVE_AUTOR_DEFECTO,
                },
              });
              setAviso(r.ok ? "Ya está en Quiero comprarla." : r.error ?? "No se publicó.");
              if (r.ok) {
                const publicada: Oferta = {
                  id: r.id ?? `local_${Date.now()}`,
                  planta_id: plantaSel?.id ?? null,
                  titulo,
                  detalle: plantaSel ? (especiePorId(plantaSel.especieId)?.nombreCientifico ?? "") : "",
                  precio: precio.trim() || "Consultar",
                  pago_url: pago,
                  foto: fotoNueva || plantaSel?.fotoDataUrl,
                };
                setOfertas((prev) => [publicada, ...prev.filter((x) => x.id !== publicada.id)]);
                guardarOferta({
                  id: publicada.id,
                  plantaId: publicada.planta_id,
                  titulo: publicada.titulo,
                  detalle: publicada.detalle,
                  precio: publicada.precio,
                  pagoUrl: publicada.pago_url,
                  foto: publicada.foto,
                  actualizadoEn: new Date().toISOString(),
                });
                const lista = useJardin.getState().vitrina;
                void publicarJardin({
                  data: {
                    codigo: SALA_VIVERO,
                    carga: JSON.stringify({ tipo: "vitrina", exportadoEn: new Date().toISOString(), ofertas: lista }),
                  },
                });
                setElegida(publicada);
                setFotoNueva(undefined);
                setTituloLibre("");
                setMostrarAlta(false);
                void cargar();
              }
            }}
          >
            Publicar en el mosaico
          </button>
        </section>
      )}

      <section className="mt-6">
        <h2 className="text-sm font-semibold">
          Collage · {vitrina.length} planta{vitrina.length === 1 ? "" : "s"} en oferta
        </h2>
        <ul
          className={`mt-3 grid gap-1.5 ${
            vitrina.length >= 13
              ? "grid-cols-4"
              : vitrina.length >= 7
                ? "grid-cols-3"
                : "grid-cols-2"
          }`}
        >
          {vitrina.length === 0 && (
            <li className="col-span-full rounded-xl bg-superficie p-4 text-sm text-silenciado">
              Aún no hay plantas publicadas en oferta.
            </li>
          )}
          {vitrina.map((o) => (
            <li key={o.id} className="overflow-hidden rounded-lg bg-superficie">
              <MarcadorFoto src={o.foto ?? undefined} alt={o.titulo} className="rounded-none" />
              <div className={vitrina.length >= 7 ? "p-2" : "p-3"}>
                <p className="line-clamp-2 text-xs font-medium leading-snug">{o.titulo}</p>
                <p className="mt-0.5 font-serif text-sm text-luna">{o.precio}</p>
                <button
                  type="button"
                  className="mt-1.5 h-9 w-full rounded-md bg-luna text-[11px] font-semibold text-fondo"
                  onClick={() => setElegida(o)}
                >
                  Quiero comprarla
                </button>
                {autorOk && (
                  <button
                    type="button"
                    className="mt-1 w-full text-[11px] text-alerta"
                    onClick={() => {
                      void retirarOferta({
                        data: { id: o.id, sala, claveAutor: CLAVE_AUTOR_DEFECTO },
                      }).then(() => {
                        useJardin.getState().setVitrina(
                          useJardin.getState().vitrina.filter((x) => x.id !== o.id),
                        );
                        setOfertas((prev) => prev.filter((x) => x.id !== o.id));
                        void cargar();
                      });
                    }}
                  >
                    Quitar
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {elegida && (
        <section className="mt-6 rounded-xl border border-luna/30 bg-superficie p-4">
          <h2 className="text-sm font-semibold">Quiero comprarla · {elegida.titulo}</h2>
          <MarcadorFoto src={elegida.foto ?? undefined} alt="" className="mt-3 max-h-44 w-full" />
          <p className="mt-2 font-serif text-xl text-luna">{elegida.precio}</p>
          <input
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            placeholder="Tu nombre"
            className="mt-3 h-11 w-full rounded-lg bg-superficie-2 px-3 text-sm outline-none"
          />
          <input
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
            placeholder="WhatsApp o correo"
            className="mt-2 h-11 w-full rounded-lg bg-superficie-2 px-3 text-sm outline-none"
          />
          <div className="mt-2 grid grid-cols-2 gap-2">
            <input
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              inputMode="numeric"
              placeholder="Cantidad"
              className="h-11 rounded-lg bg-superficie-2 px-3 text-sm outline-none"
            />
            <input
              type="date"
              value={cuando}
              onChange={(e) => setCuando(e.target.value)}
              className="h-11 rounded-lg bg-superficie-2 px-3 text-sm outline-none"
            />
          </div>
          <textarea
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            placeholder="Nota de entrega o horario"
            className="mt-2 min-h-16 w-full rounded-lg bg-superficie-2 p-3 text-sm outline-none"
          />
          <a
            href={enlaceWhatsAppPedido({
              titulo: elegida.titulo,
              precio: elegida.precio,
              cliente,
              cantidad,
              contacto,
              cuando,
              nota,
            })}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex h-12 items-center justify-center rounded-lg bg-luna text-sm font-semibold text-fondo"
          >
            Escribir por WhatsApp
          </a>
          {elegida.pago_url && /paypal|mercadopago|stripe/i.test(elegida.pago_url) && (
            <a
              href={elegida.pago_url}
              target="_blank"
              rel="noreferrer"
              className="mt-2 flex h-11 items-center justify-center rounded-lg bg-superficie-2 text-sm font-medium"
            >
              Pagar por PayPal (opcional)
            </a>
          )}
          <button
            type="button"
            className="mt-2 h-12 w-full rounded-lg bg-luna text-sm font-semibold text-fondo"
            onClick={async () => {
              const r = await hacerPedido({
                data: {
                  sala,
                  ofertaId: elegida.id,
                  titulo: elegida.titulo,
                  cliente,
                  contacto,
                  cantidad: Number(cantidad) || 1,
                  nota,
                  cuando,
                },
              });
              setAviso(r.ok ? "Pedido enviado a ABBA ROSEUS CLERODENDRUM." : r.error ?? "No se envió.");
              if (r.ok) {
                setElegida(null);
                setNota("");
                void cargar();
              }
            }}
          >
            Programar compra
          </button>
          <button type="button" className="mt-2 w-full text-xs text-silenciado" onClick={() => setElegida(null)}>
            Seguir mirando el mosaico
          </button>
        </section>
      )}

      {pedidos.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-semibold">{ajustes.modoAutor ? "Pedidos del vivero" : "Tus encargos"}</h2>
          <ul className="mt-3 space-y-2">
            {pedidos.map((p) => (
              <li key={p.id} className="rounded-xl bg-superficie p-4 text-sm">
                <p className="font-medium">
                  {p.titulo} · {p.cantidad} · {p.cuando}
                </p>
                <p className="text-xs text-silenciado">
                  {p.cliente} {p.contacto && `· ${p.contacto}`} · {p.estado}
                </p>
                {ajustes.modoAutor && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["programado", "pagado", "entregado"].map((est) => (
                      <button
                        key={est}
                        type="button"
                        className="rounded-md bg-superficie-2 px-2 py-1 text-[11px]"
                        onClick={() => void marcarPedido({ data: { id: p.id, sala, estado: est } }).then(() => cargar())}
                      >
                        Marcar {est}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
      {aviso && <p className="mt-4 text-sm text-luna">{aviso}</p>}
    </main>
  );
}

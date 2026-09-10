import { useState } from "react";
import { PAISES, PAIS_DEFECTO } from "@/lib/paises";
import { useJardin } from "@/lib/almacen";
import { APP_CORTO, APP_NAME } from "@/lib/marca";
import { registrarCliente } from "@/lib/servidor/clientes";

export function PuertaCliente() {
  const setAjustes = useJardin((s) => s.setAjustes);
  const ajustes = useJardin((s) => s.ajustes);
  const [correo, setCorreo] = useState(ajustes.correoCliente);
  const [pais, setPais] = useState(ajustes.paisCliente || PAIS_DEFECTO);
  const [telefono, setTelefono] = useState(ajustes.telefonoCliente);
  const [nombre, setNombre] = useState(ajustes.nombreMostrar);
  const [aviso, setAviso] = useState("");
  const [ocupado, setOcupado] = useState(false);

  async function entrar() {
    const mail = correo.trim().toLowerCase();
    const tel = telefono.replace(/\D/g, "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      setAviso("Escribe un correo electrónico.");
      return;
    }
    if (tel.length < 6) {
      setAviso("Escribe tu número de teléfono.");
      return;
    }
    setOcupado(true);
    setAjustes({
      correoCliente: mail,
      paisCliente: pais,
      telefonoCliente: tel,
      nombreMostrar: nombre.trim(),
      clienteListo: true,
    });
    try {
      await registrarCliente({
        data: { correo: mail, pais, telefono: tel, nombre: nombre.trim() },
      });
    } catch {}
    setOcupado(false);
  }
 
   
  

  return (
    <main className="flex min-h-dvh flex-col justify-center px-6 pb-10 pt-12">
      <p className="text-xs uppercase tracking-[0.16em] text-luna">{APP_CORTO}</p>
      <h1 className="mt-2 font-serif text-3xl leading-tight text-luna">{APP_NAME}</h1>
      <p className="mt-3 text-base leading-relaxed text-silenciado">
        Para abrir tu diario, deja un correo y un teléfono. Así el vivero puede atenderte.
      </p>

      <label className="mt-6 block text-sm">
        Nombre
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Cómo te llamas"
          className="mt-1 h-12 w-full rounded-xl bg-superficie px-3 text-base outline-none"
        />
      </label>
      <label className="mt-4 block text-sm">
        Correo electrónico
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="tucorreo@correo.com"
          className="mt-1 h-12 w-full rounded-xl bg-superficie px-3 text-base outline-none"
        />
      </label>
      <p className="mt-4 text-sm">Teléfono</p>
      <div className="mt-1 flex gap-2">
        <select
          value={pais}
          onChange={(e) => setPais(e.target.value)}
          className="h-12 max-w-[46%] rounded-xl bg-superficie px-2 text-sm outline-none"
        >
          {PAISES.map((p) => (
            <option key={p.codigo + p.nombre} value={p.codigo}>
              {p.nombre} +{p.codigo}
            </option>
          ))}
        </select>
        <input
          value={telefono}
          onChange={(e) => setTelefono(e.target.value.replace(/[^\d\s-]/g, ""))}
          inputMode="tel"
          placeholder="Tu Número"
          className="h-12 min-w-0 flex-1 rounded-xl bg-superficie px-3 text-base outline-none"
        />
      </div>
      <p className="mt-2 text-xs text-silenciado">Ejemplo Nicaragua: +505 y tu número.</p>

      <button
        type="button"
        disabled={ocupado}
        onClick={() => void entrar()}
        className="mt-6 flex h-14 w-full items-center justify-center rounded-xl bg-luna text-base font-semibold text-fondo disabled:opacity-60"
      >
        {ocupado ? "Guardando…" : "Entrar al diario"}
      </button>
      {aviso && <p className="mt-3 text-sm text-alerta">{aviso}</p>}
    </main>
  );
}

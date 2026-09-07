import { useState } from "react";

const CABANAS = [
  {
    name: "Cabaña El Molle",
    desc: "Para dos personas, con vista directa al arroyo y deck privado entre los árboles.",
    capacity: "2 personas",
    size: "45 m²",
    price: "$28.000 / noche",
    img: "https://images.unsplash.com/photo-1570793005386-840846445fed?w=800&h=600&fit=crop&auto=format",
    alt: "Cabaña de madera entre árboles del bosque",
    tag: "Romántica",
  },
  {
    name: "Cabaña Los Espinillos",
    desc: "Amplia cabaña familiar rodeada de espinillos con hogar a leña y cocina equipada.",
    capacity: "4 personas",
    size: "72 m²",
    price: "$45.000 / noche",
    img: "https://images.unsplash.com/photo-1631630259742-c0f0b17c6c10?w=800&h=600&fit=crop&auto=format",
    alt: "Interior acogedor con estufa y sillones de madera",
    tag: "Familiar",
  },
  {
    name: "Cabaña La Vertiente",
    desc: "Nuestra cabaña premium con bañera de inmersión exterior, quincho y vista panorámica a las sierras.",
    capacity: "2–4 personas",
    size: "90 m²",
    price: "$68.000 / noche",
    img: "https://images.unsplash.com/photo-1631941392209-70cad44ecfb7?w=800&h=600&fit=crop&auto=format",
    alt: "Living con chimenea y ventanal al monte",
    tag: "Premium",
  },
  {
    name: "Cabaña Piedra Blanca",
    desc: "Construida sobre roca viva, con materiales naturales y una pequeña pileta privada.",
    capacity: "4–6 personas",
    size: "110 m²",
    price: "$85.000 / noche",
    img: "https://images.unsplash.com/photo-1631756964162-25c8c07579b5?w=800&h=600&fit=crop&auto=format",
    alt: "Salón amplio con ventanal a la naturaleza",
    tag: "Grupo",
  },
];

const AMENITIES = [
  { icon: "🔥", label: "Hogar a leña" },
  { icon: "🏊", label: "Pileta privada" },
  { icon: "🌿", label: "Jardín nativo" },
  { icon: "🚿", label: "Ducha de lluvia" },
  { icon: "🍳", label: "Cocina equipada" },
  { icon: "🌄", label: "Vista a las sierras" },
  { icon: "🐦", label: "Senderos propios" },
  { icon: "🌙", label: "Cielo sin contaminación lumínica" },
];

/** Isotipo flor de loto (5 pétalos, trazo simple) — según manual de marca Alentue. */
function LotusIcon({
  color = "var(--color-bark)",
  size = 24,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M50 12 C59 28 59 45 50 60 C41 45 41 28 50 12 Z"
        stroke={color}
        strokeWidth="3.5"
      />
      <path
        d="M17 33 C34 33 47 43 50 60 C33 58 20 48 17 33 Z"
        stroke={color}
        strokeWidth="3.5"
      />
      <path
        d="M83 33 C66 33 53 43 50 60 C67 58 80 48 83 33 Z"
        stroke={color}
        strokeWidth="3.5"
      />
      <path
        d="M26 62 C37 53 46 53 50 60 C43 69 32 71 26 62 Z"
        stroke={color}
        strokeWidth="3.5"
      />
      <path
        d="M74 62 C63 53 54 53 50 60 C57 69 68 71 74 62 Z"
        stroke={color}
        strokeWidth="3.5"
      />
    </svg>
  );
}

/** Badge de submarca ("CABAÑAS"), equivalente al recuadro "POSADA" del manual. */
function SubmarkBadge({
  children,
  compact = false,
}: {
  children: string;
  compact?: boolean;
}) {
  return (
    <span
      className={compact ? "px-2 py-0.5 text-[0.65rem]" : "px-3 py-1 text-sm"}
      style={{
        background: "var(--color-forest)",
        color: "var(--color-warm-white)",
        fontFamily: "var(--font-display)",
        letterSpacing: "0.08em",
        borderRadius: "2px",
        display: "inline-block",
        width: "fit-content",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

/** Claim en arco ("SIERRAS DE CÓRDOBA"), como el "ALOJAMIENTO BOUTIQUE" del manual. Solo para el lockup completo (footer). */
function ArcClaim({
  text,
  color = "var(--color-earth-light)",
  size = 100,
}: {
  text: string;
  color?: string;
  size?: number;
}) {
  const pathId = "arc-claim-path";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path
        id={pathId}
        d="M 8 62 A 42 42 0 1 1 92 62"
        fill="none"
      />
      <text
        fill={color}
        fontSize="9.5"
        letterSpacing="1.5"
        style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
      >
        <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
          {text.toUpperCase()}
        </textPath>
      </text>
    </svg>
  );
}

/** Isologo Aldea Alentue — Cabañas. variant="compact" para el nav, "full" para el footer. */
function Logo({
  variant = "compact",
  light = true,
}: {
  variant?: "compact" | "full";
  light?: boolean;
}) {
  const wordmarkColor = light ? "var(--color-warm-white)" : "var(--color-bark)";
  const iconColor = light ? "var(--color-warm-white)" : "var(--color-bark)";

  if (variant === "full") {
    return (
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center" style={{ width: 76, height: 76 }}>
          <ArcClaim text="Sierras de Córdoba" size={76} />
          <div className="absolute" style={{ right: -4 }}>
            <LotusIcon color="var(--color-bark-light)" size={30} />
          </div>
        </div>
        <div className="flex flex-col leading-none gap-2">
          <span
            className="text-3xl"
            style={{ fontFamily: "var(--font-display)", color: wordmarkColor }}
          >
            Aldea Alentue
          </span>
          <SubmarkBadge>Cabañas</SubmarkBadge>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <LotusIcon color={iconColor} size={26} />
      <div className="flex flex-col leading-none gap-1">
        <span
          className="text-xl"
          style={{ fontFamily: "var(--font-display)", color: wordmarkColor }}
        >
          Aldea Alentue
        </span>
        <SubmarkBadge compact>Cabañas</SubmarkBadge>
      </div>
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav
      style={{ fontFamily: "var(--font-body)" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(30,30,26,0.6) 0%, transparent 100%)",
        }}
      />
      <a
        href="#inicio"
        className="relative z-10"
        style={{ textDecoration: "none" }}
      >
        <Logo variant="compact" />
      </a>

      {/* Desktop links */}
      <div className="relative z-10 hidden md:flex items-center gap-8">
        {["Cabañas", "Entorno", "Reservas", "Contacto"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm tracking-wide transition-colors duration-200"
            style={{
              color: "var(--color-stone-light)",
              textDecoration: "none",
              fontWeight: 400,
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "var(--color-cream)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "var(--color-stone-light)")
            }
          >
            {item}
          </a>
        ))}
        <a
          href="#reservas"
          className="px-5 py-2 text-sm font-medium tracking-wide transition-all duration-200"
          style={{
            background: "var(--color-forest)",
            color: "var(--color-cream)",
            borderRadius: "2px",
            textDecoration: "none",
            border: "1px solid var(--color-forest-light)",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLElement).style.background = "var(--color-forest-light)")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.background = "var(--color-forest)")
          }
        >
          Reservar
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        className="relative z-10 md:hidden flex flex-col gap-1.5 p-1"
        onClick={() => setOpen(!open)}
        aria-label="Menú"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-6 h-0.5 transition-all duration-200"
            style={{ background: "var(--color-cream)" }}
          />
        ))}
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          className="fixed inset-0 z-40 flex flex-col pt-20 px-8 gap-6"
          style={{ background: "var(--color-charcoal)" }}
          onClick={() => setOpen(false)}
        >
          {["Cabañas", "Entorno", "Reservas", "Contacto"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-2xl"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-cream)",
                textDecoration: "none",
              }}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-end overflow-hidden"
    >
      <img
        src="https://images.unsplash.com/photo-1568554628085-4eec26679e30?w=1800&h=1200&fit=crop&auto=format"
        alt="Sierras de Córdoba — colinas verdes al atardecer"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 40%" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(30,30,26,0.85) 0%, rgba(30,30,26,0.3) 55%, transparent 100%)",
        }}
      />

      {/* Decorative vertical text */}
      <div
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3"
        style={{ writingMode: "vertical-rl" }}
      >
        <span
          className="text-xs tracking-[0.3em] uppercase"
          style={{ color: "var(--color-stone-light)", opacity: 0.7 }}
        >
          Villa Yacanto · Córdoba · Argentina
        </span>
        <div
          className="w-px h-16"
          style={{ background: "var(--color-stone-light)", opacity: 0.4 }}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 pb-20 md:pb-28 pt-28 md:pt-0">

        <h1
          className="text-5xl md:text-7xl lg:text-8xl leading-none mb-6"
          style={{ color: "var(--color-cream)" }}
        >
          Donde el
          <br />
          <em>monte</em> te
          <br />
          recibe.
        </h1>
        <p
          className="text-lg md:text-xl max-w-lg mb-10 leading-relaxed"
          style={{ color: "var(--color-stone-light)", fontWeight: 300 }}
        >
          Cabañas de madera y piedra en las Sierras de Córdoba, rodeadas de
          bosque nativo y el sonido del arroyo. Desconectate. Respirá.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#cabañas"
            className="px-8 py-3.5 text-sm font-medium tracking-widest uppercase transition-all duration-300"
            style={{
              background: "var(--color-forest)",
              color: "var(--color-cream)",
              textDecoration: "none",
              borderRadius: "2px",
              border: "1px solid var(--color-forest-light)",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.background =
                "var(--color-forest-light)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.background = "var(--color-forest)")
            }
          >
            Ver cabañas
          </a>
          <a
            href="#reservas"
            className="px-8 py-3.5 text-sm font-medium tracking-widest uppercase transition-all duration-300"
            style={{
              background: "transparent",
              color: "var(--color-cream)",
              textDecoration: "none",
              borderRadius: "2px",
              border: "1px solid rgba(245,240,232,0.4)",
            }}
            onMouseEnter={(e) => {
              const el = e.target as HTMLElement;
              el.style.borderColor = "var(--color-cream)";
              el.style.background = "rgba(245,240,232,0.08)";
            }}
            onMouseLeave={(e) => {
              const el = e.target as HTMLElement;
              el.style.borderColor = "rgba(245,240,232,0.4)";
              el.style.background = "transparent";
            }}
          >
            Reservar ahora
          </a>
        </div>

        {/* Stats strip */}
        <div
          className="flex gap-8 mt-16 pt-8"
          style={{ borderTop: "1px solid rgba(245,240,232,0.15)" }}
        >
          {[
            { n: "4", label: "Cabañas" },
            { n: "1.200", label: "msnm" },
            { n: "6+", label: "años" },
          ].map(({ n, label }) => (
            <div key={label} className="flex flex-col">
              <span
                className="text-3xl font-semibold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-cream)",
                }}
              >
                {n}
              </span>
              <span
                className="text-xs tracking-wide uppercase"
                style={{ color: "var(--color-stone-light)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CabanasSection() {
  const [active, setActive] = useState(0);
  const cab = CABANAS[active];

  return (
    <section
      id="cabañas"
      className="py-20 md:py-32"
      style={{ background: "var(--color-warm-white)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: "var(--color-earth)" }}
            >
              Alojamiento
            </span>
            <h2
              className="text-4xl md:text-5xl mt-2"
              style={{ color: "var(--color-charcoal)" }}
            >
              Nuestras cabañas
            </h2>
          </div>
          <p
            className="md:max-w-xs text-sm leading-relaxed"
            style={{ color: "var(--color-bark)", fontWeight: 300 }}
          >
            Cada cabaña es única, construida con materiales del lugar y diseñada
            para integrarse al paisaje serrano.
          </p>
        </div>

        {/* Selector tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CABANAS.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setActive(i)}
              className="px-4 py-2 text-sm font-medium transition-all duration-200"
              style={{
                borderRadius: "2px",
                border: "1px solid",
                borderColor: active === i ? "var(--color-forest)" : "var(--color-stone-light)",
                background: active === i ? "var(--color-forest)" : "transparent",
                color: active === i ? "var(--color-cream)" : "var(--color-bark)",
                cursor: "pointer",
              }}
            >
              {c.name.replace("Cabaña ", "")}
            </button>
          ))}
        </div>

        {/* Main card */}
        <div
          className="grid md:grid-cols-2 gap-0 overflow-hidden"
          style={{
            borderRadius: "4px",
            border: "1px solid var(--color-stone-light)",
          }}
        >
          {/* Image */}
          <div className="relative h-72 md:h-auto overflow-hidden" style={{ minHeight: 320, background: "var(--color-stone-light)" }}>
            <img
              key={cab.img}
              src={cab.img}
              alt={cab.alt}
              className="w-full h-full object-cover transition-opacity duration-500"
              style={{ opacity: 1 }}
            />
            <div
              className="absolute top-4 left-4 text-xs tracking-wider uppercase px-2 py-1"
              style={{
                background: "var(--color-earth)",
                color: "var(--color-cream)",
                borderRadius: "2px",
              }}
            >
              {cab.tag}
            </div>
          </div>

          {/* Info */}
          <div
            className="flex flex-col justify-between p-8 md:p-10"
            style={{ background: "var(--color-cream)" }}
          >
            <div>
              <h3
                className="text-3xl mb-3"
                style={{ color: "var(--color-charcoal)" }}
              >
                {cab.name}
              </h3>
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: "var(--color-bark)", fontWeight: 300 }}
              >
                {cab.desc}
              </p>
              <div className="flex gap-6 mb-8">
                <div className="flex flex-col">
                  <span
                    className="text-xs uppercase tracking-wider mb-1"
                    style={{ color: "var(--color-stone)" }}
                  >
                    Capacidad
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-charcoal)" }}
                  >
                    {cab.capacity}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-xs uppercase tracking-wider mb-1"
                    style={{ color: "var(--color-stone)" }}
                  >
                    Superficie
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-charcoal)" }}
                  >
                    {cab.size}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div className="flex flex-col">
                <span
                  className="text-xs uppercase tracking-wider"
                  style={{ color: "var(--color-stone)" }}
                >
                  Desde
                </span>
                <span
                  className="text-2xl font-semibold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-forest)",
                  }}
                >
                  {cab.price}
                </span>
              </div>
              <a
                href="#reservas"
                className="px-6 py-3 text-sm font-medium tracking-wide transition-all duration-200"
                style={{
                  background: "var(--color-forest)",
                  color: "var(--color-cream)",
                  textDecoration: "none",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.background =
                    "var(--color-forest-light)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.background = "var(--color-forest)")
                }
              >
                Reservar esta cabaña
              </a>
            </div>
          </div>
        </div>

        {/* Small thumbnails */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {CABANAS.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setActive(i)}
              className="relative overflow-hidden transition-all duration-200"
              style={{
                height: 100,
                borderRadius: "2px",
                outline: active === i ? "2px solid var(--color-forest)" : "none",
                outlineOffset: 2,
                background: "var(--color-stone-light)",
                cursor: "pointer",
              }}
            >
              <img
                src={c.img}
                alt={c.alt}
                className="w-full h-full object-cover"
                style={{ opacity: active === i ? 1 : 0.65, transition: "opacity 0.2s" }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function EntornoSection() {
  return (
    <section
      id="entorno"
      className="relative overflow-hidden py-20 md:py-32"
      style={{ background: "var(--color-charcoal)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text */}
          <div>
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: "var(--color-earth-light)" }}
            >
              El entorno
            </span>
            <h2
              className="text-4xl md:text-5xl mt-2 mb-6"
              style={{ color: "var(--color-cream)" }}
            >
              Naturaleza <em>pura</em> de las Sierras
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "var(--color-stone-light)", fontWeight: 300 }}
            >
              Aldea Alentue está ubicada en las Sierras Grandes de Córdoba, a
              1.200 metros sobre el nivel del mar. El predio limita con un
              arroyo de aguas cristalinas y está rodeado de bosque nativo de
              molle, espinillo, tabaquillo y palo blanco.
            </p>
            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: "var(--color-stone-light)", fontWeight: 300 }}
            >
              Por la noche, el cielo sin contaminación lumínica ofrece una vista
              incomparable de la Vía Láctea. De día, más de 5 km de senderos
              propios te llevan hasta cascadas y miradores de 360°.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {AMENITIES.map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-xl">{icon}</span>
                  <span
                    className="text-sm"
                    style={{ color: "var(--color-stone-light)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Images collage */}
          <div className="grid grid-cols-2 gap-3" style={{ height: 480 }}>
            <div className="relative overflow-hidden" style={{ borderRadius: "3px", background: "var(--color-stone)" }}>
              <img
                src="https://images.unsplash.com/photo-1603203712068-a3bbbce6096f?w=600&h=600&fit=crop&auto=format"
                alt="Arroyo entre árboles en las sierras"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div
                className="flex-1 overflow-hidden"
                style={{ borderRadius: "3px", background: "var(--color-stone)" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1543198455-0320f7df42f1?w=400&h=300&fit=crop&auto=format"
                  alt="Colinas verdes de Córdoba"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="flex-1 overflow-hidden"
                style={{ borderRadius: "3px", background: "var(--color-stone)" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1717306756807-ccee038cb984?w=400&h=300&fit=crop&auto=format"
                  alt="Arroyo en bosque serrano"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type FormData = {
  nombre: string;
  email: string;
  telefono: string;
  cabana: string;
  llegada: string;
  salida: string;
  personas: string;
  mensaje: string;
};

function ReservasSection() {
  const [form, setForm] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    cabana: "",
    llegada: "",
    salida: "",
    personas: "2",
    mensaje: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    background: "var(--color-cream)",
    border: "1px solid var(--color-stone-light)",
    borderRadius: "2px",
    padding: "10px 14px",
    fontSize: 14,
    color: "var(--color-charcoal)",
    width: "100%",
    outline: "none",
    fontFamily: "var(--font-body)",
    transition: "border-color 0.15s",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--color-stone)",
    marginBottom: 6,
    display: "block",
    fontWeight: 500,
  };

  return (
    <section
      id="reservas"
      className="py-20 md:py-32"
      style={{ background: "var(--color-cream-dark)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-5 gap-12 md:gap-16">
          {/* Sidebar info */}
          <div className="md:col-span-2 flex flex-col justify-start">
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: "var(--color-earth)" }}
            >
              Reservas
            </span>
            <h2
              className="text-4xl md:text-5xl mt-2 mb-6"
              style={{ color: "var(--color-charcoal)" }}
            >
              Planificá tu estadía
            </h2>
            <p
              className="text-sm leading-relaxed mb-8"
              style={{ color: "var(--color-bark)", fontWeight: 300 }}
            >
              Completá el formulario y te contactamos en menos de 24 horas para
              confirmar disponibilidad y coordinar el pago. Estadía mínima: 2
              noches.
            </p>

            <div
              className="p-6 flex flex-col gap-4"
              style={{
                background: "var(--color-cream)",
                border: "1px solid var(--color-stone-light)",
                borderRadius: "3px",
              }}
            >
              <div>
                <div
                  className="text-xs uppercase tracking-wider mb-1"
                  style={{ color: "var(--color-stone)" }}
                >
                  WhatsApp
                </div>
                <a
                  href="https://wa.me/5493511234567"
                  className="text-sm font-medium"
                  style={{
                    color: "var(--color-forest)",
                    textDecoration: "none",
                  }}
                >
                  +54 9 351 123-4567
                </a>
              </div>
              <div
                className="h-px"
                style={{ background: "var(--color-stone-light)" }}
              />
              <div>
                <div
                  className="text-xs uppercase tracking-wider mb-1"
                  style={{ color: "var(--color-stone)" }}
                >
                  Email
                </div>
                <a
                  href="mailto:hola@aldeaalentue.com"
                  className="text-sm font-medium"
                  style={{
                    color: "var(--color-forest)",
                    textDecoration: "none",
                  }}
                >
                  hola@aldeaalentue.com
                </a>
              </div>
              <div
                className="h-px"
                style={{ background: "var(--color-stone-light)" }}
              />
              <div>
                <div
                  className="text-xs uppercase tracking-wider mb-1"
                  style={{ color: "var(--color-stone)" }}
                >
                  Ubicación
                </div>
                <span className="text-sm" style={{ color: "var(--color-bark)" }}>
                  Villa Yacanto, Sierras Grandes, Córdoba
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            {sent ? (
              <div
                className="flex flex-col items-center justify-center text-center p-12 h-full"
                style={{
                  background: "var(--color-cream)",
                  border: "1px solid var(--color-stone-light)",
                  borderRadius: "3px",
                  minHeight: 400,
                }}
              >
                <div className="text-5xl mb-6">🌿</div>
                <h3
                  className="text-2xl mb-3"
                  style={{ color: "var(--color-charcoal)" }}
                >
                  ¡Gracias, {form.nombre}!
                </h3>
                <p
                  className="text-sm leading-relaxed max-w-xs"
                  style={{ color: "var(--color-bark)", fontWeight: 300 }}
                >
                  Recibimos tu consulta y nos comunicaremos con vos en las
                  próximas horas para confirmar tu reserva en Aldea Alentue.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-8 px-6 py-2.5 text-sm tracking-wide"
                  style={{
                    background: "transparent",
                    border: "1px solid var(--color-forest)",
                    color: "var(--color-forest)",
                    borderRadius: "2px",
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Nueva consulta
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 p-8 md:p-10"
                style={{
                  background: "var(--color-cream)",
                  border: "1px solid var(--color-stone-light)",
                  borderRadius: "3px",
                }}
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label style={labelStyle}>Nombre y apellido</label>
                    <input
                      name="nombre"
                      required
                      placeholder="María García"
                      value={form.nombre}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "var(--color-forest)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "var(--color-stone-light)")
                      }
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="maria@ejemplo.com"
                      value={form.email}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "var(--color-forest)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "var(--color-stone-light)")
                      }
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label style={labelStyle}>Teléfono / WhatsApp</label>
                    <input
                      name="telefono"
                      placeholder="+54 9 351 ..."
                      value={form.telefono}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "var(--color-forest)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "var(--color-stone-light)")
                      }
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Cabaña de interés</label>
                    <select
                      name="cabana"
                      value={form.cabana}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "var(--color-forest)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "var(--color-stone-light)")
                      }
                    >
                      <option value="">Sin preferencia</option>
                      {CABANAS.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-5">
                  <div>
                    <label style={labelStyle}>Llegada</label>
                    <input
                      name="llegada"
                      type="date"
                      required
                      value={form.llegada}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "var(--color-forest)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "var(--color-stone-light)")
                      }
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Salida</label>
                    <input
                      name="salida"
                      type="date"
                      required
                      value={form.salida}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "var(--color-forest)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "var(--color-stone-light)")
                      }
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Personas</label>
                    <select
                      name="personas"
                      value={form.personas}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.target.style.borderColor = "var(--color-forest)")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = "var(--color-stone-light)")
                      }
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={String(n)}>
                          {n} {n === 1 ? "persona" : "personas"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Mensaje (opcional)</label>
                  <textarea
                    name="mensaje"
                    rows={3}
                    placeholder="Alguna consulta especial, requerimiento, etc."
                    value={form.mensaje}
                    onChange={handleChange}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--color-forest)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--color-stone-light)")
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 text-sm font-medium tracking-widest uppercase transition-all duration-200 mt-2"
                  style={{
                    background: "var(--color-forest)",
                    color: "var(--color-cream)",
                    border: "none",
                    borderRadius: "2px",
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.background =
                      "var(--color-forest-light)")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.background = "var(--color-forest)")
                  }
                >
                  Enviar consulta
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      id="contacto"
      className="py-16 md:py-20"
      style={{ background: "var(--color-charcoal)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="mb-4">
              <Logo variant="full" />
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-stone)", fontWeight: 300 }}
            >
              Cabañas de montaña en Villa Yacanto, entre el bosque nativo y el
              arroyo de las Sierras Grandes de Córdoba.
            </p>
          </div>
          <div>
            <div
              className="text-xs tracking-[0.2em] uppercase mb-4"
              style={{ color: "var(--color-stone)" }}
            >
              Navegación
            </div>
            <div className="flex flex-col gap-2">
              {["Inicio", "Cabañas", "Entorno", "Reservas", "Contacto"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-sm transition-colors duration-150"
                    style={{
                      color: "var(--color-stone)",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color =
                        "var(--color-cream)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color =
                        "var(--color-stone)")
                    }
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
          <div>
            <div
              className="text-xs tracking-[0.2em] uppercase mb-4"
              style={{ color: "var(--color-stone)" }}
            >
              Contacto
            </div>
            <div className="flex flex-col gap-3 text-sm" style={{ color: "var(--color-stone)" }}>
              <span>📍 Villa Yacanto, Calamuchita, Córdoba</span>
              <a
                href="mailto:hola@aldeaalentue.com"
                style={{ color: "var(--color-stone)", textDecoration: "none" }}
              >
                ✉️ hola@aldeaalentue.com
              </a>
              <a
                href="https://wa.me/5493511234567"
                style={{ color: "var(--color-stone)", textDecoration: "none" }}
              >
                📱 +54 9 351 123-4567
              </a>
              <div className="flex gap-3 mt-2">
                {["Instagram", "Facebook"].map((red) => (
                  <span
                    key={red}
                    className="text-xs uppercase tracking-wide px-3 py-1"
                    style={{
                      border: "1px solid var(--color-stone)",
                      borderRadius: "2px",
                      color: "var(--color-stone)",
                    }}
                  >
                    {red}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            color: "var(--color-stone)",
          }}
        >
          <span>© 2024 Aldea Alentue. Todos los derechos reservados.</span>
          <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>
            Hecho con amor en las sierras.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <CabanasSection />
      <EntornoSection />
      <ReservasSection />
      <Footer />
    </div>
  );
}

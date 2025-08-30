// src/data/serviceData.js

const serviceData = {
  culinario: {
    name: "Culinario",
    clients: [
      "Restaurante /Bar", "Cafetería/Pastelería", "Food Truck",
      "Chef /Catering", "Bodega&Bebidas", "Alimentos", "otros"
    ],
    scenarios: [
      {
        name: "Menú de Estreno",
        desc: "Soy nuevo o renové mi carta y necesito fotos y/o videos para redes y apps de delivery. ¡Urgente!"
      },
      {
        name: "Sabor que Conecta",
        desc: "Contá tu historia y la experiencia del lugar, no solo los platos."
      },
      {
        name: "Guion Abierto",
        desc: "Coordinamos una reunión y construimos una idea a medida."
      },
    ],
    levels: {
      express: {
        name: "Express",
        desc: {
          utilidad: "Fotos para redes y apps de pedidos.",
          equipo: "1 cámara, media jornada, luz básica.",
          edicion: "Corrección de color básica.",
          entregables: "Hasta 15 platos - 30 fotos."
        },
        promo: "1 día de rodaje = 1 mes de contenido"
      },
      indie: {
        name: "Indie",
        desc: {
          utilidad: "Fotos + videos slow motion por plato.",
          equipo: "1 cámara 4K, 1 jornada, luz de producto.",
          edicion: "Transiciones, sfx, color, subtítulos, v.o.",
          entregables: "Todo el menú, 2 fotos + 2 videos por producto, 3 reels."
        }
      },
      estelar: {
        name: "Estelar",
        desc: {
          utilidad: "Menú + restaurante + ambiente en 1 paquete.",
          equipo: "1 cámara 4K, 2 jornadas, estabilizador, sonido.",
          edicion: "Pro completa.",
          entregables: "Todo el menú + 3 reels + 1 video cine (≤2 min)."
        }
      }
    },
    addons: ["Entrevista", "Dron", "Modelo/Presentador", "Lente Macro"]
  },

  ambientes: {
    name: "Ambientes",
    clients: [
      "Inmobiliaria/Agente","Hotel/Hostel/Cabaña","Arquitectura/Interiorismo",
      "Desarrolladora","Alquiler temporal (Airbnb)","Coworking","Showroom deco"
    ],
    scenarios: [
      {
        name: "Tour de Estreno",
        desc: "Fotos y/o video de una propiedad o espacio, rápido y profesional."
      },
      { name: "Guion Abierto", desc: "Idea a medida en reunión." }
    ],
    levels: {
      fotos: { name: "Solo Fotos", desc: { entregables: "Cobertura fotográfica profesional." } },
      oneshot: {
        name: "Video 'One Shot'",
        desc: {
          utilidad: "Recorrido continuo sin cortes.",
          equipo: "1 cámara 4K, media jornada, estabilizador.",
          edicion: "Base.",
          entregables: "1 video + fotos"
        }
      },
      clasico: {
        name: "Video 'Clásico'",
        desc: {
          utilidad: "Video con cortes y variedad de lentes.",
          equipo: "1 cámara 4K, media jornada, estabilizador.",
          edicion: "Base.",
          entregables: "1 video + fotos"
        }
      },
      paquete: {
        name: "Paquete Completo",
        desc: {
          utilidad: "Video + recorrido guiado por agente/presentador.",
          equipo: "1 cámara 4K, estabilizador, micrófono.",
          edicion: "Base.",
          entregables: "1 video principal + 1 video con guía"
        }
      }
    },
    addons: ["Presentadora (sin sonido)","Dron","Presentador/Modelo"]
  },

  indumentaria: {
    name: "Indumentaria",
    clients: ["Marca de indumentaria", "Showroom", "Local multimarca", "Otros"],
    scenarios: [
      {
        name: "Colección Nueva",
        desc: "Desde e-commerce básico a fashion film de tu colección."
      }
    ],
    levels: {
      express: {
        name: "Express E-commerce",
        desc: {
          utilidad: "Fotos y videos cortos para redes y apps.",
          equipo: "1 cámara 4K, media jornada, fondo infinito.",
          edicion: "Base.",
          entregables: "Máx. 15 prendas: 30 fotos + 30 slow mo + 1 reel."
        }
      },
      indie: {
        name: "Indie",
        desc: {
          utilidad: "E-commerce con modelo, maquillaje, y video.",
          equipo: "1 cámara 4K, 1 jornada, iluminación prof.",
          edicion: "Pro.",
          entregables: "Toda tu colección con fotos + videos + reels."
        }
      },
      estelar: {
        name: "Estelar",
        desc: {
          utilidad: "Fashion film + jornada de fotos en estudio.",
          equipo: "1 cámara 4K, 2 jornadas, sonido, arte.",
          edicion: "Pro.",
          entregables: "Colección completa + fashion film + mes de contenidos."
        }
      }
    }
  },

  "marca-personal": {
    name: "Marca Personal",
    intro: "Sos la cara de tu proyecto. Buscamos difundir y enseñar para atraer clientes/seguidores.",
    textInput: { label: "Nombre de tu emprendimiento", key: "nombre_emprendimiento", placeholder: "Ej: preparador físico" },
    scenarios: [
      { name: "Solo Edición", desc: "Editar material que ya tenés (TikTok/IG/Shorts)." },
      { name: "Grabación", desc: "Grabamos contenido profesional para redes." },
      { name: "Dirección", desc: "Definimos identidad visual y plan de contenidos." }
    ],
    levels: {
      express: { name: "Express", desc: { utilidad: "Piezas cortas y ágiles." } },
      indie:   { name: "Indie",   desc: { utilidad: "Mix de grabación + edición pro." } },
      estelar: { name: "Estelar", desc: { utilidad: "Dirección creativa integral." } }
    }
  },

  servicios: {
    name: "Servicios",
    intro: "Mostrá qué hacés y atraé clientes.",
    textInput: { label: "¿Cómo se llama tu servicio?", key: "nombre_servicio", placeholder: "Ej: Barbería Brick" },
    scenarios: [
      { name: "Local de Servicios", desc: "Tenés local a la calle (ej: barbería)." },
      { name: "Servicios Móviles", desc: "Prestás servicio en distintos lugares (ej: catering)." },
      { name: "Servicios Profesionales", desc: "Servicio profesional (ej: estudio de arquitecto)." }
    ],
    levels: {
      express: { name: "Express", desc: { utilidad: "Cobertura ágil, listo para redes." } },
      indie:   { name: "Indie",   desc: { utilidad: "Cobertura + testimonios/voz en off." } },
      estelar: { name: "Estelar", desc: { utilidad: "Campaña completa guionada." } }
    }
  },

  comercio: {
    name: "Comercio",
    intro: "Venta de productos.",
    textInput: { label: "Nombre de tu local o Instagram", key: "nombre_comercio", placeholder: "Ej: @bricktienda" },
    scenarios: [
      { name: "E-commerce", desc: "Contenido para publicar tus productos." },
      { name: "Local", desc: "Mostrá productos + tu local." }
    ],
    levels: {
      express: { name: "Express", desc: { utilidad: "Fotoproducto + video corto." } },
      indie:   { name: "Indie",   desc: { utilidad: "Más piezas + look cinematográfico." } },
      estelar: { name: "Estelar", desc: { utilidad: "Comercial corto + fotos completas." } }
    }
  },

  eventos: {
    name: "Eventos",
    scenarios: [
      { name: "Solo Edición", desc: "Editamos material de eventos anteriores para promo." },
      { name: "Cobertura del Evento", desc: "Cobertura en foto y/o video." }
    ],
    levels: {
      express: { name: "Express", desc: { utilidad: "Cobertura base y aftermovie." } },
      indie:   { name: "Indie",   desc: { utilidad: "Cobertura + fotos + reels." } },
      estelar: { name: "Estelar", desc: { utilidad: "Cobertura total, multicámara, entrevistas." } }
    }
  },

  empresas: {
    name: "Empresas",
    scenarios: [
      { name: "Institucional", desc: "Mostrá tu empresa, locales y operación." },
      { name: "Redes", desc: "Presencia fuerte en redes con storytelling." }
    ],
    levels: {
      express: { name: "Express", desc: { utilidad: "Video resumen + piezas cortas." } },
      indie:   { name: "Indie",   desc: { utilidad: "Testimonios + fotos + reels." } },
      estelar: { name: "Estelar", desc: { utilidad: "Campaña completa con guión." } }
    }
  }
};

export default serviceData;

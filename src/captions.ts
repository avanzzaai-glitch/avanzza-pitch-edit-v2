export interface Caption {
  start: number;
  end: number;
  text: string;
  highlight?: string;
  type?: "normal" | "impact" | "question";
}

export const CAPTIONS: Caption[] = [
  { start: 0, end: 80, text: "¿Qué pasaría si tu negocio tuviera", type: "question" },
  { start: 80, end: 160, text: "contenido todos los días", highlight: "todos los días", type: "question" },
  { start: 160, end: 240, text: "sin que tú grabaras una sola vez?", type: "question" },
  { start: 240, end: 320, text: "Te voy a mostrar cómo.", type: "impact" },
  { start: 320, end: 430, text: "Imagínate tener a alguien así", type: "normal" },
  { start: 430, end: 540, text: "en tu floristería todos los días", type: "normal" },
  { start: 540, end: 640, text: "presentando tus arreglos", highlight: "sin contratar", type: "normal" },
  { start: 640, end: 760, text: "Con IA puedes poner tu marca", highlight: "Con IA", type: "impact" },
  { start: 760, end: 870, text: "donde quieras.", type: "impact" },
  { start: 870, end: 980, text: "Una suite de lujo, un café en París,", type: "normal" },
  { start: 980, end: 1080, text: "donde tú decidas — sin viajar.", highlight: "sin viajar", type: "normal" },
  { start: 1080, end: 1200, text: "Este café en París no existe.", type: "impact" },
  { start: 1200, end: 1320, text: "Lo creó la IA. Así de fácil.", highlight: "Lo creó la IA", type: "impact" },
  { start: 1320, end: 1440, text: "¿Y si tu producto apareciera en un lugar así?", type: "question" },
  { start: 1440, end: 1580, text: "Con IA generativa cualquier marca", highlight: "cualquier marca", type: "normal" },
  { start: 1580, end: 1700, text: "tiene contenido de nivel mundial", type: "impact" },
  { start: 1700, end: 1800, text: "sin salir de tu ciudad.", highlight: "sin salir", type: "normal" },
  { start: 1800, end: 1940, text: "Una cava medieval, quesos artesanales,", type: "normal" },
  { start: 1940, end: 2060, text: "vino reserva — tu restaurante", type: "normal" },
  { start: 2060, end: 2180, text: "puede tener contenido así", type: "normal" },
  { start: 2180, end: 2280, text: "sin salir de México.", highlight: "sin salir", type: "impact" },
  { start: 2280, end: 2420, text: "8 escenarios. 1 avatar. Cero cámaras.", highlight: "Cero cámaras", type: "impact" },
  { start: 2420, end: 2540, text: "Así funciona la IA para tu negocio.", type: "impact" },
  { start: 2540, end: 2680, text: "Tu marca ya está usando esto.", highlight: "Tu marca", type: "impact" },
  { start: 2680, end: 2862, text: "Porque tu competencia ya lo está pensando.", highlight: "tu competencia", type: "question" },
];

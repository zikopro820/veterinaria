/* =========================================================
   PRODUCTOS DE LA TIENDA — edita aquí nombres, precios y fotos
   ---------------------------------------------------------
   n    = nombre               p    = precio (S/)
   old  = precio antes (opcional, para mostrar oferta)
   cat  = Alimento | Farmacia | Accesorios | Juguetes | Higiene
   esp  = perro | gato | ambos
   tag  = texto de etiqueta (opcional): "Oferta", "Nuevo", "Recomendado"
   img  = código de foto de Unsplash o enlace completo a tu foto
   ========================================================= */
const PRODUCTOS = [
  { id: 1,  n: "Alimento Perro Adulto Razas Medianas 15 kg", p: 189.90, old: 219.90, cat: "Alimento", esp: "perro", tag: "Oferta", img: "1581958485706-3c6f6eb4c1bf", d: "Pollo y arroz, con omega 3 para piel y pelaje." },
  { id: 2,  n: "Alimento Cachorro 3 kg", p: 69.90, cat: "Alimento", esp: "perro", tag: "Recomendado", img: "1510337550647-e84f83e341ca", d: "Con DHA para el desarrollo cerebral." },
  { id: 3,  n: "Alimento Gato Adulto 7.5 kg", p: 129.90, cat: "Alimento", esp: "gato", img: "1592194996308-7b43878e84a6", d: "Control de bolas de pelo y salud urinaria." },
  { id: 4,  n: "Snacks Naturales Dentales 500 g", p: 24.90, cat: "Alimento", esp: "perro", tag: "Nuevo", img: "1629740067905-bd3f515aa739", d: "Premios que ayudan a limpiar los dientes." },
  { id: 5,  n: "Pipeta Antipulgas Perro 10 a 20 kg", p: 45.00, cat: "Farmacia", esp: "perro", tag: "Recomendado", img: "1604165094771-7af34f7fd4cd", d: "Protección contra pulgas y garrapatas por 30 días." },
  { id: 6,  n: "Desparasitante Interno (4 tabletas)", p: 18.00, cat: "Farmacia", esp: "ambos", img: "1534551767192-78b8dd45b51b", d: "Amplio espectro. Consulta la dosis con tu veterinario." },
  { id: 7,  n: "Arena Sanitaria Aglomerante 10 kg", p: 39.90, old: 46.90, cat: "Higiene", esp: "gato", tag: "Oferta", img: "1574144611937-0df059b5ef3e", d: "Control de olores, sin polvo." },
  { id: 8,  n: "Shampoo Hipoalergénico 500 ml", p: 32.00, cat: "Higiene", esp: "ambos", img: "1528846104175-4fd300ee59da", d: "Ideal para pieles sensibles, con avena." },
  { id: 9,  n: "Correa Retráctil 5 m", p: 59.90, cat: "Accesorios", esp: "perro", img: "1708062270853-ee7c66b69f07", d: "Freno de un toque, para perros de hasta 25 kg." },
  { id: 10, n: "Collar con Placa Grabada", p: 35.00, cat: "Accesorios", esp: "ambos", tag: "Nuevo", img: "1580129518863-f00fcf1d6e68", d: "Grabamos el nombre y tu número de celular." },
  { id: 11, n: "Casaca Impermeable para Perro", p: 49.90, cat: "Accesorios", esp: "perro", img: "1746483966037-c3c9e6374e08", d: "Tallas XS a L. Ideal para el invierno." },
  { id: 12, n: "Cama Acolchada Mediana", p: 99.90, old: 119.90, cat: "Accesorios", esp: "ambos", tag: "Oferta", img: "1611254965886-e7caa829b627", d: "Funda lavable y base antideslizante." },
  { id: 13, n: "Transportadora Mediana", p: 119.00, cat: "Accesorios", esp: "ambos", img: "1563460716037-460a3ad24ba9", d: "Ventilada y segura, ideal para viajes y citas." },
  { id: 14, n: "Rascador Torre para Gatos", p: 89.90, cat: "Juguetes", esp: "gato", img: "1573865526739-10659fec78a5", d: "Con plataforma y juguete colgante." },
  { id: 15, n: "Varita con Plumas para Gato", p: 15.90, cat: "Juguetes", esp: "gato", img: "1560114928-40f1f1eb26a0", d: "Estimula el instinto de caza y el ejercicio." },
  { id: 16, n: "Pelota Dental Resistente", p: 19.90, cat: "Juguetes", esp: "perro", img: "1493723258571-01372f1c5e04", d: "Caucho natural, para mordedores fuertes." },
];

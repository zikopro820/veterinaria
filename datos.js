/* =========================================================
   DATOS INICIALES — productos, servicios y ajustes de ejemplo.
   Si conectaste Firebase, todo esto se edita desde el PANEL
   (secciones Pet Shop, Servicios y Ajustes). Este archivo solo se
   usa como respaldo mientras la base de datos esté vacía.
   ========================================================= */
window.DATOS = {
 "ajustes": {
  "whatsapp": "51987654321",
  "telefono": "+51 987 654 321",
  "direccion": "Av. Larco 1234, Miraflores, Lima",
  "correo": "hola@huellitas.pe",
  "abre": "9:00",
  "cierra": "19:00",
  "domingoCierra": "13:00",
  "delivery": 10,
  "deliveryGratis": 150,
  "capacidad": 3,
  "turno": 30
 },
 "servicios": [
  {
   "id": "consulta",
   "cat": "salud",
   "n": "Consulta general",
   "d": "Evaluación completa, diagnóstico y tratamiento con veterinarios colegiados.",
   "p": 50,
   "icon": "steth",
   "img": "1770836037793-95bdbf190f71",
   "tipo": "principal",
   "reservable": true,
   "orden": 1,
   "visible": true,
   "domicilio": false
  },
  {
   "id": "vacuna",
   "cat": "salud",
   "n": "Vacunación",
   "d": "Calendario completo para perros y gatos con carnet digital y recordatorios.",
   "p": 45,
   "icon": "syringe",
   "img": "1770836037275-38b44e4b101f",
   "tipo": "principal",
   "reservable": true,
   "orden": 2,
   "visible": true,
   "domicilio": false
  },
  {
   "id": "bano",
   "cat": "estetica",
   "n": "Baño y peluquería",
   "d": "Baño medicado, corte de raza, limpieza de oídos y corte de uñas.",
   "p": 40,
   "icon": "scissors",
   "img": "1528846104175-4fd300ee59da",
   "tipo": "principal",
   "reservable": true,
   "orden": 3,
   "visible": true,
   "domicilio": false
  },
  {
   "id": "dental",
   "cat": "cirugia",
   "n": "Odontología",
   "d": "Limpieza dental con ultrasonido, extracciones y control de sarro.",
   "p": 150,
   "icon": "tooth",
   "img": "1770836037949-c5e8db65aa86",
   "tipo": "principal",
   "reservable": true,
   "orden": 4,
   "visible": true,
   "domicilio": false
  },
  {
   "id": "cirugia",
   "cat": "cirugia",
   "n": "Cirugía y esterilización",
   "d": "Quirófano equipado, anestesia inhalatoria y monitoreo constante.",
   "p": 250,
   "icon": "scalpel",
   "img": "1628009368231-7bb7cfcb0def",
   "tipo": "principal",
   "reservable": true,
   "orden": 5,
   "visible": true,
   "domicilio": false
  },
  {
   "id": "laboratorio",
   "cat": "salud",
   "n": "Laboratorio clínico",
   "d": "Hemograma, bioquímica y pruebas rápidas con resultados el mismo día.",
   "p": 60,
   "icon": "flask",
   "img": "1758691461990-03b49d969495",
   "tipo": "principal",
   "reservable": true,
   "orden": 6,
   "visible": true,
   "domicilio": false
  },
  {
   "id": "desparasitacion",
   "cat": "salud",
   "n": "Desparasitación",
   "d": "Interna y externa",
   "p": 25,
   "icon": "pill",
   "img": "",
   "tipo": "adicional",
   "reservable": true,
   "orden": 7,
   "visible": true,
   "domicilio": false
  },
  {
   "id": "rayosx",
   "cat": "salud",
   "n": "Ecografía y rayos X",
   "d": "Diagnóstico por imagen",
   "p": 90,
   "icon": "xray",
   "img": "",
   "tipo": "adicional",
   "reservable": false,
   "orden": 8,
   "visible": true,
   "domicilio": false
  },
  {
   "id": "hospitalizacion",
   "cat": "cirugia",
   "n": "Hospitalización",
   "d": "Cuidado 24 h con reporte diario",
   "p": 0,
   "icon": "bed",
   "img": "",
   "tipo": "adicional",
   "reservable": false,
   "orden": 9,
   "visible": true,
   "domicilio": false
  },
  {
   "id": "domicilio",
   "cat": "especiales",
   "domicilio": true,
   "n": "Atención a domicilio",
   "d": "Vamos a tu casa",
   "p": 80,
   "icon": "home",
   "img": "",
   "tipo": "adicional",
   "reservable": true,
   "orden": 10,
   "visible": true
  },
  {
   "id": "microchip",
   "cat": "salud",
   "n": "Microchip",
   "d": "Identificación permanente",
   "p": 70,
   "icon": "chip",
   "img": "",
   "tipo": "adicional",
   "reservable": false,
   "orden": 11,
   "visible": true,
   "domicilio": false
  },
  {
   "id": "emergencias",
   "cat": "especiales",
   "n": "Emergencias 24/7",
   "d": "Siempre hay un veterinario de turno",
   "p": 0,
   "icon": "siren",
   "img": "",
   "tipo": "adicional",
   "reservable": false,
   "orden": 12,
   "visible": true,
   "domicilio": false
  },
  {
   "id": "geriatria",
   "cat": "salud",
   "n": "Geriatría",
   "d": "Chequeos para mascotas mayores",
   "p": 0,
   "icon": "heart",
   "img": "",
   "tipo": "adicional",
   "reservable": false,
   "orden": 13,
   "visible": true,
   "domicilio": false
  },
  {
   "id": "exoticos",
   "cat": "especiales",
   "n": "Animales exóticos",
   "d": "Conejos, cuyes, aves y hámsters",
   "p": 0,
   "icon": "rabbit",
   "img": "",
   "tipo": "adicional",
   "reservable": false,
   "orden": 14,
   "visible": true,
   "domicilio": false
  }
 ],
 "productos": [
  {
   "n": "Alimento Perro Adulto Razas Medianas 15 kg",
   "p": 189.9,
   "old": 219.9,
   "cat": "alimento",
   "esp": "perro",
   "tag": "Oferta",
   "img": "1581958485706-3c6f6eb4c1bf",
   "d": "Pollo y arroz, con omega 3 para piel y pelaje.",
   "destacado": true,
   "id": "p1",
   "orden": 1,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Alimento Cachorro 3 kg",
   "p": 69.9,
   "cat": "alimento",
   "esp": "perro",
   "tag": "Recomendado",
   "img": "1510337550647-e84f83e341ca",
   "d": "Con DHA para el desarrollo cerebral.",
   "destacado": true,
   "old": 0,
   "id": "p2",
   "orden": 2,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Alimento Gato Adulto 7.5 kg",
   "p": 129.9,
   "cat": "alimento",
   "esp": "gato",
   "img": "1592194996308-7b43878e84a6",
   "d": "Control de bolas de pelo y salud urinaria.",
   "old": 0,
   "tag": "",
   "destacado": false,
   "id": "p3",
   "orden": 3,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Snacks Naturales Dentales 500 g",
   "p": 24.9,
   "cat": "alimento",
   "esp": "perro",
   "tag": "Nuevo",
   "img": "1629740067905-bd3f515aa739",
   "d": "Premios que ayudan a limpiar los dientes.",
   "destacado": true,
   "old": 0,
   "id": "p4",
   "orden": 4,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Pipeta Antipulgas Perro 10 a 20 kg",
   "p": 45.0,
   "cat": "farmacia",
   "esp": "perro",
   "tag": "Recomendado",
   "img": "1604165094771-7af34f7fd4cd",
   "d": "Protección contra pulgas y garrapatas por 30 días.",
   "destacado": true,
   "old": 0,
   "id": "p5",
   "orden": 5,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Desparasitante Interno (4 tabletas)",
   "p": 18.0,
   "cat": "farmacia",
   "esp": "ambos",
   "img": "1534551767192-78b8dd45b51b",
   "d": "Amplio espectro. Consulta la dosis con tu veterinario.",
   "old": 0,
   "tag": "",
   "destacado": false,
   "id": "p6",
   "orden": 6,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Arena Sanitaria Aglomerante 10 kg",
   "p": 39.9,
   "old": 46.9,
   "cat": "higiene",
   "esp": "gato",
   "tag": "Oferta",
   "img": "1574144611937-0df059b5ef3e",
   "d": "Control de olores, sin polvo.",
   "destacado": false,
   "id": "p7",
   "orden": 7,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Shampoo Hipoalergénico 500 ml",
   "p": 32.0,
   "cat": "higiene",
   "esp": "ambos",
   "img": "1528846104175-4fd300ee59da",
   "d": "Ideal para pieles sensibles, con avena.",
   "old": 0,
   "tag": "",
   "destacado": false,
   "id": "p8",
   "orden": 8,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Correa Retráctil 5 m",
   "p": 59.9,
   "cat": "accesorios",
   "esp": "perro",
   "img": "1708062270853-ee7c66b69f07",
   "d": "Freno de un toque, para perros de hasta 25 kg.",
   "old": 0,
   "tag": "",
   "destacado": false,
   "id": "p9",
   "orden": 9,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Collar con Placa Grabada",
   "p": 35.0,
   "cat": "accesorios",
   "esp": "ambos",
   "tag": "Nuevo",
   "img": "1580129518863-f00fcf1d6e68",
   "d": "Grabamos el nombre y tu número de celular.",
   "old": 0,
   "destacado": false,
   "id": "p10",
   "orden": 10,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Casaca Impermeable para Perro",
   "p": 49.9,
   "cat": "accesorios",
   "esp": "perro",
   "img": "1746483966037-c3c9e6374e08",
   "d": "Tallas XS a L. Ideal para el invierno.",
   "old": 0,
   "tag": "",
   "destacado": false,
   "id": "p11",
   "orden": 11,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Cama Acolchada Mediana",
   "p": 99.9,
   "old": 119.9,
   "cat": "accesorios",
   "esp": "ambos",
   "tag": "Oferta",
   "img": "1611254965886-e7caa829b627",
   "d": "Funda lavable y base antideslizante.",
   "destacado": false,
   "id": "p12",
   "orden": 12,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Transportadora Mediana",
   "p": 119.0,
   "cat": "accesorios",
   "esp": "ambos",
   "img": "1563460716037-460a3ad24ba9",
   "d": "Ventilada y segura, ideal para viajes y citas.",
   "old": 0,
   "tag": "",
   "destacado": false,
   "id": "p13",
   "orden": 13,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Rascador Torre para Gatos",
   "p": 89.9,
   "cat": "juguetes",
   "esp": "gato",
   "img": "1573865526739-10659fec78a5",
   "d": "Con plataforma y juguete colgante.",
   "old": 0,
   "tag": "",
   "destacado": false,
   "id": "p14",
   "orden": 14,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Varita con Plumas para Gato",
   "p": 15.9,
   "cat": "juguetes",
   "esp": "gato",
   "img": "1560114928-40f1f1eb26a0",
   "d": "Estimula el instinto de caza y el ejercicio.",
   "old": 0,
   "tag": "",
   "destacado": false,
   "id": "p15",
   "orden": 15,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Pelota Dental Resistente",
   "p": 19.9,
   "cat": "juguetes",
   "esp": "perro",
   "img": "1493723258571-01372f1c5e04",
   "d": "Caucho natural, para mordedores fuertes.",
   "old": 0,
   "tag": "",
   "destacado": false,
   "id": "p16",
   "orden": 16,
   "visible": true,
   "stock": "disponible"
  }
 ],
 "web": {
  "marca": {
   "logo": "",
   "nombre1": "Huell",
   "nombre2": "itas",
   "eslogan": "Veterinaria & Pet Shop",
   "color1": "#5b3df5",
   "color2": "#ff6b4a"
  },
  "portada": {
   "etiqueta": "Veterinaria · Pet Shop · Grooming",
   "titulo": "Cuidamos a tu mascota",
   "tituloColor": "como parte de la familia",
   "texto": "Consultas, vacunas, baño y cirugía con veterinarios expertos. Reserva tu cita online y revisa el historial de tu mascota con tu código personal.",
   "foto": "1770836037289-e00e5f351d11",
   "cifras": [
    {
     "n": "12 años",
     "t": "de experiencia"
    },
    {
     "n": "+3,000",
     "t": "mascotas felices"
    },
    {
     "n": "24/7",
     "t": "emergencias"
    }
   ]
  },
  "nosotros": {
   "titulo": "Medicina veterinaria",
   "tituloColor": "con corazón",
   "foto": "1700665537604-412e89a285c3",
   "texto": "Empezamos como un pequeño consultorio de barrio y hoy somos una clínica completa con quirófano, laboratorio, grooming y pet shop. Lo que no cambió: tratamos a cada mascota como si fuera nuestra.",
   "puntos": [
    "Veterinarios colegiados y en capacitación constante",
    "Equipos modernos: ecógrafo, rayos X digital y laboratorio propio",
    "Historial clínico digital al que accedes con tu código",
    "Precios claros, sin sorpresas"
   ]
  },
  "equipo": [
   {
    "n": "Dra. Carla Méndez",
    "cargo": "Medicina general y dermatología",
    "d": "CMVP 4521 · 10 años cuidando perros y gatos.",
    "foto": ""
   },
   {
    "n": "Dr. Andrés Salas",
    "cargo": "Cirugía y odontología",
    "d": "CMVP 5873 · Especialista en cirugía de tejidos blandos.",
    "foto": ""
   },
   {
    "n": "Dra. Paola Gutiérrez",
    "cargo": "Felinos y exóticos",
    "d": "CMVP 6210 · Atención amigable para gatos.",
    "foto": ""
   },
   {
    "n": "Luis Ríos",
    "cargo": "Grooming y estética",
    "d": "Peluquero canino certificado · 8 años de experiencia.",
    "foto": ""
   }
  ],
  "testimonios": [
   {
    "q": "Agendé la cita de Rocky desde el celular en un minuto, y con el código veo cuándo le toca su vacuna. ¡Ya no se me olvida nada!",
    "n": "María López",
    "r": "Dueña de Rocky y Luna"
   },
   {
    "q": "Max tuvo una emergencia un domingo en la noche y nos atendieron al toque. El equipo es súper cariñoso y explica todo.",
    "n": "Jorge Ramos",
    "r": "Dueño de Max"
   },
   {
    "q": "Pido el alimento de mis gatos por WhatsApp y me llega a la casa. Precios justos y siempre hay stock.",
    "n": "Claudia Vargas",
    "r": "Dueña de Michi y Toby"
   }
  ],
  "redes": {
   "facebook": "",
   "instagram": "",
   "tiktok": ""
  },
  "emergencias": true
 },
 "categorias": {
  "productos": [
   {
    "id": "alimento",
    "n": "Alimento",
    "icon": "bag",
    "orden": 1,
    "visible": true
   },
   {
    "id": "farmacia",
    "n": "Farmacia",
    "icon": "pill",
    "orden": 2,
    "visible": true
   },
   {
    "id": "accesorios",
    "n": "Accesorios",
    "icon": "heart",
    "orden": 3,
    "visible": true
   },
   {
    "id": "juguetes",
    "n": "Juguetes",
    "icon": "star",
    "orden": 4,
    "visible": true
   },
   {
    "id": "higiene",
    "n": "Higiene",
    "icon": "sparkle",
    "orden": 5,
    "visible": true
   }
  ],
  "servicios": [
   {
    "id": "salud",
    "n": "Salud y prevención",
    "icon": "steth",
    "orden": 1,
    "visible": true
   },
   {
    "id": "estetica",
    "n": "Estética y grooming",
    "icon": "scissors",
    "orden": 2,
    "visible": true
   },
   {
    "id": "cirugia",
    "n": "Cirugía y especialidades",
    "icon": "scalpel",
    "orden": 3,
    "visible": true
   },
   {
    "id": "especiales",
    "n": "Atención especial",
    "icon": "home",
    "orden": 4,
    "visible": true
   }
  ]
 },
 "paginas": {
  "menu": [
   {
    "id": "inicio",
    "n": "Inicio",
    "visible": true
   },
   {
    "id": "servicios",
    "n": "Servicios",
    "visible": true
   },
   {
    "id": "tienda",
    "n": "Pet Shop",
    "visible": true
   },
   {
    "id": "citas",
    "n": "Reservar cita",
    "visible": true
   },
   {
    "id": "mi-mascota",
    "n": "Mi Mascota",
    "visible": true
   },
   {
    "id": "nosotros",
    "n": "Nosotros",
    "visible": true
   },
   {
    "id": "contacto",
    "n": "Contacto",
    "visible": true
   }
  ],
  "encabezados": {
   "servicios": {
    "pill": "Servicios",
    "titulo": "Servicios veterinarios",
    "tituloColor": "completos",
    "texto": "Precios referenciales. El costo final depende de la evaluación y del tamaño de tu mascota."
   },
   "tienda": {
    "pill": "Pet Shop",
    "titulo": "Todo para tu",
    "tituloColor": "perro y gato",
    "texto": "Productos recomendados por nuestros veterinarios. Agrega al carrito y pide por WhatsApp: recojo en tienda o delivery."
   },
   "citas": {
    "pill": "Citas online",
    "titulo": "Reserva la cita de",
    "tituloColor": "tu mascota",
    "texto": "Elige el servicio, el día y un horario libre. Tu cita queda confirmada al instante."
   },
   "nosotros": {
    "pill": "Nosotros",
    "titulo": "Amamos a los animales",
    "tituloColor": "tanto como tú",
    "texto": "Desde 2014 cuidamos la salud de perros, gatos y mascotas exóticas en Lima."
   },
   "contacto": {
    "pill": "Contacto",
    "titulo": "Estamos para",
    "tituloColor": "ayudarte",
    "texto": "Visítanos, llámanos o escríbenos por WhatsApp. Para emergencias atendemos las 24 horas."
   }
  },
  "inicio": [
   {
    "id": "accesos",
    "n": "Accesos rápidos",
    "visible": true
   },
   {
    "id": "servicios",
    "n": "Servicios",
    "pill": "Servicios",
    "titulo": "Todo lo que tu mascota necesita",
    "tituloColor": "en un solo lugar",
    "texto": "Medicina preventiva, estética y especialidades con precios claros.",
    "visible": true
   },
   {
    "id": "portal",
    "n": "Portal Mi Mascota",
    "pill": "Portal Mi Mascota",
    "titulo": "Su salud,",
    "tituloColor": "en tu celular",
    "texto": "En tu primera visita te damos un código personal. Con él entras desde cualquier celular, sin contraseñas ni apps.",
    "visible": true
   },
   {
    "id": "emergencias",
    "n": "Aviso de emergencias",
    "titulo": "¿Tu mascota tiene una emergencia?",
    "texto": "Atendemos las 24 horas, los 365 días. Llámanos o escríbenos y te guiamos mientras llegas.",
    "visible": true
   },
   {
    "id": "tienda",
    "n": "Productos destacados",
    "pill": "Pet Shop",
    "titulo": "Lo más pedido",
    "tituloColor": "esta semana",
    "texto": "Alimento, farmacia y accesorios recomendados por nuestros veterinarios. Pide por WhatsApp.",
    "visible": true
   },
   {
    "id": "pasos",
    "n": "Cómo reservar (pasos)",
    "pill": "Así de fácil",
    "titulo": "Tu cita en",
    "tituloColor": "4 pasos",
    "texto": "",
    "visible": true
   },
   {
    "id": "testimonios",
    "n": "Testimonios",
    "pill": "Opiniones",
    "titulo": "Familias que",
    "tituloColor": "confían en nosotros",
    "texto": "Más de 3,000 mascotas atendidas con amor y profesionalismo.",
    "visible": true
   },
   {
    "id": "cta",
    "n": "Llamado final",
    "titulo": "Tu mascota merece el mejor cuidado",
    "texto": "Reserva su cita en menos de un minuto y recibe recordatorios de vacunas, baños y controles.",
    "visible": true
   }
  ],
  "pie": {
   "texto": "Medicina veterinaria con cariño, pet shop y portal digital para que sigas la salud de tu mascota desde el celular."
  },
  "extras": [
   {
    "slug": "preguntas-frecuentes",
    "n": "Preguntas frecuentes",
    "enMenu": false,
    "pill": "Ayuda",
    "titulo": "Preguntas",
    "tituloColor": "frecuentes",
    "texto": "Resolvemos las dudas más comunes de nuestros clientes.",
    "bloques": [
     {
      "titulo": "¿Necesito cita para una consulta?",
      "texto": "Te recomendamos reservar online para no esperar. Las emergencias se atienden sin cita las 24 horas.",
      "img": "",
      "boton": "Reservar cita",
      "enlace": "citas"
     },
     {
      "titulo": "¿Cómo obtengo mi código de cliente?",
      "texto": "Te lo damos en tu primera visita o al vincular tu primera reserva. Con él ves el historial, vacunas y pagos de tu mascota.",
      "img": "",
      "boton": "Ir a Mi Mascota",
      "enlace": "mi-mascota"
     },
     {
      "titulo": "¿Hacen delivery del Pet Shop?",
      "texto": "Sí, enviamos a todo Lima. Agrega tus productos al carrito y envía tu pedido por WhatsApp.",
      "img": "",
      "boton": "Ver productos",
      "enlace": "tienda"
     }
    ]
   }
  ]
 },
 "doctores": [
  {
   "id": "carla",
   "n": "Dra. Carla Méndez",
   "esp": "Medicina general y dermatología",
   "color": "#5b3df5",
   "dias": [
    1,
    2,
    3,
    4,
    5,
    6,
    0
   ],
   "desde": "9:00",
   "hasta": "19:00",
   "foto": "",
   "activo": true,
   "ausencias": []
  },
  {
   "id": "andres",
   "n": "Dr. Andrés Salas",
   "esp": "Cirugía y odontología",
   "color": "#ff6b4a",
   "dias": [
    1,
    2,
    3,
    4,
    5,
    6
   ],
   "desde": "9:00",
   "hasta": "19:00",
   "foto": "",
   "activo": true,
   "ausencias": []
  },
  {
   "id": "paola",
   "n": "Dra. Paola Gutiérrez",
   "esp": "Felinos y exóticos",
   "color": "#19b37d",
   "dias": [
    1,
    2,
    3,
    4,
    5
   ],
   "desde": "9:00",
   "hasta": "17:00",
   "foto": "",
   "activo": true,
   "ausencias": []
  }
 ],
 "textos": [
  {
   "k": "pie.c1",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Título columna 1",
   "v": "Servicios"
  },
  {
   "k": "pie.c1a",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Enlace 1",
   "v": "Consulta y vacunas"
  },
  {
   "k": "pie.c1b",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Enlace 2",
   "v": "Baño y peluquería"
  },
  {
   "k": "pie.c1c",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Enlace 3",
   "v": "Cirugía y laboratorio"
  },
  {
   "k": "pie.c1d",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Enlace 4",
   "v": "Emergencias 24 h"
  },
  {
   "k": "pie.c2",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Título columna 2",
   "v": "Clientes"
  },
  {
   "k": "pie.c2a",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Enlace 1",
   "v": "Reservar cita"
  },
  {
   "k": "pie.c2b",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Enlace 2",
   "v": "Mi Mascota (historial)"
  },
  {
   "k": "pie.c2c",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Enlace 3",
   "v": "Pet Shop"
  },
  {
   "k": "pie.c2d",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Enlace 4",
   "v": "Contacto"
  },
  {
   "k": "pie.c3",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Título columna 3",
   "v": "Visítanos"
  },
  {
   "k": "em.btn",
   "pag": "inicio",
   "g": "Aviso de emergencias",
   "l": "Texto del botón",
   "v": "Emergencia:"
  },
  {
   "k": "cta.b1",
   "pag": "inicio",
   "g": "Llamado final",
   "l": "Botón 1",
   "v": "Reservar cita"
  },
  {
   "k": "cta.b2",
   "pag": "inicio",
   "g": "Llamado final",
   "l": "Botón 2",
   "v": "Entrar a Mi Mascota"
  },
  {
   "k": "top.emerg",
   "pag": "general",
   "g": "Barra superior",
   "l": "Texto de emergencias",
   "v": "Emergencias 24 horas:"
  },
  {
   "k": "nav.cta",
   "pag": "general",
   "g": "Menú",
   "l": "Botón del menú",
   "v": "Agendar cita"
  },
  {
   "k": "ini.b1",
   "pag": "inicio",
   "g": "Portada",
   "l": "Botón 1",
   "v": "Reservar cita"
  },
  {
   "k": "ini.b2",
   "pag": "inicio",
   "g": "Portada",
   "l": "Botón 2",
   "v": "Ver Mi Mascota"
  },
  {
   "k": "ini.f1t",
   "pag": "inicio",
   "g": "Tarjetas sobre la foto",
   "l": "Tarjeta 1 · título",
   "v": "Recordatorio"
  },
  {
   "k": "ini.f1s",
   "pag": "inicio",
   "g": "Tarjetas sobre la foto",
   "l": "Tarjeta 1 · texto",
   "v": "Rocky: vacuna en 2 días"
  },
  {
   "k": "ini.f2t",
   "pag": "inicio",
   "g": "Tarjetas sobre la foto",
   "l": "Tarjeta 2 · título",
   "v": "Cita confirmada"
  },
  {
   "k": "ini.f2s",
   "pag": "inicio",
   "g": "Tarjetas sobre la foto",
   "l": "Tarjeta 2 · texto",
   "v": "Sáb · 10:30 h · Baño"
  },
  {
   "k": "ini.f3t",
   "pag": "inicio",
   "g": "Tarjetas sobre la foto",
   "l": "Tarjeta 3 · título",
   "v": "Pedido en camino"
  },
  {
   "k": "ini.f3s",
   "pag": "inicio",
   "g": "Tarjetas sobre la foto",
   "l": "Tarjeta 3 · texto",
   "v": "Alimento 15 kg"
  },
  {
   "k": "ini.a1t",
   "pag": "inicio",
   "g": "Accesos rápidos",
   "l": "Acceso 1 · título",
   "v": "Reservar cita"
  },
  {
   "k": "ini.a1s",
   "pag": "inicio",
   "g": "Accesos rápidos",
   "l": "Acceso 1 · texto",
   "v": "Elige día y hora libre"
  },
  {
   "k": "ini.a2t",
   "pag": "inicio",
   "g": "Accesos rápidos",
   "l": "Acceso 2 · título",
   "v": "Mi Mascota"
  },
  {
   "k": "ini.a2s",
   "pag": "inicio",
   "g": "Accesos rápidos",
   "l": "Acceso 2 · texto",
   "v": "Historial con tu código"
  },
  {
   "k": "ini.a3t",
   "pag": "inicio",
   "g": "Accesos rápidos",
   "l": "Acceso 3 · título",
   "v": "Pet Shop"
  },
  {
   "k": "ini.a3s",
   "pag": "inicio",
   "g": "Accesos rápidos",
   "l": "Acceso 3 · texto",
   "v": "Delivery a tu casa"
  },
  {
   "k": "ini.a4t",
   "pag": "inicio",
   "g": "Accesos rápidos",
   "l": "Acceso 4 · título",
   "v": "Emergencias"
  },
  {
   "k": "ini.a4s",
   "pag": "inicio",
   "g": "Accesos rápidos",
   "l": "Acceso 4 · texto",
   "v": "Atención 24 horas"
  },
  {
   "k": "ini.svbtn",
   "pag": "inicio",
   "g": "Servicios",
   "l": "Texto del botón",
   "v": "Ver todos los servicios"
  },
  {
   "k": "ini.p1t",
   "pag": "inicio",
   "g": "Portal Mi Mascota",
   "l": "Punto 1 · título",
   "v": "¿A qué hora le toca?"
  },
  {
   "k": "ini.p1s",
   "pag": "inicio",
   "g": "Portal Mi Mascota",
   "l": "Punto 1 · texto",
   "v": "Ve su próxima cita con cuenta regresiva y confírmala con un toque."
  },
  {
   "k": "ini.p2t",
   "pag": "inicio",
   "g": "Portal Mi Mascota",
   "l": "Punto 2 · título",
   "v": "Carnet de vacunas digital"
  },
  {
   "k": "ini.p2s",
   "pag": "inicio",
   "g": "Portal Mi Mascota",
   "l": "Punto 2 · texto",
   "v": "Sabrás qué vacuna está al día, cuál vence pronto y cuál falta."
  },
  {
   "k": "ini.p3t",
   "pag": "inicio",
   "g": "Portal Mi Mascota",
   "l": "Punto 3 · título",
   "v": "Historial de citas"
  },
  {
   "k": "ini.p3s",
   "pag": "inicio",
   "g": "Portal Mi Mascota",
   "l": "Punto 3 · texto",
   "v": "Consultas, tratamientos, cirugías y baños con fecha y veterinario."
  },
  {
   "k": "ini.p4t",
   "pag": "inicio",
   "g": "Portal Mi Mascota",
   "l": "Punto 4 · título",
   "v": "Recordatorios"
  },
  {
   "k": "ini.p4s",
   "pag": "inicio",
   "g": "Portal Mi Mascota",
   "l": "Punto 4 · texto",
   "v": "Desparasitación, baños y recompra de alimento."
  },
  {
   "k": "ini.pbtn",
   "pag": "inicio",
   "g": "Portal Mi Mascota",
   "l": "Texto del botón",
   "v": "Probar con un código demo"
  },
  {
   "k": "ini.tibtn",
   "pag": "inicio",
   "g": "Productos destacados",
   "l": "Texto del botón",
   "v": "Ir a la tienda"
  },
  {
   "k": "ini.s1t",
   "pag": "inicio",
   "g": "Cómo reservar (pasos)",
   "l": "Paso 1 · título",
   "v": "Elige el servicio"
  },
  {
   "k": "ini.s1s",
   "pag": "inicio",
   "g": "Cómo reservar (pasos)",
   "l": "Paso 1 · texto",
   "v": "Consulta, vacuna, baño, cirugía o lo que necesite."
  },
  {
   "k": "ini.s2t",
   "pag": "inicio",
   "g": "Cómo reservar (pasos)",
   "l": "Paso 2 · título",
   "v": "Escoge día y hora"
  },
  {
   "k": "ini.s2s",
   "pag": "inicio",
   "g": "Cómo reservar (pasos)",
   "l": "Paso 2 · texto",
   "v": "Ves solo los horarios libres, sin llamar."
  },
  {
   "k": "ini.s3t",
   "pag": "inicio",
   "g": "Cómo reservar (pasos)",
   "l": "Paso 3 · título",
   "v": "Queda confirmada"
  },
  {
   "k": "ini.s3s",
   "pag": "inicio",
   "g": "Cómo reservar (pasos)",
   "l": "Paso 3 · texto",
   "v": "Al instante, y te avisamos por WhatsApp."
  },
  {
   "k": "ini.s4t",
   "pag": "inicio",
   "g": "Cómo reservar (pasos)",
   "l": "Paso 4 · título",
   "v": "Sigue todo con tu código"
  },
  {
   "k": "ini.s4s",
   "pag": "inicio",
   "g": "Cómo reservar (pasos)",
   "l": "Paso 4 · texto",
   "v": "Historial, vacunas y recordatorios en Mi Mascota."
  },
  {
   "k": "sv.nota",
   "pag": "servicios",
   "g": "Nota de precios",
   "l": "Nota debajo de los servicios",
   "v": "Los precios son de la atención. Los medicamentos y materiales que se usen se cobran aparte, según lo que necesite tu mascota."
  },
  {
   "k": "sv.masP",
   "pag": "servicios",
   "g": "Sección «Y además»",
   "l": "Etiqueta",
   "v": "Y además"
  },
  {
   "k": "sv.masT",
   "pag": "servicios",
   "g": "Sección «Y además»",
   "l": "Título",
   "v": "Más servicios para"
  },
  {
   "k": "sv.masC",
   "pag": "servicios",
   "g": "Sección «Y además»",
   "l": "Continuación (en color)",
   "v": "cada etapa"
  },
  {
   "k": "ti.k1t",
   "pag": "tienda",
   "g": "Ventajas (debajo de los productos)",
   "l": "Ventaja 1 · título",
   "v": "Delivery en Lima"
  },
  {
   "k": "ti.k1s",
   "pag": "tienda",
   "g": "Ventajas (debajo de los productos)",
   "l": "Ventaja 1 · texto",
   "v": "Gratis desde S/ 150"
  },
  {
   "k": "ti.k2t",
   "pag": "tienda",
   "g": "Ventajas (debajo de los productos)",
   "l": "Ventaja 2 · título",
   "v": "Productos originales"
  },
  {
   "k": "ti.k2s",
   "pag": "tienda",
   "g": "Ventajas (debajo de los productos)",
   "l": "Ventaja 2 · texto",
   "v": "Con registro SENASA"
  },
  {
   "k": "ti.k3t",
   "pag": "tienda",
   "g": "Ventajas (debajo de los productos)",
   "l": "Ventaja 3 · título",
   "v": "Asesoría veterinaria"
  },
  {
   "k": "ti.k3s",
   "pag": "tienda",
   "g": "Ventajas (debajo de los productos)",
   "l": "Ventaja 3 · texto",
   "v": "Te ayudamos a elegir"
  },
  {
   "k": "ti.k4t",
   "pag": "tienda",
   "g": "Ventajas (debajo de los productos)",
   "l": "Ventaja 4 · título",
   "v": "Paga como quieras"
  },
  {
   "k": "ti.k4s",
   "pag": "tienda",
   "g": "Ventajas (debajo de los productos)",
   "l": "Ventaja 4 · texto",
   "v": "Yape, Plin, tarjeta o efectivo"
  },
  {
   "k": "ci.l1",
   "pag": "citas",
   "g": "Formulario",
   "l": "Paso 1",
   "v": "1. ¿Qué servicio necesita? *"
  },
  {
   "k": "ci.l2",
   "pag": "citas",
   "g": "Formulario",
   "l": "Paso 2",
   "v": "2. Tu mascota *"
  },
  {
   "k": "ci.dir",
   "pag": "citas",
   "g": "Formulario",
   "l": "Título de la dirección (servicios a domicilio)",
   "v": "¿Dónde atendemos a tu mascota? *"
  },
  {
   "k": "ci.l3",
   "pag": "citas",
   "g": "Formulario",
   "l": "Paso 3",
   "v": "3. Elige el día y la hora *"
  },
  {
   "k": "ci.l4",
   "pag": "citas",
   "g": "Formulario",
   "l": "Paso 4",
   "v": "4. Tus datos *"
  },
  {
   "k": "ci.btn",
   "pag": "citas",
   "g": "Formulario",
   "l": "Botón de confirmar",
   "v": "Confirmar mi cita"
  },
  {
   "k": "ci.sumT",
   "pag": "citas",
   "g": "Resumen (columna derecha)",
   "l": "Título",
   "v": "Resumen de tu cita"
  },
  {
   "k": "ci.pnota",
   "pag": "citas",
   "g": "Resumen (columna derecha)",
   "l": "Nota del precio",
   "v": "Precio de la atención. Medicamentos y materiales se cobran aparte, según lo que necesite."
  },
  {
   "k": "ci.note",
   "pag": "citas",
   "g": "Resumen (columna derecha)",
   "l": "Nota",
   "v": "Tu cita queda confirmada al instante. Te enviaremos un recordatorio por WhatsApp. Llega 10 minutos antes con el carnet de tu mascota."
  },
  {
   "k": "ci.codeBtn",
   "pag": "citas",
   "g": "Resumen (columna derecha)",
   "l": "Botón inferior",
   "v": "¿Ya tienes código? Ver tus citas"
  },
  {
   "k": "mm.pill",
   "pag": "mi-mascota",
   "g": "Ingreso con código",
   "l": "Etiqueta",
   "v": "Portal de clientes"
  },
  {
   "k": "mm.t1",
   "pag": "mi-mascota",
   "g": "Ingreso con código",
   "l": "Título",
   "v": "Mi"
  },
  {
   "k": "mm.t2",
   "pag": "mi-mascota",
   "g": "Ingreso con código",
   "l": "Título (en color)",
   "v": "Mascota"
  },
  {
   "k": "mm.txt",
   "pag": "mi-mascota",
   "g": "Ingreso con código",
   "l": "Texto",
   "v": "Ingresa tu código de cliente para ver a qué hora le toca su próxima cita, su carnet de vacunas y todo su historial."
  },
  {
   "k": "mm.btn",
   "pag": "mi-mascota",
   "g": "Ingreso con código",
   "l": "Botón",
   "v": "Entrar"
  },
  {
   "k": "mm.help",
   "pag": "mi-mascota",
   "g": "Ingreso con código",
   "l": "Ayuda",
   "v": "¿No tienes código? Te lo damos en tu primera visita o"
  },
  {
   "k": "mm.helpL",
   "pag": "mi-mascota",
   "g": "Ingreso con código",
   "l": "Enlace de ayuda",
   "v": "pídelo por WhatsApp"
  },
  {
   "k": "mm.c1",
   "pag": "mi-mascota",
   "g": "Panel del cliente (títulos)",
   "l": "Próximas citas",
   "v": "Próximas citas"
  },
  {
   "k": "mm.c2",
   "pag": "mi-mascota",
   "g": "Panel del cliente (títulos)",
   "l": "Servicios y pagos",
   "v": "Servicios y pagos"
  },
  {
   "k": "mm.c3",
   "pag": "mi-mascota",
   "g": "Panel del cliente (títulos)",
   "l": "Carnet de vacunas",
   "v": "Carnet de vacunas"
  },
  {
   "k": "mm.c4",
   "pag": "mi-mascota",
   "g": "Panel del cliente (títulos)",
   "l": "Recordatorios",
   "v": "Recordatorios"
  },
  {
   "k": "mm.c5",
   "pag": "mi-mascota",
   "g": "Panel del cliente (títulos)",
   "l": "Historial",
   "v": "Historial de citas"
  },
  {
   "k": "no.pill",
   "pag": "nosotros",
   "g": "Historia",
   "l": "Etiqueta",
   "v": "Nuestra historia"
  },
  {
   "k": "no.btn",
   "pag": "nosotros",
   "g": "Historia",
   "l": "Texto del botón",
   "v": "Reservar una cita"
  },
  {
   "k": "no.eqP",
   "pag": "nosotros",
   "g": "Equipo",
   "l": "Etiqueta",
   "v": "Equipo"
  },
  {
   "k": "no.eqT",
   "pag": "nosotros",
   "g": "Equipo",
   "l": "Título",
   "v": "Conoce a"
  },
  {
   "k": "no.eqC",
   "pag": "nosotros",
   "g": "Equipo",
   "l": "Título (en color)",
   "v": "nuestro equipo"
  },
  {
   "k": "co.dir",
   "pag": "contacto",
   "g": "Títulos de los datos",
   "l": "Dirección",
   "v": "Dirección"
  },
  {
   "k": "co.tel",
   "pag": "contacto",
   "g": "Títulos de los datos",
   "l": "Teléfono",
   "v": "WhatsApp y teléfono"
  },
  {
   "k": "co.mail",
   "pag": "contacto",
   "g": "Títulos de los datos",
   "l": "Correo",
   "v": "Correo"
  },
  {
   "k": "co.hor",
   "pag": "contacto",
   "g": "Títulos de los datos",
   "l": "Horarios",
   "v": "Horarios"
  },
  {
   "k": "co.ls",
   "pag": "contacto",
   "g": "Títulos de los datos",
   "l": "Días de semana",
   "v": "Lunes a sábado"
  },
  {
   "k": "co.dom",
   "pag": "contacto",
   "g": "Títulos de los datos",
   "l": "Domingo",
   "v": "Domingos"
  },
  {
   "k": "co.em",
   "pag": "contacto",
   "g": "Títulos de los datos",
   "l": "Emergencias",
   "v": "Emergencias"
  },
  {
   "k": "co.em24",
   "pag": "contacto",
   "g": "Títulos de los datos",
   "l": "Horario de emergencias",
   "v": "24 horas"
  },
  {
   "k": "co.fT",
   "pag": "contacto",
   "g": "Formulario",
   "l": "Título",
   "v": "Escríbenos"
  },
  {
   "k": "co.fP",
   "pag": "contacto",
   "g": "Formulario",
   "l": "Texto",
   "v": "Te respondemos por WhatsApp en minutos."
  },
  {
   "k": "co.btn",
   "pag": "contacto",
   "g": "Formulario",
   "l": "Botón",
   "v": "Enviar por WhatsApp"
  }
 ],
 "imagenesFijas": [
  {
   "k": "cta",
   "pag": "inicio",
   "g": "Llamado final",
   "l": "Imagen del llamado final",
   "src": "https://images.unsplash.com/photo-1654895716780-b4664497420d?auto=format&fit=crop&w=700&q=80"
  },
  {
   "k": "mm.img",
   "pag": "mi-mascota",
   "g": "Ingreso con código",
   "l": "Imagen del ingreso",
   "src": "https://images.unsplash.com/photo-1563460716037-460a3ad24ba9?auto=format&fit=crop&w=900&q=80"
  }
 ],
 "iconos": {
  "steth": "<path d=\"M6 3v6a6 6 0 0 0 12 0V3M12 15v2a4 4 0 0 0 8 0v-3\"/><circle cx=\"20\" cy=\"12\" r=\"2\"/>",
  "syringe": "<path d=\"M18 2l4 4M17 7l3-3M19 9L8.7 19.3a2.4 2.4 0 0 1-3.4 0l-.6-.6a2.4 2.4 0 0 1 0-3.4L15 5M9 11l4 4M5 19l-3 3M14 4l6 6\"/>",
  "pill": "<path d=\"M10.5 20.5a5 5 0 0 1-7-7l10-10a5 5 0 0 1 7 7z\"/><path d=\"M8.5 8.5l7 7\"/>",
  "scissors": "<circle cx=\"6\" cy=\"6\" r=\"3\"/><circle cx=\"6\" cy=\"18\" r=\"3\"/><path d=\"M20 4L8.1 15.9M14.5 14.5L20 20M8.1 8.1L12 12\"/>",
  "scalpel": "<path d=\"M3 21l7.5-7.5M14 3l7 7-9 4-2-2z\"/>",
  "flask": "<path d=\"M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3\"/><path d=\"M7 15h10\"/>",
  "xray": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M12 6v12M8 9h8M8 12h8M9 15h6\"/>",
  "tooth": "<path d=\"M7 3c-2.5 0-4 2-4 4.5 0 3 1.5 4.5 2 7 .5 2.5 1 6.5 2.5 6.5S9.5 17 12 17s3 4 4.5 4 2-4 2.5-6.5c.5-2.5 2-4 2-7C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3z\"/>",
  "bed": "<path d=\"M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9\"/>",
  "home": "<path d=\"M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z\"/>",
  "chip": "<rect x=\"5\" y=\"5\" width=\"14\" height=\"14\" rx=\"2\"/><path d=\"M9 9h6v6H9zM9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3\"/>",
  "siren": "<path d=\"M7 18v-6a5 5 0 0 1 10 0v6M5 21h14v-3H5zM12 2v2M4.2 5.2l1.4 1.4M19.8 5.2l-1.4 1.4M2 12h2M20 12h2\"/>",
  "heart": "<path d=\"M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z\"/>",
  "rabbit": "<path d=\"M13 16a3 3 0 0 1 2.2 5H8.8A3 3 0 0 1 11 16M7 14c-1.3-3.3-.8-7.7 1-10 1.2 2 1.5 4.6 1.3 7M17 14c1.3-3.3.8-7.7-1-10-1.2 2-1.5 4.6-1.3 7\"/><circle cx=\"12\" cy=\"14\" r=\"5\"/>",
  "paw": "<circle cx=\"11\" cy=\"4\" r=\"2\"/><circle cx=\"18\" cy=\"8\" r=\"2\"/><circle cx=\"4\" cy=\"8\" r=\"2\"/><path d=\"M8 14c0-2 1.8-4 4-4s4 2 4 4c0 1.5 2 2.5 2 4.5S16.5 22 15 22c-1.2 0-2-.8-3-.8s-1.8.8-3 .8c-1.5 0-3-1.5-3-3.5S8 15.5 8 14z\"/>",
  "dog": "<path d=\"M10 5.2C10 3.9 8.9 2.8 7.6 3c-2 .3-4.2 2.5-4.6 4.6-.3 1.5.6 2.4 2 2.4M14 5.2c0-1.3 1.1-2.4 2.4-2.2 2 .3 4.2 2.5 4.6 4.6.3 1.5-.6 2.4-2 2.4\"/><path d=\"M8 14v.5M16 14v.5M11.3 17h1.4L12 18z\"/><path d=\"M4.4 11.1C4.2 12 4 13 4 14c0 4.4 3.6 7 8 7s8-2.6 8-7c0-1-.2-2-.4-2.9M7 7.5C8.4 6 10.2 5 12 5s3.6 1 5 2.5\"/>",
  "cat": "<path d=\"M12 5c.7 0 1.3.1 2 .2C15.6 3.5 18.3 1.8 20 2c.5 1.9-.3 5 .3 6.7.8 1.1 1.2 2.4 1.2 3.8C21.5 17.3 17.2 21 12 21s-9.5-3.7-9.5-8.5c0-1.4.4-2.7 1.2-3.8C4.3 7 3.5 3.9 4 2c1.7-.2 4.4 1.5 6 3.2.7-.1 1.3-.2 2-.2z\"/><path d=\"M8 14v.5M16 14v.5M11.3 16.8h1.4L12 18z\"/>",
  "sparkle": "<path d=\"M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z\"/>",
  "shield": "<path d=\"M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z\"/><path d=\"M9 12l2 2 4-4\"/>",
  "star": "<path d=\"M12 2l3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21l1.4-7L2 9.3l7-.8z\"/>",
  "truck": "<path d=\"M1 3h15v13H1zM16 8h4l3 3v5h-7z\"/><circle cx=\"5.5\" cy=\"18.5\" r=\"2.5\"/><circle cx=\"18.5\" cy=\"18.5\" r=\"2.5\"/>",
  "bag": "<path d=\"M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0\"/>"
 }
};

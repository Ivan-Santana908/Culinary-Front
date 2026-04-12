import type { Receta } from '@/types/Receta'

export const recetasEjemplo: Receta[] = [
  {
    id: 1,
    _id: '69262cceba7a9667e4068888',
    titulo: 'Pasta Carbonara Auténtica',
    descripcion: 'La receta original italiana con guanciale, huevo y pecorino. Cremosa sin usar crema.',
    calorias_porcion: 520,
    imagen: '/imagenes/carbonara.jpg',
    tiempo_preparacion: 15,
    tiempo_coccion: 12,
    porciones: 4,
    dificultad: 'Intermedio',
    tipo: 'Italiana',
    autor: {
      id: 1,
      nombre: 'Chef Antonio'
    },
    ingredientes: [
      {
        ingrediente: {
          id: 1,
          nombre: 'Spaghetti',
          unidad: 'g'
        },
        cantidad: 320
      },
      {
        ingrediente: {
          id: 2,
          nombre: 'Huevos',
          unidad: 'unidades'
        },
        cantidad: 3
      },
      {
        ingrediente: {
          id: 3,
          nombre: 'Queso pecorino',
          unidad: 'g'
        },
        cantidad: 80
      },
      {
        ingrediente: {
          id: 4,
          nombre: 'Guanciale',
          unidad: 'g'
        },
        cantidad: 100
      }
    ],
    pasos: []
  },
  {
    id: 2,
    _id: '69262cceba7a9667e4068889',
    titulo: 'Tacos de Pollo al Pastor',
    descripcion: 'Tacos mexicanos con pollo marinado, tortillas recién calentadas y vegetales frescos.',
    calorias_porcion: 380,
    tiempo_preparacion: 20,
    tiempo_coccion: 10,
    porciones: 4,
    dificultad: 'Fácil',
    tipo: 'Mexicana',
    autor: {
      id: 2,
      nombre: 'Chef María'
    },
    ingredientes: [
      {
        ingrediente: {
          id: 5,
          nombre: 'Pechuga de pollo',
          unidad: 'g'
        },
        cantidad: 500
      },
      {
        ingrediente: {
          id: 6,
          nombre: 'Tortillas de maíz',
          unidad: 'unidades'
        },
        cantidad: 12
      },
      {
        ingrediente: {
          id: 7,
          nombre: 'Lechuga',
          unidad: 'taza'
        },
        cantidad: 1
      },
      {
        ingrediente: {
          id: 8,
          nombre: 'Tomates',
          unidad: 'unidades'
        },
        cantidad: 2
      }
    ],
    pasos: []
  },
  {
    id: 3,
    _id: '69262cceba7a9667e406888a',
    titulo: 'Bowl de Buddha vegetariano',
    descripcion: 'Bowl nutritivo con garbanzos, verduras asadas y tahini.',
    ingredientes: [
      {
        ingrediente: {
          id: 8,
          nombre: 'Garbanzos cocidos',
          unidad: 'g'
        },
        cantidad: 400
      },
      {
        ingrediente: {
          id: 9,
          nombre: 'Batata',
          unidad: 'g'
        },
        cantidad: 300
      },
      {
        ingrediente: {
          id: 10,
          nombre: 'Kale',
          unidad: 'g'
        },
        cantidad: 200
      }
    ],
    calorias_porcion: 420,
    tiempo_preparacion: 20,
    tiempo_coccion: 30,
    porciones: 4,
    dificultad: 'Intermedio',
    imagen: '/src/imagenes/buddha-bowl.png',
    tipo: 'Vegetariana',
    autor: {
      id: 1,
      nombre: 'Chef Verde'
    },
    pasos: [
      'Asar las verduras en el horno',
      'Preparar la salsa de tahini',
      'Montar los bowls con los ingredientes'
    ]
  },
  {
    id: 4,
    _id: '689e1b70a96733d4bbaaff67',
    titulo: 'Salmón con costra de hierbas',
    descripcion: 'Filete de salmón con costra crujiente de hierbas y limón.',
    ingredientes: [
      {
        ingrediente: {
          id: 11,
          nombre: 'Salmón',
          unidad: 'g'
        },
        cantidad: 600
      },
      {
        ingrediente: {
          id: 12,
          nombre: 'Pan rallado sin gluten',
          unidad: 'g'
        },
        cantidad: 100
      },
      {
        ingrediente: {
          id: 13,
          nombre: 'Perejil fresco',
          unidad: 'g'
        },
        cantidad: 30
      }
    ],
    calorias_porcion: 350,
    tiempo_preparacion: 15,
    tiempo_coccion: 20,
    porciones: 4,
    dificultad: 'Intermedio',
    imagen: '/src/imagenes/salmon.png',
    tipo: 'Sin gluten',
    autor: {
      id: 3,
      nombre: 'Chef Especial'
    },
    pasos: [
      'Preparar la costra de hierbas',
      'Cubrir el salmón',
      'Hornear hasta que esté dorado'
    ]
  },
  {
    id: 5,
    _id: '689e1b72a96733d4bbaaff6b',
    titulo: 'Curry de lentejas',
    descripcion: 'Curry aromático de lentejas rojas con leche de coco.',
    ingredientes: [
      {
        ingrediente: {
          id: 14,
          nombre: 'Lentejas rojas',
          unidad: 'g'
        },
        cantidad: 300
      },
      {
        ingrediente: {
          id: 15,
          nombre: 'Leche de coco',
          unidad: 'ml'
        },
        cantidad: 400
      },
      {
        ingrediente: {
          id: 16,
          nombre: 'Espinacas',
          unidad: 'g'
        },
        cantidad: 200
      }
    ],
    calorias_porcion: 310,
    tiempo_preparacion: 10,
    tiempo_coccion: 25,
    porciones: 6,
    dificultad: 'Fácil',
    imagen: '/src/imagenes/curry.png',
    tipo: 'Vegana',
    autor: {
      id: 1,
      nombre: 'Chef Verde'
    },
    pasos: [
      'Sofreír las especias',
      'Agregar lentejas y leche de coco',
      'Cocinar hasta que espese'
    ]
  },
  {
    id: 6,
    titulo: 'Ensalada proteica de atún',
    descripcion: 'Ensalada completa con atún, huevo y verduras frescas.',
    ingredientes: [
      {
        ingrediente: {
          id: 17,
          nombre: 'Atún en agua',
          unidad: 'g'
        },
        cantidad: 300
      },
      {
        ingrediente: {
          id: 18,
          nombre: 'Huevos',
          unidad: 'unidad'
        },
        cantidad: 4
      },
      {
        ingrediente: {
          id: 19,
          nombre: 'Mix de lechugas',
          unidad: 'g'
        },
        cantidad: 200
      }
    ],
    calorias_porcion: 290,
    tiempo_preparacion: 15,
    tiempo_coccion: 10,
    porciones: 4,
    dificultad: 'Fácil',
    imagen: '/src/imagenes/ensalada-atun.png',
    tipo: 'Alta proteína',
    autor: {
      id: 2,
      nombre: 'Chef Principal'
    },
    pasos: [
      'Cocer los huevos',
      'Preparar la vinagreta',
      'Montar la ensalada'
    ]
  },
  {
    id: 7,
    titulo: 'Pizza sin gluten de verduras',
    descripcion: 'Pizza casera con masa sin gluten y verduras asadas.',
    ingredientes: [
      {
        ingrediente: {
          id: 20,
          nombre: 'Harina sin gluten',
          unidad: 'g'
        },
        cantidad: 300
      },
      {
        ingrediente: {
          id: 21,
          nombre: 'Calabacín',
          unidad: 'unidad'
        },
        cantidad: 1
      },
      {
        ingrediente: {
          id: 22,
          nombre: 'Mozzarella sin lactosa',
          unidad: 'g'
        },
        cantidad: 200
      }
    ],
    calorias_porcion: 285,
    tiempo_preparacion: 30,
    tiempo_coccion: 20,
    porciones: 4,
    dificultad: 'Intermedio',
    imagen: '/src/imagenes/pizza.png',
    tipo: 'Sin gluten',
    autor: {
      id: 3,
      nombre: 'Chef Especial'
    },
    pasos: [
      'Preparar la masa sin gluten',
      'Asar las verduras',
      'Hornear la pizza'
    ]
  },
  {
    id: 8,
    titulo: 'Batido verde proteico',
    descripcion: 'Batido nutritivo con espinacas, plátano y proteína vegetal.',
    ingredientes: [
      {
        ingrediente: {
          id: 23,
          nombre: 'Espinacas frescas',
          unidad: 'g'
        },
        cantidad: 100
      },
      {
        ingrediente: {
          id: 24,
          nombre: 'Plátano',
          unidad: 'unidad'
        },
        cantidad: 1
      },
      {
        ingrediente: {
          id: 25,
          nombre: 'Proteína vegetal',
          unidad: 'g'
        },
        cantidad: 30
      }
    ],
    calorias_porcion: 180,
    tiempo_preparacion: 5,
    tiempo_coccion: 0,
    porciones: 2,
    dificultad: 'Fácil',
    imagen: '/src/imagenes/batido.png',
    tipo: 'Baja en calorías',
    autor: {
      id: 1,
      nombre: 'Chef Verde'
    },
    pasos: [
      'Pelar y cortar el plátano',
      'Añadir todos los ingredientes a la licuadora',
      'Batir hasta obtener una textura suave'
    ]
  },
  {
    id: 9,
    titulo: 'Bowl de avena proteica',
    descripcion: 'Avena con proteína, frutas y mantequilla de almendras.',
    ingredientes: [
      {
        ingrediente: {
          id: 26,
          nombre: 'Avena',
          unidad: 'g'
        },
        cantidad: 80
      },
      {
        ingrediente: {
          id: 27,
          nombre: 'Proteína en polvo',
          unidad: 'g'
        },
        cantidad: 30
      },
      {
        ingrediente: {
          id: 28,
          nombre: 'Mantequilla de almendras',
          unidad: 'g'
        },
        cantidad: 20
      }
    ],
    calorias_porcion: 320,
    tiempo_preparacion: 5,
    tiempo_coccion: 5,
    porciones: 1,
    dificultad: 'Fácil',
    imagen: '/src/imagenes/avena.png',
    tipo: 'Alta proteína',
    autor: {
      id: 2,
      nombre: 'Chef Principal'
    },
    pasos: [
      'Cocinar la avena',
      'Incorporar la proteína',
      'Decorar con frutas y mantequilla de almendras'
    ]
  },
  {
    id: 10,
    titulo: 'Wrap de lechuga con hummus',
    descripcion: 'Wrap saludable usando hojas de lechuga con hummus y verduras.',
    ingredientes: [
      {
        ingrediente: {
          id: 29,
          nombre: 'Hojas de lechuga romana',
          unidad: 'unidad'
        },
        cantidad: 6
      },
      {
        ingrediente: {
          id: 30,
          nombre: 'Hummus',
          unidad: 'g'
        },
        cantidad: 150
      },
      {
        ingrediente: {
          id: 31,
          nombre: 'Zanahoria rallada',
          unidad: 'g'
        },
        cantidad: 100
      }
    ],
    calorias_porcion: 165,
    tiempo_preparacion: 10,
    tiempo_coccion: 0,
    porciones: 2,
    dificultad: 'Fácil',
    imagen: '/src/imagenes/wrap.png',
    tipo: 'Baja en calorías',
    autor: {
      id: 1,
      nombre: 'Chef Verde'
    },
    pasos: [
      'Lavar y secar las hojas de lechuga',
      'Extender el hummus',
      'Rellenar con vegetales y enrollar'
    ]
  }
]

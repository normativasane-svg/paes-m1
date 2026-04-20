// PAES M1 — Datos de las 15 clases
const CLASES_DATA = {};

CLASES_DATA[1] = {
  titulo:'Números Racionales y Enteros', subtitulo:'Números — PAES 2026',
  repaso:[
    {titulo:'Números Enteros',icono:'🔢',desc:'Incluyen positivos, negativos y cero.',formula:'... −3, −2, −1, 0, 1, 2, 3 ...',items:['(−3)+(−2)=−5','5−(−3)=8','(−)×(−)=(+)']},
    {titulo:'Fracciones',icono:'➗',desc:'Razón a/b con b≠0.',formula:'a/b + c/d = (ad+bc)/bd',items:['Sumar: iguala denominadores','Multiplicar: num×num','Dividir: multiplica por el recíproco']},
    {titulo:'Valor Absoluto',icono:'📏',desc:'Distancia al cero.',formula:'|x|=x si x≥0; −x si x<0',items:['|−7|=7','|5|=5','|0|=0']},
    {titulo:'Orden de Operaciones',icono:'🔁',desc:'PEMDAS.',formula:'2+3×4 = 14 (no 20)',items:['Primero paréntesis','Luego potencias','Finalmente + y −']}
  ],
  teoria:[
    {id:'enteros',titulo:'1. Números Enteros',contenido:'Los <strong>enteros</strong> (ℤ) incluyen naturales, sus negativos y cero. En PAES aparecen operaciones combinadas donde se aplican las reglas de signos.',formula:'(−a)+(−b) = −(a+b) | (−a)×(−b) = +ab',ejemplo:'Calcula: −3 + 4×(−2) → −3 + (−8) = −11'},
    {id:'fracciones',titulo:'2. Fracciones y Racionales',contenido:'Los <strong>racionales</strong> (ℚ) son fracciones p/q con q≠0. Para dividir fracciones, multiplica por el recíproco.',formula:'a/b ÷ c/d = a/b × d/c',ejemplo:'(3/4)÷(9/8) = (3/4)×(8/9) = 24/36 = 2/3'},
    {id:'ops',titulo:'3. Operaciones Combinadas',contenido:'Orden correcto: <strong>paréntesis → potencias → ×÷ → +−</strong>. Aplicar esto evita la mayoría de errores en PAES.',formula:'[a + b×c] ÷ d',ejemplo:'[−3+(−2)²×(−1)]÷(−1) = [−3+4×(−1)]÷(−1) = [−7]÷(−1) = 7'}
  ],
  facil:[
    {id:'1f1',enunciado:'¿Cuánto es (−3)+(−5)?',opciones:['A) 8','B) −8','C) 2','D) −2'],correcta:1,area:'Suma de enteros'},
    {id:'1f2',enunciado:'¿Cuánto es (−4)×(−3)?',opciones:['A) −12','B) −7','C) 7','D) 12'],correcta:3,area:'Multiplicación'},
    {id:'1f3',enunciado:'¿Cuánto es 1/2 + 1/4?',opciones:['A) 2/6','B) 1/3','C) 3/4','D) 1/6'],correcta:2,area:'Fracciones'},
    {id:'1f4',enunciado:'¿Cuánto es (−12)÷4?',opciones:['A) 3','B) −3','C) 48','D) −48'],correcta:1,area:'División'},
    {id:'1f5',enunciado:'¿Cuánto es |−9|?',opciones:['A) −9','B) 0','C) 9','D) 81'],correcta:2,area:'Valor absoluto'},
    {id:'1f6',enunciado:'¿Cuánto es (+7)+(−10)?',opciones:['A) 17','B) −17','C) 3','D) −3'],correcta:3,area:'Suma'},
    {id:'1f7',enunciado:'¿Cuánto es (2/3)×(3/4)?',opciones:['A) 5/7','B) 6/7','C) 1/2','D) 2/4'],correcta:2,area:'Fracciones'},
    {id:'1f8',enunciado:'¿Cuánto es −5−(−3)?',opciones:['A) −8','B) −2','C) 8','D) 2'],correcta:1,area:'Resta'},
    {id:'1f9',enunciado:'¿Cuánto es (1/2)÷(1/4)?',opciones:['A) 1/8','B) 2','C) 1/2','D) 4'],correcta:1,area:'División'},
    {id:'1f10',enunciado:'¿Cuánto es 3/4 − 1/2?',opciones:['A) 2/2','B) 1/4','C) 1/2','D) 2/4'],correcta:1,area:'Fracciones'}
  ],
  medio:[
    {id:'1m1',enunciado:'Calcula: −3 + 4×(−2) − (−1)',opciones:['A) −10','B) −8','C) 0','D) −4'],correcta:1,area:'Operaciones combinadas'},
    {id:'1m2',enunciado:'¿Cuánto es (3/4)÷(9/8)?',opciones:['A) 27/32','B) 3/2','C) 2/3','D) 12/36'],correcta:2,area:'División fracciones'},
    {id:'1m3',enunciado:'Si a=−3 y b=2, ¿cuánto es a²−b²?',opciones:['A) 5','B) −5','C) 13','D) 1'],correcta:0,area:'Sustitución'},
    {id:'1m4',enunciado:'¿Cuánto es 2/3 + 3/4 − 1/6?',opciones:['A) 5/4','B) 3/2','C) 7/12','D) 4/3'],correcta:0,area:'Fracciones'},
    {id:'1m5',enunciado:'¿Cuánto es (−5/6)×(−3/10)?',opciones:['A) −1/4','B) 1/4','C) −8/16','D) 8/60'],correcta:1,area:'Multiplicación'},
    {id:'1m6',enunciado:'¿Entre qué enteros consecutivos se ubica −7/3?',opciones:['A) Entre −3 y −2','B) Entre −2 y −1','C) Entre 2 y 3','D) Entre −4 y −3'],correcta:0,area:'Recta numérica'},
    {id:'1m7',enunciado:'¿Cuánto es (5/6 − 1/3)×12?',opciones:['A) 2','B) 6','C) 4','D) 10'],correcta:1,area:'Operaciones'},
    {id:'1m8',enunciado:'Pedro debe $1.500 y recibe $800. Luego gasta el triple de lo recibido. ¿Saldo final?',opciones:['A) −$3.100','B) −$2.100','C) $800','D) −$700'],correcta:0,area:'Problemas'}
  ],
  dificil:[
    {id:'1d1',enunciado:'¿Cuánto es [−3+(−2)²×(−1)]÷(−1)?',opciones:['A) −1','B) 1','C) 7','D) −7'],correcta:2,area:'Combinadas'},
    {id:'1d2',enunciado:'¿Cuál fracción es mayor que 3/5 pero menor que 7/10?',opciones:['A) 1/2','B) 13/20','C) 4/5','D) 7/10'],correcta:1,area:'Comparación'},
    {id:'1d3',enunciado:'Tubería llena 2/5 de un estanque en 4 horas. ¿Horas para llenarlo completo?',opciones:['A) 8 h','B) 10 h','C) 12 h','D) 6 h'],correcta:1,area:'Proporcionalidad'},
    {id:'1d4',enunciado:'¿Cuánto es (−3)³ + (−2)⁴ − (−1)⁵?',opciones:['A) −10','B) −12','C) 10','D) −8'],correcta:0,area:'Potencias'},
    {id:'1d5',enunciado:'Fracción reducida equivalente a 48/180:',opciones:['A) 4/15','B) 8/30','C) 12/45','D) 2/7'],correcta:0,area:'Simplificación'}
  ]
};

CLASES_DATA[2] = {
  titulo:'Porcentaje', subtitulo:'Números — PAES 2026',
  repaso:[
    {titulo:'Fracciones y Decimales',icono:'➗',desc:'Un porcentaje es una fracción con denominador 100.',formula:'45% = 45/100 = 0,45',items:['Decimal→%: multiplica ×100','3/4 como %→75%','%→decimal: divide ÷100']},
    {titulo:'Factor Multiplicador',icono:'⚡',desc:'Para aumentos y descuentos porcentuales.',formula:'Aumento p%: ×(1 + p/100)',items:['Aumento 20%→×1,20','Descuento 30%→×0,70','Dos cambios: multiplica los factores']},
    {titulo:'Porcentaje Inverso',icono:'🔁',desc:'Cuando conoces la parte y el %, encontrar el total.',formula:'Total = Parte ÷ (p/100)',items:['40% son 18 → Total=18÷0,40=45','Identifica siempre el 100%','IVA: divide entre 1,19']},
    {titulo:'Variación Porcentual',icono:'📈',desc:'Mide cuánto cambió un valor.',formula:'Var% = ((Nuevo−Anterior)÷Anterior)×100',items:['Positivo→aumento','Negativo→disminución','Compara con el valor ANTERIOR']}
  ],
  teoria:[
    {id:'def',titulo:'1. Definición de Porcentaje',contenido:'Un <strong>porcentaje</strong> expresa un número como fracción de 100. La palabra viene del latín <em>"per centum"</em>.',formula:'Porcentaje = (Parte ÷ Total) × 100',ejemplo:'15 de 60 aprobaron → (15÷60)×100 = 25%'},
    {id:'calc',titulo:'2. Cálculo Básico',contenido:'Para calcular el <strong>X% de un número N</strong>, multiplica N por el decimal equivalente.',formula:'X% de N = (X÷100) × N',ejemplo:'30% de 250 = 0,30 × 250 = 75'},
    {id:'aumento',titulo:'3. Aumento y Disminución',contenido:'Usa el <strong>factor multiplicador</strong>: evita errores y es más rápido.',formula:'Aumento p%: ×(1+p/100) | Descuento p%: ×(1−p/100)',ejemplo:'$8.000 sube 15%: 8.000×1,15 = $9.200'},
    {id:'sucesivo',titulo:'4. Cambios Sucesivos',contenido:'<strong>¡No sumes los porcentajes!</strong> Multiplica los factores uno a uno.',formula:'Resultado = Original × Factor₁ × Factor₂',ejemplo:'−10% y −10%: ×0,90×0,90 = ×0,81 → descuento real = 19%'},
    {id:'inverso',titulo:'5. Porcentaje Inverso',contenido:'Cuando conoces la parte y el %, puedes encontrar el total diviendo.',formula:'Total = Parte ÷ (p/100)',ejemplo:'40% son 18 alumnos → Total = 18÷0,40 = 45'}
  ],
  facil:[
    {id:'2f1',enunciado:'¿Cuánto es el 25% de 200?',opciones:['A) 25','B) 50','C) 75','D) 100'],correcta:1,area:'Cálculo básico'},
    {id:'2f2',enunciado:'Expresa 3/4 como porcentaje.',opciones:['A) 34%','B) 60%','C) 75%','D) 80%'],correcta:2,area:'Fracciones y %'},
    {id:'2f3',enunciado:'¿Cuánto es el 10% de 1.500?',opciones:['A) 15','B) 100','C) 150','D) 1.050'],correcta:2,area:'Cálculo básico'},
    {id:'2f4',enunciado:'Libro $12.000 con 50% descuento. ¿Cuánto pagas?',opciones:['A) $5.000','B) $6.000','C) $8.000','D) $10.000'],correcta:1,area:'Descuentos'},
    {id:'2f5',enunciado:'Si el 20% de un número es 30, ¿cuál es ese número?',opciones:['A) 60','B) 100','C) 150','D) 200'],correcta:2,area:'% inverso'},
    {id:'2f6',enunciado:'¿Qué porcentaje representa 45 de 180?',opciones:['A) 20%','B) 25%','C) 30%','D) 45%'],correcta:1,area:'Hallar el %'},
    {id:'2f7',enunciado:'Convierte 0,65 a porcentaje.',opciones:['A) 6,5%','B) 65%','C) 0,65%','D) 650%'],correcta:1,area:'Conversión'},
    {id:'2f8',enunciado:'80 personas, 40% son hombres. ¿Cuántas mujeres hay?',opciones:['A) 32','B) 40','C) 48','D) 52'],correcta:2,area:'Complementario'},
    {id:'2f9',enunciado:'¿Cuánto es el 5% de $60.000?',opciones:['A) $300','B) $600','C) $3.000','D) $6.000'],correcta:2,area:'Cálculo básico'},
    {id:'2f10',enunciado:'Producto sube de $5.000 a $6.000. ¿Cuánto subió en %?',opciones:['A) 10%','B) 15%','C) 20%','D) 25%'],correcta:2,area:'Variación %'}
  ],
  medio:[
    {id:'2m1',enunciado:'Compra en $15.000, vende con 30% ganancia. ¿Precio de venta?',opciones:['A) $17.500','B) $18.000','C) $19.500','D) $20.000'],correcta:2,area:'Aumento %'},
    {id:'2m2',enunciado:'45 alumnos, 60% aprobó. ¿Cuántos reprobaron?',opciones:['A) 16','B) 18','C) 20','D) 27'],correcta:1,area:'Complementario'},
    {id:'2m3',enunciado:'$24.000 sube 25% luego baja 20%. ¿Precio final?',opciones:['A) $24.000','B) $25.000','C) $26.000','D) $27.000'],correcta:0,area:'Cambios sucesivos'},
    {id:'2m4',enunciado:'120 personas = 40% del total. ¿Cuántos en total?',opciones:['A) 240','B) 280','C) 300','D) 320'],correcta:2,area:'% inverso'},
    {id:'2m5',enunciado:'$480.000: baja 10%, luego sube 10%. ¿Sueldo final?',opciones:['A) $468.000','B) $475.200','C) $480.000','D) $484.800'],correcta:1,area:'Cambios sucesivos'},
    {id:'2m6',enunciado:'Descuento 15% y luego 10%. ¿Descuento total equivalente?',opciones:['A) 23,5%','B) 24,5%','C) 25%','D) 26,5%'],correcta:0,area:'Descuento combinado'},
    {id:'2m7',enunciado:'TV con IVA 19% = $238.000. ¿Precio sin IVA?',opciones:['A) $190.000','B) $193.277','C) $200.000','D) $210.000'],correcta:2,area:'IVA'},
    {id:'2m8',enunciado:'45% = 198 hombres. ¿Total de estudiantes?',opciones:['A) 380','B) 400','C) 420','D) 440'],correcta:3,area:'% inverso'}
  ],
  dificil:[
    {id:'2d1',enunciado:'30% de habitantes son niños; 25% de niños van a escuela = 3.600. ¿Total habitantes?',opciones:['A) 36.000','B) 40.000','C) 48.000','D) 60.000'],correcta:2,area:'% del %'},
    {id:'2d2',enunciado:'20% sal en 200L + 50L agua pura. ¿Nuevo % de sal?',opciones:['A) 12%','B) 14%','C) 16%','D) 18%'],correcta:2,area:'Mezclas'},
    {id:'2d3',enunciado:'Casa: +40% el 1er año y −30% el 2do. Respecto al precio inicial:',opciones:['A) 2% menor','B) 2% mayor','C) igual','D) 10% menor'],correcta:0,area:'Cambios sucesivos'},
    {id:'2d4',enunciado:'1ro 40%, 2do 35%, 3ro recibe $62.500 (el resto). ¿Herencia total?',opciones:['A) $225.000','B) $250.000','C) $275.000','D) $300.000'],correcta:1,area:'% inverso'},
    {id:'2d5',enunciado:'+20% luego −20%, precio final = $28.800. ¿Precio original?',opciones:['A) $28.000','B) $28.800','C) $30.000','D) $32.000'],correcta:2,area:'Precio original'}
  ]
};

// Clases 3-15: estructura base (ejercicios en desarrollo)
[
  [3,'Potencias y Raíces Enésimas','Números'],
  [4,'Expresiones Algebraicas','Álgebra y Funciones'],
  [5,'Proporcionalidad','Álgebra y Funciones'],
  [6,'Ecuaciones e Inecuaciones de 1° Grado','Álgebra y Funciones'],
  [7,'Sistemas de Ecuaciones Lineales 2×2','Álgebra y Funciones'],
  [8,'Función Lineal y Afín','Álgebra y Funciones'],
  [9,'Función Cuadrática','Álgebra y Funciones'],
  [10,'Pitágoras, Áreas y Perímetros','Geometría'],
  [11,'Cuerpos Geométricos: Volumen y Área','Geometría'],
  [12,'Transformaciones Isométricas','Geometría'],
  [13,'Representación de Datos','Probabilidad y Estadística'],
  [14,'Medidas de Posición','Probabilidad y Estadística'],
  [15,'Reglas de las Probabilidades','Probabilidad y Estadística']
].forEach(([n, t, eje]) => {
  CLASES_DATA[n] = {
    titulo: t,
    subtitulo: `${eje} — PAES 2026`,
    repaso: [
      {titulo:'Concepto Principal',icono:'📖',desc:`Fundamentos de ${t}.`,formula:'Ver sección Teoría',items:['Revisa las definiciones clave','Identifica las fórmulas principales','Practica con ejemplos simples']},
      {titulo:'Fórmulas Clave',icono:'📐',desc:'Las fórmulas más importantes del tema.',formula:'Ver con el/la profesor(a)',items:['Memoriza la fórmula principal','Identifica las variables','Practica sustituyendo valores']}
    ],
    teoria: [
      {id:'intro',titulo:`1. ${t}`,contenido:`Esta clase cubre los conceptos esenciales de <strong>${t}</strong> para la PAES M1.<br><br>⚠️ <em>Ejercicios y teoría detallada en desarrollo — disponibles próximamente.</em><br><br>Mientras tanto, trabaja con los apuntes de clase y la pizarra digital.`,formula:'Según el tema de la clase',ejemplo:'Ver ejercicios del libro de clases'}
    ],
    facil: Array.from({length:8}, (_, i) => ({
      id:`${n}f${i+1}`, enunciado:`Ejercicio ${i+1} — ${t} (nivel fácil)`,
      opciones:['A) Opción A','B) Opción B','C) Opción C','D) Opción D'], correcta:0, area:t
    })),
    medio: Array.from({length:5}, (_, i) => ({
      id:`${n}m${i+1}`, enunciado:`Ejercicio ${i+1} — ${t} (nivel medio)`,
      opciones:['A) Opción A','B) Opción B','C) Opción C','D) Opción D'], correcta:0, area:t
    })),
    dificil: Array.from({length:5}, (_, i) => ({
      id:`${n}d${i+1}`, enunciado:`Ejercicio ${i+1} — ${t} (nivel difícil)`,
      opciones:['A) Opción A','B) Opción B','C) Opción C','D) Opción D'], correcta:0, area:t
    }))
  };
});

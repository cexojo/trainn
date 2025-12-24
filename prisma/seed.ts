import 'dotenv/config'
import prisma from '@/prisma/client';
import bcrypt from "bcryptjs";

async function main() {
  // Wipe all data in proper order due to FKs
  await prisma.dayExerciseSeries.deleteMany({});
  await prisma.dayExercise.deleteMany({});
  await prisma.trainingDay.deleteMany({});
  await prisma.trainingWeek.deleteMany({});
  await prisma.trainingBlock.deleteMany({});
  await prisma.exercise.deleteMany({});
  await prisma.user.deleteMany({});

  // Create sample user
  const johnDoePasswordHash = await bcrypt.hash("JohnDoe2026", 10);
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      username: "johndoe",
      email: "johndoe@example.com",
      password: johnDoePasswordHash,
      role: "athlete"
    },
  });

  // Create exercises
  const exerciseData = [
    { name: "Crunch abdominal", group: "Abs" },
    { name: "Crunch en máquina", group: "Abs" },
    { name: "Crunch reverso", group: "Abs" },
    { name: "Elevaciones de piernas colgado", group: "Abs" },
    { name: "Leñadores", group: "Abs" },
    { name: "Plancha abdominal", group: "Abs" },
    { name: "Press pallof", group: "Abs" },
    { name: "Rueda abdominal", group: "Abs" },
    { name: "Aductor en máquina", group: "Adductor" },
    { name: "Aductor en máquina de pie", group: "Adductor" },
    { name: "Aductor en polea de pie", group: "Adductor" },
    { name: "Copenaghen Adductions", group: "Adductor" },
    { name: "Leg curl en máquina de pie", group: "Aislamiento de isquio" },
    { name: "Slide Leg Curl", group: "Aislamiento de isquio" },
    { name: "Elevaciones frontales con barra de pie", group: "Aislamiento delt anterior" },
    { name: "Elevaciones frontales desde polea baja en banco inclinado", group: "Aislamiento delt anterior" },
    { name: "Elevaciones frontales en banco inclinado", group: "Aislamiento delt anterior" },
    { name: "Elevaciones frontales en polea baja", group: "Aislamiento delt anterior" },
    { name: "Elevaciones frontales tumbado boca arriba en banco inclinado", group: "Aislamiento delt anterior" },
    { name: "Aducción para dorsal en polea alta", group: "Aislamiento dorsal" },
    { name: "Aducciones para dorsal ancho en máquina", group: "Aislamiento dorsal" },
    { name: "Pull Over en máquina", group: "Aislamiento dorsal" },
    { name: "Pullover polea alta", group: "Aislamiento dorsal" },
    { name: "Pullover polea alta unilateral", group: "Aislamiento dorsal" },
    { name: "Hiperextensiones lumbares en máquina", group: "Aislamiento erectores" },
    { name: "Glute Ham Raises énfasis isquiosurales", group: "Aislamiento isquio" },
    { name: "Hiperextensiones 45º foco isquiosurales", group: "Aislamiento isquio" },
    { name: "Leg curl en polea de pie", group: "Aislamiento isquio" },
    { name: "Leg curl sentado", group: "Aislamiento isquio" },
    { name: "Leg Curl tumbado", group: "Aislamiento isquio" },
    { name: "Leg curl tumbado con mancuerna", group: "Aislamiento isquio" },
    { name: "Cruces en polea sentado", group: "Aislamiento pectoral" },
    { name: "Cruces en polea de pie", group: "Aislamiento pectoral" },
    { name: "Bayesian Flies", group: "Aislamiento pectoral" },
    { name: "Cruce de poleas altas", group: "Aislamiento pectoral" },
    { name: "Cruce de poleas bajas", group: "Aislamiento pectoral" },
    { name: "Aperturas en polea en banco inclinado", group: "Aislamiento pectoral" },
    { name: "Aperturas con mancuerna en banco inclinado", group: "Aislamiento pectoral" },
    { name: "Aperturas en polea en banco plano", group: "Aislamiento pectoral" },
    { name: "Aperturas con mancuerna en banco plano", group: "Aislamiento pectoral" },
    { name: "Pec Deck", group: "Aislamiento pectoral" },
    { name: "Aperturas declinadas con mancuerna", group: "Aislamiento pectoral" },
    { name: "Aperturas declinadas en polea", group: "Aislamiento pectoral" },
    { name: "Press en polea sentado", group: "Aislamiento pectoral" },
    { name: "Press en polea de pie", group: "Aislamiento pectoral" },
    { name: "Cruces en polea en banco inclinado a 60º", group: "Aislamiento pectoral" },
    { name: "Abducción unilatleral en polea", group: "Aislamiento posterior" },
    { name: "Contractora reversa", group: "Aislamiento posterior" },
    { name: "Extensiones de hombro para deltoides posterior", group: "Aislamiento posterior" },
    { name: "FacePull", group: "Aislamiento posterior" },
    { name: "Pájaros con mancuerna de pie", group: "Aislamiento posterior" },
    { name: "Pájaros con mancuernas en banco inclinado", group: "Aislamiento posterior" },
    { name: "Pájaros desde polea baja a 2 manos", group: "Aislamiento posterior" },
    { name: "Pájaros unilaterales en polea baja", group: "Aislamiento posterior" },
    { name: "Rear Delt Row", group: "Aislamiento posterior" },
    { name: "Reverse Cable Cross", group: "Aislamiento posterior" },
    { name: "Leg Extensions", group: "Aislamiento quad" },
    { name: "Encogimientos con barra de pie", group: "Aislamiento trapecio" },
    { name: "Encogimientos con mancuernas de pie", group: "Aislamiento trapecio" },
    { name: "Encogimientos con trap bar", group: "Aislamiento trapecio" },
    { name: "Encogimientos en máquina de press", group: "Aislamiento trapecio" },
    { name: "Encogimientos en polea de pie", group: "Aislamiento trapecio" },
    { name: "Encogimientos para trapecio en banco inclinado", group: "Aislamiento trapecio" },
    { name: "Encogimientos para trapecio en multipower", group: "Aislamiento trapecio" },
    { name: "Encogimientos para trapecio en polea a 1 mano", group: "Aislamiento trapecio" },
    { name: "Encogimientos tumbado en banco inclinado", group: "Aislamiento trapecio" },
    { name: "Farmer Walks", group: "Aislamiento trapecio" },
    { name: "Agarre en pinzas", group: "Aislamiento Antebrazo" },
    { name: "Curl de muñeca", group: "Aislamiento Antebrazo" },
    { name: "Vueltas al rodillo para antebrazo", group: "Aislamiento Antebrazo" },
    { name: "Curl araña con barra", group: "Curls" },
    { name: "Curl araña con mancuernas", group: "Curls" },
    { name: "Curl araña en polea", group: "Curls" },
    { name: "Curl barra EZ en polea de pie", group: "Curls" },
    { name: "Curl bayesian", group: "Curls" },
    { name: "Curl bayesian sentado", group: "Curls" },
    { name: "Curl bayesian unilateral de pie", group: "Curls" },
    { name: "Curl con barra EZ de pie", group: "Curls" },
    { name: "Curl con barra recta", group: "Curls" },
    { name: "Curl con barra romana", group: "Curls" },
    { name: "Curl con mancuernas sentado", group: "Curls" },
    { name: "Curl concentrado con mancuerna", group: "Curls" },
    { name: "Curl en banco inclinado en polea alta", group: "Curls" },
    { name: "Curl en banco inclinado en polea baja", group: "Curls" },
    { name: "Curl martillo con mancuernas", group: "Curls" },
    { name: "Curl martillo en polea baja", group: "Curls" },
    { name: "Curl predicador con barra", group: "Curls" },
    { name: "Curl predicador con mancuerna a 1 mano", group: "Curls" },
    { name: "Curl predicador en máquina", group: "Curls" },
    { name: "Curl predicador en polea baja de pie", group: "Curls" },
    { name: "Curl predicador en polea baja unilateral con banco", group: "Curls" },
    { name: "Curl sentado en máquina", group: "Curls" },
    { name: "Curl tumbado en banco inclinado", group: "Curls" },
    { name: "Doble bíceps en polea", group: "Curls" },
    { name: "Drag Curl", group: "Curls" },
    { name: "Extensiones de codo con mancuerna trasnuca", group: "Extensiones de tríceps" },
    { name: "Extensiones de codo cruzadas o en X", group: "Extensiones de tríceps" },
    { name: "Extensiones de codo en máquina", group: "Extensiones de tríceps" },
    { name: "Extensiones de codo en polea alta trasnuca", group: "Extensiones de tríceps" },
    { name: "Extensiones de codo en polea trasnuca con cuerda", group: "Extensiones de tríceps" },
    { name: "Extensiones de codo unilateral con polea cruzada", group: "Extensiones de tríceps" },
    { name: "Extensiones en polea alta con cuerda", group: "Extensiones de tríceps" },
    { name: "Extensiones Katana", group: "Extensiones de tríceps" },
    { name: "Extensiones katana con mancuerna", group: "Extensiones de tríceps" },
    { name: "JM Press", group: "Extensiones de tríceps" },
    { name: "Kaz Press", group: "Extensiones de tríceps" },
    { name: "Máquina de fondos", group: "Extensiones de tríceps" },
    { name: "Patada en polea baja", group: "Extensiones de tríceps" },
    { name: "PJR Pull Over", group: "Extensiones de tríceps" },
    { name: "Press francés barra EZ", group: "Extensiones de tríceps" },
    { name: "Press francés con barra de pie", group: "Extensiones de tríceps" },
    { name: "Press francés con mancuernas", group: "Extensiones de tríceps" },
    { name: "Press francés en banco inclinado", group: "Extensiones de tríceps" },
    { name: "Press francés en máquina", group: "Extensiones de tríceps" },
    { name: "Press francés en polea baja", group: "Extensiones de tríceps" },
    { name: "Rompecráneos con barra EZ", group: "Extensiones de tríceps" },
    { name: "Tate Press con mancuernas", group: "Extensiones de tríceps" },
    { name: "Tate Press en polea", group: "Extensiones de tríceps" },
    { name: "Tríceps pushdown doble polea", group: "Extensiones de tríceps" },
    { name: "Tríceps pushdown torso inclinado unilateral", group: "Extensiones de tríceps" },
    { name: "Tríceps pushdowns", group: "Extensiones de tríceps" },
    { name: "Press declinado con barra", group: "Fondos/declinado" },
    { name: "Press declinado con mancuernas", group: "Fondos/declinado" },
    { name: "Fondos en paralelas", group: "Fondos/declinado" },
    { name: "Fondos en máquina", group: "Fondos/declinado" },
    { name: "Press declinado en multipower", group: "Fondos/declinado" },
    { name: "Press Declinado en máquina", group: "Fondos/declinado" },
    { name: "Elevaciones de talón en déficit en multipower", group: "Gemelo" },
    { name: "Elevaciones de talón unilaterales con mancuerna en déficit", group: "Gemelo" },
    { name: "Elevaciones de talón unilaterales en multiupower en déficit", group: "Gemelo" },
    { name: "Gemelo en máquina de pie", group: "Gemelo" },
    { name: "Gemelo en máquina inclinada", group: "Gemelo" },
    { name: "Gemelo en máquina sentado", group: "Gemelo" },
    { name: "Gemelo en multipower sentado", group: "Gemelo" },
    { name: "Gemelo en prensa", group: "Gemelo" },
    { name: "Sóleo sentado con mancuerna", group: "Gemelo" },
    { name: "Belt squat", group: "Hack" },
    { name: "Pendular Squat", group: "Hack" },
    { name: "Platz Hack Squat", group: "Hack" },
    { name: "Sentadilla Hack", group: "Hack" },
    { name: "Sissy Squat", group: "Hack" },
    { name: "Sissy Squat en Silla Romana", group: "Hack" },
    { name: "V squat", group: "Hack" },
    { name: "Abducciones con miniband", group: "Hip thrust" },
    { name: "Abducciones en máquina de pie", group: "Hip thrust" },
    { name: "Abducciones en máquina sentado", group: "Hip thrust" },
    { name: "Cable Kick Back", group: "Hip thrust" },
    { name: "Cable Kick back en banco inclinado", group: "Hip thrust" },
    { name: "Cable Pull Through", group: "Hip thrust" },
    { name: "Clam Shell", group: "Hip thrust" },
    { name: "FrogPumps", group: "Hip thrust" },
    { name: "Glute Bridge", group: "Hip thrust" },
    { name: "Glute Ham Raise énfasis Glúteo", group: "Hip thrust" },
    { name: "Gluteator Machine", group: "Hip thrust" },
    { name: "Hip thrust", group: "Hip thrust" },
    { name: "Hip thrust Unilateral con barra", group: "Hip thrust" },
    { name: "Hip thrust Unilateral con mancuerna", group: "Hip thrust" },
    { name: "Hip trhust en máquina", group: "Hip thrust" },
    { name: "Hiperextensiones 45º foco glúteo", group: "Hip thrust" },
    { name: "Hiptrhust en multipower", group: "Hip thrust" },
    { name: "Leg Swing en máquina", group: "Hip thrust" },
    { name: "MonsterWalks", group: "Hip thrust" },
    { name: "Patada de glúteo en cuadrupedia en polea baja", group: "Hip thrust" },
    { name: "Patada de glúteo en máquina", group: "Hip thrust" },
    { name: "Patada de glúteo en máquina de pie", group: "Hip thrust" },
    { name: "Patada de glúteo en multipower, cuadrupedia, unilateral", group: "Hip thrust" },
    { name: "Patada de glúteo en polea", group: "Hip thrust" },
    { name: "Patada de glúteo lateral", group: "Hip thrust" },
    { name: "Patada de glúteo reversa en máquina", group: "Hip thrust" },
    { name: "Patada de glúteo reversa en multipower", group: "Hip thrust" },
    { name: "Jalón al pecho Half Kneeling", group: "Jalón dorsal" },
    { name: "Jalon al pecho supino", group: "Jalón dorsal" },
    { name: "Jalón unilateral sentado", group: "Jalón dorsal" },
    { name: "Jalon al pecho neutro", group: "Jalón upper back" },
    { name: "Jalon al pecho prono", group: "Jalón upper back" },
    { name: "Jaon al pecho foco espalda alta", group: "Jalón upper back" },
    { name: "Elevaciones laterales apoyado en banco a 80º", group: "laterales" },
    { name: "Elevaciones laterales cable altura cadera", group: "laterales" },
    { name: "Elevaciones laterales con mancuerna apoyado lateralmente en banco inclinado", group: "laterales" },
    { name: "Elevaciones laterales con mancuerna, de pie", group: "laterales" },
    { name: "Elevaciones laterales en máquina sentado", group: "laterales" },
    { name: "Elevaciones laterales en polea baja a 2 manos", group: "laterales" },
    { name: "Elevaciones laterales en polea baja unilateral", group: "laterales" },
    { name: "Elevaciones laterales en polea medio muslo", group: "laterales" },
    { name: "Elevaciones laterales en polea pecho apoyado en banco", group: "laterales" },
    { name: "Elevaciones laterales M. Israetel Style", group: "laterales" },
    { name: "Elevaciones laterales pecho apoyado en banco", group: "laterales" },
    { name: "Elevaciones laterales sentado, pausa en acortamiento", group: "laterales" },
    { name: "Elevaciones laterales tumbado en banco 45º", group: "laterales" },
    { name: "Elevaciones laterales tumbado en polea", group: "laterales" },
    { name: "Elevaciones laterales Y", group: "laterales" },
    { name: "Remo al mentón con barra", group: "laterales" },
    { name: "Remo al mentón con mancuernas", group: "laterales" },
    { name: "Remo al mentón desde polea baja", group: "laterales" },
    { name: "Remo al mentón en multipower", group: "laterales" },
    { name: "Peso muerto convencional", group: "Peso muerto convencional" },
    { name: "Buenos días con barra libre", group: "Peso muerto rumano" },
    { name: "Buenos días con multipower", group: "Peso muerto rumano" },
    { name: "Buenos días con Safety Bar", group: "Peso muerto rumano" },
    { name: "Peso muerto en máquina", group: "Peso muerto rumano" },
    { name: "Peso muerto Piernas Rígidas SLDL", group: "Peso muerto rumano" },
    { name: "Peso muerto Rumano con mancuernas", group: "Peso muerto rumano" },
    { name: "Peso muerto Rumano", group: "Peso muerto rumano" },
    { name: "Peso muerto unilateral con barra", group: "Peso muerto rumano" },
    { name: "Peso muerto unilateral con mancuerna", group: "Peso muerto rumano" },
    { name: "Prensa 45º", group: "Prensa" },
    { name: "Prensa de piernas énfasis glúteo", group: "Prensa" },
    { name: "Prensa horizontal", group: "Prensa" },
    { name: "Prensa horizontal plate loaded", group: "Prensa" },
    { name: "Prensa pendular", group: "Prensa" },
    { name: "Vertical Leg Press", group: "Prensa" },
    { name: "Press muy inclinado con mancuernas", group: "Press inclinado" },
    { name: "Press muy inclinado en multipower", group: "Press inclinado" },
    { name: "Press inclinado con mancuernas", group: "Press inclinado" },
    { name: "Press press inclinado en multipower", group: "Press inclinado" },
    { name: "Press inclinado con barra", group: "Press inclinado" },
    { name: "Press inclinado en máquina sentado", group: "Press inclinado" },
    { name: "Press en máquina neutro convergente", group: "Press inclinado" },
    { name: "Press militar con barra", group: "Press militar" },
    { name: "Press militar con barra sentado", group: "Press militar" },
    { name: "Press militar con barra sentado a pines", group: "Press militar" },
    { name: "Press militar en máquina", group: "Press militar" },
    { name: "Press militar en máquina", group: "Press militar" },
    { name: "Press militar sentado con mancuernas", group: "Press militar" },
    { name: "Press militar sentado en multipower", group: "Press militar" },
    { name: "Press ligeramente inclinado con mancuernas", group: "Press plano" },
    { name: "Press plano con mancuernas", group: "Press plano" },
    { name: "Press ligeramente inclinado en multipower", group: "Press plano" },
    { name: "Press plano en multipower", group: "Press plano" },
    { name: "Press inverso en multipower", group: "Press plano" },
    { name: "Press cerrado en multipower", group: "Press plano" },
    { name: "Press cerrado con barra", group: "Press plano" },
    { name: "Máquina de press plano", group: "Press plano" },
    { name: "Hex Press con mancuernas", group: "Press plano" },
    { name: "Hex Press en multipower", group: "Press plano" },
    { name: "Press banca", group: "Press plano" },
    { name: "Press plano en máquina de palancas", group: "Press plano" },
    { name: "Press plano en máquina sentado", group: "Press plano" },
    { name: "Dante Row", group: "Remo dorsal" },
    { name: "Fermínrow", group: "Remo dorsal" },
    { name: "Jalón unilateral en máquina", group: "Remo dorsal" },
    { name: "Kassem Pull Down", group: "Remo dorsal" },
    { name: "Low Row énfasis en dorsal ancho", group: "Remo dorsal" },
    { name: "Low Row unilateral de pie", group: "Remo dorsal" },
    { name: "Remo alto en polea", group: "Remo dorsal" },
    { name: "Remo de pie unilateral en máquina", group: "Remo dorsal" },
    { name: "Remo gironda unilateral", group: "Remo dorsal" },
    { name: "Remo neutro en maquina", group: "Remo dorsal" },
    { name: "Single Arm Landmine Row", group: "Remo dorsal" },
    { name: "Single Arm Multipower Row", group: "Remo dorsal" },
    { name: "Rack Pulls", group: "Remo libre" },
    { name: "Remo con barra prono", group: "Remo libre" },
    { name: "Remo con barra Supino", group: "Remo libre" },
    { name: "Remo con mancuernas", group: "Remo libre" },
    { name: "Remo con trap Bar", group: "Remo libre" },
    { name: "Remo en multipower", group: "Remo libre" },
    { name: "Remo en punta", group: "Remo libre" },
    { name: "Remo gironda", group: "Remo libre" },
    { name: "Remo gironda alto", group: "Remo libre" },
    { name: "Remo Pendlay", group: "Remo libre" },
    { name: "Dominadas neutras", group: "Remo mixto" },
    { name: "Dominadas Pronas", group: "Remo mixto" },
    { name: "Dominadas supinas", group: "Remo mixto" },
    { name: "Helms Row", group: "Remo mixto" },
    { name: "Low Row énfasis espalda alta", group: "Remo mixto" },
    { name: "Meadows Row", group: "Remo mixto" },
    { name: "Remo gironda agarres independientes", group: "Remo mixto" },
    { name: "Remo unilateral con mancuerna", group: "Remo mixto" },
    { name: "Seal Row con mancuernas", group: "Remo mixto" },
    { name: "Seal Row con barra", group: "Remo mixto" },
    { name: "Remo en banco inclinado desde polea baja", group: "Remo upper back" },
    { name: "Remo en T", group: "Remo upper back" },
    { name: "Remo prono en máquina", group: "Remo upper back" },
    { name: "Remo prono en máquina de discos", group: "Remo upper back" },
    { name: "Retracciones Escapulares en polea", group: "Remo upper back" },
    { name: "Hatfield Squat", group: "Sentadilla" },
    { name: "Platz Squat en multipower", group: "Sentadilla" },
    { name: "Reverse V Squat", group: "Sentadilla" },
    { name: "Safety Bar Squat", group: "Sentadilla" },
    { name: "Sentadilla en multipower", group: "Sentadilla" },
    { name: "Sentadilla frontal", group: "Sentadilla" },
    { name: "Sentadilla libre barra alta", group: "Sentadilla" },
    { name: "Glute Press Down", group: "Unilaterales" },
    { name: "Hatfield Split Squat", group: "Unilaterales" },
    { name: "High Step Up", group: "Unilaterales" },
    { name: "Sentadilla búlgara con mancuerna + apoyo de mano", group: "Unilaterales" },
    { name: "Sentadilla búlgara en multipower", group: "Unilaterales" },
    { name: "Sentadilla búlgara énfasis glúteo", group: "Unilaterales" },
    { name: "Sentadilla búlgara libre con barra", group: "Unilaterales" },
    { name: "Split squat en multipower", group: "Unilaterales" },
    { name: "Split squat libre", group: "Unilaterales" },
    { name: "Zancadas con mancuerna", group: "Unilaterales" },
    { name: "Press muy inclinado con barra", group: "Press muy inclinado" },
    { name: "Sentadilla búlgara con mancuernas", group: "Unilaterales" },
    { name: "Sóleo sentado en máquina", group: "Gemelo" },
    { name: "curl de muñeca prono", group: "Aislamiento Antebrazo" },
  ];

  // Remove duplicates by name (keep first occurrence)
  const uniqueExercises = Array.from(
    new Map(exerciseData.map((ex) => [ex.name, ex])).values()
  );

  const exercises = [];
  for (const ex of uniqueExercises) {
    exercises.push(await prisma.exercise.create({ data: ex }));
  }

  // Start date = today (00:00)
  const globalDate = new Date();
  globalDate.setHours(0, 0, 0, 0);

  for (let b = 1; b <= 3; b++) {
    console.log(`Creating block ${b}...`);
    const block = await prisma.trainingBlock.create({
      data: {
        blockNumber: b,
        description: `Training block ${b}`,
        userId: user.id,
      },
    });

    // Pick 6 exercises per block
    const shuffledExercises = [...exercises]
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);

    // Fixed series count per exercise for whole block
    const seriesPerExercise = shuffledExercises.map(
      () => 2 + Math.floor(Math.random() * 3) // 2–4
    );

    for (let w = 1; w <= 6; w++) {
      console.log(` Creating week ${w} (block ${b})...`);
      const weekStart = new Date(globalDate);
      weekStart.setDate(globalDate.getDate() + ((b - 1) * 6 + (w - 1)) * 7);

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);

      const week = await prisma.trainingWeek.create({
        data: {
          blockId: block.id,
          weekNumber: w,
          weekStart,
          weekEnd,
        },
      });

      // 3 training days per week
      for (let d = 1; d <= 3; d++) {
        console.log(`  Creating day ${d} (week ${w}, block ${b})...`);
        const dayDate = new Date(weekStart);
        dayDate.setDate(weekStart.getDate() + (d - 1));

        const trainingDay = await prisma.trainingDay.create({
          data: {
            weekId: week.id,
            dayLabel: `Day ${d}`,
            dayNumber: d,
            date: dayDate,
          },
        });

        // Same exercises & series across the whole block
        for (let e = 0; e < shuffledExercises.length; e++) {
          const ex = shuffledExercises[e];
          const numSeries = seriesPerExercise[e];

          // Create DayExercise for each day/exercise pair.
          const dayExercise = await prisma.dayExercise.create({
            data: {
              trainingDayId: trainingDay.id,
              exerciseId: ex.id,
              day: `Day ${d}`,
              exerciseNumber: e + 1, // Sequential for exercises within the block, stable per exercise
              athleteNotes: "",
              trainerNotes: "",
            }
          });

          // Create series entries (DayExerciseSeries)
          for (let s = 1; s <= numSeries; s++) {
            await prisma.dayExerciseSeries.create({
              data: {
                
                dayExerciseId: dayExercise.id,
                seriesNumber: s,
                minReps: 6,
                maxReps: 12,
                minRir: 1,
                maxRir: 3,
                effectiveReps: null,
                effectiveWeight: null,
                effectiveRir: null,
                trainingWeekId: week.id,
                isDropset: e === 0 && s === 1,
              },
            });
          }
        }
      }
    }
    console.log(`Block ${b} created.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// This script seeds exercises and groups from a provided list.
// Usage: npx ts-node prisma/seedExercisesAndGroups.ts

import "dotenv/config";
import prisma from "@/prisma/client";

const dataRaw = `
Crunch abdominal	Abs
Crunch en máquina	Abs
Crunch reverso	Abs
Elevaciones de piernas colgado	Abs
Leñadores	Abs
Plancha abdominal	Abs
Press pallof	Abs
Rueda abdominal	Abs
Aductor en máquina	Adductor
Aductor en máquina de pie	Adductor
Aductor en polea de pie	Adductor
Copenaghen Adductions	Adductor
Leg curl en máquina de pie	Aislamiento de isquio
Slide Leg Curl	Aislamiento de isquio
Elevaciones frontales con barra de pie	Aislamiento delt anterior
Elevaciones frontales desde polea baja en banco inclinado	Aislamiento delt anterior
Elevaciones frontales en banco inclinado	Aislamiento delt anterior
Elevaciones frontales en polea baja	Aislamiento delt anterior
Elevaciones frontales tumbado boca arriba en banco inclinado	Aislamiento delt anterior
Aducción para dorsal en polea alta	Aislamiento dorsal
Aducciones para dorsal ancho en máquina	Aislamiento dorsal
Pull Over en máquina	Aislamiento dorsal
Pullover polea alta	Aislamiento dorsal
Pullover polea alta unilateral	Aislamiento dorsal
Hiperextensiones lumbares en máquina	Aislamiento erectores
Glute Ham Raises énfasis isquiosurales	Aislamiento isquio
Hiperextensiones 45º foco isquiosurales	Aislamiento isquio
Leg curl en polea de pie	Aislamiento isquio
Leg curl sentado	Aislamiento isquio
Leg Curl tumbado	Aislamiento isquio
Leg curl tumbado con mancuerna	Aislamiento isquio
Cruces en polea sentado	Aislamiento pectoral
Cruces en polea de pie	Aislamiento pectoral
Bayesian Flies	Aislamiento pectoral
Cruce de poleas altas	Aislamiento pectoral
Cruce de poleas bajas	Aislamiento pectoral
Aperturas en polea en banco inclinado	Aislamiento pectoral
Aperturas con mancuerna en banco inclinado	Aislamiento pectoral
Aperturas en polea en banco plano	Aislamiento pectoral
Aperturas con mancuerna en banco plano	Aislamiento pectoral
Pec Deck	Aislamiento pectoral
Aperturas declinadas con mancuerna	Aislamiento pectoral
Aperturas declinadas en polea	Aislamiento pectoral
Press en polea sentado	Aislamiento pectoral
Press en polea de pie	Aislamiento pectoral
Cruces en polea en banco inclinado a 60º	Aislamiento pectoral
Abducción unilatleral en polea	Aislamiento posterior
Contractora reversa	Aislamiento posterior
Extensiones de hombro para deltoides posterior	Aislamiento posterior
FacePull	Aislamiento posterior
Pájaros con mancuerna de pie	Aislamiento posterior
Pájaros con mancuernas en banco inclinado	Aislamiento posterior
Pájaros desde polea baja a 2 manos	Aislamiento posterior
Pájaros unilaterales en polea baja	Aislamiento posterior
Rear Delt Row	Aislamiento posterior
Reverse Cable Cross	Aislamiento posterior
Leg Extensions	Aislamiento quad
Encogimientos con barra de pie	Aislamiento trapecio
Encogimientos con mancuernas de pie	Aislamiento trapecio
Encogimientos con trap bar	Aislamiento trapecio
Encogimientos en máquina de press	Aislamiento trapecio
Encogimientos en polea de pie	Aislamiento trapecio
Encogimientos para trapecio en banco inclinado	Aislamiento trapecio
Encogimientos para trapecio en multipower	Aislamiento trapecio
Encogimientos para trapecio en polea a 1 mano	Aislamiento trapecio
Encogimientos tumbado en banco inclinado	Aislamiento trapecio
Farmer Walks	Aislamiento trapecio
Agarre en pinzas	Aislamiento Antebrazo
Curl de muñeca	Aislamiento Antebrazo
Vueltas al rodillo para antebrazo	Aislamiento Antebrazo
Curl araña con barra	Curls
Curl araña con mancuernas	Curls
Curl araña en polea	Curls
Curl barra EZ en polea de pie	Curls
Curl bayesian	Curls
Curl bayesian sentado	Curls
Curl bayesian unilateral de pie	Curls
Curl con barra EZ de pie	Curls
Curl con barra recta	Curls
Curl con barra romana	Curls
Curl con mancuernas sentado	Curls
Curl concentrado con mancuerna	Curls
Curl en banco inclinado en polea alta	Curls
Curl en banco inclinado en polea baja	Curls
Curl martillo con mancuernas	Curls
Curl martillo en polea baja	Curls
Curl predicador con barra	Curls
Curl predicador con mancuerna a 1 mano	Curls
Curl predicador en máquina	Curls
Curl predicador en polea baja de pie	Curls
Curl predicador en polea baja unilateral con banco	Curls
Curl sentado en máquina	Curls
Curl tumbado en banco inclinado	Curls
Doble bíceps en polea	Curls
Drag Curl	Curls
Extensiones de codo con mancuerna trasnuca	Extensiones de tríceps
Extensiones de codo cruzadas o en X	Extensiones de tríceps
Extensiones de codo en máquina	Extensiones de tríceps
Extensiones de codo en polea alta trasnuca	Extensiones de tríceps
Extensiones de codo en polea trasnuca con cuerda	Extensiones de tríceps
Extensiones de codo unilateral con polea cruzada	Extensiones de tríceps
Extensiones en polea alta con cuerda	Extensiones de tríceps
Extensiones Katana	Extensiones de tríceps
Extensiones katana con mancuerna	Extensiones de tríceps
JM Press	Extensiones de tríceps
Kaz Press	Extensiones de tríceps
Máquina de fondos	Extensiones de tríceps
Patada en polea baja	Extensiones de tríceps
PJR Pull Over	Extensiones de tríceps
Press francés barra EZ	Extensiones de tríceps
Press francés con barra de pie	Extensiones de tríceps
Press francés con mancuernas	Extensiones de tríceps
Press francés en banco inclinado	Extensiones de tríceps
Press francés en máquina	Extensiones de tríceps
Press francés en polea baja	Extensiones de tríceps
Rompecráneos con barra EZ	Extensiones de tríceps
Tate Press con mancuernas	Extensiones de tríceps
Tate Press en polea	Extensiones de tríceps
Tríceps pushdown doble polea	Extensiones de tríceps
Tríceps pushdown torso inclinado unilateral	Extensiones de tríceps
Tríceps pushdowns	Extensiones de tríceps
Press declinado con barra	Fondos/declinado
Press declinado con mancuernas	Fondos/declinado
Fondos en paralelas	Fondos/declinado
Fondos en máquina	Fondos/declinado
Press declinado en multipower	Fondos/declinado
Press Declinado en máquina	Fondos/declinado
Elevaciones de talón en déficit en multipower	Gemelo
Elevaciones de talón unilaterales con mancuerna en déficit	Gemelo
Elevaciones de talón unilaterales en multiupower en déficit	Gemelo
Gemelo en máquina de pie	Gemelo
Gemelo en máquina inclinada	Gemelo
Gemelo en máquina sentado	Gemelo
Gemelo en multipower sentado	Gemelo
Gemelo en prensa	Gemelo
Sóleo sentado con mancuerna	Gemelo
Belt squat	Hack
Pendular Squat	Hack
Platz Hack Squat	Hack
Sentadilla Hack	Hack
Sissy Squat	Hack
Sissy Squat en Silla Romana	Hack
V squat	Hack
Abducciones con miniband	Hip thrust
Abducciones en máquina de pie	Hip thrust
Abducciones en máquina sentado	Hip thrust
Cable Kick Back	Hip thrust
Cable Kick back en banco inclinado	Hip thrust
Cable Pull Through	Hip thrust
Clam Shell	Hip thrust
FrogPumps	Hip thrust
Glute Bridge	Hip thrust
Glute Ham Raise énfasis Glúteo	Hip thrust
Gluteator Machine	Hip thrust
Hip thrust	Hip thrust
Hip thrust Unilateral con barra	Hip thrust
Hip thrust Unilateral con mancuerna	Hip thrust
Hip trhust en máquina	Hip thrust
Hiperextensiones 45º foco glúteo	Hip thrust
Hiptrhust en multipower	Hip thrust
Leg Swing en máquina	Hip thrust
MonsterWalks	Hip thrust
Patada de glúteo en cuadrupedia en polea baja	Hip thrust
Patada de glúteo en máquina	Hip thrust
Patada de glúteo en máquina de pie	Hip thrust
Patada de glúteo en multipower, cuadrupedia, unilateral	Hip thrust
Patada de glúteo en polea	Hip thrust
Patada de glúteo lateral	Hip thrust
Patada de glúteo reversa en máquina	Hip thrust
Patada de glúteo reversa en multipower	Hip thrust
Jalón al pecho Half Kneeling	Jalón dorsal
Jalon al pecho supino	Jalón dorsal
Jalón unilateral sentado	Jalón dorsal
Jalon al pecho neutro	Jalón upper back
Jalon al pecho prono	Jalón upper back
Jaon al pecho foco espalda alta	Jalón upper back
Elevaciones laterales apoyado en banco a 80º	laterales
Elevaciones laterales cable altura cadera	laterales
Elevaciones laterales con mancuerna apoyado lateralmente en banco inclinado	laterales
Elevaciones laterales con mancuerna, de pie	laterales
Elevaciones laterales en máquina sentado	laterales
Elevaciones laterales en polea baja a 2 manos	laterales
Elevaciones laterales en polea baja unilateral	laterales
Elevaciones laterales en polea medio muslo	laterales
Elevaciones laterales en polea pecho apoyado en banco	laterales
Elevaciones laterales M. Israetel Style	laterales
Elevaciones laterales pecho apoyado en banco	laterales
Elevaciones laterales sentado, pausa en acortamiento	laterales
Elevaciones laterales tumbado en banco 45º	laterales
Elevaciones laterales tumbado en polea	laterales
Elevaciones laterales Y	laterales
Remo al mentón con barra	laterales
Remo al mentón con mancuernas	laterales
Remo al mentón desde polea baja	laterales
Remo al mentón en multipower	laterales
Peso muerto convencional	Peso muerto convencional
Buenos días con barra libre	Peso muerto rumano
Buenos días con multipower	Peso muerto rumano
Buenos días con Safety Bar	Peso muerto rumano
Peso muerto en máquina	Peso muerto rumano
Peso muerto Piernas Rígidas SLDL	Peso muerto rumano
Peso muerto Rumano con mancuernas	Peso muerto rumano
Peso muerto Rumano	Peso muerto rumano
Peso muerto unilateral con barra	Peso muerto rumano
Peso muerto unilateral con mancuerna	Peso muerto rumano
Prensa 45º	Prensa
Prensa de piernas énfasis glúteo	Prensa
Prensa horizontal	Prensa
Prensa horizontal plate loaded	Prensa
Prensa pendular	Prensa
Vertical Leg Press	Prensa
Press muy inclinado con mancuernas	Press inclinado
Press muy inclinado en multipower	Press inclinado
Press inclinado con mancuernas	Press inclinado
Press press inclinado en multipower	Press inclinado
Press inclinado con barra	Press inclinado
Press inclinado en máquina sentado	Press inclinado
Press en máquina neutro convergente	Press inclinado
Press militar con barra	Press militar
Press militar con barra sentado	Press militar
Press militar con barra sentado a pines	Press militar
Press militar en máquina	Press militar
Press militar en máquina	Press militar
Press militar sentado con mancuernas	Press militar
Press militar sentado en multipower	Press militar
Press ligeramente inclinado con mancuernas	Press plano
Press plano con mancuernas	Press plano
Press ligeramente inclinado en multipower	Press plano
Press plano en multipower	Press plano
Press inverso en multipower	Press plano
Press cerrado en multipower	Press plano
Press cerrado con barra	Press plano
Máquina de press plano	Press plano
Hex Press con mancuernas	Press plano
Hex Press en multipower	Press plano
Press banca	Press plano
Press plano en máquina de palancas	Press plano
Press plano en máquina sentado	Press plano
Dante Row	Remo dorsal
Fermínrow	Remo dorsal
Jalón unilateral en máquina	Remo dorsal
Kassem Pull Down	Remo dorsal
Low Row énfasis en dorsal ancho	Remo dorsal
Low Row unilateral de pie	Remo dorsal
Remo alto en polea	Remo dorsal
Remo de pie unilateral en máquina	Remo dorsal
Remo gironda unilateral	Remo dorsal
Remo neutro en maquina	Remo dorsal
Single Arm Landmine Row	Remo dorsal
Single Arm Multipower Row	Remo dorsal
Rack Pulls	Remo libre
Remo con barra prono	Remo libre
Remo con barra Supino	Remo libre
Remo con mancuernas	Remo libre
Remo con trap Bar	Remo libre
Remo en multipower	Remo libre
Remo en punta	Remo libre
Remo gironda	Remo libre
Remo gironda alto	Remo libre
Remo Pendlay	Remo libre
Dominadas neutras	Remo mixto
Dominadas Pronas	Remo mixto
Dominadas supinas	Remo mixto
Helms Row	Remo mixto
Low Row énfasis espalda alta	Remo mixto
Meadows Row	Remo mixto
Remo gironda agarres independientes	Remo mixto
Remo unilateral con mancuerna	Remo mixto
Seal Row con mancuernas	Remo mixto
Seal Row con barra	Remo mixto
Remo en banco inclinado desde polea baja	Remo upper back
Remo en T	Remo upper back
Remo prono en máquina	Remo upper back
Remo prono en máquina de discos	Remo upper back
Retracciones Escapulares en polea	Remo upper back
Hatfield Squat	Sentadilla
Platz Squat en multipower	Sentadilla
Reverse V Squat	Sentadilla
Safety Bar Squat	Sentadilla
Sentadilla en multipower	Sentadilla
Sentadilla frontal	Sentadilla
Sentadilla libre barra alta	Sentadilla
Glute Press Down	Unilaterales
Hatfield Split Squat	Unilaterales
High Step Up	Unilaterales
Sentadilla búlgara con mancuerna + apoyo de mano	Unilaterales
Sentadilla búlgara en multipower	Unilaterales
Sentadilla búlgara énfasis glúteo	Unilaterales
Sentadilla búlgara libre con barra	Unilaterales
Split squat en multipower	Unilaterales
Split squat libre	Unilaterales
Zancadas con mancuerna	Unilaterales
Press muy inclinado con barra	Press muy inclinado
Sentadilla búlgara con mancuernas	Unilaterales
Sóleo sentado en máquina	Gemelo
curl de muñeca prono	Aislamiento Antebrazo
`;

async function main() {
  const lines = dataRaw.trim().split('\n');
  // Map: groupName -> groupId, to avoid duplicated searches
  const groupIds = new Map<string, string>();

  for (const line of lines) {
    const [exercise, group] = line.split('\t');
    if (!exercise || !group) continue;

    // Handle/extract group
    let groupId = groupIds.get(group);
    if (!groupId) {
      // Find or create group by name (unique)
      let dbGroup = await prisma.exerciseGroup.findUnique({ where: { name: group } });
      if (!dbGroup) {
        dbGroup = await prisma.exerciseGroup.create({ data: { name: group } });
        console.log(`Created group: ${group}`);
      } else {
        console.log(`Group exists: ${group}`);
      }
      groupId = dbGroup.id;
      if (!groupId) throw new Error("Missing groupId for group " + group);
      groupIds.set(group, groupId);
    }

    // Handle/extract exercise
    let dbExercise = await prisma.exercise.findUnique({ where: { name: exercise } });
    if (!dbExercise) {
      await prisma.exercise.create({
        data: {
          name: exercise,
          exerciseGroupId: groupId!,
        },
      });
      console.log(`Created exercise: ${exercise} (group: ${group})`);
    } else {
      console.log(`Exercise exists: ${exercise}`);
      // Optionally, update the group if needed
      if (dbExercise.exerciseGroupId !== groupId) {
        await prisma.exercise.update({
          where: { id: dbExercise.id },
          data: { exerciseGroupId: groupId! },
        });
        console.log(`Linked existing exercise "${exercise}" to group "${group}"`);
      }
    }
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

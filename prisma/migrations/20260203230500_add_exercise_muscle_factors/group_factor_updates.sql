-- turso db shell trainn-db-dev < prisma/migrations/20260203230500_add_exercise_muscle_factors/group_factor_updates.sql
-- Bulk update: Set all exercise factor* fields for every ExerciseGroup according to the new matrix

UPDATE "Exercise" SET
  factorQuadriceps = 0.75,
  factorHamstring = 0,
  factorGlute = 1,
  factorAdductor = 0.5,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0,
  factorTriceps = 0,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0,
  factorAnteriorDelt = 0,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 0,
  factorLat = 0,
  factorLowerBack = 0.5,
  factorAbdomen = 0.5
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Sentadilla');

UPDATE "Exercise" SET
  factorQuadriceps = 1,
  factorHamstring = 0,
  factorGlute = 0.25,
  factorAdductor = 0.5,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0,
  factorTriceps = 0,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0,
  factorAnteriorDelt = 0,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 0,
  factorLat = 0,
  factorLowerBack = 0,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Hack');

UPDATE "Exercise" SET
  factorQuadriceps = 1,
  factorHamstring = 0,
  factorGlute = 1,
  factorAdductor = 0.5,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0,
  factorTriceps = 0,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0,
  factorAnteriorDelt = 0,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 0,
  factorLat = 0,
  factorLowerBack = 0,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Prensa');

UPDATE "Exercise" SET
  factorQuadriceps = 1,
  factorHamstring = 0,
  factorGlute = 1,
  factorAdductor = 0.75,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0,
  factorTriceps = 0,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0,
  factorAnteriorDelt = 0,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 0,
  factorLat = 0,
  factorLowerBack = 0.5,
  factorAbdomen = 0.5
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Unilaterales');

UPDATE "Exercise" SET
  factorQuadriceps = 0.5,
  factorHamstring = 1,
  factorGlute = 1,
  factorAdductor = 0.25,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0,
  factorTriceps = 0,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0,
  factorAnteriorDelt = 0,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 0.75,
  factorLat = 0.5,
  factorLowerBack = 1,
  factorAbdomen = 0.5
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Peso muerto convencional');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 1,
  factorGlute = 1,
  factorAdductor = 0,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0,
  factorTriceps = 0,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0,
  factorAnteriorDelt = 0,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 0.5,
  factorLat = 0.5,
  factorLowerBack = 1,
  factorAbdomen = 0.5
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Peso muerto rumano');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 0,
  factorGlute = 1,
  factorAdductor = 0,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0,
  factorTriceps = 0,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0,
  factorAnteriorDelt = 0,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 0,
  factorLat = 0,
  factorLowerBack = 0,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Hip thrust');

UPDATE "Exercise" SET
  factorQuadriceps = 1,
  factorHamstring = 0,
  factorGlute = 0,
  factorAdductor = 0,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0,
  factorTriceps = 0,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0,
  factorAnteriorDelt = 0,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 0,
  factorLat = 0,
  factorLowerBack = 0,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Aislamiento quad');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 1,
  factorGlute = 0,
  factorAdductor = 0,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0,
  factorTriceps = 0,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0,
  factorAnteriorDelt = 0,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 0,
  factorLat = 0,
  factorLowerBack = 0,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Aislamiento de isquio');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 0,
  factorGlute = 0,
  factorAdductor = 1,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0,
  factorTriceps = 0,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0,
  factorAnteriorDelt = 0,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 0,
  factorLat = 0,
  factorLowerBack = 0,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Adductor');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 0,
  factorGlute = 0,
  factorAdductor = 0,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0,
  factorTriceps = 0.5,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0,
  factorAnteriorDelt = 1,
  factorPectoral = 1,
  factorClavicularPec = 0,
  factorUpperBack = 0,
  factorLat = 0,
  factorLowerBack = 0,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Press plano');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 0,
  factorGlute = 0,
  factorAdductor = 0,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0,
  factorTriceps = 0.5,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0,
  factorAnteriorDelt = 1,
  factorPectoral = 1,
  factorClavicularPec = 1,
  factorUpperBack = 0,
  factorLat = 0,
  factorLowerBack = 0,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Press inclinado');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 0,
  factorGlute = 0,
  factorAdductor = 0,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0,
  factorTriceps = 0.5,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0,
  factorAnteriorDelt = 1,
  factorPectoral = 1,
  factorClavicularPec = 1,
  factorUpperBack = 0,
  factorLat = 0,
  factorLowerBack = 0,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Press muy inclinado');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 0,
  factorGlute = 0,
  factorAdductor = 0,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0,
  factorTriceps = 0.5,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0,
  factorAnteriorDelt = 1,
  factorPectoral = 0.25,
  factorClavicularPec = 1,
  factorUpperBack = 0,
  factorLat = 0,
  factorLowerBack = 0,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Press militar');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 0,
  factorGlute = 0,
  factorAdductor = 0,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0,
  factorTriceps = 1,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0,
  factorAnteriorDelt = 1,
  factorPectoral = 1,
  factorClavicularPec = 0,
  factorUpperBack = 0,
  factorLat = 0,
  factorLowerBack = 0,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Fondos/declinado');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 0,
  factorGlute = 0,
  factorAdductor = 0,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0,
  factorTriceps = 0,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0,
  factorAnteriorDelt = 1,
  factorPectoral = 1,
  factorClavicularPec = 0,
  factorUpperBack = 0,
  factorLat = 0,
  factorLowerBack = 0,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Aislamiento pectoral');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 0,
  factorGlute = 0,
  factorAdductor = 0,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0.25,
  factorTriceps = 0,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0.5,
  factorAnteriorDelt = 0,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 1,
  factorLat = 0.5,
  factorLowerBack = 1,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Remo libre');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 0,
  factorGlute = 0,
  factorAdductor = 0,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0.25,
  factorTriceps = 0,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0.75,
  factorAnteriorDelt = 0,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 1,
  factorLat = 0,
  factorLowerBack = 0,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Remo upper back');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 0,
  factorGlute = 0,
  factorAdductor = 0,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0.25,
  factorTriceps = 0,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0.5,
  factorAnteriorDelt = 0,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 1,
  factorLat = 1,
  factorLowerBack = 0,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Remo mixto');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 0,
  factorGlute = 0,
  factorAdductor = 0,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0.25,
  factorTriceps = 0,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0.25,
  factorAnteriorDelt = 0,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 0,
  factorLat = 1,
  factorLowerBack = 0,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Remo dorsal');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 0,
  factorGlute = 0,
  factorAdductor = 0,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0.25,
  factorTriceps = 0,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0.5,
  factorAnteriorDelt = 0,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 1,
  factorLat = 0.5,
  factorLowerBack = 0,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Jalón upper back');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 0,
  factorGlute = 0,
  factorAdductor = 0,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0.25,
  factorTriceps = 0,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0.25,
  factorAnteriorDelt = 0,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 0,
  factorLat = 1,
  factorLowerBack = 0,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Jalón dorsal');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 0,
  factorGlute = 0,
  factorAdductor = 0,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0,
  factorTriceps = 0,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0,
  factorAnteriorDelt = 0,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 0,
  factorLat = 1,
  factorLowerBack = 0,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Aislamiento dorsal');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 0,
  factorGlute = 0,
  factorAdductor = 0,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0,
  factorTriceps = 0,
  factorLateralDelt = 0,
  factorPosteriorDelt = 1,
  factorAnteriorDelt = 0,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 0,
  factorLat = 0,
  factorLowerBack = 0,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Aislamiento posterior');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 0,
  factorGlute = 0,
  factorAdductor = 0,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0,
  factorTriceps = 0,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0,
  factorAnteriorDelt = 0,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 1,
  factorLat = 0,
  factorLowerBack = 0,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Aislamiento trapecio');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 0,
  factorGlute = 0,
  factorAdductor = 0,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0,
  factorTriceps = 0,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0,
  factorAnteriorDelt = 0,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 0,
  factorLat = 0,
  factorLowerBack = 1,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Aislamiento erectores');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 0,
  factorGlute = 0,
  factorAdductor = 0,
  factorCalf = 0,
  factorForearm = 1,
  factorBiceps = 0,
  factorTriceps = 0,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0,
  factorAnteriorDelt = 0,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 0,
  factorLat = 0,
  factorLowerBack = 0,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Aislamiento antebrazo');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 0,
  factorGlute = 0,
  factorAdductor = 0,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0,
  factorTriceps = 1,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0,
  factorAnteriorDelt = 0,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 0,
  factorLat = 0,
  factorLowerBack = 0,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Extensiones de tríceps');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 0,
  factorGlute = 0,
  factorAdductor = 0,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 1,
  factorTriceps = 0,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0,
  factorAnteriorDelt = 0,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 0,
  factorLat = 0,
  factorLowerBack = 0,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Curls');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 0,
  factorGlute = 0,
  factorAdductor = 0,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0,
  factorTriceps = 0,
  factorLateralDelt = 1,
  factorPosteriorDelt = 0,
  factorAnteriorDelt = 0,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 0,
  factorLat = 0,
  factorLowerBack = 0,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Laterales');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 0,
  factorGlute = 0,
  factorAdductor = 0,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0,
  factorTriceps = 0,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0,
  factorAnteriorDelt = 1,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 0,
  factorLat = 0,
  factorLowerBack = 0,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Aislamiento delt anterior');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 0,
  factorGlute = 0,
  factorAdductor = 0,
  factorCalf = 1,
  factorForearm = 0,
  factorBiceps = 0,
  factorTriceps = 0,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0,
  factorAnteriorDelt = 0,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 0,
  factorLat = 0,
  factorLowerBack = 0,
  factorAbdomen = 0
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Gemelo');

UPDATE "Exercise" SET
  factorQuadriceps = 0,
  factorHamstring = 0,
  factorGlute = 0,
  factorAdductor = 0,
  factorCalf = 0,
  factorForearm = 0,
  factorBiceps = 0,
  factorTriceps = 0,
  factorLateralDelt = 0,
  factorPosteriorDelt = 0,
  factorAnteriorDelt = 0,
  factorPectoral = 0,
  factorClavicularPec = 0,
  factorUpperBack = 0,
  factorLat = 0,
  factorLowerBack = 0,
  factorAbdomen = 1
WHERE exerciseGroupId IN (SELECT id FROM "ExerciseGroup" WHERE name = 'Abs');

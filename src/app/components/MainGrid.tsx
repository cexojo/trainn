import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { translations } from '@/app/i18n';

import DashboardStatsPanelAdmin from './DashboardStatsPanelAdmin';
import TrainingBlocksWizard from './TrainingBlocksWizard';
import ExerciseTable from "@/app/dashboard/ExerciseTable";
import AdminAthletesPanel from "./AdminAthletesPanel";
import FollowUpActivityPanel from "./FollowUpActivityPanel";
import FollowUpBlocksPanel from "./FollowUpBlocksPanel";
import ManageBlocks from "@/app/components/ManageBlocks";
import TrainingPanel from "./TrainingPanel";
import MeasurementsPanel from "@/app/components/MeasurementsPanel";

export default function MainGrid({
  section,
  userRole,
  selectedBlock,
  setSelectedBlock,
  selectedWeek,
  setSelectedWeek,
  selectedDay,
  setSelectedDay,
  exerciseDefs,
  setExerciseDefs
}: {
  section?: string | null,
  userRole?: "admin" | "athlete" | null,
  selectedBlock?: any,
  setSelectedBlock: (block: any) => void,
  selectedWeek?: any,
  setSelectedWeek: (week: any) => void,
  selectedDay?: number | null,
  setSelectedDay?: (dayIdx: number | null) => void,
  exerciseDefs: any[],
  setExerciseDefs: (update: any) => void
}) {
  const lang = "es"; // Replace with current language context if available

  return (
    <Box sx={{ width: '100%', maxWidth: '100%' }}>
      {!section && userRole === 'admin' && <DashboardStatsPanelAdmin />}
      {section === "training-blocks" && (
        <Box sx={{ mt: 3, mb: 3 }}>
          <TrainingBlocksWizard />
        </Box>
      )}
      {section === "create-block" && userRole === 'admin' && (
        <Box sx={{ mt: 3, mb: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {translations[lang].adminMenuCreateBlock}
          </Typography>
          <TrainingBlocksWizard />
        </Box>
      )}
      {section === "manage-blocks" && userRole === 'admin' && (
        <Box sx={{ mt: 3, mb: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {translations[lang].adminMenuManageBlocks}
          </Typography>
          <ManageBlocks />
        </Box>
      )}
      {section === "athletes" && userRole === 'admin' && (
        <Box sx={{ mt: 3, mb: 3 }}>
          <AdminAthletesPanel lang={lang} />
        </Box>
      )}
      {section === "training" && userRole === 'athlete' && (
        <Box sx={{ mt: 3, mb: 3 }}>
          <TrainingPanel
            selectedBlock={selectedBlock}
            setSelectedBlock={setSelectedBlock}
            selectedWeek={selectedWeek}
            setSelectedWeek={setSelectedWeek}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            exerciseDefs={exerciseDefs}
            setExerciseDefs={setExerciseDefs}
          />
        </Box>
      )}
      {section === "measurements" && userRole === 'athlete' && (
        <Box sx={{ mt: 3, mb: 3 }}>
          <MeasurementsPanel />
        </Box>
      )}
      {section === "exercises" && userRole === 'admin' && (
        <Box sx={{ mt: 3, mb: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {translations[lang].exercises}
          </Typography>
          <ExerciseTable lang={lang} />
        </Box>
      )}
      {section === "followup-activity" && userRole === 'admin' && (
        <Box sx={{ mt: 3, mb: 3, width: "100%" }}>
          <FollowUpActivityPanel />
        </Box>
      )}
      {section === "followup-block" && userRole === 'admin' && (
        <Box sx={{ mt: 3, mb: 3, width: "100%" }}>
          <FollowUpBlocksPanel lang={lang} />
        </Box>
      )}
    </Box>
  );
}

import UserTable from '../users/UserTable';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function AthletesPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Athletes
      </Typography>
      <UserTable lang="es" />
    </Box>
  );
}

import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

import React, { useState } from 'react';
// ...rest of imports

export default function SideMenu({
  setSection,
  role
}: {
  setSection: (section: string | null) => void;
  role: "admin" | "athlete";
}) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [user, setUser] = useState<{ firstName?: string; lastName?: string; email?: string } | null>(null);

  React.useEffect(() => {
    fetch("/api/get-user-id")
      .then(res => res.json())
      .then(data => setUser({ firstName: data.firstName, lastName: data.lastName, email: data.email }))
      .catch(() => setUser(null));
  }, []);

  const handleSectionSelect = (section: string | null) => {
    setSelectedSection(section);
    setSection(section);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
        }}
      >
        {/* Display logged-in user info */}
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: "16px" }}>
            {[user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Usuariorr"}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {user?.email || ""}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          overflow: 'auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MenuContent role={role} setSection={handleSectionSelect} selectedSection={selectedSection} />
      </Box>
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}

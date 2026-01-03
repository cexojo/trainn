import * as React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded';

import { translations } from '../i18n';
import type { Lang } from '../i18n';

// Default to Spanish; adapt as needed for language support.
const lang: Lang = "es";


import { usePathname } from "next/navigation";

export default function MenuContent({
  setSection,
  selectedSection,
  role,
  onMenuItemClick,
}: {
  setSection: (section: string | null) => void;
  selectedSection?: string | null;
  role: "admin" | "athlete";
  onMenuItemClick?: () => void;
}) {
  // For admin, make Home reset to dashboard cards (section: null)
  const mainHome = [{ text: translations[lang].adminMenuHome, icon: <HomeRoundedIcon />, section: null }];

  const athleteListItems = [
    ...mainHome,
    { text: translations[lang].trainingTab, icon: <FitnessCenterRoundedIcon />, section: "training" },
  ];

  const adminListItems = [
    ...mainHome,
    { text: translations[lang].adminMenuAthletes, icon: <PeopleRoundedIcon />, section: "athletes" },
    { 
      text: translations[lang].adminMenuTrainingBlocks, 
      icon: <ViewModuleRoundedIcon />, 
      section: "training-blocks-parent",
      children: [
        { text: translations[lang].adminMenuCreateBlock, icon: <AssignmentRoundedIcon />, section: "create-block" },
        { text: translations[lang].adminMenuManageBlocks, icon: <ViewModuleRoundedIcon />, section: "manage-blocks" }
      ]
    },
    { text: translations[lang].adminMenuExercises, icon: <FitnessCenterRoundedIcon />, section: "exercises" },
  ];

  const commonSecondary = [
    { text: translations[lang].adminMenuSettings, icon: <SettingsRoundedIcon /> },
    { text: translations[lang].adminMenuAbout, icon: <InfoRoundedIcon /> },
    { text: translations[lang].adminMenuFeedback, icon: <HelpRoundedIcon /> },
  ];

  const mainList = role === "admin" ? adminListItems : athleteListItems;
  const secondaryList = role === "admin" ? commonSecondary : [];

  const [trainingBlocksOpen, setTrainingBlocksOpen] = React.useState(
    selectedSection === "create-block" || selectedSection === "manage-blocks"
  );

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainList.map((item, index) => {
          if (!('children' in item) || !item.children) {
            return (
              <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() => {
                  setSection(item.section);
                  if (onMenuItemClick) onMenuItemClick();
                }}
                selected={selectedSection === item.section}
              >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            );
          }
          // Collapsible parent: Training Blocks
          return (
            <React.Fragment key={index}>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton onClick={() => setTrainingBlocksOpen((o) => !o)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  {trainingBlocksOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={trainingBlocksOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding dense>
                  {(item.children as any[]).map((child: any, cidx: number) => (
                    <ListItem key={child.section} disablePadding sx={{ pl: 4 }}>
                      <ListItemButton
                        onClick={() => {
                          setSection(child.section);
                          if (onMenuItemClick) onMenuItemClick();
                        }}
                        selected={selectedSection === child.section}
                      >
                        <ListItemIcon>{child.icon}</ListItemIcon>
                        <ListItemText primary={child.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          );
        })}
      </List>
      {secondaryList.length > 0 && (
        <List dense>
          {secondaryList.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Stack>
  );
}

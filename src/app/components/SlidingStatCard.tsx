import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";

type Slide = {
  title: string;
  value: string;
  image?: string; // url for CardMedia, can be undefined
};

export default function SlidingStatCard({ slides, variant }: { slides: Slide[], variant?: "best" | "worst" }) {
  console.log("SlidingStatCard slides:", slides);
  const theme = useTheme();
  const [index, setIndex] = React.useState(0);

  // If slides array changes length, reset slide index
  React.useEffect(() => {
    setIndex(0);
  }, [slides.length]);

  if (!slides || slides.length === 0) return null;

  const handlePrev = () =>
    setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const handleNext = () =>
    setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

  const curr = slides[index];

  return (
    <Card sx={{ display: "flex", minWidth: 250 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6" sx={{ fontWeight: 600 }}>
            {curr.title}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            {curr.value}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="previous" onClick={handlePrev}>
            {theme.direction === "rtl" ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <Typography
            variant="caption"
            sx={{ px: 2, fontWeight: 500, color: "text.secondary" }}
          >
            {index + 1}/{slides.length}
          </Typography>
          <IconButton aria-label="next" onClick={handleNext}>
            {theme.direction === "rtl" ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}

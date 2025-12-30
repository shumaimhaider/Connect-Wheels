import { Paper, Typography, Box } from "@mui/material";

export default function StatCard({ icon: Icon, title, value, color = "primary" }) {
    return (
        <Paper
            elevation={2}
            sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                gap: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 4,
                },
            }}
        >
            <Box
                sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: `${color}.light`,
                    color: `${color}.main`,
                }}
            >
                <Icon sx={{ fontSize: 32 }} />
            </Box>
            <Box>
                <Typography variant="h4" fontWeight={700} color={`${color}.main`}>
                    {value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {title}
                </Typography>
            </Box>
        </Paper>
    );
}

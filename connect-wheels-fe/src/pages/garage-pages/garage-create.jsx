import { Container, Box } from "@mui/material";
import { GarageForm } from "../../forms/garage-form";

export default function GarageCreatePage() {
    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: 4 }}>
            <Container maxWidth="lg">
                <GarageForm />
            </Container>
        </Box>
    );
}

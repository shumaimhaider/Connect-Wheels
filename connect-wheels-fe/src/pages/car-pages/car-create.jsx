import { Container, Box } from "@mui/material";
import { CarForm } from "../../forms/car-form";

export default function CarCreatePage() {
    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: 4 }}>
            <Container maxWidth="lg">
                <CarForm />
            </Container>
        </Box>
    );
}

import { Container, Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetCarByIdQuery } from "../../redux/slices/carSlice";
import { CarForm } from "../../forms/car-form";

export default function CarEditPage() {
    const { id } = useParams();
    const { data: car, isLoading } = useGetCarByIdQuery(id);

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: 4 }}>
            <Container maxWidth="lg">
                <CarForm car={car} isEdit />
            </Container>
        </Box>
    );
}

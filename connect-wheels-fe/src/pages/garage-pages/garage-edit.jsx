import { Container, Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetGarageByIdQuery } from "../../redux/slices/garageSlice";
import { GarageForm } from "../../forms/garage-form";

export default function GarageEditPage() {
    const { id } = useParams();
    const { data: garage, isLoading } = useGetGarageByIdQuery(id);

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
                <GarageForm garage={garage} isEdit />
            </Container>
        </Box>
    );
}

import { useState } from "react";
import {
    Container,
    Box,
    Typography,
    Grid,
    Pagination,
    CircularProgress,
    Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useGetGaragesQuery } from "../../redux/slices/garageSlice";
import GarageCard from "../../components/GarageCard";
import SearchFilter from "../../components/SearchFilter";

export default function GarageListPage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({ location: "", type: "" });
    const [sortBy, setSortBy] = useState("date-desc");
    const [page, setPage] = useState(1);
    const itemsPerPage = 9;

    const { data: garages, isLoading } = useGetGaragesQuery({
        search,
        location: filters.location,
        type: filters.type,
        sortBy: sortBy.split("-")[0],
        sortOrder: sortBy.split("-")[1],
    });

    const handleFilterChange = (name, value) => {
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleSortChange = (value) => {
        setSortBy(value);
    };

    // Pagination
    const totalPages = garages ? Math.ceil(garages.length / itemsPerPage) : 0;
    const paginatedGarages = garages
        ? garages.slice((page - 1) * itemsPerPage, page * itemsPerPage)
        : [];

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: 4 }}>
            <Container maxWidth="xl">
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                    <Typography variant="h4" fontWeight={700}>
                        Explore Garages
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => navigate("/garages/create")}
                    >
                        Create Garage
                    </Button>
                </Box>

                <SearchFilter
                    searchValue={search}
                    onSearchChange={setSearch}
                    filters={[
                        {
                            name: "location",
                            label: "Location",
                            value: filters.location,
                            options: [
                                { value: "Los Angeles", label: "Los Angeles, CA" },
                                { value: "Miami", label: "Miami, FL" },
                                { value: "San Francisco", label: "San Francisco, CA" },
                                { value: "Denver", label: "Denver, CO" },
                            ],
                        },
                        {
                            name: "type",
                            label: "Type",
                            value: filters.type,
                            options: [
                                { value: "Classic", label: "Classic" },
                                { value: "Performance", label: "Performance" },
                                { value: "Electric", label: "Electric" },
                                { value: "Off-Road", label: "Off-Road" },
                                { value: "Luxury", label: "Luxury" },
                            ],
                        },
                    ]}
                    sortOptions={[
                        { value: "date-desc", label: "Newest First" },
                        { value: "date-asc", label: "Oldest First" },
                        { value: "name-asc", label: "Name (A-Z)" },
                        { value: "name-desc", label: "Name (Z-A)" },
                        { value: "followers-desc", label: "Most Followers" },
                        { value: "cars-desc", label: "Most Cars" },
                    ]}
                    onFilterChange={handleFilterChange}
                    onSortChange={handleSortChange}
                />

                {isLoading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Grid container spacing={3}>
                            {paginatedGarages.map((garage) => (
                                <Grid item xs={12} sm={6} md={4} key={garage.id}>
                                    <GarageCard garage={garage} />
                                </Grid>
                            ))}
                        </Grid>

                        {paginatedGarages.length === 0 && (
                            <Box sx={{ textAlign: "center", py: 8 }}>
                                <Typography variant="h6" color="text.secondary">
                                    No garages found
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Try adjusting your search or filters
                                </Typography>
                            </Box>
                        )}

                        {totalPages > 1 && (
                            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={(e, value) => setPage(value)}
                                    color="primary"
                                    size="large"
                                />
                            </Box>
                        )}
                    </>
                )}
            </Container>
        </Box>
    );
}

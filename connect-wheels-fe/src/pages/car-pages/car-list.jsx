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
import { useGetCarsQuery } from "../../redux/slices/carSlice";
import CarCard from "../../components/CarCard";
import SearchFilter from "../../components/SearchFilter";

export default function CarListPage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({ make: "", year: "" });
    const [sortBy, setSortBy] = useState("date-desc");
    const [page, setPage] = useState(1);
    const itemsPerPage = 9;

    const { data: cars, isLoading } = useGetCarsQuery({
        search,
        make: filters.make,
        year: filters.year ? parseInt(filters.year) : null,
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
    const totalPages = cars ? Math.ceil(cars.length / itemsPerPage) : 0;
    const paginatedCars = cars
        ? cars.slice((page - 1) * itemsPerPage, page * itemsPerPage)
        : [];

    // Get unique makes for filter
    const uniqueMakes = cars
        ? [...new Set(cars.map((car) => car.make))].sort()
        : [];

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: 4 }}>
            <Container maxWidth="xl">
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                    <Typography variant="h4" fontWeight={700}>
                        Explore Cars
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => navigate("/cars/create")}
                    >
                        Add Car
                    </Button>
                </Box>

                <SearchFilter
                    searchValue={search}
                    onSearchChange={setSearch}
                    filters={[
                        {
                            name: "make",
                            label: "Make",
                            value: filters.make,
                            options: uniqueMakes.map((make) => ({ value: make, label: make })),
                        },
                        {
                            name: "year",
                            label: "Year",
                            value: filters.year,
                            options: [
                                { value: "2024", label: "2024" },
                                { value: "2023", label: "2023" },
                                { value: "2022", label: "2022" },
                                { value: "1967", label: "1967" },
                            ],
                        },
                    ]}
                    sortOptions={[
                        { value: "date-desc", label: "Newest First" },
                        { value: "date-asc", label: "Oldest First" },
                        { value: "make-asc", label: "Make (A-Z)" },
                        { value: "make-desc", label: "Make (Z-A)" },
                        { value: "year-desc", label: "Year (Newest)" },
                        { value: "year-asc", label: "Year (Oldest)" },
                        { value: "likes-desc", label: "Most Liked" },
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
                            {paginatedCars.map((car) => (
                                <Grid item xs={12} sm={6} md={4} key={car.id}>
                                    <CarCard car={car} />
                                </Grid>
                            ))}
                        </Grid>

                        {paginatedCars.length === 0 && (
                            <Box sx={{ textAlign: "center", py: 8 }}>
                                <Typography variant="h6" color="text.secondary">
                                    No cars found
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

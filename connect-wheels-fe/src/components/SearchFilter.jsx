import { useState } from "react";
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    IconButton,
    Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function SearchFilter({
    searchValue,
    onSearchChange,
    filters = [],
    sortOptions = [],
    onFilterChange,
    onSortChange,
}) {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
                {/* Search Field */}
                <TextField
                    placeholder="Search..."
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    size="small"
                    sx={{ flexGrow: 1, minWidth: 200 }}
                    InputProps={{
                        startAdornment: <SearchIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                />

                {/* Filter Toggle */}
                {filters.length > 0 && (
                    <IconButton
                        onClick={() => setShowFilters(!showFilters)}
                        color={showFilters ? "primary" : "default"}
                    >
                        <FilterListIcon />
                    </IconButton>
                )}

                {/* Sort Options */}
                {sortOptions.length > 0 && (
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            label="Sort By"
                            defaultValue={sortOptions[0]?.value || ""}
                            onChange={(e) => onSortChange(e.target.value)}
                        >
                            {sortOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            </Box>

            {/* Filter Fields */}
            {showFilters && filters.length > 0 && (
                <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap" }}>
                    {filters.map((filter) => (
                        <FormControl key={filter.name} size="small" sx={{ minWidth: 150 }}>
                            <InputLabel>{filter.label}</InputLabel>
                            <Select
                                label={filter.label}
                                value={filter.value || ""}
                                onChange={(e) => onFilterChange(filter.name, e.target.value)}
                            >
                                <MenuItem value="">All</MenuItem>
                                {filter.options.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ))}
                </Box>
            )}
        </Paper>
    );
}

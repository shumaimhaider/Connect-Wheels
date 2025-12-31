import {
    Container,
    Typography,
    Box,
    TextField,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Button,
    Paper,
    InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "../../data/mock-data";

export default function UserSearchPage() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const filteredUsers = mockUsers.filter((user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 4 }}>
            <Container maxWidth="md">
                <Typography variant="h4" fontWeight={800} gutterBottom>
                    Search Users
                </Typography>
                <TextField
                    fullWidth
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ mb: 4 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                />

                <Paper sx={{ borderRadius: 4, overflow: "hidden" }}>
                    <List disablePadding>
                        {filteredUsers.map((user, index) => (
                            <Box key={user.id}>
                                <ListItem sx={{ py: 2 }}>
                                    <ListItemAvatar>
                                        <Avatar src={user.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<Typography fontWeight={600}>{user.firstName} {user.lastName}</Typography>}
                                        secondary={user.email}
                                    />
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => navigate(`/users/${user.id}/garages`)}
                                        sx={{ borderRadius: "16px" }}
                                    >
                                        View Garages
                                    </Button>
                                </ListItem>
                                {index < filteredUsers.length - 1 && <Divider />}
                            </Box>
                        ))}
                        {filteredUsers.length === 0 && (
                            <Box sx={{ p: 4, textAlign: "center" }}>
                                <Typography color="text.secondary">No users found</Typography>
                            </Box>
                        )}
                    </List>
                </Paper>
            </Container>
        </Box>
    );
}

import { Divider } from "@mui/material";

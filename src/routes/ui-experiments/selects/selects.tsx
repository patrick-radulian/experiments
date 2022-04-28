import { Box, Button, Grid, InputLabel, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Link as RouterLink, Outlet } from "react-router-dom";

function createData(name: string, membersCount: number) {
    return { name, membersCount }
}

const tableRows = [
    createData("Documentation Group", 159),
    createData("My Group", 237),
    createData("Project Curators", 262),
    createData("Public", 305),
    createData("Test Group", 164),
    createData("Reviewers", 87),
    createData("Admins", 16),
    createData("Wiki Users", 96),
    createData("Special Group", 214),
];

const Selects = () => {
    // const multiSelectRef_A2 = React.useRef<MultiSelectForwardRef | null>(null);
    // const multiSelectRef_B2 = React.useRef<MultiSelectForwardRef | null>(null);

    /*return (
        <Box padding={4}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item md={6} sm={12}>
                    <Grid container justifyContent="center">
                        <Link component={RouterLink} to="new-group-few" underline="hover">
                            <Button variant="contained">Create User Group</Button>
                        </Link>
                    </Grid>
                </Grid>

                <Grid item md={6} sm={12}>
                    <Container maxWidth="sm">
                        <Card sx={{width: 500}}>
                            <TextField label="Group Name"/>
                            <TextField label="Description"/>
                            <MultiSelectLabel htmlFor={multiSelectRef_A2}>Members (many options)</MultiSelectLabel>
                            <MultiSelect options={dataLarge} ref={multiSelectRef_A2} fullWidth/>
                            <MultiSelectLabel htmlFor={multiSelectRef_B2}>Priviledges</MultiSelectLabel>
                            <MultiSelect options={asdf} ref={multiSelectRef_B2} fullWidth/>
                        </Card>
                    </Container>
                </Grid>
            </Grid>

            <Outlet/>
        </Box>
    )*/

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12}>
                <Box>
                    <Paper>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item>
                                <Typography variant="h6" p={2}>Groups</Typography>
                            </Grid>
                            <Grid item pr={1}>
                                <Link component={RouterLink} to="new-group-few" underline="hover">
                                    <Button>Create User Group</Button>
                                </Link>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={4} px={2}>
                                <InputLabel htmlFor="tableSearch">Search</InputLabel>
                                <TextField id="tableSearch" size="small" fullWidth></TextField>
                            </Grid>
                        </Grid>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Members Count</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableRows.map((row) => (
                                        <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">{row.name}</TableCell>
                                            <TableCell align="right">{row.membersCount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            </Grid>

            <Outlet/>
        </Grid>
    )
}

export default Selects;
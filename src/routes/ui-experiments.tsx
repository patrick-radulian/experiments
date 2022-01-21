import { Box, Grid, Link, Paper, styled } from "@mui/material";
import { Link as RouterLink, Outlet } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const UIExperiments = () => {
    return (
        <>
            <Box sx={{maxWidth: 782, margin: "auto"}}>
                <Grid container spacing={2}>
                    <Grid item md={4} sm={6} xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Link component={RouterLink} to="selects" underline="hover">
                                <Item sx={{height: 250, width: 250}}>xs=4</Item>
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Item sx={{height: 250, width: 250}}>xs=4</Item>
                        </Box>
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Item sx={{height: 250, width: 250}}>xs=4</Item>
                        </Box>
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Item sx={{height: 250, width: 250}}>xs=4</Item>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Outlet/>
        </>
    )
}

export default UIExperiments;
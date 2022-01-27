import { Box, Card, CardContent, Container, Grid, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import styles from "./ui-experiments.module.css";

const UIExperiments = () => {
    return (
        <Box maxWidth={782} my={8} mx="auto">
            <Grid container spacing={2}>
                <Grid item md={4} sm={6} xs={12}>
                    <Box display="flex" justifyContent="center">
                        <Link component={RouterLink} to="selects" underline="hover">
                            <Card className={styles.card}>
                                <CardContent>
                                    <Container>Selects</Container>
                                </CardContent>
                            </Card>
                        </Link>
                    </Box>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <Box display="flex" justifyContent="center">
                        <Link component={RouterLink} to="forms" underline="hover">
                            <Card className={styles.card}>
                                <CardContent>
                                    <Container>Forms</Container>
                                </CardContent>
                            </Card>
                        </Link>
                    </Box>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <Box display="flex" justifyContent="center">
                        <Link component={RouterLink} to="validation" underline="hover">
                            <Card className={styles.card}>
                                <CardContent>
                                    <Container>Validation</Container>
                                </CardContent>
                            </Card>
                        </Link>
                    </Box>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                    <Box display="flex" justifyContent="center">
                        <Link component={RouterLink} to="trees" underline="hover">
                            <Card className={styles.card}>
                                <CardContent>
                                    <Container>Trees</Container>
                                </CardContent>
                            </Card>
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default UIExperiments;
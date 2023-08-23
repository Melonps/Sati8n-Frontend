import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "../styles/loading.css";

function Loading() {
    return (
        <div>
            <Box sx={{ height: 40, mt: 3, mb: 4 }}>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    <span class="loading">
                        <span>L</span>
                        <span>o</span>
                        <span>a</span>
                        <span>d</span>
                        <span>i</span>
                        <span>n</span>
                        <span>g</span>
                    </span>
                </Typography>
                <CircularProgress />
            </Box>
        </div>
    );
}

export default Loading;

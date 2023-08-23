import {
    Container,
    List,
    ListItem,
    Paper,
    Grid,
    Avatar,
    Button,
    Box,
    Typography,
    Divider,
    Chip,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
const RecordList = ({ data }) => {
    return (
        <div className="flex justify-center">
            <Box mt={4}>
                <Typography variant="h4">食事内容</Typography>
                <List
                    sx={{
                        width: "100%",
                        overflow: "auto",
                        maxHeight: 500,
                        "& ::-webkit-scrollbar": {
                            display: "none",
                        },
                        "& :hover": {
                            "::-webkit-scrollbar": {
                                display: "inline",
                            },
                        },
                    }}
                >
                    {data.map((meal, index) => (
                        <ListItem>
                            <Grid container alignItems="center">
                                <Avatar
                                    src={`https://cdn.macaro-ni.jp/image/summary/4/4716/33a92c1a5a918328c870c56432d9a673.jpg?p=medium`}
                                    sx={{
                                        border: "3px solid #df929b",
                                        width: 60,
                                        height: 60,
                                    }}
                                />
                                <Box sx={{ ml: 2, mt: 2, flex: 1 }}>
                                    <Typography variant="h5">
                                        {meal.name}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        <RamenDiningIcon
                                            color="primary"
                                            fontSize="small"
                                        />
                                        {meal.mealtype} - {meal.calory} kcal
                                    </Typography>
                                    {meal.restaurant && (
                                        <Typography variant="subtitle2">
                                            <LocationOnIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                            {meal.restaurant}
                                        </Typography>
                                    )}
                                    <Box sx={{ mt: 1 }}>
                                        {Object.keys(meal.nutrients).map(
                                            (nutrient, index) => (
                                                <Chip
                                                    key={index}
                                                    label={nutrient}
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{ mr: 1, mb: 1 }}
                                                />
                                            )
                                        )}
                                    </Box>
                                </Box>
                                <Typography variant="subtitle1">
                                    {meal.time}
                                </Typography>
                            </Grid>
                            <Divider sx={{ my: 1 }} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </div>
    );
};

export default RecordList;

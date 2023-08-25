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
import { getHours } from "date-fns";
const RecordList = ({ data }) => {
    return (
        <div className="flex justify-center">
            <Box mt={4}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Meal Timeline
                </Typography>
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
                                        {meal.store_name}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        <RamenDiningIcon
                                            color="primary"
                                            fontSize="small"
                                        />
                                        {meal.meal_type} - {meal.total_calory}{" "}
                                        kcal
                                    </Typography>
                                    {meal.dishes.map((dish) => (
                                        <Chip
                                            label={
                                                dish.calory +
                                                "×" +
                                                dish.amount +
                                                " kcal"
                                            }
                                            sx={{ mr: 1, mt: 1 }}
                                        />
                                    ))}
                                </Box>
                                <Box sx={{ ml: 2, mt: 2 }}>
                                    {meal.created_at && (
                                        <Typography variant="subtitle2">
                                            <LocationOnIcon
                                                color="primary"
                                                fontSize="small"
                                            />
                                            {meal.created_at.slice(0, 10)}|
                                            {meal.created_at.slice(11, 16)}
                                        </Typography>
                                    )}
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

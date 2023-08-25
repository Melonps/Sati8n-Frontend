import { useState, useRef } from "react";
import {
    TextField,
    Button,
    Modal,
    Box,
    Grid,
    Typography,
    Slider,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    ToggleButton,
    ToggleButtonGroup,
    Alert,
} from "@mui/material";
import axios from "axios";
import PostAddIcon from "@mui/icons-material/PostAdd";

import AddTaskIcon from "@mui/icons-material/AddTask";
import TagInput from "./TagInput";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import LightModeIcon from "@mui/icons-material/LightMode";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import IcecreamIcon from "@mui/icons-material/Icecream";
import CalculateIcon from "@mui/icons-material/Calculate";
import Loading from "./Loading";

const PostRecord = ({ userInfoRef }) => {
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const [receivedTags, setReceivedTags] = useState([]);
    const [selectedStore, setSelectedStore] = useState("MC donald"); // 初期値を設定
    const [mealType, setMealType] = useState("Breakfast"); // 初期値を設定
    const [had_calory, setHadCalory] = useState(0);
    const [eat_calory, setEatCalory] = useState(0);
    const [loading, setLoading] = useState(false);

    const [prediction, setPrediction] = useState(1);

    const handleOpen = () => {
        setOpen(true);
        setHadCalory(0);
        setEatCalory(0);
        setPrediction(1);
        setReceivedTags([]);
    };

    const handleClose = () => {
        setOpen(false);
        setError(""); // モーダルを閉じるときにエラーメッセージをクリア
    };

    const handleTagsChange = (newTags) => {
        setReceivedTags(newTags);
        console.log("receivedTags", receivedTags);
    };

    const handleOptionChange = (event) => {
        setSelectedStore(event.target.value);
        console.log("selectedStore", store_options[event.target.value]);
    };

    const handleMealTypeChange = (event, newAlignment) => {
        setMealType(newAlignment);
    };

    const handleInference = async (e) => {
        setLoading(true);
        setCurrentCalory(receivedTags);
        e.preventDefault();
        const url = "http://127.0.0.1:8000/inference/";
        console.log("calory", had_calory, eat_calory);
        try {
            console.log("userInfoRef", userInfoRef);
            const response = await axios.post(url, {
                age: userInfoRef.current.age,
                sex: userInfoRef.current.sex,
                height: userInfoRef.current.height,
                weight: userInfoRef.current.weight,
                now_time: new Date().getHours(),
                free_time: 7,
                had_calory: had_calory,
                eat_calory: eat_calory,
            });
            console.log(response);
            if (response.status === 200) {
                console.log("Trading record created successfully");
                setPrediction(response.data.prediction);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error creating trading record:", error);
            setError("Error creating trading record. Please try again.");
        }
        CalSumCal(receivedTags);
    };

    const setCurrentCalory = (receivedTags) => {
        setEatCalory(
            receivedTags.slice(-1)[0].calories * receivedTags.slice(-1)[0].count
        );
        console.log("eat_calory", eat_calory);
    };

    const CalSumCal = (receivedTags) => {
        let sum = 0;
        receivedTags.reduce((acc, cur) => {
            sum += cur.calories * cur.count;
        }, 0);
        setHadCalory(sum);
        console.log("sum", sum);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "https://sati8n-backend.onrender.com/api/record";
        const updatedData = receivedTags.map((dish) => {
            const { tag, calories, count } = dish;
            return {
                dish_name: tag,
                amount: count,
                calory: calories,
            };
        });
        console.log("updatedData", updatedData);
        console.log("userInfoRef", userInfoRef);
        console.log("dish", updatedData);
        const request_data = {
            user_id: userInfoRef.current.user_id,
            store_name: selectedStore,
            dishes: updatedData,
            total_calory: had_calory + eat_calory,
            meal_type: mealType,
        };
        try {
            console.log("request_data", request_data);
            const response = await axios.post(url, request_data);

            if (response.status === 201) {
                console.log("Trading record created successfully");
                handleClose();
            }
        } catch (error) {
            console.error("Error creating trading record:", error);
            setError("Error creating trading record. Please try again.");
        }
    };

    return (
        <div>
            <div className="fixed right-20 bottom-44">
                <Button
                    variant="contained"
                    onClick={handleOpen}
                    style={{
                        borderRadius: "50%",
                        padding: "20px",
                        border: "2px solid",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <PostAddIcon />
                </Button>
            </div>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 4,
                        maxWidth: 400,
                        width: "90%", // モーダルの横幅を調整
                        maxWidth: 400, // 最大幅を設定
                        maxHeight: "90%", // モーダルの高さを調整
                        overflowY: "auto", // 高さが超えた場合にスクロール表示
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12}>
                                <Typography variant="h5" align="center">
                                    Add Meal
                                    <DinnerDiningIcon
                                        color="primary"
                                        sx={{ marginLeft: "5px" }}
                                    />
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <ToggleButtonGroup
                                    value={mealType}
                                    exclusive
                                    color="primary"
                                    onChange={handleMealTypeChange}
                                    aria-label="Buy or Sell"
                                >
                                    <ToggleButton
                                        value="Breakfast"
                                        aria-label="Breakfast"
                                    >
                                        <WbTwilightIcon
                                            sx={{ marginLeft: "5px" }}
                                        />{" "}
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Launch"
                                        aria-label="Lunch"
                                    >
                                        <LightModeIcon
                                            sx={{ marginLeft: "5px" }}
                                        />
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Dinner"
                                        aria-label="Dinner"
                                    >
                                        <DarkModeIcon
                                            sx={{ marginLeft: "5px" }}
                                        />
                                    </ToggleButton>
                                    <ToggleButton
                                        value="Snack"
                                        aria-label="Snack"
                                    >
                                        <IcecreamIcon
                                            sx={{ marginLeft: "5px" }}
                                        />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                            <Grid item xs={12} fullWidth>
                                <InputLabel>Select Store</InputLabel>
                                <Select
                                    value={selectedStore}
                                    onChange={handleOptionChange}
                                    label="Select an Option"
                                    sx={{ width: "100%" }}
                                >
                                    <MenuItem value="MCdonald">
                                        MCdonald
                                    </MenuItem>
                                    <MenuItem value="Starbucks">
                                        Starbucks
                                    </MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <TagInput
                                    onTagsChange={handleTagsChange}
                                    options={store_options[selectedStore]}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" align="center">
                                    Total Calories
                                </Typography>
                                <Typography variant="h5" align="center">
                                    {had_calory + "kcal"}
                                </Typography>
                            </Grid>
                            {prediction > 0.95 && (
                                <Alert severity="success">
                                    No need to worry about leftovers
                                </Alert>
                            )}
                            {prediction > 0.2 && prediction <= 0.95 && (
                                <Alert severity="warning">
                                    A bit Need to worry about leftovers!
                                </Alert>
                            )}
                            {prediction < 0.2 && (
                                <Alert severity="error">
                                    Worry about leftovers!!
                                </Alert>
                            )}
                            <Grid item xs={12}>
                                <Button
                                    variant="outlined"
                                    type="submit"
                                    fullWidth
                                    onClick={handleInference}
                                >
                                    Inference
                                    <CalculateIcon />
                                </Button>
                            </Grid>
                            {error && (
                                <Grid item xs={12}>
                                    <Typography color="error">
                                        {error}
                                    </Typography>
                                </Grid>
                            )}
                            {loading && <Loading />}
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    fullWidth
                                >
                                    Add Record
                                    <AddTaskIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default PostRecord;

const options = [
    { Hamburger: 400 },
    { Fries: 200 },
    { Coke: 180 },
    { Chicken: 400 },
    { Salad: 200 },
];

const meal_options = ["MC donald", "KFC", "Burger King", "Subway"];

const store_options = {
    MCdonald: [
        { "Unnamed: 0": 0, Item: "Egg McMuffin", Calories: 300 },
        { "Unnamed: 0": 1, Item: "Egg White Delight", Calories: 250 },
        { "Unnamed: 0": 2, Item: "Sausage McMuffin", Calories: 370 },
        { "Unnamed: 0": 3, Item: "Sausage McMuffin with Egg", Calories: 450 },
        {
            "Unnamed: 0": 4,
            Item: "Sausage McMuffin with Egg Whites",
            Calories: 400,
        },
        { "Unnamed: 0": 5, Item: "Steak & Egg McMuffin", Calories: 430 },
        {
            "Unnamed: 0": 6,
            Item: "Bacon, Egg & Cheese Biscuit (Regular Biscuit)",
            Calories: 460,
        },
        {
            "Unnamed: 0": 7,
            Item: "Bacon, Egg & Cheese Biscuit (Large Biscuit)",
            Calories: 520,
        },
        {
            "Unnamed: 0": 8,
            Item: "Bacon, Egg & Cheese Biscuit with Egg Whites (Regular Biscuit)",
            Calories: 410,
        },
        {
            "Unnamed: 0": 9,
            Item: "Bacon, Egg & Cheese Biscuit with Egg Whites (Large Biscuit)",
            Calories: 470,
        },
        {
            "Unnamed: 0": 10,
            Item: "Sausage Biscuit (Regular Biscuit)",
            Calories: 430,
        },
        {
            "Unnamed: 0": 11,
            Item: "Sausage Biscuit (Large Biscuit)",
            Calories: 480,
        },
        {
            "Unnamed: 0": 12,
            Item: "Sausage Biscuit with Egg (Regular Biscuit)",
            Calories: 510,
        },
        {
            "Unnamed: 0": 13,
            Item: "Sausage Biscuit with Egg (Large Biscuit)",
            Calories: 570,
        },
        {
            "Unnamed: 0": 14,
            Item: "Sausage Biscuit with Egg Whites (Regular Biscuit)",
            Calories: 460,
        },
        {
            "Unnamed: 0": 15,
            Item: "Sausage Biscuit with Egg Whites (Large Biscuit)",
            Calories: 520,
        },
        {
            "Unnamed: 0": 16,
            Item: "Southern Style Chicken Biscuit (Regular Biscuit)",
            Calories: 410,
        },
        {
            "Unnamed: 0": 17,
            Item: "Southern Style Chicken Biscuit (Large Biscuit)",
            Calories: 470,
        },
        {
            "Unnamed: 0": 18,
            Item: "Steak & Egg Biscuit (Regular Biscuit)",
            Calories: 540,
        },
        {
            "Unnamed: 0": 19,
            Item: "Bacon, Egg & Cheese McGriddles",
            Calories: 460,
        },
        {
            "Unnamed: 0": 20,
            Item: "Bacon, Egg & Cheese McGriddles with Egg Whites",
            Calories: 400,
        },
        { "Unnamed: 0": 21, Item: "Sausage McGriddles", Calories: 420 },
        {
            "Unnamed: 0": 22,
            Item: "Sausage, Egg & Cheese McGriddles",
            Calories: 550,
        },
        {
            "Unnamed: 0": 23,
            Item: "Sausage, Egg & Cheese McGriddles with Egg Whites",
            Calories: 500,
        },
        { "Unnamed: 0": 24, Item: "Bacon, Egg & Cheese Bagel", Calories: 620 },
        {
            "Unnamed: 0": 25,
            Item: "Bacon, Egg & Cheese Bagel with Egg Whites",
            Calories: 570,
        },
        { "Unnamed: 0": 26, Item: "Steak, Egg & Cheese Bagel", Calories: 670 },
        {
            "Unnamed: 0": 27,
            Item: "Big Breakfast (Regular Biscuit)",
            Calories: 740,
        },
        {
            "Unnamed: 0": 28,
            Item: "Big Breakfast (Large Biscuit)",
            Calories: 800,
        },
        {
            "Unnamed: 0": 29,
            Item: "Big Breakfast with Egg Whites (Regular Biscuit)",
            Calories: 640,
        },
        {
            "Unnamed: 0": 30,
            Item: "Big Breakfast with Egg Whites (Large Biscuit)",
            Calories: 690,
        },
        {
            "Unnamed: 0": 31,
            Item: "Big Breakfast with Hotcakes (Regular Biscuit)",
            Calories: 1090,
        },
        {
            "Unnamed: 0": 32,
            Item: "Big Breakfast with Hotcakes (Large Biscuit)",
            Calories: 1150,
        },
        {
            "Unnamed: 0": 33,
            Item: "Big Breakfast with Hotcakes and Egg Whites (Regular Biscuit)",
            Calories: 990,
        },
        {
            "Unnamed: 0": 34,
            Item: "Big Breakfast with Hotcakes and Egg Whites (Large Biscuit)",
            Calories: 1050,
        },
        { "Unnamed: 0": 35, Item: "Hotcakes", Calories: 350 },
        { "Unnamed: 0": 36, Item: "Hotcakes and Sausage", Calories: 520 },
        { "Unnamed: 0": 37, Item: "Sausage Burrito", Calories: 300 },
        { "Unnamed: 0": 38, Item: "Hash Brown", Calories: 150 },
        { "Unnamed: 0": 39, Item: "Cinnamon Melts", Calories: 460 },
        { "Unnamed: 0": 40, Item: "Fruit & Maple Oatmeal", Calories: 290 },
        {
            "Unnamed: 0": 41,
            Item: "Fruit & Maple Oatmeal without Brown Sugar",
            Calories: 260,
        },
        { "Unnamed: 0": 42, Item: "Big Mac", Calories: 530 },
        {
            "Unnamed: 0": 43,
            Item: "Quarter Pounder with Cheese",
            Calories: 520,
        },
        {
            "Unnamed: 0": 44,
            Item: "Quarter Pounder with Bacon & Cheese",
            Calories: 600,
        },
        {
            "Unnamed: 0": 45,
            Item: "Quarter Pounder with Bacon Habanero Ranch",
            Calories: 610,
        },
        { "Unnamed: 0": 46, Item: "Quarter Pounder Deluxe", Calories: 540 },
        {
            "Unnamed: 0": 47,
            Item: "Double Quarter Pounder with Cheese",
            Calories: 750,
        },
        { "Unnamed: 0": 48, Item: "Hamburger", Calories: 240 },
        { "Unnamed: 0": 49, Item: "Cheeseburger", Calories: 290 },
        { "Unnamed: 0": 50, Item: "Double Cheeseburger", Calories: 430 },
        { "Unnamed: 0": 51, Item: "Bacon Clubhouse Burger", Calories: 720 },
        { "Unnamed: 0": 52, Item: "McDouble", Calories: 380 },
        { "Unnamed: 0": 53, Item: "Bacon McDouble", Calories: 440 },
        { "Unnamed: 0": 54, Item: "Daily Double", Calories: 430 },
        { "Unnamed: 0": 55, Item: "Jalape\u00f1o Double", Calories: 430 },
        { "Unnamed: 0": 56, Item: "McRib", Calories: 500 },
        {
            "Unnamed: 0": 57,
            Item: "Premium Crispy Chicken Classic Sandwich",
            Calories: 510,
        },
        {
            "Unnamed: 0": 58,
            Item: "Premium Grilled Chicken Classic Sandwich",
            Calories: 350,
        },
        {
            "Unnamed: 0": 59,
            Item: "Premium Crispy Chicken Club Sandwich",
            Calories: 670,
        },
        {
            "Unnamed: 0": 60,
            Item: "Premium Grilled Chicken Club Sandwich",
            Calories: 510,
        },
        {
            "Unnamed: 0": 61,
            Item: "Premium Crispy Chicken Ranch BLT Sandwich",
            Calories: 610,
        },
        {
            "Unnamed: 0": 62,
            Item: "Premium Grilled Chicken Ranch BLT Sandwich",
            Calories: 450,
        },
        {
            "Unnamed: 0": 63,
            Item: "Bacon Clubhouse Crispy Chicken Sandwich",
            Calories: 750,
        },
        {
            "Unnamed: 0": 64,
            Item: "Bacon Clubhouse Grilled Chicken Sandwich",
            Calories: 590,
        },
        {
            "Unnamed: 0": 65,
            Item: "Southern Style Crispy Chicken Sandwich",
            Calories: 430,
        },
        { "Unnamed: 0": 66, Item: "McChicken", Calories: 360 },
        { "Unnamed: 0": 67, Item: "Bacon Cheddar McChicken", Calories: 480 },
        {
            "Unnamed: 0": 68,
            Item: "Bacon Buffalo Ranch McChicken",
            Calories: 430,
        },
        { "Unnamed: 0": 69, Item: "Buffalo Ranch McChicken", Calories: 360 },
        {
            "Unnamed: 0": 70,
            Item: "Premium McWrap Chicken & Bacon (Crispy Chicken)",
            Calories: 630,
        },
        {
            "Unnamed: 0": 71,
            Item: "Premium McWrap Chicken & Bacon (Grilled Chicken)",
            Calories: 480,
        },
        {
            "Unnamed: 0": 72,
            Item: "Premium McWrap Chicken & Ranch (Crispy Chicken)",
            Calories: 610,
        },
        {
            "Unnamed: 0": 73,
            Item: "Premium McWrap Chicken & Ranch (Grilled Chicken)",
            Calories: 450,
        },
        {
            "Unnamed: 0": 74,
            Item: "Premium McWrap Southwest Chicken (Crispy Chicken)",
            Calories: 670,
        },
        {
            "Unnamed: 0": 75,
            Item: "Premium McWrap Southwest Chicken (Grilled Chicken)",
            Calories: 520,
        },
        {
            "Unnamed: 0": 76,
            Item: "Premium McWrap Chicken Sweet Chili (Crispy Chicken)",
            Calories: 540,
        },
        {
            "Unnamed: 0": 77,
            Item: "Premium McWrap Chicken Sweet Chili (Grilled Chicken)",
            Calories: 380,
        },
        {
            "Unnamed: 0": 78,
            Item: "Chicken McNuggets (4 piece)",
            Calories: 190,
        },
        {
            "Unnamed: 0": 79,
            Item: "Chicken McNuggets (6 piece)",
            Calories: 280,
        },
        {
            "Unnamed: 0": 80,
            Item: "Chicken McNuggets (10 piece)",
            Calories: 470,
        },
        {
            "Unnamed: 0": 81,
            Item: "Chicken McNuggets (20 piece)",
            Calories: 940,
        },
        {
            "Unnamed: 0": 82,
            Item: "Chicken McNuggets (40 piece)",
            Calories: 1880,
        },
        { "Unnamed: 0": 83, Item: "Filet-O-Fish", Calories: 390 },
        {
            "Unnamed: 0": 84,
            Item: "Premium Bacon Ranch Salad (without Chicken)",
            Calories: 140,
        },
        {
            "Unnamed: 0": 85,
            Item: "Premium Bacon Ranch Salad with Crispy Chicken",
            Calories: 380,
        },
        {
            "Unnamed: 0": 86,
            Item: "Premium Bacon Ranch Salad with Grilled Chicken",
            Calories: 220,
        },
        {
            "Unnamed: 0": 87,
            Item: "Premium Southwest Salad (without Chicken)",
            Calories: 140,
        },
        {
            "Unnamed: 0": 88,
            Item: "Premium Southwest Salad with Crispy Chicken",
            Calories: 450,
        },
        {
            "Unnamed: 0": 89,
            Item: "Premium Southwest Salad with Grilled Chicken",
            Calories: 290,
        },
        {
            "Unnamed: 0": 90,
            Item: "Chipotle BBQ Snack Wrap (Crispy Chicken)",
            Calories: 340,
        },
        {
            "Unnamed: 0": 91,
            Item: "Chipotle BBQ Snack Wrap (Grilled Chicken)",
            Calories: 260,
        },
        {
            "Unnamed: 0": 92,
            Item: "Honey Mustard Snack Wrap (Crispy Chicken)",
            Calories: 330,
        },
        {
            "Unnamed: 0": 93,
            Item: "Honey Mustard Snack Wrap (Grilled Chicken)",
            Calories: 250,
        },
        {
            "Unnamed: 0": 94,
            Item: "Ranch Snack Wrap (Crispy Chicken)",
            Calories: 360,
        },
        {
            "Unnamed: 0": 95,
            Item: "Ranch Snack Wrap (Grilled Chicken)",
            Calories: 280,
        },
        { "Unnamed: 0": 96, Item: "Small French Fries", Calories: 230 },
        { "Unnamed: 0": 97, Item: "Medium French Fries", Calories: 340 },
        { "Unnamed: 0": 98, Item: "Large French Fries", Calories: 510 },
        { "Unnamed: 0": 99, Item: "Kids French Fries", Calories: 110 },
        { "Unnamed: 0": 100, Item: "Side Salad", Calories: 20 },
        { "Unnamed: 0": 101, Item: "Apple Slices", Calories: 15 },
        { "Unnamed: 0": 102, Item: "Fruit 'n Yogurt Parfait", Calories: 150 },
        { "Unnamed: 0": 103, Item: "Baked Apple Pie", Calories: 250 },
        { "Unnamed: 0": 104, Item: "Chocolate Chip Cookie", Calories: 160 },
        { "Unnamed: 0": 105, Item: "Oatmeal Raisin Cookie", Calories: 150 },
        { "Unnamed: 0": 106, Item: "Kids Ice Cream Cone", Calories: 45 },
        { "Unnamed: 0": 107, Item: "Hot Fudge Sundae", Calories: 330 },
        { "Unnamed: 0": 108, Item: "Hot Caramel Sundae", Calories: 340 },
        { "Unnamed: 0": 109, Item: "Strawberry Sundae", Calories: 280 },
        { "Unnamed: 0": 110, Item: "Coca-Cola Classic (Small)", Calories: 140 },
        {
            "Unnamed: 0": 111,
            Item: "Coca-Cola Classic (Medium)",
            Calories: 200,
        },
        { "Unnamed: 0": 112, Item: "Coca-Cola Classic (Large)", Calories: 280 },
        { "Unnamed: 0": 113, Item: "Coca-Cola Classic (Child)", Calories: 100 },
        { "Unnamed: 0": 114, Item: "Diet Coke (Small)", Calories: 0 },
        { "Unnamed: 0": 115, Item: "Diet Coke (Medium)", Calories: 0 },
        { "Unnamed: 0": 116, Item: "Diet Coke (Large)", Calories: 0 },
        { "Unnamed: 0": 117, Item: "Diet Coke (Child)", Calories: 0 },
        { "Unnamed: 0": 118, Item: "Dr Pepper (Small)", Calories: 140 },
        { "Unnamed: 0": 119, Item: "Dr Pepper (Medium)", Calories: 190 },
        { "Unnamed: 0": 120, Item: "Dr Pepper (Large)", Calories: 270 },
        { "Unnamed: 0": 121, Item: "Dr Pepper (Child)", Calories: 100 },
        { "Unnamed: 0": 122, Item: "Diet Dr Pepper (Small)", Calories: 0 },
        { "Unnamed: 0": 123, Item: "Diet Dr Pepper (Medium)", Calories: 0 },
        { "Unnamed: 0": 124, Item: "Diet Dr Pepper (Large)", Calories: 0 },
        { "Unnamed: 0": 125, Item: "Diet Dr Pepper (Child)", Calories: 0 },
        { "Unnamed: 0": 126, Item: "Sprite (Small)", Calories: 140 },
        { "Unnamed: 0": 127, Item: "Sprite (Medium)", Calories: 200 },
        { "Unnamed: 0": 128, Item: "Sprite (Large)", Calories: 280 },
        { "Unnamed: 0": 129, Item: "Sprite (Child)", Calories: 100 },
        { "Unnamed: 0": 130, Item: "1% Low Fat Milk Jug", Calories: 100 },
        {
            "Unnamed: 0": 131,
            Item: "Fat Free Chocolate Milk Jug",
            Calories: 130,
        },
        {
            "Unnamed: 0": 132,
            Item: "Minute Maid 100% Apple Juice Box",
            Calories: 80,
        },
        {
            "Unnamed: 0": 133,
            Item: "Minute Maid Orange Juice (Small)",
            Calories: 150,
        },
        {
            "Unnamed: 0": 134,
            Item: "Minute Maid Orange Juice (Medium)",
            Calories: 190,
        },
        {
            "Unnamed: 0": 135,
            Item: "Minute Maid Orange Juice (Large)",
            Calories: 280,
        },
        { "Unnamed: 0": 136, Item: "Dasani Water Bottle", Calories: 0 },
        { "Unnamed: 0": 137, Item: "Iced Tea (Small)", Calories: 0 },
        { "Unnamed: 0": 138, Item: "Iced Tea (Medium)", Calories: 0 },
        { "Unnamed: 0": 139, Item: "Iced Tea (Large)", Calories: 0 },
        { "Unnamed: 0": 140, Item: "Iced Tea (Child)", Calories: 0 },
        { "Unnamed: 0": 141, Item: "Sweet Tea (Small)", Calories: 150 },
        { "Unnamed: 0": 142, Item: "Sweet Tea (Medium)", Calories: 180 },
        { "Unnamed: 0": 143, Item: "Sweet Tea (Large)", Calories: 220 },
        { "Unnamed: 0": 144, Item: "Sweet Tea (Child)", Calories: 110 },
        { "Unnamed: 0": 145, Item: "Coffee (Small)", Calories: 0 },
        { "Unnamed: 0": 146, Item: "Coffee (Medium)", Calories: 0 },
        { "Unnamed: 0": 147, Item: "Coffee (Large)", Calories: 0 },
        { "Unnamed: 0": 148, Item: "Latte (Small)", Calories: 170 },
        { "Unnamed: 0": 149, Item: "Latte (Medium)", Calories: 210 },
        { "Unnamed: 0": 150, Item: "Latte (Large)", Calories: 280 },
        { "Unnamed: 0": 151, Item: "Caramel Latte (Small)", Calories: 270 },
        { "Unnamed: 0": 152, Item: "Caramel Latte (Medium)", Calories: 340 },
        { "Unnamed: 0": 153, Item: "Caramel Latte (Large)", Calories: 430 },
        { "Unnamed: 0": 154, Item: "Hazelnut Latte (Small)", Calories: 270 },
        { "Unnamed: 0": 155, Item: "Hazelnut Latte (Medium)", Calories: 330 },
        { "Unnamed: 0": 156, Item: "Hazelnut Latte (Large)", Calories: 430 },
        {
            "Unnamed: 0": 157,
            Item: "French Vanilla Latte (Small)",
            Calories: 260,
        },
        {
            "Unnamed: 0": 158,
            Item: "French Vanilla Latte (Medium)",
            Calories: 330,
        },
        {
            "Unnamed: 0": 159,
            Item: "French Vanilla Latte (Large)",
            Calories: 420,
        },
        {
            "Unnamed: 0": 160,
            Item: "Latte with Sugar Free French Vanilla Syrup (Small)",
            Calories: 210,
        },
        {
            "Unnamed: 0": 161,
            Item: "Latte with Sugar Free French Vanilla Syrup (Medium)",
            Calories: 260,
        },
        {
            "Unnamed: 0": 162,
            Item: "Latte with Sugar Free French Vanilla Syrup (Large)",
            Calories: 330,
        },
        { "Unnamed: 0": 163, Item: "Nonfat Latte (Small)", Calories: 100 },
        { "Unnamed: 0": 164, Item: "Nonfat Latte (Medium)", Calories: 130 },
        { "Unnamed: 0": 165, Item: "Nonfat Latte (Large)", Calories: 170 },
        {
            "Unnamed: 0": 166,
            Item: "Nonfat Caramel Latte (Small)",
            Calories: 200,
        },
        {
            "Unnamed: 0": 167,
            Item: "Nonfat Caramel Latte (Medium)",
            Calories: 250,
        },
        {
            "Unnamed: 0": 168,
            Item: "Nonfat Caramel Latte (Large)",
            Calories: 310,
        },
        {
            "Unnamed: 0": 169,
            Item: "Nonfat Hazelnut Latte (Small)",
            Calories: 200,
        },
        {
            "Unnamed: 0": 170,
            Item: "Nonfat Hazelnut Latte (Medium)",
            Calories: 250,
        },
        {
            "Unnamed: 0": 171,
            Item: "Nonfat Hazelnut Latte (Large)",
            Calories: 310,
        },
        {
            "Unnamed: 0": 172,
            Item: "Nonfat French Vanilla Latte (Small)",
            Calories: 190,
        },
        {
            "Unnamed: 0": 173,
            Item: "Nonfat French Vanilla Latte (Medium)",
            Calories: 240,
        },
        {
            "Unnamed: 0": 174,
            Item: "Nonfat French Vanilla Latte (Large)",
            Calories: 300,
        },
        {
            "Unnamed: 0": 175,
            Item: "Nonfat Latte with Sugar Free French Vanilla Syrup (Small)",
            Calories: 140,
        },
        {
            "Unnamed: 0": 176,
            Item: "Nonfat Latte with Sugar Free French Vanilla Syrup (Medium)",
            Calories: 170,
        },
        {
            "Unnamed: 0": 177,
            Item: "Nonfat Latte with Sugar Free French Vanilla Syrup (Large)",
            Calories: 220,
        },
        { "Unnamed: 0": 178, Item: "Mocha (Small)", Calories: 340 },
        { "Unnamed: 0": 179, Item: "Mocha (Medium)", Calories: 410 },
        { "Unnamed: 0": 180, Item: "Mocha (Large)", Calories: 500 },
        {
            "Unnamed: 0": 181,
            Item: "Mocha with Nonfat Milk (Small)",
            Calories: 270,
        },
        {
            "Unnamed: 0": 182,
            Item: "Mocha with Nonfat Milk (Medium)",
            Calories: 330,
        },
        {
            "Unnamed: 0": 183,
            Item: "Mocha with Nonfat Milk (Large)",
            Calories: 390,
        },
        { "Unnamed: 0": 184, Item: "Caramel Mocha (Small)", Calories: 320 },
        { "Unnamed: 0": 185, Item: "Caramel Mocha (Medium)", Calories: 390 },
        { "Unnamed: 0": 186, Item: "Caramel Mocha (Large)", Calories: 480 },
        {
            "Unnamed: 0": 187,
            Item: "Nonfat Caramel Mocha (Small)",
            Calories: 250,
        },
        {
            "Unnamed: 0": 188,
            Item: "Nonfat Caramel Mocha (Medium)",
            Calories: 310,
        },
        {
            "Unnamed: 0": 189,
            Item: "Nonfat Caramel Mocha (Large)",
            Calories: 370,
        },
        { "Unnamed: 0": 190, Item: "Hot Chocolate (Small)", Calories: 360 },
        { "Unnamed: 0": 191, Item: "Hot Chocolate (Medium)", Calories: 440 },
        { "Unnamed: 0": 192, Item: "Hot Chocolate (Large)", Calories: 540 },
        {
            "Unnamed: 0": 193,
            Item: "Hot Chocolate with Nonfat Milk (Small)",
            Calories: 280,
        },
        {
            "Unnamed: 0": 194,
            Item: "Hot Chocolate with Nonfat Milk (Medium)",
            Calories: 340,
        },
        {
            "Unnamed: 0": 195,
            Item: "Hot Chocolate with Nonfat Milk (Large)",
            Calories: 400,
        },
        {
            "Unnamed: 0": 196,
            Item: "Regular Iced Coffee (Small)",
            Calories: 140,
        },
        {
            "Unnamed: 0": 197,
            Item: "Regular Iced Coffee (Medium)",
            Calories: 190,
        },
        {
            "Unnamed: 0": 198,
            Item: "Regular Iced Coffee (Large)",
            Calories: 270,
        },
        {
            "Unnamed: 0": 199,
            Item: "Caramel Iced Coffee (Small)",
            Calories: 130,
        },
        {
            "Unnamed: 0": 200,
            Item: "Caramel Iced Coffee (Medium)",
            Calories: 180,
        },
        {
            "Unnamed: 0": 201,
            Item: "Caramel Iced Coffee (Large)",
            Calories: 260,
        },
        {
            "Unnamed: 0": 202,
            Item: "Hazelnut Iced Coffee (Small)",
            Calories: 130,
        },
        {
            "Unnamed: 0": 203,
            Item: "Hazelnut Iced Coffee (Medium)",
            Calories: 180,
        },
        {
            "Unnamed: 0": 204,
            Item: "Hazelnut Iced Coffee (Large)",
            Calories: 250,
        },
        {
            "Unnamed: 0": 205,
            Item: "French Vanilla Iced Coffee (Small)",
            Calories: 120,
        },
        {
            "Unnamed: 0": 206,
            Item: "French Vanilla Iced Coffee (Medium)",
            Calories: 170,
        },
        {
            "Unnamed: 0": 207,
            Item: "French Vanilla Iced Coffee (Large)",
            Calories: 240,
        },
        {
            "Unnamed: 0": 208,
            Item: "Iced Coffee with Sugar Free French Vanilla Syrup (Small)",
            Calories: 80,
        },
        {
            "Unnamed: 0": 209,
            Item: "Iced Coffee with Sugar Free French Vanilla Syrup (Medium)",
            Calories: 120,
        },
        {
            "Unnamed: 0": 210,
            Item: "Iced Coffee with Sugar Free French Vanilla Syrup (Large)",
            Calories: 160,
        },
        { "Unnamed: 0": 211, Item: "Iced Mocha (Small)", Calories: 290 },
        { "Unnamed: 0": 212, Item: "Iced Mocha (Medium)", Calories: 350 },
        { "Unnamed: 0": 213, Item: "Iced Mocha (Large)", Calories: 480 },
        {
            "Unnamed: 0": 214,
            Item: "Iced Mocha with Nonfat Milk (Small)",
            Calories: 240,
        },
        {
            "Unnamed: 0": 215,
            Item: "Iced Mocha with Nonfat Milk (Medium)",
            Calories: 290,
        },
        {
            "Unnamed: 0": 216,
            Item: "Iced Mocha with Nonfat Milk (Large)",
            Calories: 390,
        },
        {
            "Unnamed: 0": 217,
            Item: "Iced Caramel Mocha (Small)",
            Calories: 280,
        },
        {
            "Unnamed: 0": 218,
            Item: "Iced Caramel Mocha (Medium)",
            Calories: 340,
        },
        {
            "Unnamed: 0": 219,
            Item: "Iced Caramel Mocha (Large)",
            Calories: 460,
        },
        {
            "Unnamed: 0": 220,
            Item: "Iced Nonfat Caramel Mocha (Small)",
            Calories: 230,
        },
        {
            "Unnamed: 0": 221,
            Item: "Iced Nonfat Caramel Mocha (Medium)",
            Calories: 270,
        },
        {
            "Unnamed: 0": 222,
            Item: "Iced Nonfat Caramel Mocha (Large)",
            Calories: 370,
        },
        { "Unnamed: 0": 223, Item: "Frapp\u00e9 Mocha (Small)", Calories: 450 },
        {
            "Unnamed: 0": 224,
            Item: "Frapp\u00e9 Mocha (Medium)",
            Calories: 550,
        },
        { "Unnamed: 0": 225, Item: "Frapp\u00e9 Mocha (Large)", Calories: 670 },
        {
            "Unnamed: 0": 226,
            Item: "Frapp\u00e9 Caramel (Small)",
            Calories: 450,
        },
        {
            "Unnamed: 0": 227,
            Item: "Frapp\u00e9 Caramel (Medium)",
            Calories: 550,
        },
        {
            "Unnamed: 0": 228,
            Item: "Frapp\u00e9 Caramel (Large)",
            Calories: 670,
        },
        {
            "Unnamed: 0": 229,
            Item: "Frapp\u00e9 Chocolate Chip (Small)",
            Calories: 530,
        },
        {
            "Unnamed: 0": 230,
            Item: "Frapp\u00e9 Chocolate Chip (Medium)",
            Calories: 630,
        },
        {
            "Unnamed: 0": 231,
            Item: "Frapp\u00e9 Chocolate Chip (Large)",
            Calories: 760,
        },
        {
            "Unnamed: 0": 232,
            Item: "Blueberry Pomegranate Smoothie (Small)",
            Calories: 220,
        },
        {
            "Unnamed: 0": 233,
            Item: "Blueberry Pomegranate Smoothie (Medium)",
            Calories: 260,
        },
        {
            "Unnamed: 0": 234,
            Item: "Blueberry Pomegranate Smoothie (Large)",
            Calories: 340,
        },
        {
            "Unnamed: 0": 235,
            Item: "Strawberry Banana Smoothie (Small)",
            Calories: 210,
        },
        {
            "Unnamed: 0": 236,
            Item: "Strawberry Banana Smoothie (Medium)",
            Calories: 250,
        },
        {
            "Unnamed: 0": 237,
            Item: "Strawberry Banana Smoothie (Large)",
            Calories: 330,
        },
        {
            "Unnamed: 0": 238,
            Item: "Mango Pineapple Smoothie (Small)",
            Calories: 210,
        },
        {
            "Unnamed: 0": 239,
            Item: "Mango Pineapple Smoothie (Medium)",
            Calories: 260,
        },
        {
            "Unnamed: 0": 240,
            Item: "Mango Pineapple Smoothie (Large)",
            Calories: 340,
        },
        { "Unnamed: 0": 241, Item: "Vanilla Shake (Small)", Calories: 530 },
        { "Unnamed: 0": 242, Item: "Vanilla Shake (Medium)", Calories: 660 },
        { "Unnamed: 0": 243, Item: "Vanilla Shake (Large)", Calories: 820 },
        { "Unnamed: 0": 244, Item: "Strawberry Shake (Small)", Calories: 550 },
        { "Unnamed: 0": 245, Item: "Strawberry Shake (Medium)", Calories: 690 },
        { "Unnamed: 0": 246, Item: "Strawberry Shake (Large)", Calories: 850 },
        { "Unnamed: 0": 247, Item: "Chocolate Shake (Small)", Calories: 560 },
        { "Unnamed: 0": 248, Item: "Chocolate Shake (Medium)", Calories: 700 },
        { "Unnamed: 0": 249, Item: "Chocolate Shake (Large)", Calories: 850 },
        { "Unnamed: 0": 250, Item: "Shamrock Shake (Medium)", Calories: 660 },
        { "Unnamed: 0": 251, Item: "Shamrock Shake (Large)", Calories: 820 },
        {
            "Unnamed: 0": 252,
            Item: "McFlurry with M&M\u2019s Candies (Small)",
            Calories: 650,
        },
        {
            "Unnamed: 0": 253,
            Item: "McFlurry with M&M\u2019s Candies (Medium)",
            Calories: 930,
        },
        {
            "Unnamed: 0": 254,
            Item: "McFlurry with M&M\u2019s Candies (Snack)",
            Calories: 430,
        },
        {
            "Unnamed: 0": 255,
            Item: "McFlurry with Oreo Cookies (Small)",
            Calories: 510,
        },
        {
            "Unnamed: 0": 256,
            Item: "McFlurry with Oreo Cookies (Medium)",
            Calories: 690,
        },
        {
            "Unnamed: 0": 257,
            Item: "McFlurry with Oreo Cookies (Snack)",
            Calories: 340,
        },
        {
            "Unnamed: 0": 258,
            Item: "McFlurry with Reese's Peanut Butter Cups (Medium)",
            Calories: 810,
        },
        {
            "Unnamed: 0": 259,
            Item: "McFlurry with Reese's Peanut Butter Cups (Snack)",
            Calories: 410,
        },
    ],
    Starbucks: [
        {
            "Unnamed: 0": 0,
            Item: "Cool Lime Starbucks Refreshers\u2122 Beverage",
            Calories: 45,
        },
        {
            "Unnamed: 0": 1,
            Item: "Strawberry Acai Starbucks Refreshers\u2122 Beverage",
            Calories: 80,
        },
        {
            "Unnamed: 0": 2,
            Item: "Very Berry Hibiscus Starbucks Refreshers\u2122 Beverage",
            Calories: 60,
        },
        {
            "Unnamed: 0": 3,
            Item: "Evolution Fresh\u2122 Organic Ginger Limeade",
            Calories: 110,
        },
        {
            "Unnamed: 0": 4,
            Item: "Iced Coffee",
            Calories: 0,
        },
        {
            "Unnamed: 0": 5,
            Item: "Iced Espresso Classics - Vanilla Latte",
            Calories: 130,
        },
        {
            "Unnamed: 0": 6,
            Item: "Iced Espresso Classics - Caffe Mocha",
            Calories: 140,
        },
        {
            "Unnamed: 0": 7,
            Item: "Iced Espresso Classics - Caramel Macchiato",
            Calories: 130,
        },
        {
            "Unnamed: 0": 8,
            Item: "Shaken Sweet Tea",
            Calories: 80,
        },
        {
            "Unnamed: 0": 9,
            Item: "Tazo\u00ae Bottled Berry Blossom White",
            Calories: 60,
        },
        {
            "Unnamed: 0": 10,
            Item: "Tazo\u00ae Bottled Black Mango",
            Calories: 150,
        },
        {
            "Unnamed: 0": 11,
            Item: "Tazo\u00ae Bottled Black with Lemon",
            Calories: 140,
        },
        {
            "Unnamed: 0": 12,
            Item: "Tazo\u00ae Bottled Brambleberry",
            Calories: 140,
        },
        {
            "Unnamed: 0": 13,
            Item: "Tazo\u00ae Bottled Giant Peach",
            Calories: 150,
        },
        {
            "Unnamed: 0": 14,
            Item: "Tazo\u00ae Bottled Iced Passion",
            Calories: 70,
        },
        {
            "Unnamed: 0": 15,
            Item: "Tazo\u00ae Bottled Lemon Ginger",
            Calories: 120,
        },
        {
            "Unnamed: 0": 16,
            Item: "Tazo\u00ae Bottled Organic Black Lemonade",
            Calories: 140,
        },
        {
            "Unnamed: 0": 17,
            Item: "Tazo\u00ae Bottled Organic Iced Black Tea",
            Calories: 60,
        },
        {
            "Unnamed: 0": 18,
            Item: "Tazo\u00ae Bottled Organic Iced Green Tea",
            Calories: 120,
        },
        {
            "Unnamed: 0": 19,
            Item: "Tazo\u00ae Bottled Plum Pomegranate",
            Calories: 140,
        },
        {
            "Unnamed: 0": 20,
            Item: "Tazo\u00ae Bottled Tazoberry",
            Calories: 150,
        },
        {
            "Unnamed: 0": 21,
            Item: "Tazo\u00ae Bottled White Cranberry",
            Calories: 140,
        },
        {
            "Unnamed: 0": 22,
            Item: "Teavana\u00ae Shaken Iced Black Tea",
            Calories: 30,
        },
        {
            "Unnamed: 0": 23,
            Item: "Teavana\u00ae Shaken Iced Black Tea Lemonade",
            Calories: 70,
        },
        {
            "Unnamed: 0": 24,
            Item: "Teavana\u00ae Shaken Iced Green Tea",
            Calories: 30,
        },
        {
            "Unnamed: 0": 25,
            Item: "Teavana\u00ae Shaken Iced Green Tea Lemonade",
            Calories: 70,
        },
        {
            "Unnamed: 0": 26,
            Item: "Teavana\u00ae Shaken Iced Passion Tango\u2122 Tea",
            Calories: 30,
        },
        {
            "Unnamed: 0": 27,
            Item: "Teavana\u00ae Shaken Iced Passion Tango\u2122 Tea Lemonade",
            Calories: 90,
        },
        {
            "Unnamed: 0": 28,
            Item: "Teavana\u00ae Shaken Iced Peach Green Tea",
            Calories: 60,
        },
        {
            "Unnamed: 0": 29,
            Item: "Iced Espresso Classics - Vanilla Latte",
            Calories: 130,
        },
        {
            "Unnamed: 0": 30,
            Item: "Iced Espresso Classics - Caffe Mocha",
            Calories: 140,
        },
        {
            "Unnamed: 0": 31,
            Item: "Iced Espresso Classics - Caramel Macchiato",
            Calories: 130,
        },
        {
            "Unnamed: 0": 32,
            Item: "Starbucks Refreshers\u2122 Raspberry Pomegranate",
            Calories: 90,
        },
        {
            "Unnamed: 0": 33,
            Item: "Starbucks Refreshers\u2122 Strawberry Lemonade",
            Calories: 90,
        },
        {
            "Unnamed: 0": 34,
            Item: "Starbucks\u00ae Doubleshot Protein Dark Chocolate",
            Calories: 210,
        },
        {
            "Unnamed: 0": 35,
            Item: "Starbucks\u00ae Doubleshot Protein Vanilla",
            Calories: 200,
        },
        {
            "Unnamed: 0": 36,
            Item: "Starbucks\u00ae Iced Coffee Caramel",
            Calories: 60,
        },
        {
            "Unnamed: 0": 37,
            Item: "Starbucks\u00ae Iced Coffee Light Sweetened",
            Calories: 50,
        },
        {
            "Unnamed: 0": 38,
            Item: "Starbucks\u00ae Iced Coffee Unsweetened",
            Calories: 10,
        },
        {
            "Unnamed: 0": 39,
            Item: "Tazo\u00ae Bottled Berry Blossom White",
            Calories: 60,
        },
        {
            "Unnamed: 0": 40,
            Item: "Tazo\u00ae Bottled Black Mango",
            Calories: 150,
        },
        {
            "Unnamed: 0": 41,
            Item: "Tazo\u00ae Bottled Black with Lemon",
            Calories: 140,
        },
        {
            "Unnamed: 0": 42,
            Item: "Tazo\u00ae Bottled Brambleberry",
            Calories: 140,
        },
        {
            "Unnamed: 0": 43,
            Item: "Tazo\u00ae Bottled Giant Peach",
            Calories: 150,
        },
        {
            "Unnamed: 0": 44,
            Item: "Tazo\u00ae Bottled Iced Passion",
            Calories: 70,
        },
        {
            "Unnamed: 0": 45,
            Item: "Tazo\u00ae Bottled Lemon Ginger",
            Calories: 120,
        },
        {
            "Unnamed: 0": 46,
            Item: "Tazo\u00ae Bottled Organic Black Lemonade",
            Calories: 140,
        },
        {
            "Unnamed: 0": 47,
            Item: "Tazo\u00ae Bottled Organic Iced Black Tea",
            Calories: 60,
        },
        {
            "Unnamed: 0": 48,
            Item: "Tazo\u00ae Bottled Organic Iced Green Tea",
            Calories: 120,
        },
        {
            "Unnamed: 0": 49,
            Item: "Tazo\u00ae Bottled Plum Pomegranate",
            Calories: 140,
        },
        {
            "Unnamed: 0": 50,
            Item: "Tazo\u00ae Bottled Tazoberry",
            Calories: 150,
        },
        {
            "Unnamed: 0": 51,
            Item: "Tazo\u00ae Bottled White Cranberry",
            Calories: 140,
        },
        {
            "Unnamed: 0": 52,
            Item: "Blonde Roast",
            Calories: 5,
        },
        {
            "Unnamed: 0": 53,
            Item: "Clover\u00ae Brewed Coffee",
            Calories: 10,
        },
        {
            "Unnamed: 0": 54,
            Item: "Decaf Pike Place\u00ae Roast",
            Calories: 5,
        },
        {
            "Unnamed: 0": 55,
            Item: "Featured Dark Roast",
            Calories: 5,
        },
        {
            "Unnamed: 0": 56,
            Item: "Iced Coffee",
            Calories: 5,
        },
        {
            "Unnamed: 0": 57,
            Item: "Nari\u00f1o 70 Cold Brew",
            Calories: 5,
        },
        {
            "Unnamed: 0": 58,
            Item: "Nari\u00f1o 70 Cold Brew with Milk",
            Calories: 0,
        },
        {
            "Unnamed: 0": 59,
            Item: "Nitro Cold Brew",
            Calories: 5,
        },
        {
            "Unnamed: 0": 60,
            Item: "Nitro Cold Brew with Sweet Cream",
            Calories: 70,
        },
        {
            "Unnamed: 0": 61,
            Item: "Pike Place\u00ae Roast",
            Calories: 5,
        },
        {
            "Unnamed: 0": 62,
            Item: "Vanilla Sweet Cream Cold Brew",
            Calories: 110,
        },
        {
            "Unnamed: 0": 63,
            Item: "Hot Chocolate",
            Calories: 320,
        },
        {
            "Unnamed: 0": 64,
            Item: "Starbucks\u00ae Signature Hot Chocolate",
            Calories: 430,
        },
        {
            "Unnamed: 0": 65,
            Item: "Caff\u00e8 Latte",
            Calories: 190,
        },
        {
            "Unnamed: 0": 66,
            Item: "Caff\u00e8 Mocha",
            Calories: 290,
        },
        {
            "Unnamed: 0": 67,
            Item: "Cappuccino",
            Calories: 120,
        },
        {
            "Unnamed: 0": 68,
            Item: "Caramel Macchiato",
            Calories: 250,
        },
        {
            "Unnamed: 0": 69,
            Item: "Cinnamon Dolce Latte",
            Calories: 260,
        },
        {
            "Unnamed: 0": 70,
            Item: "Coconutmilk Mocha Macchiato",
            Calories: 250,
        },
        {
            "Unnamed: 0": 71,
            Item: "Flat White",
            Calories: 180,
        },
        {
            "Unnamed: 0": 72,
            Item: "Iced Caff\u00e8 Latte",
            Calories: 130,
        },
        {
            "Unnamed: 0": 73,
            Item: "Iced Caff\u00e8 Mocha",
            Calories: 230,
        },
        {
            "Unnamed: 0": 74,
            Item: "Iced Caramel Macchiato",
            Calories: 250,
        },
        {
            "Unnamed: 0": 75,
            Item: "Iced Cinnamon Dolce Latte",
            Calories: 200,
        },
        {
            "Unnamed: 0": 76,
            Item: "Iced Coconutmilk Mocha Macchiato",
            Calories: 260,
        },
        {
            "Unnamed: 0": 77,
            Item: "Iced Vanilla Latte",
            Calories: 190,
        },
        {
            "Unnamed: 0": 78,
            Item: "Iced White Chocolate Mocha",
            Calories: 300,
        },
        {
            "Unnamed: 0": 79,
            Item: "Latte Macchiato",
            Calories: 190,
        },
        {
            "Unnamed: 0": 80,
            Item: "Latte Macchiato",
            Calories: 190,
        },
        {
            "Unnamed: 0": 81,
            Item: "Starbucks Doubleshot\u00ae on Ice Beverage",
            Calories: 45,
        },
        {
            "Unnamed: 0": 82,
            Item: "Vanilla Latte",
            Calories: 250,
        },
        {
            "Unnamed: 0": 83,
            Item: "White Chocolate Mocha",
            Calories: 360,
        },
        {
            "Unnamed: 0": 84,
            Item: "Cinnamon Dolce Frappuccino\u00ae Blended Coffee",
            Calories: 350,
        },
        {
            "Unnamed: 0": 85,
            Item: "Coffee Light Frappuccino\u00ae Blended Coffee",
            Calories: 110,
        },
        {
            "Unnamed: 0": 86,
            Item: "Mocha Frappuccino\u00ae Blended Coffee",
            Calories: 280,
        },
        {
            "Unnamed: 0": 87,
            Item: "Mocha Light Frappuccino\u00ae Blended Coffee",
            Calories: 140,
        },
        {
            "Unnamed: 0": 88,
            Item: "Cinnamon Dolce Cr\u00e8me",
            Calories: 200,
        },
        {
            "Unnamed: 0": 89,
            Item: "Vanilla Cr\u00e8me",
            Calories: 200,
        },
        {
            "Unnamed: 0": 90,
            Item: "Chocolate Smoothie",
            Calories: 320,
        },
        {
            "Unnamed: 0": 91,
            Item: "Strawberry Smoothie",
            Calories: 300,
        },
    ],
};

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

const PostTradingRecord = ({ userid, username }) => {
    const [selectedCoin, setSelectedCoin] = useState("Bitcoin (BTC)");
    const [price, setPrice] = useState("2");
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const [receivedTags, setReceivedTags] = useState([]);
    const [alignment, setAlignment] = useState("buy"); // 初期値を設定
    const [mealType, setMealType] = useState("breakfast"); // 初期値を設定
    const meal_options = ["MC donald", "KFC", "Burger King", "Subway"];

    const handleOpen = () => {
        setOpen(true);
    };

    const formatCurrency = (value) => {
        return `${value}×100g`; // 金額を表示するフォーマットを追加
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
        setSelectedCoin(event.target.value);
    };

    const handleMealTypeChange = (event, newAlignment) => {
        setMealType(newAlignment);
    };

    const CalSumCal = (receivedTags) => {
        let sum = 0;
        receivedTags.reduce((acc, cur) => {
            sum += cur.calories * cur.count;
        }, 0);
        return sum;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "http://127.0.0.1:8000/post_trading_record/";
        try {
            const response = await axios.post(url, {
                userid: userid,
                username: username,
                coin: selectedCoin,
                price: price * 1000,
                tag: receivedTags,
                alignment: alignment,
            });

            if (response.status === 200) {
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
                                        value="breakfast"
                                        aria-label="Buy"
                                    >
                                        <WbTwilightIcon
                                            sx={{ marginLeft: "5px" }}
                                        />{" "}
                                    </ToggleButton>
                                    <ToggleButton
                                        value="launch"
                                        aria-label="Sell"
                                    >
                                        <LightModeIcon
                                            sx={{ marginLeft: "5px" }}
                                        />
                                    </ToggleButton>
                                    <ToggleButton
                                        value="dinner"
                                        aria-label="Sell"
                                    >
                                        <DarkModeIcon
                                            sx={{ marginLeft: "5px" }}
                                        />
                                    </ToggleButton>
                                    <ToggleButton
                                        value="snack"
                                        aria-label="Sell"
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
                                    value={selectedCoin}
                                    onChange={handleOptionChange}
                                    label="Select an Option"
                                    sx={{ width: "100%" }}
                                >
                                    {meal_options.map((option, index) => (
                                        <MenuItem key={index} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <TagInput
                                    onTagsChange={handleTagsChange}
                                    options={options}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" align="center">
                                    Total Calories
                                </Typography>
                                <Typography variant="h5" align="center">
                                    {CalSumCal(receivedTags) + "kcal"}
                                </Typography>
                            </Grid>
                            <Alert severity="error">
                                Worry about leftovers!!
                            </Alert>
                            <Alert severity="warning">
                                A bit Need to worry about leftovers!
                            </Alert>
                            <Alert severity="success">
                                No need to worry about leftovers
                            </Alert>
                            {error && (
                                <Grid item xs={12}>
                                    <Typography color="error">
                                        {error}
                                    </Typography>
                                </Grid>
                            )}
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

export default PostTradingRecord;

const options = [
    { Hamburger: 400 },
    { Fries: 200 },
    { Coke: 180 },
    { Chicken: 400 },
    { Salad: 200 },
];

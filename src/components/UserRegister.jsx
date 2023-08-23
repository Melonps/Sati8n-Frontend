import { useState, useRef } from "react";
import { Container, TextField, Button, Typography, Grid } from "@mui/material";
import axios from "axios";
import TagInput from "./TagInput";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"; // 所持金のアイコン
import PersonIcon from "@mui/icons-material/Person";
import FlagIcon from "@mui/icons-material/Flag";

const UserProfileForm = ({ onFormSubmit }) => {
    const usernameRef = useRef("");
    const moneyRef = useRef(""); // 所持金の入力用
    const targetRef = useRef(""); // ゴールの入力用
    const messageRef = useRef(null);
    const [receivedTags, setReceivedTags] = useState([]);

    const options = [
        "Bitcoin (BTC)",
        "Ethereum (ETH)",
        "Binance Coin (BNB)",
        "Cardano (ADA)",
        "Solana (SOL)",
        "XRP (XRP)",
        "Polkadot (DOT)",
        "Dogecoin (DOGE)",
        "Litecoin (LTC)",
        "Chainlink (LINK)",
        "Stellar (XLM)",
        "Bitcoin Cash (BCH)",
        "Tether (USDT)",
        "USD Coin (USDC)",
        "VeChain (VET)",
        "Uniswap (UNI)",
        "Aave (AAVE)",
        "Polygon (MATIC)",
        "Cosmos (ATOM)",
        "Tezos (XTZ)",
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/create_profile/",
                {
                    username: usernameRef.current.value,
                    state: parseFloat(moneyRef.current.value) * 10000, // 1万円単位で計算
                    target: parseFloat(targetRef.current.value) * 10000, // 1万円単位で計算
                    tag: receivedTags,
                }
            );

            if (response.status === 200) {
                showMessage("Data has been successfully submitted.", "green");
                onFormSubmit({
                    username: usernameRef.current.value,
                    money: parseFloat(moneyRef.current.value) * 10000, // 1万円単位で計算
                    target: parseFloat(targetRef.current.value) * 10000, // 1万円単位で計算
                    tag: receivedTags,
                });
            }
        } catch (error) {
            showMessage("An error occurred while submitting the data.", "red");
            console.error(error);
        }
    };

    const showMessage = (text, color) => {
        if (messageRef.current) {
            messageRef.current.innerText = text;
            messageRef.current.style.color = color;
        }
    };

    const handleTagsChange = (newTags) => {
        setReceivedTags(newTags);
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Enter Your Profile
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    fullWidth
                    inputRef={usernameRef}
                    margin="normal"
                    required
                    InputProps={{
                        startAdornment: <PersonIcon fontSize="small" />,
                    }}
                />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="現状（万円）"
                            fullWidth
                            inputRef={moneyRef}
                            margin="normal"
                            required
                            type="number"
                            inputProps={{ step: "1" }} // 1万円単位で入力
                            InputProps={{
                                startAdornment: (
                                    <MonetizationOnIcon fontSize="small" />
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="ゴール（万円）"
                            fullWidth
                            inputRef={targetRef}
                            margin="normal"
                            required
                            type="number"
                            inputProps={{ step: "1" }} // 1万円単位で入力
                            InputProps={{
                                startAdornment: <FlagIcon fontSize="small" />,
                            }}
                        />
                    </Grid>
                </Grid>
                <TagInput onTagsChange={(handleTagsChange, options)} />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    color="primary"
                >
                    Submit
                </Button>

                <Typography ref={messageRef} mt={2}></Typography>
            </form>
        </Container>
    );
};

export default UserProfileForm;

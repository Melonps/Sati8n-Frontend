import { useState } from "react";
import {
    TextField,
    Button,
    Modal,
    Box,
    Grid,
    Typography,
    Slider,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import UpdateIcon from "@mui/icons-material/Update";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

const EditProfile = ({ userInfoRef }) => {
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const [updatedSex, setUpdatedSex] = useState("Male");
    const [updatedUserName, setUpdatedUserName] = useState("");
    const [updatedAge, setUpdatedAge] = useState("");
    const [updatedHeight, setUpdatedHeight] = useState("");
    const [updatedWeight, setUpdatedWeight] = useState("");
    const [updatedBio, setUpdatedBio] = useState("");

    const handleOpen = () => {
        setOpen(true);
        setUpdatedUserName(userInfoRef.current.username); // Set initial username
        setUpdatedAge(userInfoRef.current.age); // Set initial age
        setUpdatedHeight(userInfoRef.current.height); // Set initial height
        setUpdatedWeight(userInfoRef.current.weight); // Set initial weight
        setUpdatedSex(userInfoRef.current.sex);
        setUpdatedBio(userInfoRef.current.bio); // Set initial bio
    };

    const handleSexChange = (event, newAlignment) => {
        if (newAlignment !== null) {
            setUpdatedSex(newAlignment);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setError("");
    };
    const PostData = async () => {
        try {
            const response = await axios.put(
                `https://sati8n-backend.onrender.com/api/user/profile`,
                {
                    user_id: userInfoRef.current.user_id,
                    user_name: userInfoRef.current.user_name,
                    height: userInfoRef.current.height,
                    weight: userInfoRef.current.weight,
                    age: userInfoRef.current.age,
                    sex: userInfoRef.current.sex,
                    bio: userInfoRef.current.bio,
                }
            );
            if (response.status === 201) {
                console.log("Trading record created successfully");
                console.log(response.data);
            }
        } catch (error) {
            console.error("Error creating trading record:", error);
            setError("Error creating trading record. Please try again.");
        }
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();

        // Update userInfoRef with new values
        userInfoRef.current = {
            ...userInfoRef.current,
            user_name: updatedUserName,
            height: updatedHeight,
            weight: updatedWeight,
            age: updatedAge,
            sex: updatedSex,
            bio: updatedBio,
        };
        PostData();
        // Close the modal
        handleClose();
    };

    return (
        <div>
            <div className="fixed right-20 bottom-64">
                <Button
                    variant="outlined"
                    onClick={handleOpen}
                    style={{
                        borderRadius: "50%",
                        padding: "20px",
                        border: "2px solid",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <EditIcon />
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
                        width: "100%",
                    }}
                >
                    <form onSubmit={handleUpdateProfile}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12}>
                                <Typography variant="h6">
                                    Edit Profile
                                    <AccountBoxIcon
                                        color="primary"
                                        sx={{ marginLeft: "5px" }}
                                    />
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="UserName"
                                    name="username"
                                    fullWidth
                                    required
                                    value={updatedUserName}
                                    onChange={(e) =>
                                        setUpdatedUserName(e.target.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ToggleButtonGroup
                                    value={updatedSex}
                                    exclusive
                                    color="primary"
                                    onChange={handleSexChange}
                                    aria-label="male or female"
                                >
                                    <ToggleButton
                                        value="male"
                                        aria-label="female"
                                    >
                                        <MaleIcon sx={{ marginLeft: "5px" }} />{" "}
                                    </ToggleButton>
                                    <ToggleButton
                                        value="female"
                                        aria-label="female"
                                    >
                                        <FemaleIcon
                                            sx={{ marginLeft: "5px" }}
                                        />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography id="range-slider" gutterBottom>
                                    年齢：{updatedAge}歳
                                </Typography>
                                <Slider
                                    aria-label="State"
                                    defaultValue={0}
                                    value={updatedAge}
                                    valueLabelDisplay="auto"
                                    step={2}
                                    min={10}
                                    max={70}
                                    onChange={(e) =>
                                        setUpdatedAge(e.target.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography id="range-slider" gutterBottom>
                                    身長：{updatedHeight}cm
                                </Typography>
                                <Slider
                                    aria-label="Target"
                                    defaultValue={0}
                                    value={updatedHeight}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    min={100}
                                    max={200}
                                    onChange={(e) =>
                                        setUpdatedHeight(e.target.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography id="range-slider" gutterBottom>
                                    体重：{updatedWeight}kg
                                </Typography>
                                <Slider
                                    aria-label="Target"
                                    defaultValue={0}
                                    value={updatedWeight}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    min={30}
                                    max={200}
                                    onChange={(e) =>
                                        setUpdatedWeight(e.target.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Bio"
                                    name="bio"
                                    fullWidth
                                    required
                                    value={updatedBio}
                                    onChange={(e) =>
                                        setUpdatedBio(e.target.value)
                                    }
                                />
                            </Grid>
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
                                    Update Profile
                                    <UpdateIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default EditProfile;

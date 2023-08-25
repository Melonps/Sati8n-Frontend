import React, { useState } from "react";
import { styled } from "@mui/system";
import { Box, Avatar, Typography, IconButton } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const StoryContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center", // Center align items vertically
    padding: "8px", // You can adjust this value
});

const Icon = styled("div")(({ theme, selected }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center align content horizontally
    margin: "0 8px", // You can adjust this value
    cursor: "pointer",
    transition: "transform 0.2s",
    border: selected ? `2px solid ${theme.palette.primary.main}` : "none",
    "&:hover": {
        transform: "scale(1.1)",
    },
}));

const data = [
    { id: 1, username: "Kusumi" },
    { id: 2, username: "Banri" },
    { id: 3, username: "Kosuke" },
    { id: 4, username: "Kaize" },
    { id: 5, username: "Matsugane" },
    // ...add more data
];

function StoryComponent() {
    const [selectedIcon, setSelectedIcon] = useState(null);

    const handleIconClick = (id) => {
        setSelectedIcon(id);
    };

    return (
        <StoryContainer>
            <IconButton>
                <KeyboardArrowLeftIcon />
            </IconButton>
            {data.map((item) => (
                <Icon
                    key={item.id}
                    selected={selectedIcon === item.id}
                    onClick={() => handleIconClick(item.id)}
                >
                    <Avatar
                        src={`https://cat-avatars.vercel.app/api/cat?name=${encodeURIComponent(
                            item.username
                        )}`}
                        alt={`Icon ${item.id}`}
                        sx={{
                            width: 60,
                            height: 60,
                            border: "3px solid #df929b",
                        }}
                    />
                    <Typography variant="caption">{item.username}</Typography>
                </Icon>
            ))}
            <IconButton>
                <KeyboardArrowRightIcon />
            </IconButton>
        </StoryContainer>
    );
}

export default StoryComponent;

import { useState, useEffect, useRef } from "react";
import {
    Typography,
    Box,
    BottomNavigation,
    BottomNavigationAction,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import heroChar from "../assets/hero_char.png";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SignOut from "../components/SignOut";
import PostTradingRecord from "../components/PostActivity";
import UserProfileComponent from "../components/UserProfile";
import EditProfile from "../components/EditProfile";
import DashBoard from "./DashBoard";
import { MainLogo } from "../components/Icon";
import axios from "axios";

import "../App.css";
const data = {
    userid: "test",
    username: "test",
    bio: "test",
    state: 20,
    height: 170,
    weight: 60,
    sex: "male",
    target: 2000,
};

function Home() {
    const [navigationValue, setNavigationValue] = useState("analysis");
    const userProfileRef = useRef(data);

    const location = useLocation();
    const userId = location.state && location.state.userId;

    const handleNavigationChange = (event, newValue) => {
        setNavigationValue(newValue);
    };

    return (
        <>
            <section className="section-container mx-64  w-full flex justify-center">
                <MainLogo className="w-32 absolute left-8 top-8" />
                <Box p={4}>
                    {navigationValue === "analysis" && <DashBoard />}
                    {navigationValue === "profile" && (
                        <UserProfileComponent userInfoRef={userProfileRef} />
                    )}
                    <BottomNavigation
                        value={navigationValue}
                        onChange={handleNavigationChange}
                        sx={{
                            mt: 4,
                            width: "100%",
                        }}
                    >
                        <BottomNavigationAction
                            label="Analysis"
                            value="analysis"
                            icon={<BarChartIcon />}
                        />
                        <BottomNavigationAction
                            label="Profile"
                            value="profile"
                            icon={<AccountCircleIcon />}
                        />
                    </BottomNavigation>
                    <EditProfile userInfoRef={userProfileRef} />
                    <SignOut />
                    <PostTradingRecord
                        userid={userId}
                        username={userProfileRef.current?.username}
                    />
                </Box>
            </section>
        </>
    );
}

export default Home;

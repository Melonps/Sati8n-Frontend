import {
    Avatar,
    Box,
    Divider,
    Grid,
    Paper,
    Typography,
    Chip,
} from "@mui/material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import FlagIcon from "@mui/icons-material/Flag"; /*  */
import AllInboxIcon from "@mui/icons-material/AllInbox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserProfileComponent = ({ userInfoRef }) => {
    const avatarUrl = `https://cat-avatars.vercel.app/api/cat?name=${encodeURIComponent(
        userInfoRef.current.user_name
    )}`;
    return (
        <Box p={2} sx={{ mt: 2, mb: 2, minWidth: 600 }}>
            <Typography
                component="h1"
                variant="h4"
                className="section-title"
                style={{ marginTop: "60px", marginBottom: "20px" }}
            >
                Profile
                <AccountCircleIcon color="primary" fontSize="large" />
            </Typography>
            <Paper variant="outlined">
                <Box p={2}>
                    <Grid
                        container
                        spacing={3}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid item>
                            <Avatar
                                alt="User Avatar"
                                src={avatarUrl}
                                sx={{
                                    border: "3px solid #fff",
                                    width: 100,
                                    height: 100,
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <Box textAlign="center">
                                <Typography variant="h5">
                                    {userInfoRef.current.user_name}
                                </Typography>
                                <Typography variant="body2">
                                    @{userInfoRef.current.user_id}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Divider />
                <Box p={2}>
                    <Typography variant="subtitle1">
                        プロフィール情報
                    </Typography>
                    <Typography variant="body1">
                        {userInfoRef.current.bio}
                    </Typography>
                </Box>
            </Paper>
            <Box mt={2}>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Paper elevation={3} variant="outlined" sx={{ p: 2 }}>
                            <Typography variant="h6">
                                投稿
                                <AllInboxIcon
                                    color="primary"
                                    sx={{ marginLeft: "5px" }}
                                />
                            </Typography>
                            <Typography variant="h5">10</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={3} variant="outlined" sx={{ p: 2 }}>
                            <Typography variant="h6">
                                BMI
                                <AccessAlarmIcon
                                    color="primary"
                                    sx={{ marginLeft: "5px" }}
                                />
                            </Typography>
                            <Typography variant="h5">
                                {Math.round(
                                    (userInfoRef.current.weight /
                                        userInfoRef.current.height /
                                        userInfoRef.current.height) *
                                        10000
                                )}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={3} variant="outlined" sx={{ p: 2 }}>
                            <Typography variant="h6">
                                目標カロリー
                                <FlagIcon
                                    color="primary"
                                    sx={{ marginLeft: "5px" }}
                                />
                            </Typography>
                            <Typography variant="h5">
                                {userInfoRef.current.target}kcal
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default UserProfileComponent;

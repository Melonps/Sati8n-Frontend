import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import Button from "@mui/material/Button";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const SignOut = () => {
    const navigate = useNavigate(); // useNavigateフックを使用してnavigate関数を取得
    const handleClickSignOut = async () => {
        // ログアウトボタンのクリックハンドラ
        try {
            await signOut(auth); // authオブジェクトを使用してログアウトを試行
            console.log("[Succeeded] Sign out"); // ログアウト成功時にメッセージをコンソールに出力
            navigate("/"); // ログアウト後にルートページに遷移
        } catch (error) {
            console.error(error); // エラーが発生した場合にエラーメッセージをコンソールに出力
        }
    };

    return (
        <div className="fixed right-20 bottom-16">
            <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 3 }}
                style={{
                    borderRadius: "50%",
                    padding: "20px",
                    border: "2px solid",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
                onClick={handleClickSignOut} // ログアウトボタンがクリックされたときにhandleClickSignOut関数を実行
            >
                <ExitToAppIcon />
            </Button>
        </div>
    );
};

export default SignOut;

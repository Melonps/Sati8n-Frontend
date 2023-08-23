import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";

// LogInコンポーネントの定義
const LogIn = () => {
    const [signInEmail, setSignInEmail] = useState(""); // signInEmailとsetSignInEmailをuseStateフックで定義
    const [signInPassword, setSignInPassword] = useState(""); // signInPasswordとsetSignInPasswordをuseStateフックで定義
    const [error, setError] = useState(null); // errorとsetErrorをuseStateフックで定義
    const [user, setUser] = useState(null); // userとsetUserをuseStateフックで定義
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        // ログインフォームの送信処理
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, signInEmail, signInPassword); // signInWithEmailAndPassword関数を使用してユーザーをログイン
            console.log("[Succeeded] Sign in"); // ログイン成功時にメッセージをコンソールに出力
            navigate("/home", { state: { userId: currentUser.uid } });
        } catch (error) {
            setError(
                "ログインに失敗しました。正しいメールアドレスとパスワードを入力してください。"
            ); // エラーメッセージを設定
            setError(null);
            console.error(error); // エラーが発生した場合にエラーメッセージをコンソールに出力
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // コンポーネントのマウント時に実行される処理
            console.log(currentUser.uid);
            setUser(currentUser); // onAuthStateChanged関数を使用して認証の状態が変化したときにイベントを購読し、ユーザーステートを更新
            if (currentUser) {
                navigate("/home", { state: { userId: currentUser.uid } });
            }
        });

        return () => {
            unsubscribe(); // クリーンアップ関数としてunsubscribeを返すことでイベントリスナーの解除を行う
        };
    }, []);

    return (
        <>
            {user ? null : (
                <>
                    <Typography component="h1" variant="h3">
                        Sign In
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1, mx: "auto", maxWidth: 600 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoComplete="email"
                            autoFocus
                            value={signInEmail}
                            onChange={(event) =>
                                setSignInEmail(event.target.value)
                            }
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            value={signInPassword}
                            onChange={(event) =>
                                setSignInPassword(event.target.value)
                            }
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 4, mx: "auto" }}
                        >
                            Log In
                        </Button>
                    </Box>
                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        新規ユーザ登録は<Link to="/signup">こちら</Link>
                    </Typography>
                </>
            )}
        </>
    );
};

export default LogIn;

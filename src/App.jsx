import { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./views/Home";
import SignUpPage from "./views/SignUpPage";
import SignInPage from "./views/SignInPage";

// Appコンポーネント
const App = () => {
    // ユーザーの設定に応じたダークモードの優先設定を取得
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    // useMemoフックを使用してテーマを作成
    const theme = useMemo(
        () =>
            createTheme({
                // パレットのモードをダークモードまたはライトモードに設定
                palette: {
                    mode: prefersDarkMode ? "light" : "light",
                    text: {
                        primary: "#4E5049",
                        secondary: "#9BA3B5",
                    },
                    background: {
                        default: "#FFFFFF",
                        paper: "#F7F9F9",
                    },
                    primary: {
                        main: "#df929b",
                        extraDark: "#c06d76",
                        dark: "#c76672",
                        light: "#DCDCDC",
                        extraLight: "#f7d282",
                    },
                    noticeRed: {
                        main: "#c06d76",
                        dark: "#c8a251",
                        light: "#f7d282",
                    },
                },
                typography: {
                    fontFamily:
                        "Inter, 'Noto Sans JP', sans-serif, 'Segoe UI Emoji'",
                    fontWeightLight: 300,
                    fontWeightRegular: 400,
                    fontWeightMedium: 500,
                    fontWeightBold: 700,
                },
                components: {
                    MuiOutlinedInput: {
                        styleOverrides: {
                            input: {
                                "&:-webkit-autofill": {
                                    "-webkit-box-shadow":
                                        "0 0 0 100px var(--primary-weak) inset",
                                    "-webkit-text-fill-color":
                                        "var(--text-primary)",
                                },
                            },
                            root: {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#4E5049",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#4E5049",
                                },
                            },
                        },
                    },
                },
            }),
        [prefersDarkMode]
    );

    return (
        <div className="App flex min-h-screen text-center flex-col items-center justify-center">
            {/* アプリケーション全体のテーマを設定するためにThemeProviderを使用 */}
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {/* ルーティングを設定するためにBrowserRouterを使用 */}
                <BrowserRouter>
                    <Routes>
                        {/* ルートパスに対するルート要素としてSignInPageコンポーネントを設定 */}
                        <Route path={`/`} element={<SignInPage />} />
                        {/* /signupパスに対するルート要素としてSignUpPageコンポーネントを設定 */}
                        <Route path={`/signup`} element={<SignUpPage />} />
                        {/* /homeパスに対するルート要素としてHomeコンポーネントを設定 */}
                        <Route path={`/home`} element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
};

// Appコンポーネントをエクスポート
export default App;

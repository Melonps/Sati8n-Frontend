import { useEffect } from "react";
import LogIn from "../components/LogIn";
import { MainLogoDark } from "../components/Icon";
import heroChar from "../assets/hero_char.png";

import { Typography } from "@mui/material";

const SignInPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <section className="min-h-screen">
                <div className="App-header flex items-center">
                    <MainLogoDark className="w-1/2 xl:w-1/3 h-24 mx-auto mb-4 " />
                    <img
                        src={heroChar}
                        alt="hero character"
                        className="w-1/4"
                    />
                </div>
            </section>
            <section className="min-h-screen flex items-center justify-center py-20 text-dark dark:text-light">
                <div>
                    <LogIn />
                </div>
            </section>
        </>
    );
};

export default SignInPage;

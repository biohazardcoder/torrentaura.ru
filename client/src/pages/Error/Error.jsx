import React from "react";
import { Link } from "react-router-dom";

export const Error = () => {
    // Styles
    const styles = {
        container: "col-span-6 row-span-10 bg-mainText",
        content: "container h-full flex items-center justify-center flex-col gap-5",
        title: "text-8xl text-green-700 font-bold",
        highlight: "text-sidebarBg",
        message: "font-bold",
        button: "bg-green-700 py-2 px-5 font-bold text-white rounded-3xl",
    };

    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    <span className={styles.highlight}>4</span>0
                    <span className={styles.highlight}>4</span>
                </h1>
                <p className={styles.message}>This is not your searched web site</p>
                <Link to="/" className={styles.button}>
                    Back to Home
                </Link>
            </div>
        </section>
    );
};

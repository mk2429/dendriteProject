import React, { useState, useEffect, useRef } from "react";
import Keycloak from "keycloak-js";

const client = new Keycloak({
    url: "http://127.0.0.1:8080",
    realm: "DendriteProject",
    clientId: "shazamApp"
});

export const UseAuth = () => {
    const isRun = useRef(false);
    const [isLogin, setLogin] = useState(false);

    useEffect(() => {
        const initializeKeycloak = async () => {
            if (isRun.current) return;

            isRun.current = true;
            try {
                await client.init({ onLoad: "login-required" });
                setLogin(true);
            } catch (error) {
                console.error("Keycloak initialization error:", error);
            }
        };

        initializeKeycloak();
    }, []);

    return {
        isLogin
    };
};

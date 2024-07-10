import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../pages/security/contexts/LoginContextProvider";
import axios from "../pages/security/apis/api";

export default function useRealName() {
    const { isLogin, isUserId } = useContext(LoginContext);
    const [name, setName] = useState(null);

    const fetchName = async () => {
        try {
            const resp = await axios.get("/api/reservations/get_name");
            setName(resp.data);
        } catch(err) {
            setName(null);
        }
    };

    useEffect(() => { fetchName(); }, [isLogin]);

    return name;
}
import { useEffect, useState } from "react";
import useAuth, { LOGIN_STATUS } from "./useAuth";

export default function useRealName() {
    const { loginStatus, axios } = useAuth();
    const [name, setName] = useState(null);

    const fetchName = async () => {
        try {
            const resp = await axios.get("/api/reservations/get_name");
            setName(resp.data);
        } catch(err) {
            setName(null);
        }
    };

    useEffect(() => { loginStatus === LOGIN_STATUS.LOGGED_IN && fetchName(); }, [loginStatus]);

    return name;
}
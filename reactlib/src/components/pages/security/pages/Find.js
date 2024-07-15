import FindId from "../components/Login/FindId";
import FindPw from "../components/Login/FindPw";
import Header from "../../../fragments/header/header";
import { useParams } from "react-router-dom";

const Find = () => {
    const { id } = useParams();

    return (<>
        <Header />
        {(id === "id") ? <FindId /> : <FindPw />}
    </>
    )
}
export default Find;
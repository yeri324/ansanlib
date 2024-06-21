import AdminHeader from "./AdminHeader";
import AdminSearch from "./AdminSearch";
import AdminSide from "./AdminSide";
import AdminUserList from "./AdminUserList";
import { useEffect, useState } from "react";


const Admin = () => {

    const [searchOption, setSearchOption] = useState({
        searchBy:"id",
        searchQuery:"",
        selectRadio:"all",
    });
    const [searchResult,setSerchResult] = useState([]);

    const onSearch = ()=> {
        axios(
            {
              url: '/admin/user/search',
              method: 'post',
              data: {
                searchBy : searchOption.searchBy,
                searchQuery : searchOption.searchQuery,
                selectRadio : searchOption.selectRadio,
              }, 
              baseURL: 'http://localhost:8090',
            }
          ).then((response) => { setSerchResult(response.data);
          });
    }


    return (
        <div>
           <AdminHeader />
           <AdminSide />
           <AdminSearch searchOption={searchOption} setSearchOption={setSearchOption} onSearch={onSearch} />
           <AdminUserList searchResult={searchResult}/>

        </div>
    );
}
export default Admin;
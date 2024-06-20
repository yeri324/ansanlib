const AdminSearch = ()=>{
    return (
        <div>
             <form action="/admin/user/search" method="get">
		        <label for="searchBy">searchBy</label>
		        <select id="searchBy" name="searchBy">
		            <option value="userId">ID</option>
		            <option value="userName">Name</option>
		        </select>

		        <input type="text" id="searchQuery" name="searchQuery" />

		        <label for="selectRadio">select</label>
		        <select id="selectRadio" name="selectRadio">
		            <option value="all">All</option>
		            <option value="penalty">Penalty</option>
		            <option value="latefee">Late Fee</option>
		        </select>

		        <button type="submit">Search</button>
		    </form>
        </div>
    );
    }
    export default AdminSearch;
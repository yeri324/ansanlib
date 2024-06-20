import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';

function App() {
  const [selectedDataset, setSelectedDataset] = useState();

useEffect(() => {
        getDataset();
  }, []);

  const getDataset = () => {
    axios.get('/admin/user/search')
    .then((res) => {
        let list = res.data.length === 1 ? res.data.concat(res.data) : res.data;
        setSelectedDataset(list);
    })
    .catch((err) => {
        setSelectedDataset([]);
    });
};


  return (
    <div className="App">
     
     <div>
     {selectedDataset && selectedDataset.map((item, index) => (
                        <div key={index} className="slide">
                            <div >
                                <div >
                                    
                                    <h4>{item.name} </h4>
                                </div>
                            </div>
                        </div>
                    ))}
     </div>
    </div>
  );
}
export default App;

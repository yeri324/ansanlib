import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
   const [faq, setFaq] = useState()

   useEffect(() => {
    getDataset();
}, []);

const getDataset = () => {
  axios.get('/faqlist')
  .then((res) => {
      
      setFaq(res.data);
  })
  .catch((err) => {
      setFaq([]);
  });
};

    return (
      <div>
      {faq && faq.map((item, index) => (
        <div key={index} className="slide">
            <div >
                <div >
                    <h4>{item.title} </h4>
                    <h4>{item.content} </h4>
                </div>
            </div>
        </div>
    ))}
    </div>
    );
}

export default App;

// import './App.css';
// import { AppBar,Toolbar,Typography } from '@mui/material';

// function App() {
//   return (
//     <div className="App">
      
//     </div>
//   );
// }
// export default App;

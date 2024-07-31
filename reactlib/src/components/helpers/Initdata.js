import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Initdata = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const initializeData = async () => {
      try {
        await axios.post('/users/initdata');
        navigate('/');
      } catch (error) {
        console.error('Error during initialization:', error);
        navigate('/');
      }
    };

    initializeData();
  }, [navigate]);

  // 로딩 상태를 사용자에게 보여줄 수 있음
  return
};

export default Initdata;
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import axios from 'axios';
import EmptyComponent from "./Components/EmptyComponent";
import Pagination from "./Components/Pagination";
import './App.sass';


function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
        async function getData () {
            const api = `https://jsonplaceholder.typicode.com/users`;
            const res = await axios.get(api);
            setUsers(res.data);
        }
        getData()
    }, [])
  return (

    <BrowserRouter>
        <Routes>
            <Route exact path={"/"} element={<Pagination data={users} title={'Table'} setData={setUsers} pageLimit={2} dataLimit={5}/>}/>
            <Route exact path={"/users/:id"} element={<EmptyComponent/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;

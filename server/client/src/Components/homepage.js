import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CardComp from './Cards/cardComp';
//import NavbarComp from './Navbar';
function Homepage() {
   
   const[users, setUsers] = useState([]);

    useEffect(() => {
      const axiosgetData = async () => {
          
      const d = await axios.get('http://localhost:5000/profile');
      
      setUsers(d.data);

    //   console.log(users)
    }
    axiosgetData();
    }, [])

    return (
      <div style={{textAlign: "center", backgroundColor: '#e1dfdf'}}>
        {/* <NavbarComp/> */}

        <h1 style={{color: "brown", marginBottom: "25px"}}>REGISTERED USERS!</h1>
        
        <div style={{ textAlign: "center", display: "flex", justifyContent: "space-evenly", flexDirection: "row", flexWrap: "wrap"}}>
        
        {
            users.length > 0 ?  users.map( (u) => {
                             return  <div style={{alignItems: "center"}}>
                                        <CardComp user = {u}/>
                                     </div>})
                              : <div>DATA NOT AVAILABLE!</div>
        }        
        </div>

      </div>
    )
}

export default Homepage;

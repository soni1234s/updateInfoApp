import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
//import './cardComp.css';
import {useHistory} from 'react-router-dom'

function CardComp({user}) {
   const history = useHistory();
    return (
        <Card style={{alignItems: "center", backgroundColor: 'white', height: "300px", width: "300px", marginBottom: "10px", }} className= "cards">
        <Card.Body >
          <Card.Title>{user.name}</Card.Title>
          <Card.Text>
           {user.email}
          </Card.Text>
          <Card.Text>
            {user.mobile}
          </Card.Text>
          <Button variant="primary" className="cards_button" onClick={() => {history.push({
            pathname: "/updateinfo",
            state: {user}
          })}}>Update Data</Button>
        </Card.Body>
      </Card>
    )
}

export default CardComp

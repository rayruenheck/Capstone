import { eventable } from './Event';
import { Card, Container, ListGroup } from 'react-bootstrap';
import { useContext, useEffect, useState } from "react";
import { AdminAuthContext } from "../contexts/AdminAuthProvider";
const base_api_url = import.meta.env.VITE_APP_BASE_API;



interface singleEventProps{
    key:number
    event:eventable
}


export default function EventByID(props:singleEventProps) {

    const {admin} = useContext(AdminAuthContext)
    const [event, setEvent] = useState<eventable>({id:0,
      img:'',
      active:true,
      date:'',
      time:'',
      location:'',
      name:'',
      artist:'',
      desc:''});
  
    useEffect(() => {
      (async () => {
        const res = await fetch(`${base_api_url}/events/${props.event.id}`, {
          method: "GET",
          headers: {
            "x-access-token": `Bearer ${admin.token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setEvent(data)
        }
      })();
    });
  
    

  
    return (

        <Container className="cardContainer"> 
    <Card className='eventCard' style={{ width: '400px', height: "650px" }}>
      <Card.Img style={{height: '300px'}} variant="top" src={`${props.event.img}`}/>
      
      <Card.Body>
        <Card.Title>{props.event.name}</Card.Title>
        <Card.Text>
          {props.event.desc}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{props.event.artist}</ListGroup.Item>
        <ListGroup.Item>{props.event.date}</ListGroup.Item>
        <ListGroup.Item>{props.event.time}</ListGroup.Item>
        <ListGroup.Item>{props.event.location}</ListGroup.Item>
        
      </ListGroup>
      </Card> 
    </Container>
    
  )
}

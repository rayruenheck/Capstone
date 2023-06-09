import { useContext} from "react"
import {Card, Container, ListGroup } from "react-bootstrap"
import { AdminAuthContext } from "../contexts/AdminAuthProvider"


const base_api_url = import.meta.env.VITE_APP_BASE_API;


export interface eventable{
    id:number,
    img:string,
    active:boolean,
    date:string,
    time:string,
    location:string,
    name:string,
    artist:string,
    desc:string,

}

interface eventProps{
    key:number
    event:eventable
    prop:Function
}




export default function Event(props:eventProps) {



  const {admin} = useContext(AdminAuthContext)

  const handleHideEvent = async () =>{

    const res = await fetch(`${base_api_url}/event`, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
        "x-access-token": `Bearer ${admin.token}`,
      },
      body: JSON.stringify({
        id : props.event.id,
        active: false
        
      }),
    });
    if (res.ok) {
      const data = await res.json();
      props.prop(props.event)
      console.log(data)
      
      
    }
  }
  const handleShowEvent = async () =>{

    const res = await fetch(`${base_api_url}/event`, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
        "x-access-token": `Bearer ${admin.token}`,
      },
      body: JSON.stringify({
        id : props.event.id,
        active: true
        
      }),
    });
    if (res.ok) {
      const data = await res.json();
      props.prop(props.event)
      console.log(data)
      
      
    }
  }



  
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
      
      {admin.token ? ( 
        <Card.Body style={{display: 'flex', justifyContent: 'space-between'}} >  
        <button style={{height:'30px', backgroundColor: 'lightblue', border:'none', borderRadius: '10px'}} onClick={() => handleHideEvent()} type="button" >Event Passed</button>
        <button style={{height:'30px', backgroundColor: 'lightblue', border:'none', borderRadius: '10px'}} onClick={() => handleShowEvent()} type="button" >Undo</button>
        </Card.Body>
      ):(<></>)}
     
      
      
        
      
    </Card> 
    </Container>
    
  )
}

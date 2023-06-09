import { useContext, useRef } from "react";
import { AdminAuthContext } from "../contexts/AdminAuthProvider";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "./NavBar";
const base_api_url = import.meta.env.VITE_APP_BASE_API;

export default function MakeEvent() {
  const { admin } = useContext(AdminAuthContext);
  const dateField = useRef<HTMLInputElement>(null);
  const timeField = useRef<HTMLInputElement>(null);
  const nameField = useRef<HTMLInputElement>(null);
  const locationField = useRef<HTMLInputElement>(null);
  const artistField = useRef<HTMLInputElement>(null);
  const descField = useRef<HTMLInputElement>(null);
  const imageField = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function handleEventForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const res = await fetch(`${base_api_url}/event`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        "x-access-token": `Bearer ${admin.token}`,
      },
      body: JSON.stringify({
        name: nameField.current?.value,
        img: imageField.current?.value,
        date: dateField.current?.value,
        time: timeField.current?.value,
        location: locationField.current?.value,
        artist: artistField.current?.value,
        desc: descField.current?.value,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      navigate(`/events`);
    }
  }
  return (
    <>
    <NavBar/>
    <Container className="forms">      
    <div className="makeEventFormContainer"> 
    <form onSubmit={handleEventForm}>
      <label>
        Name of Event:
        <br />
        <input type="text" ref={nameField} />
      </label><br/>

      <label>
        put the image url:
        <br />
        <input type="text" ref={imageField} />
      </label><br/>

      <label>
        Date of the Event:
        <br />
        <input type="text" ref={dateField} />
      </label><br/>
      
      <label>
        Time of the Event:
        <br />
        <input type="text" ref={timeField} />
      </label><br/>
      
      <label>
        Location of the Event:
        <br />
        <input type="text" ref={locationField} />
      </label><br/>

      <label>
        Showcasing Artist:
        <br />
        <input type="text" ref={artistField} />
      </label><br/>

      <label>
        Description of Event:
        <br />
        <input type="text" ref={descField} />
      </label><br/><br/>

      <button>Add New Event</button>
    </form>
    </div>
    </Container>
    </>
  );
}

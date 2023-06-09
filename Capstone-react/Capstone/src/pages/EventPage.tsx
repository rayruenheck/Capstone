import { useState, useEffect, useContext } from "react";
import Event from "../components/Event";
import { eventable } from "../components/Event";
import { AdminAuthContext } from "../contexts/AdminAuthProvider";

import NavBar from "../components/NavBar";

const base_api_url = import.meta.env.VITE_APP_BASE_API;

export default function EventPage() {
  const [eventArray, setEventArray] = useState<eventable[]>([]);
  const { admin } = useContext(AdminAuthContext);

  const hideCard = (event: eventable) => {
    event.active = false;
    setEventArray(eventArray.filter((e) => e.active));
  };

  useEffect(() => {
    (async () => {
      const res = await fetch(`${base_api_url}/events`, {
        method: "GET",
        headers: {
          "x-access-token": `Bearer ${admin.token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setEventArray(data.filter((e: eventable) => e.active));
      }
    })();
  }, []);

  return (
    <>
      <NavBar />
      <h3 style={{ margin: "50px" }}>Upcoming Events</h3>
      <main>
        <div className="eventCards">
          {eventArray.map((events) => {
            return <Event prop={hideCard} event={events} key={events.id} />;
          })}
        </div>
      </main>
    </>
  );
}

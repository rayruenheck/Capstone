import NavBar from "../components/NavBar";



export default function LandingPage() {

 
  
  
  return (
    <div>
      <NavBar />
      <div className="header">
        <h1 className="hero-text">Welcome to My Museum</h1>
      </div>
      <div className="landingPageBody">
        <div className="centerColumn">
          <h1>The Museum is open Wednesday - Sunday, 10am-4pm</h1>
          <h6>Learn more about holiday and shop hours.</h6>
          <div className="buttonBox">
            <button>Get tickets</button>
            <button>Become a Member</button>
          </div>
          <div className="stayConnected">
            <p><strong>Stay Connected!</strong> Sign up for the My Museum email Newsletter </p>
            <button>Subscribe</button>
          </div>
          <h1 className="programsAndEvents">Programs and Events</h1>
          <div className="landingPageEventBox">
            <div className="landingPageEventCard"></div>
            <div className="landingPageEventCard"></div>
            <div className="landingPageEventCard"></div>
          </div>


        </div>

      </div>
    </div>
  );
}

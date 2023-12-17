
import io from "socket.io-client";
import { useEffect, useState } from "react";
import acllogo from "/Users/shaymaa/Desktop/ACL/pharmacy/frontend/src/Components/acllogo.png";

const socket = io.connect("http://localhost:3001");

function PatientChat() {
  //Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <div className="PharmaPatientCheckWalletPage" style={{width: 1440, height: 1016, position: 'relative', background: 'white'}}>
    <div className="Botbar" style={{width: 1493, height: 131, left: -53, top: 927, position: 'absolute'}}>
      <div className="Rectangle1" style={{width: 1440, height: 70, left: 53, top: 19, position: 'absolute', background: '#4685FF'}} />
      <img className="Acllogo1" style={{width: 271, height: 131, left: 0, top: 0, position: 'absolute'}} src={acllogo}/>
      <div className="El7a2niClinicsAndPharmacy2023" style={{left: 563, top: 47, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 25, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>© el7a2ni clinics and pharmacy 2023</div>
    </div>
    <div className="Navbar" style={{width: 1683, height: 446, left: -243, top: -89, position: 'absolute'}}>
      <div className="Rectangle1" style={{width: 1440, height: 175, left: 243, top: 89, position: 'absolute', background: '#4685FF'}} />
      <div className="Logo" style={{width: 1290, height: 446, left: 0, top: 0, position: 'absolute'}}>
        <img className="Acllogo1" style={{width: 923, height: 446, left: 0, top: 0, position: 'absolute'}} src={acllogo}/>
        <div className="Pharmacy" style={{width: 618, height: 86, left: 672, top: 177, position: 'absolute', color: 'white', fontSize: 60, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Pharmacy</div>
        <div className="Logobtn" style={{width: 719, height: 175, left: 243, top: 89, position: 'absolute'}} />
      </div>
      <a href="/patient" className="Signup" style={{width: 163, height: 59, left: 1451, top: 177, position: 'absolute'}}>
        <div className="Rectangle4" style={{width: 160.55, height: 59, left: 2.45, top: 0, position: 'absolute', background: 'white', borderRadius: 18}} />
        <div className="SignUp" style={{width: 163, height: 59, left: 0, top: 0, position: 'absolute', textAlign: 'center', color: '#4685FF', fontSize: 32, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Home</div>
      </a>
    </div>
    <div className="Btn" style={{width: 304, height: 59, left: 582, top: 508, position: 'absolute'}}>
      <div className="Rectangle4" style={{width: 303.91, height: 59, left: 0.09, top: 0, position: 'absolute', background: '#4685FF', borderRadius: 18}} />
      <button className="SignUp" style={{width: 304, height: 59, left: 0, top: 0, position: 'absolute', textAlign: 'center', background: '#4685FF',color: 'white', fontSize: 32, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}} onClick={sendMessage}>Send Message</button>
    </div>
    <div className="Btn" style={{width: 304, height: 59, left: 67, top: 508, position: 'absolute'}}>
      <div className="Rectangle4" style={{width: 303.91, height: 59, left: 0.09, top: 0, position: 'absolute', background: '#4685FF', borderRadius: 18}} />
      <button className="SignUp" style={{width: 304, height: 59, left: 0, top: 0, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 32, fontFamily: 'Josefin Sans', fontWeight: '400', background: '#4685FF', wordWrap: 'break-word'}} onClick={joinRoom}>Join Room</button>
    </div>
    <div className="Chat" style={{width: 228, height: 47, left: 56, top: 222, position: 'absolute', color: 'black', fontSize: 48, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Chat</div>
    <div className="Login" style={{width: 839, height: 140, left: 56, top: 313, position: 'absolute'}}>
      <div className="Rectangle5" style={{width: 351.24, height: 65.37, left: -0, top: 74.37, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
      <div className="RoomNumber" style={{width: 334.91, height: 57.50, left: 8, top: 0, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Room number:</div>
      <input
        placeholder="Room Number..."
        onChange={(event) => setRoom(event.target.value)}
        style={{width: 351.24, height: 65.37, left: -0, top: 74.37, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}}
      />      <div className="Message" style={{width: 334.91, height: 57.50, left: 494.75, top: 0, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Message:</div>
      <div className="Name" style={{width: 351.24, height: 65.37, left: 487.76, top: 74.37, position: 'absolute'}}>
        <div className="Rectangle5" style={{width: 351.24, height: 65.37, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
        <input
        placeholder="Message..."
        onChange={(event) => setMessage(event.target.value)}
        style={{width: 351.24, height: 65.37, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}}
      />      </div>

      <div style= {{marginTop: "35vh"}}>
      <h2>Message: {messageReceived}</h2>
      </div>
    </div>
  </div>
  );
}

export default PatientChat;
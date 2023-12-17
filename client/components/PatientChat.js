import React from 'react';

function PatientChat() {
  const zoomMeetingLink = 'https://us05web.zoom.us/j/8011145782?pwd=6qQZprzfr11od523tbsaZ8bL4IMdLg.1';

  const openZoomMeeting = () => {
    window.open(zoomMeetingLink, '_blank');
  };

  return (
    <div>
      <h1>Zoom Meeting Integration</h1>
      <p>Click the button below to join the Zoom meeting:</p>
      <button onClick={openZoomMeeting}>Join Zoom Meeting</button>
    </div>
  );
}

export default PatientChat;

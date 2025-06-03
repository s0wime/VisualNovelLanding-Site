async function detectEventType(visitorId, eventType) {
  try {
    await fetch("http://localhost:3000/api/events/", {
      method: "POST",
      body: JSON.stringify({ visitorId, eventType }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export default detectEventType;

async function detectEventType(visitorId, eventType) {
  try {
    await fetch(
      "https://visualnovellanding-production.up.railway.app/api/events",
      {
        method: "POST",
        body: JSON.stringify({ visitorId, eventType }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export default detectEventType;

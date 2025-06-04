import { useEffect, useRef, useState } from "react";

export function useVisitorSession() {
  const [visitorId, setVisitorId] = useState(
    localStorage.getItem("VISITOR_ID")
  );
  const originalVisitorId = useRef(localStorage.getItem("VISITOR_ID_RESERVED"));

  useEffect(() => {
    function isValidUUID(id) {
      return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
        id
      );
    }

    async function checkVisitorId() {
      if (
        visitorId &&
        isValidUUID(visitorId) &&
        visitorId === originalVisitorId.current
      ) {
        return;
      }

      if (
        !isValidUUID(visitorId) &&
        originalVisitorId.current &&
        isValidUUID(originalVisitorId.current)
      ) {
        setVisitorId(originalVisitorId.current);
        localStorage.setItem("VISITOR_ID", originalVisitorId.current);
        return;
      }

      if (
        !isValidUUID(originalVisitorId.current) &&
        visitorId &&
        isValidUUID(visitorId)
      ) {
        originalVisitorId.current = visitorId;
        localStorage.setItem("VISITOR_ID_RESERVED", visitorId);
        return;
      }

      localStorage.clear();
      const id = crypto.randomUUID();

      try {
        const response = await fetch(
          "https://visualnovellanding-production.up.railway.app/api/visitors/create",
          {
            method: "POST",
            body: JSON.stringify({ visitorId: id }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 201) {
          localStorage.setItem("VISITOR_ID", id);
          localStorage.setItem("VISITOR_ID_RESERVED", id);
          originalVisitorId.current = id;
          setVisitorId(id);
        }
      } catch (err) {
        console.log(err);
      }
    }

    checkVisitorId().then();
  }, [visitorId]);

  useEffect(() => {
    if (!visitorId) {
      return;
    }

    async function handleSessionActivity(userId) {
      try {
        await fetch(
          "https://visualnovellanding-production.up.railway.app/api/sessions/activity",
          {
            method: "POST",
            body: JSON.stringify({ visitorId: userId }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
    handleSessionActivity(visitorId).then();

    const interval = setInterval(() => {
      handleSessionActivity(visitorId);
    }, 60000);
    return () => clearInterval(interval);
  }, [visitorId]);

  useEffect(() => {
    function handleStorage(e) {
      if (e.key === "VISITOR_ID") {
        setVisitorId(e.newValue);
      }
      setTimeout(() => {
        window.location.reload();
      }, 10);
    }

    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return visitorId;
}

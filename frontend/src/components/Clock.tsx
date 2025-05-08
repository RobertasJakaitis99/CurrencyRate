// src/components/Clock.tsx

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const Clock: React.FC = () => {
  const [time, setTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontSize: "0.9rem", color: "#888" }}>
      {time.format("DD-MM-YYYY HH:mm:ss")}
    </div>
  );
};

export default Clock;

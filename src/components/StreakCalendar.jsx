import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { subDays } from "date-fns";
import { db, auth } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const StreakCalendar = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        const userData = snapshot.data();
        const streakLog = userData.streakLog || {};

        const formatted = Object.entries(streakLog).map(([date, count]) => ({
          date,
          count,
        }));

        setData(formatted);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ margin: "2rem auto", maxWidth: "900px" }}>
      <CalendarHeatmap
        startDate={subDays(new Date(), 180)}
        endDate={new Date()}
        values={data}
        classForValue={(value) => {
          if (!value) return "color-empty";
          if (value.count >= 3) return "color-gitlab-4";
          if (value.count === 2) return "color-gitlab-3";
          return "color-gitlab-2";
        }}
        showWeekdayLabels
        tooltipDataAttrs={(value) =>
          value.date
            ? { "data-tip": `${value.date}: ${value.count} completed` }
            : {}
        }
      />
    </div>
  );
};

export default StreakCalendar;

import { useEffect } from "react";
import useElecHome from "../hooks/useElecHome";

export default function HomePage() {
  const date = new Date("2024-09-01");

  const { elecHome } = useElecHome({
    year: 2024,
    month: date.getMonth() - 1,
    cityCode: "11",
  });

  useEffect(() => {
    if (elecHome === null) return;
    console.log(elecHome);
  }, [elecHome]);

  return (
    <div>
      <div></div>
    </div>
  );
}

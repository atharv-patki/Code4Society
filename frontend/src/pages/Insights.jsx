import { useContext } from "react";
import { CarbonContext } from "../context/CarbonContext";
import AccuracySection from "../components/AccuracySection";

export default function Insights() {
  const { history } = useContext(CarbonContext);

  return (
    <div className="container">
      <AccuracySection history={history} />
    </div>
  );
}

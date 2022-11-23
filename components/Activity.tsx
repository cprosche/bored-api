import { useState } from "react";
import { BoredApiResponse } from "../pages";

interface IProps {
  activity: BoredApiResponse;
}

const Activity = ({ activity }: IProps) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className="border rounded p-5 mb-3 w-full">
      <div>
        <div className="text-xl">{activity.activity}</div>
        <div
          className="cursor-pointer underline text-blue-500 hover:text-blue-600"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "Hide" : "Show"} details
        </div>
      </div>
      <div
        className={`transition-all overflow-hidden ${
          showDetails ? "h-[100px] mt-3" : "h-0"
        }`}
      >
        {activity.link && (
          <div>
            Link:{" "}
            <a
              className="transition-colors text-blue-500 hover:text-blue-600 underline"
              href={activity.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {activity.link}
            </a>
          </div>
        )}
        <div>Number of Participants: {activity.participants}</div>
        <div>Relative Price: {activity.price}</div>
        <div>Type: {activity.type}</div>
        <div>Accessibility Rating: {activity.accessibility}</div>
      </div>
    </div>
  );
};

export default Activity;

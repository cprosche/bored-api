import { useEffect, useState } from "react";
import { BoredApiResponse, participantOptions } from "../pages";

interface IProps {
  activity: BoredApiResponse;
}

const Activity = ({ activity }: IProps) => {
  const [showDetails, setShowDetails] = useState(activity.showDetails);

  useEffect(() => {
    setShowDetails(activity.showDetails);
  }, [activity.showDetails]);

  return (
    <div
      onClick={() => setShowDetails(!showDetails)}
      className="border border-custom-yellow rounded p-5 mb-3 w-full bg-white cursor-pointer"
    >
      <div className="text-xl font-bold">{activity.activity}</div>
      <div
        className={`transition-all overflow-hidden ${
          showDetails ? "h-[120px] mt-3" : "h-0"
        }`}
      >
        {activity.link && (
          <div>
            Link:{" "}
            <a
              className="transition-colors text-custom-blue hover:text-blue-600 underline"
              href={activity.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {activity.link}
            </a>
          </div>
        )}
        <div className="capitalize">Type: {activity.type}</div>
        <div>{participantOptions[activity.participants].name}</div>
        <div>Relative Price: {activity.price}</div>
        <div>Accessibility Rating: {activity.accessibility}</div>
      </div>
    </div>
  );
};

export default Activity;

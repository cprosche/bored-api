import { useEffect, useState } from "react";
import {
  a11yOptions,
  BoredApiResponse,
  participantOptions,
  priceOptions,
} from "../pages";

interface IProps {
  activity: BoredApiResponse;
}

const Activity = ({ activity }: IProps) => {
  const [showDetails, setShowDetails] = useState(activity.showDetails);

  const getPriceDisplay = (relPrice: number) => {
    let copy = [...priceOptions];
    copy.shift();
    for (let option of copy) {
      if (relPrice <= option.max && relPrice >= option.min) {
        return option.name;
      }
    }
    return relPrice;
  };

  const getA11yDisplay = (a11yOption: number) => {
    let copy = [...a11yOptions];
    copy.shift();
    for (let option of copy) {
      if (a11yOption <= option.max && a11yOption >= option.min) {
        return option.name;
      }
    }
    return a11yOption;
  };

  useEffect(() => {
    setShowDetails(activity.showDetails);
  }, [activity.showDetails]);

  return (
    <div
      onClick={() => setShowDetails(!showDetails)}
      className="border border-custom-primary rounded p-5 mb-3 w-full bg-white cursor-pointer text-custom-primary"
    >
      <div className="text-xl font-bold">{activity.activity}</div>
      <div
        className={`transition-all overflow-hidden ${
          showDetails ? "h-[140px] mt-3" : "h-0"
        }`}
      >
        {activity.link && (
          <div className="mb-1 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-custom-primary mr-2"
            >
              <path
                fillRule="evenodd"
                d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z"
                clipRule="evenodd"
              />
            </svg>
            <a
              className="transition-colors text-custom-primary hover:text-blue-600 underline text-ellipsis truncate"
              href={activity.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {activity.link}
            </a>
          </div>
        )}
        <div className="mb-1 flex capitalize">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-custom-primary mr-2"
          >
            <path
              fillRule="evenodd"
              d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
              clipRule="evenodd"
            />
          </svg>
          {activity.type}
        </div>
        <div className="mb-1 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-custom-primary mr-2"
          >
            <path
              fillRule="evenodd"
              d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
              clipRule="evenodd"
            />
            <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
          </svg>
          {participantOptions[activity.participants].name}
        </div>
        <div className="mb-1 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-custom-primary mr-2"
          >
            <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z"
              clipRule="evenodd"
            />
          </svg>
          {getPriceDisplay(activity.price)}
        </div>
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-custom-primary mr-2"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
          {getA11yDisplay(activity.accessibility)}
        </div>
      </div>
    </div>
  );
};

export default Activity;

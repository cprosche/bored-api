import { useEffect, useState } from "react";
import Activity from "../components/Activity";
import Spinner from "../components/Spinner";

export interface BoredApiResponse {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
  accessibility: number;
  showDetails: boolean;
}

export const participantOptions = [
  {
    name: "Any number of participants",
    value: "",
  },
  {
    name: "1 participant",
    value: "1",
  },
  {
    name: "2 participants",
    value: "2",
  },
  {
    name: "3 participants",
    value: "3",
  },
  {
    name: "4 participants",
    value: "4",
  },
  {
    name: "5 participants",
    value: "5",
  },
  {
    name: "8 participants",
    value: "8",
  },
];

export const priceOptions = [
  {
    name: "Any price",
    min: 0,
    max: 1,
  },
  {
    name: "Free",
    min: 0,
    max: 0,
  },
  {
    name: "$",
    min: .01,
    max: .25,
  },
  {
    name: "$$",
    min: .26,
    max: .5,
  },
  {
    name: "$$$",
    min: .51,
    max: .75,
  },
  {
    name: "$$$$",
    min: .76,
    max: 1,
  },
];

export const a11yOptions = [
  {
    name: "Any accessibility",
    min: 0,
    max: 1,
  },
  {
    name: "Very accessible",
    min: 0,
    max: .33,
  },
  {
    name: "Somewhat accessible",
    min: .34,
    max: .66,
  },
  {
    name: "Least accessible",
    min: .67,
    max: 1,
  },
];

// TODO: responsive
// TODO: optional: add api error message
// TODO: optional: improve styling & UI
const Home = () => {
  const [activityList, setActivityList] = useState<BoredApiResponse[]>([]);

  const activityTypes = [
    "Education",
    "Recreational",
    "Social",
    "DIY",
    "Charity",
    "Cooking",
    "Relaxation",
    "Music",
    "Busywork",
  ];

  const [selectedType, setSelectedType] = useState("");
  const [priceOptionIndex, setPriceOptionIndex] = useState(0);
  const [a11yOptionIndex, setA11yOptionIndex] = useState(0);
  const [participantOptionIndex, setParticipantOptionIndex] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getActivity = async () => {
    setIsLoading(true);
    await fetch(
      `https://www.boredapi.com/api/activity/?type=${selectedType.toLowerCase()}&participants=${
        participantOptions[participantOptionIndex].value
      }&minprice=${priceOptions[priceOptionIndex].min}&maxprice=${
        priceOptions[priceOptionIndex].max
      }&minaccessibility=${a11yOptions[a11yOptionIndex].min}&maxaccessibility=${
        a11yOptions[a11yOptionIndex].max
      }`,
    )
      .then(async (res) => {
        const resJson = await res.json();
        if (resJson.error?.length > 0) {
          setShowWarning(true);
        } else {
          let copy = [...activityList];
          for (let a of copy) {
            a.showDetails = false;
          }
          resJson.showDetails = true;
          setActivityList([...copy, resJson]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setShowWarning(false);
  }, [selectedType, priceOptionIndex, a11yOptionIndex, participantOptionIndex]);

  return (
    <div className="flex flex-col justify-start items-center py-5 sm:py-10 px-3 min-h-[110vh] bg-custom-secondary">
      <div className="text-3xl md:text-4xl text-custom-primary font-bold mb-5 text-center">
        Bored? Get a random activity to cure that boredom!
      </div>
      <div className="text-center">
        <select
          className="mr-3 mb-3"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Any type of activity</option>
          {activityTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select
          className="mr-3 mb-3"
          value={priceOptionIndex}
          onChange={(e) => setPriceOptionIndex(parseInt(e.target.value))}
        >
          {priceOptions.map((option, index) => (
            <option key={index} value={index}>{option.name}</option>
          ))}
        </select>
        <select
          className="mr-3 mb-3"
          value={a11yOptionIndex}
          onChange={(e) => setA11yOptionIndex(parseInt(e.target.value))}
        >
          {a11yOptions.map((option, index) => (
            <option key={index} value={index}>{option.name}</option>
          ))}
        </select>
        <select
          className="mb-3"
          value={participantOptionIndex}
          onChange={(e) => setParticipantOptionIndex(parseInt(e.target.value))}
        >
          {participantOptions.map((option, index) => (
            <option key={index} value={index}>{option.name}</option>
          ))}
        </select>
      </div>
      {showWarning && (
        <div className="text-red-600 mb-3">
          No activity available for these options!
        </div>
      )}
      {isLoading
        ? (
          <div className="transition-colors text-xl border border-custom-primary text-white rounded bg-custom-primary px-[48px] py-3 mb-3">
            <Spinner />
          </div>
        )
        : (
          <button
            className="transition-colors text-xl border border-custom-primary text-white rounded bg-custom-primary hover:bg-white hover:text-custom-primary px-6 py-3 mb-3 disabled:opacity-70 disabled:hover:bg-custom-primary disabled:hover:text-white"
            onClick={getActivity}
            disabled={isLoading || showWarning}
          >
            Cure Boredom
          </button>
        )}
      {activityList.length > 0 &&
        (
          <div className="flex flex-col-reverse max-w-[500px] w-full">
            {activityList.map((activity, index) => (
              <Activity
                key={`${activity.activity}-${index}`}
                activity={activity}
              />
            ))}
          </div>
        )}
    </div>
  );
};

export default Home;

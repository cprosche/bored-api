import { useEffect, useState } from "react";
import Activity from "../components/Activity";

export interface BoredApiResponse {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
  accessibility: number;
}

// TODO: add dynamic showing and hiding of details on get new activity
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

  const priceOptions = [
    {
      name: "Any price",
      min: 0,
      max: 1,
    },
    {
      name: "$",
      min: 0,
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

  const a11yOptions = [
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

  const participantOptions = [
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

  const [selectedType, setSelectedType] = useState("");
  const [priceOptionIndex, setPriceOptionIndex] = useState(0);
  const [a11yOptionIndex, setA11yOptionIndex] = useState(0);
  const [participantOptionIndex, setParticipantOptionIndex] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  const getActivity = () => {
    fetch(
      `http://www.boredapi.com/api/activity/?type=${selectedType.toLowerCase()}&participants=${
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
          setActivityList([...activityList, resJson]);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setShowWarning(false);
  }, [selectedType, priceOptionIndex, a11yOptionIndex, participantOptionIndex]);

  return (
    <div className="flex flex-col justify-center items-center py-10 px-3">
      <div className="text-4xl font-bold mb-5 text-center">
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
      <button
        className="transition-colors border border-green-600 rounded bg-green-600 hover:bg-white text-white hover:text-green-600 px-4 py-2 mb-3"
        onClick={getActivity}
      >
        Get Activity
      </button>
      {activityList.length > 0
        ? (
          <div className="flex flex-col-reverse max-w-[500px] w-full">
            {activityList.map((activity, index) => (
              <Activity
                key={`${activity.activity}-${index}`}
                activity={activity}
              />
            ))}
          </div>
        )
        : <div>No activities added</div>}
    </div>
  );
};

export default Home;

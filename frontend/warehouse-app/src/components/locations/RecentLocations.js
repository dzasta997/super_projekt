import { useState, useEffect } from "react";
import LocationTextBox from "./LocationTextBox";
import AddLocationDialog from "./AddLocationDialog";

export default function RecentLocations() {
  const [locations, setLocations] = useState([]);

  const availabilityToString = (availability) => availability ? "Available" : "Not available";

  const getApiData = async () => {
    let res = await fetch('http://localhost:8080/locations', { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      mode: 'cors',
      referrerPolicy: 'no-referrer',
      origin: "http://localhost:3000/",
    })
  
    if (res.status === 200) {
      console.log("Successfully gathered locations.")
      const json = await res.json();
      if (json.length > 0) {
        setLocations(json);
      }
    } else {
      console.log("Could not load more data.");
    }
  };
  
  useEffect(() => {
    getApiData();
  }, []);

  return (
    <>
      <AddLocationDialog updateList={getApiData} />
      <div className="flex flex-col gap-4">
        {
          (locations.map((location) => (
            <div key={location.id}>
              <h1 className="text-2xl font-thin pb-2">{`Location id ${location.id}`}</h1>
              <LocationTextBox
                warehouseId={location.warehouse.id}
                rack={location.rack}
                alley={location.alley}
                availability={availabilityToString(location.availability)}
                capacity={location.capacity}
                description={location.description}
              />
            </div>
          )))
        }
      </div>
    </>
  );
}

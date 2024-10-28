import { HiMiniMapPin } from "react-icons/hi2";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.png";
import { removeLocation, setPosition } from "../store/features/map.slice";

export function PinSidebar() {
  const dispatch = useDispatch();
  const savedLocations = useSelector((store) => store.map.savedLocations);

  // Function to format address to show only relevant parts: name, city, and country
  const formatAddress = (address) => {
    const parts = address.split(", ");
    if (parts.length > 1) {
      return `${parts[0]}, ${parts[parts.length - 2]}, ${
        parts[parts.length - 1]
      }`;
    }
    return address;
  };

  // Function to remove pinned locations
  const handleDelete = (index) => {
    dispatch(removeLocation(index));
  };

  // Function to handle click on saved location
  const handleLocationClick = (position) => {
    console.log("handle");
    dispatch(setPosition(position)); // Update the map position
  };

  return (
    <aside className="h-screen w-72 bg-gray-200 text-gray-800 flex flex-col">
      <div className="flex items-center p-4">
        <img src={logo} alt="Reemaarks logo" className="h-10 w-10 mr-3" />
        <span className="text-xl font-bold">Reemaarks</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-4 p-4">
          {savedLocations.map((el, index) => (
            <li
              key={index}
              className="relative p-3 bg-gray-300 rounded flex flex-col"
            >
              <button
                onClick={() => handleDelete(index)}
                className="absolute top-2 right-2 text-gray-600 hover:text-red-500 focus:outline-none"
                aria-label="Delete location"
              >
                <IoMdCloseCircle className="h-5 w-5" />
              </button>

              <div className="flex items-center space-x-3 mt-2 pr-10">
                <button
                  onClick={() => handleLocationClick(el.position)}
                  className="flex items-center space-x-3 w-full text-left"
                >
                  <HiMiniMapPin className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {formatAddress(el.address)}
                  </span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

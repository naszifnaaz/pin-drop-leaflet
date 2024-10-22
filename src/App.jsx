import MapComponent from "./components/leaflet";
import { PinSidebar } from "./components/sidebar";

export default function App() {
  return (
    <div className="flex">
      <PinSidebar />
      <MapComponent />
    </div>
  );
}

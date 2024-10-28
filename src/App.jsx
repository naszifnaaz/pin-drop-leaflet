import MapComponent from "./components/leaflet";
import { PinSidebar } from "./components/sidebar";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="flex">
      <PinSidebar />
      <MapComponent />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
        }}
      />
    </div>
  );
}

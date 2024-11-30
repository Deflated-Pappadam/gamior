import React, { useState } from "react";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Linkedin, 
  Mail, 
  MapPin 
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define interfaces for type safety
interface Store {
  id: number;
  name: string;
  address: string;
  hours: string;
  phone: string;
  position: [number, number];
}

const stores: Store[] = [
  {
    id: 1,
    name: "Gamior Bangalore",
    address: "123 Brigade Road, Bangalore",
    hours: "10 AM - 9 PM",
    phone: "+91 9876543210",
    position: [12.9716, 77.5946]
  },
  {
    id: 2,
    name: "Gamior Mumbai",
    address: "45 Link Road, Bandra West, Mumbai",
    hours: "11 AM - 8 PM",
    phone: "+91 9876543211",
    position: [19.0760, 72.8777]
  },
  {
    id: 3,
    name: "Gamior Delhi",
    address: "78 Connaught Place, New Delhi",
    hours: "10 AM - 9 PM",
    phone: "+91 9876543212",
    position: [28.6139, 77.2090]
  }
];

// Custom icon for Leaflet markers
const customMarkerIcon = new L.Icon({
  iconUrl: '/pin2.svg', // Ensure you have this icon in your public folder
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const StoreLocator: React.FC = () => {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const center: [number, number] = [20.5937, 78.9629]; // India center

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium uppercase">Our Stores</h3>
      <div className="relative rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Store List */}
          <div className="border-r border-gray-200 p-4">
            <div className="space-y-4">
              {stores.map((store) => (
                <button
                  key={store.id}
                  className={`w-full rounded-md p-3 text-left transition-colors ${
                    selectedStore?.id === store.id
                      ? "bg-gray-100"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedStore(store)}
                >
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">{store.name}</p>
                      <p className="text-sm text-gray-500">{store.address}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* OpenStreetMap */}
          <div className="col-span-2 h-[300px]">
            <MapContainer
              center={selectedStore?.position || center}
              zoom={selectedStore ? 13 : 5}
              style={{ height: "100%", width: "100%" }}
              className="z-0"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            
              />
              {stores.map((store) => (
                <Marker
                  key={store.id}
                  position={store.position}
                  icon={customMarkerIcon}
                  eventHandlers={{
                    click: () => setSelectedStore(store),
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-medium">{store.name}</h3>
                      <p className="text-sm">{store.address}</p>
                      <p className="text-sm">{store.hours}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Selected Store Details */}
        {selectedStore && (
          <div className="border-t border-gray-200 p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <h4 className="font-medium">{selectedStore.name}</h4>
                <p className="text-sm text-gray-500">{selectedStore.address}</p>
              </div>
              <div>
                <h4 className="font-medium">Hours</h4>
                <p className="text-sm text-gray-500">{selectedStore.hours}</p>
              </div>
              <div>
                <h4 className="font-medium">Contact</h4>
                <p className="text-sm text-gray-500">{selectedStore.phone}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement newsletter submission logic
    console.log('Newsletter submitted');
  };

  return (
    <footer className="mx-auto w-full border-0 border-t-[1px] border-gray-300 px-4 py-8 text-black md:py-12 cabin-light">
      <div className="w-[70%] mx-auto">
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
          {/* Store Locator Section */}
          <div className="md:col-span-3">
            <StoreLocator />
          </div>

          {/* About Gamior Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase">About Gamior</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  News
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase">Support</h3>
            <div className="space-y-2 text-sm">
              <p>Hours: 9 AM - 8 PM (Mon - Sun)</p>
              <p>
                Support:{" "}
                <a href="tel:+919876543210" className="hover:underline">
                  +91 9876543210
                </a>
              </p>
              <p>
                Instagram:{" "}
                <a href="https://instagram.com/gamior.official" className="hover:underline">
                  @gamior.official
                </a>
              </p>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase">Join the Community</h3>
            <p className="text-sm">
              Subscribe to receive updates about new releases, exclusive deals, and gaming tips!
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="flex-1 border-b border-black p-2 text-sm focus:outline-none"
              />
              <button type="submit" className="p-2">
                <Mail className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 flex space-x-4">
          <a href="https://instagram.com/gamior.official" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="https://facebook.com/gamior.official" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
            <Facebook className="h-5 w-5" />
          </a>
          <a href="https://youtube.com/gamior.official" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
            <Youtube className="h-5 w-5" />
          </a>
          <a href="https://twitter.com/gamior.official" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="https://linkedin.com/company/gamior" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
            <Linkedin className="h-5 w-5" />
          </a>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} GAMIOR</p>
          <p>Deflated Pappadam</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
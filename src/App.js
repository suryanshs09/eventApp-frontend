import {BrowserRouter, Routes, Route} from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; 
import Home from "./pages/Home";
import Error from "./pages/Error";
import SharedLayout from "./pages/SharedLayout";
import EventSharedLayout from "./pages/events/EventSharedLayout";
import EventIndex from "./pages/events/EventIndex";
import SingleEvent from "./pages/events/SingleEvent";
import OrganizerSharedLayout from "./pages/organizers/OrganizerSharedLayout";
import GuestSharedLayout from "./pages/guests/GuestSharedLayout";
import SingleOrganizer from "./pages/organizers/SingleOrganizer";
import OrganizerIndex from "./pages/organizers/OrganizerIndex";
import GuestIndex from "./pages/guests/GuestIndex";
import SingleGuest from "./pages/guests/SingleGuest";
import EventAdd from "./pages/events/EventAdd";
import EventUpdate from "./pages/events/EventUpdate";
import OrganizerAdd from "./pages/organizers/OrganizerAdd";
import GuestAdd from "./pages/guests/GuestAdd";
import GuestUpdate from "./pages/guests/GuestUpdate";
import OrganizerUpdate from "./pages/organizers/OrganizerUpdate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterGuest from "./pages/events/RegisterGuest";
import AddReview from "./pages/events/AddReview";


function App() {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="events" element={<EventSharedLayout />}>
              <Route index element={<EventIndex />} />
              <Route path="add" element={<EventAdd />} />
              <Route path="update/:eventId" element={<EventUpdate />} />
              <Route path="register/:eventId" element={<RegisterGuest />} />
              <Route path="addReview/:eventId" element={<AddReview />} />
              <Route path=":eventId" element={<SingleEvent />} />  
            </Route>
            <Route path="organizers" element={<OrganizerSharedLayout />}>
              <Route index element={<OrganizerIndex />} />
              <Route path="add" element={<OrganizerAdd />} />
              <Route path="update/:organizerId" element={<OrganizerUpdate />} />
              <Route path=":organizerId" element={<SingleOrganizer />} />  
            </Route>
            <Route path="guests" element={<GuestSharedLayout />}>
              <Route index element={<GuestIndex />} />
              <Route path="add" element={<GuestAdd />} />
              <Route path="update/:guestId" element={<GuestUpdate />} />
              <Route path=":guestId" element={<SingleGuest />} />  
            </Route>
            <Route path="*" element={<Error />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </LocalizationProvider>
  );
}

export default App;

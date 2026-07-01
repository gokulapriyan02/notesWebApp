import { StrictMode } from "react";
import reactDOM  from "react-dom/client";
import Note from "./Note.jsx"
import Footer from "./footer.jsx"

reactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
         <Note />
         <Footer />
    </StrictMode>
)
import { StrictMode } from "react";
import reactDOM  from "react-dom/client";
import Note from "./Note.jsx"


reactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
         <Note />
    </StrictMode>
)
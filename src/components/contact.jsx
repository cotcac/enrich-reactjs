import { useEffect } from "react";

export default function Contact() {
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `Contact`;
      },[]);
    return (
        <div>
            <h1>Contact US</h1>
        </div>
    )
}
import { useEffect } from "react";

export default function Children({data}) {
    console.log(data);
    return (
        <div>
            <h1>Children</h1>
            {data}

        </div>
    )
}
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {

    const [queryInput, setQueryInput] = useState("")
    const navigate = useNavigate();
    useEffect(() => {
    }, []);

    const handleInputChange = (event) => {
        // const { name, value } = event.target;
        // { term: event.target.value }
        setQueryInput(event.target.value);
    };
    const handleSubmit = async (event) => {
        // async request which may result error
        event.preventDefault()
        return navigate('/search?query=' + queryInput);
    };
    return (
        <form onSubmit={handleSubmit} className="d-flex">
            <input name="query"
                value={queryInput}
                required
                onChange={handleInputChange}
                className="form-control me-2" type="text" placeholder="Search" />
        </form>
    )
}
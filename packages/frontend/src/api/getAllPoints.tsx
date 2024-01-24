import { API } from "aws-amplify";

const fetchPoints = async () => {
    return API.get("notes", "/notes", {});
}

const getAllPoints = async () => {
    const pointData = await fetchPoints()
    return pointData;
}

export default getAllPoints;
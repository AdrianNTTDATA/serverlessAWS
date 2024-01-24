import { API } from "aws-amplify";

type PointData = {
    x: number;
    y: number;
    author?: string;
    message: string;
}

const addAPoint = async (pointData: PointData) => {
    try {
    return API.post("notes", "/notes", {
        body: {content: pointData},
      });
    } catch (e) {
        console.log(e);
    }
}

export default addAPoint;
import React from "react";
import AddAMessage from "./AddAMessage";
import getAllPoints from "../../api/getAllPoints";
import { Infinite } from 'react-pannable'

function LoggedInHome() {
    const [tags, setTags] = React.useState<{ x: number; y: number; message: string }[]>([]);


    React.useEffect(() => {
        const fetchDataPointsFromAWS = async () => {
            try {
                const messageArray = []
                const response = await getAllPoints();
                console.log(response)
                response.forEach((message: any) => {
                    if (message.content) {
                        messageArray.push(message.content)
                    }
                })
                setTags(messageArray);
            } catch (e) {
                console.log(e);
            }
        }
        fetchDataPointsFromAWS();
    },[])
  
    return (
      <div className="App container">
        <AddAMessage tags={tags} setTags={setTags}/>
      </div>
    )
}

export default LoggedInHome;
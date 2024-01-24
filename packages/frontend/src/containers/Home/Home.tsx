import "./Home.css";
import Typewriter from "typewriter-effect";
import GenerateRandomTerminalInputs from "../../components/GenerateRandomTerminalInputs/GenerateRandomTerminalInputs";

export default function Home() {
   return (
    <div className="Home">
      <div className="lander">
        <div className="binary-text">
          <h1>
            <Typewriter
              onInit={(typewriter) => {
                typewriter.typeString('Global Terminal.')
                  .callFunction(() => {
                    console.log('String typed out!');
                  })
                  .pauseFor(2500)
                  .start();
              }}
            />
          </h1>
          <p>Connect with random strangers and engage in conversations about various topics</p>
        </div>
        <div className="binary-text">
          <GenerateRandomTerminalInputs />
        </div>
      </div>
    </div>
  );
}


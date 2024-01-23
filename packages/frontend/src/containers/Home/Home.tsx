import React, { useState } from "react";
import "./Home.css";
import Typewriter from "typewriter-effect";
import GenerateRandomTerminalInputs from "../../components/GenerateRandomTerminalInputs/GenerateRandomTerminalInputs";


export default function Home() {
  const [terminalInput, setTerminalInput] = useState("");

  const handleTerminalInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerminalInput(event.target.value);
  };

  const handleTerminalInputSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle terminal input submission here
    console.log("Terminal input submitted:", terminalInput);
    setTerminalInput("");
  };

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
        <form onSubmit={handleTerminalInputSubmit}>
          <span>
            <div className="terminal-container">
              <h1 style={{width: '46rem', fontSize: '20px'}}>guest@localhost /root $</h1>
                <input
                  className="terminal-input"
                  type="text"
                  value={terminalInput}
                  onChange={handleTerminalInputChange}
                />
            </div>
            </span>
        </form>
      </div>
    </div>
  );
}

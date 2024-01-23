import React, { useState } from "react";
import "./Home.css";
import Typewriter from "typewriter-effect";
import GenerateRandomTerminalInputs from "../../components/GenerateRandomTerminalInputs/GenerateRandomTerminalInputs";
import constants from "./constants";
const suggestion = "/profile";

export default function Home() {
  const [terminalInput, setTerminalInput] = useState("");
  const [activeSuggestion, setActiveSuggestion] = useState("");

  const findSuggestions = () => {
    for (let i = 0; i < constants.length; i++) {
      if (constants[i].includes(terminalInput)) {
        return constants[i];
      }
    }
    return ''
  
  }
  const handleTerminalInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setTerminalInput(inputValue);
    setActiveSuggestion(findSuggestions());
  };

  const handleTerminalInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Tab" && activeSuggestion) {
      event.preventDefault();
      setTerminalInput(activeSuggestion);
      setActiveSuggestion("");
    }
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
              <h1 style={{ width: '46rem', fontSize: '20px' }}>guest@localhost /root $</h1>
              <input
                className="terminal-input"
                value={terminalInput}
                onChange={handleTerminalInputChange}
                onKeyDown={handleTerminalInputKeyDown}
              />
              {activeSuggestion && (
                <span style={{ color: activeSuggestion === suggestion ? 'green' : 'grey' }}>
                  {activeSuggestion}
                </span>
              )}
            </div>
          </span>
        </form>
      </div>
    </div>
  );
}


import React from 'react'
import CONSTANTS from './constants';

const TerminalInput = () => {

    const [terminalInput, setTerminalInput] = React.useState("");
    const [activeSuggestion, setActiveSuggestion] = React.useState("");
  
    const findSuggestions = () => {
      for (let i = 0; i < CONSTANTS.length; i++) {
        if (CONSTANTS[i].includes(terminalInput)) {
          return CONSTANTS[i];
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

        if (event.key === 'Escape') {
            event.preventDefault();
            setTerminalInput('');
            setActiveSuggestion('');
        }
        };

        const handleTerminalInputSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle terminal input submission here
        console.log("Terminal input submitted:", terminalInput);
        setTerminalInput("");
        };

    return (
    <form onSubmit={handleTerminalInputSubmit}>
        <span>
          <div className="terminal-container">
            <h1 style={{ width: '46rem', fontSize: '20px' }}>{window.localStorage.username ? window.localStorage.username : 'guest'}@localhost /root $</h1>
            <input
              className="terminal-input"
              value={terminalInput}
              onChange={handleTerminalInputChange}
              onKeyDown={handleTerminalInputKeyDown}
            />
            {activeSuggestion && (
              <span style={{ color: activeSuggestion === terminalInput ? 'green' : 'grey' }}>
                {activeSuggestion}
              </span>
            )}
          </div>
        </span>
      </form>
    )
}

export default TerminalInput;
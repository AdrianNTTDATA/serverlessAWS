import Typewriter from "typewriter-effect";
import GenerateRandomTerminalInputsConstants from './GenerateRandomTerminalInputsConstants';

const GenerateRandomTerminalInputs = () => {

    const getRandomPosition = () => {
        const maxX = window.innerWidth - 200; // Adjust the maximum X position as needed
        const maxY = window.innerHeight - 200; // Adjust the maximum Y position as needed
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        return { x: randomX, y: randomY };
    };

    return (
        <>
        {GenerateRandomTerminalInputsConstants.map((terminalInput) => {
            const { x, y } = getRandomPosition();
            return (
                <div
                    key={terminalInput}
                    style={{ position: 'absolute', left: x, top: y }}
                >
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter.typeString(terminalInput)
                                .callFunction(() => {
                                    console.log('String typed out!');
                                })
                                .pauseFor(Math.floor(Math.random() * 5000) + 1000)
                                .start();
                        }}
                    />
                </div>
            )
        })}
        </>
    )

}

export default GenerateRandomTerminalInputs;
import React, { useState } from 'react';
import addAPoint from '../../api/addAPoint';
import Typewriter from 'typewriter-effect';
import { IAddAMessage } from './types';
import useSound from 'use-sound';
import keyPressSFX from '../../../sound/keypress.mp3';
import './main.css'

const AddAMessage: React.FC<IAddAMessage> = ({tags, setTags}) => {
    const [inputValue, setInputValue] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [inputX, setInputX] = useState(0);
    const [inputY, setInputY] = useState(0);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [play] = useSound(
        keyPressSFX,
        { volume: 0.5 }
      );

    const handleTagClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = event;
        const { left, top } = event.currentTarget.getBoundingClientRect();
        const x = clientX - left;
        const y = clientY - top;

        setInputX(x);
        setInputY(y);
        setShowInput(true);
        if (inputRef) {
            inputRef.current?.focus();
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleInputKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        play();
        if (event.key === 'Enter') {
            console.log(await addAPoint({ x: inputX, y: inputY, author: window.localStorage.username, message: inputValue }));
            setTags((prevTags) => [...prevTags, { x: inputX, y: inputY, message: inputValue }]); // maybe move outside to run with other async calls
            setInputValue('');
            setShowInput(false);
        }
    };

    const handleInputBlur = () => {
        setShowInput(false);
    };

    return (
        <div
            style={{ position: 'relative', height: '400px', border: '1px solid black' }}
            onClick={handleTagClick}
        >
            {tags.map((tag, index) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        left: tag.x,
                        top: tag.y,
                        background: 'black',
                        padding: '5px',
                        borderRadius: '5px',
                    }}
                >
            <Typewriter
                onInit={(typewriter) => {
                    typewriter.typeString(`guest@localhost: ${tag.message}`)
                    .callFunction(() => {
                        console.log('String typed out!');
                    })
                    .pauseFor(2500)
                    .start();
                }}
                />
                </div>
            ))}
            {showInput && (
                <div>
                    <h1 style={{fontSize: '16px', left: inputX -200, top: inputY, position: 'absolute'}}>{window.localStorage.username}@localhost: </h1>
                    <input
                        type="text"
                        value={inputValue}
                        className='inputAddAmessage'
                        onChange={handleInputChange}
                        onKeyPress={handleInputKeyPress}
                        onBlur={handleInputBlur}
                        ref={inputRef}
                        style={{
                            position: 'absolute',
                            left: inputX,
                            top: inputY,
                            background: 'white',
                            padding: '5px',
                            borderRadius: '5px',
                        }}
                    />
            </div>
            )}   
        </div>
    );
};

export default AddAMessage;

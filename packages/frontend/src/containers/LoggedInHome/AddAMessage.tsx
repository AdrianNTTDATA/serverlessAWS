import React, { useState } from 'react';
import './main.css'

const AddAMessage: React.FC = () => {
    const [tags, setTags] = useState<{ x: number; y: number; message: string }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [inputX, setInputX] = useState(0);
    const [inputY, setInputY] = useState(0);

    const handleTagClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = event;
        const { left, top } = event.currentTarget.getBoundingClientRect();
        const x = clientX - left;
        const y = clientY - top;

        setInputX(x);
        setInputY(y);
        setShowInput(true);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setTags((prevTags) => [...prevTags, { x: inputX, y: inputY, message: inputValue }]);
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
                        background: 'white',
                        padding: '5px',
                        borderRadius: '5px',
                    }}
                >
                    {tag.message}
                </div>
            ))}
            {showInput && (
                <div>
                    <h1 style={{fontSize: '20px', left: inputX -200, top: inputY, position: 'absolute'}}>user@localhost: </h1>
                    <input
                        type="text"
                        value={inputValue}
                        className='inputAddAmessage'
                        onChange={handleInputChange}
                        onKeyPress={handleInputKeyPress}
                        onBlur={handleInputBlur}
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

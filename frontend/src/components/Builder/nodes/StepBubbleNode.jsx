import React, { useState, useRef, useEffect } from 'react';

export const StepBubbleNode = ({ data, selected }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [stepNumber, setStepNumber] = useState(data.step || '1');
    const inputRef = useRef(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleBlur = () => {
        setIsEditing(false);
        // We don't strictly need to push to global React Flow state
        // just for visual internal state of this unlinked node, 
        // but it will automatically save to local storage if we hooked it to nodeMenu.
        // For localized numbers, internal state is clean.
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setIsEditing(false);
        }
    };

    return (
        <div 
            className="rounded-full shadow-lg flex items-center justify-center cursor-pointer relative"
            style={{ 
                width: '32px', 
                height: '32px', 
                backgroundColor: data.color || '#232f3e', 
                color: '#fff',
                border: selected ? '2px solid #0073bb' : '2px solid transparent',
                boxShadow: selected ? '0 0 0 2px rgba(59, 130, 246, 0.5)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.15s ease'
            }}
            onDoubleClick={() => setIsEditing(true)}
        >
            {isEditing ? (
                <input
                    ref={inputRef}
                    type="text"
                    value={stepNumber}
                    onChange={(e) => setStepNumber(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className="w-full h-full bg-transparent text-center font-bold text-sm outline-none"
                    style={{ color: '#fff', pointerEvents: 'all' }}
                />
            ) : (
                <span className="font-bold text-sm select-none pointer-events-none">{stepNumber}</span>
            )}
        </div>
    );
};

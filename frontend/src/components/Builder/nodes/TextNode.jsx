import React, { useState, useRef, useEffect } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';

export const TextNode = ({ id, data, selected }) => {
    const { updateNodeData } = useReactFlow();
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(data.text || 'Type here...');
    const textareaRef = useRef(null);

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.focus();
            // Optional: select all text or put cursor at end
            textareaRef.current.setSelectionRange(textareaRef.current.value.length, textareaRef.current.value.length);
        }
    }, [isEditing]);

    useEffect(() => {
        // Auto-resize textarea
        if (textareaRef.current && isEditing) {
            textareaRef.current.style.height = '0px';
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = scrollHeight + 'px';
        }
    }, [text, isEditing]);

    const handleBlur = () => {
        setIsEditing(false);
        updateNodeData(id, { text });
    };

    const handleKeyDown = (e) => {
        // Stop default React Flow delete events when typing
        e.stopPropagation();
        if (e.key === 'Enter' && e.shiftKey) {
            // allow multiple lines on shift+enter
            return;
        } else if (e.key === 'Enter') {
            e.preventDefault();
            handleBlur();
        }
    };

    const outlineStyle = selected ? { outline: '2px dashed #0073bb', outlineOffset: '2px' } : {};

    return (
        <div 
            onDoubleClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
            }} 
            style={{ 
                position: 'relative', 
                minWidth: '50px',
                minHeight: '20px',
                padding: '4px',
                cursor: selected ? 'move' : 'text',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                ...outlineStyle
            }}
        >
            <Handle type="target" position={Position.Top} style={{ background: 'transparent', border: 'none' }} />
            <Handle type="target" position={Position.Left} style={{ background: 'transparent', border: 'none' }} />
            <Handle type="source" position={Position.Right} style={{ background: 'transparent', border: 'none' }} />
            <Handle type="source" position={Position.Bottom} style={{ background: 'transparent', border: 'none' }} />

            {isEditing ? (
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    style={{
                        width: '100%',
                        minWidth: '100px',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        color: data.color || '#16191f',
                        fontSize: data.fontSize || '14px',
                        fontFamily: data.fontFamily || 'system-ui, sans-serif',
                        fontWeight: data.fontWeight || '400',
                        border: '1px solid #0073bb',
                        outline: 'none',
                        resize: 'none',
                        overflow: 'hidden',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        textAlign: data.textAlign || 'left',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                />
            ) : (
                <div 
                    style={{ 
                        color: data.color || '#16191f',
                        fontSize: data.fontSize || '14px',
                        fontFamily: data.fontFamily || 'system-ui, sans-serif',
                        fontWeight: data.fontWeight || '400',
                        textAlign: data.textAlign || 'left',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        pointerEvents: 'none',
                        padding: '4px 8px',
                        minWidth: '20px',
                        minHeight: '1em'
                    }}
                >
                    {text}
                </div>
            )}
        </div>
    );
};

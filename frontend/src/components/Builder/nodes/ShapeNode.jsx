import React, { useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { User, Users } from 'lucide-react';

export const ShapeNode = ({ id, data, selected }) => {
    const { shapeType, label } = data;
    const { updateNodeData } = useReactFlow();
    const [editMode, setEditMode] = useState(false);
    const [text, setText] = useState(label || 'Label');

    const handleDoubleClick = (e) => {
        e.stopPropagation();
        setEditMode(true);
    };

    const handleBlur = () => {
        setEditMode(false);
        updateNodeData(id, { label: text });
    };

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleBlur();
        }
    };

    // Common handles
    const rendersHandles = () => (
        <>
            <Handle type="target" id="top" position={Position.Top} style={{ width: '8px', height: '8px', backgroundColor: '#0073bb', border: 'none' }} />
            <Handle type="target" id="left" position={Position.Left} style={{ width: '8px', height: '8px', backgroundColor: '#0073bb', border: 'none' }} />
            <Handle type="source" id="bottom" position={Position.Bottom} style={{ width: '8px', height: '8px', backgroundColor: '#0073bb', border: 'none' }} />
            <Handle type="source" id="right" position={Position.Right} style={{ width: '8px', height: '8px', backgroundColor: '#0073bb', border: 'none' }} />
        </>
    );

    const renderText = () => {
        if (editMode) {
            return (
                <input 
                    autoFocus
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={onKeyDown}
                    style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.8)', outline: 'none', textAlign: 'center', fontFamily: 'sans-serif', fontSize: '12px', color: '#1f2937', borderBottom: '1px solid #60a5fa', padding: '2px 4px' }}
                    onClick={(e) => e.stopPropagation()}
                />
            );
        }
        return <span style={{ fontFamily: 'sans-serif', textAlign: 'center', fontSize: '12px', color: '#1f2937', wordBreak: 'break-word', fontWeight: 600 }}>{text}</span>;
    };

    const outlineStyle = selected ? { outline: '2px solid #0073bb', outlineOffset: '2px' } : {};

    if (shapeType === 'user' || shapeType === 'users') {
        const IconComponent = shapeType === 'users' ? Users : User;
        return (
            <div onDoubleClick={handleDoubleClick} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8px', minWidth: '60px', cursor: 'pointer', borderRadius: '4px', backgroundColor: selected ? 'rgba(59, 130, 246, 0.1)' : 'transparent', ...outlineStyle }}>
                {rendersHandles()}
                <IconComponent size={38} strokeWidth={1.5} color="#16191f" />
                <div style={{ marginTop: '4px', width: '90px', textAlign: 'center' }}>{renderText()}</div>
            </div>
        );
    }

    if (shapeType === 'folder') {
        return (
            <div onDoubleClick={handleDoubleClick} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '130px', cursor: 'pointer', ...outlineStyle }}>
                {rendersHandles()}
                <div style={{ width: '45px', height: '12px', backgroundColor: '#fef0c7', border: '1px solid #9ca3af', borderBottom: 'none', borderTopLeftRadius: '3px', borderTopRightRadius: '3px', position: 'relative', top: '1px', marginLeft: '4px', zIndex: 10 }}></div>
                <div style={{ width: '100%', backgroundColor: '#fef9e7', border: '1px solid #9ca3af', padding: '12px', minHeight: '55px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '3px', borderTopLeftRadius: 0, position: 'relative', zIndex: 20 }}>
                    <div style={{ width: '100%' }}>{renderText()}</div>
                </div>
            </div>
        );
    }

    if (shapeType === 'document') {
        return (
            <div onDoubleClick={handleDoubleClick} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px', cursor: 'pointer', backgroundColor: '#fffcd5', border: '1px solid #9ca3af', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', width: '120px', minHeight: '60px', ...outlineStyle }}>
                {rendersHandles()}
                {/* Fake folded dog-ear corner */}
                <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '16px', height: '16px', backgroundColor: 'transparent', zIndex: 30 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16">
                        <polygon points="0,0 16,0 16,16" fill="#f2f3f3" />
                        <polyline points="0,0 0,16 16,16" fill="none" stroke="#9ca3af" strokeWidth="1" />
                        <polygon points="0,0 0,16 16,16" fill="#e5e7eb" />
                    </svg>
                </div>
                <div style={{ width: '100%', zIndex: 10 }}>{renderText()}</div>
            </div>
        );
    }

    return null;
};

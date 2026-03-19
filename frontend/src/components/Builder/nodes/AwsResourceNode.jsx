import React, { useState, useRef, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';

export const AwsResourceNode = ({ data, selected }) => {
    const { toolInfo } = data;
    
    // Auto-Labeling inline edit implementation
    const [isEditing, setIsEditing] = useState(false);
    const [labelName, setLabelName] = useState(data.customName || toolInfo?.name || '');
    const inputRef = useRef(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const commitEdit = () => {
        setIsEditing(false);
        // data.customName could be synced to global React Flow state, 
        // but local state + internal node preservation works out of the box for quick edits.
    };
    
    if (!toolInfo) return null;

    return (
        <div className={`relative flex flex-col items-center justify-center p-2 bg-transparent transition-all ${selected ? 'drop-shadow-md ring-2 ring-[#0073bb] rounded' : ''}`}>
            <Handle type="target" position={Position.Top} id="top" className="w-2 h-2 bg-gray-400 border-none" />
            <Handle type="target" position={Position.Left} id="left" className="w-2 h-2 bg-gray-400 border-none" />
            
            <div className="w-12 h-12 flex items-center justify-center bg-transparent">
                <img src={"/" + toolInfo.icon} alt={toolInfo.name} className="w-full h-full object-contain pointer-events-none drop-shadow-sm" />
            </div>
            
            <div className="absolute top-[100%] left-1/2 -translate-x-1/2 mt-1 z-10 w-[120px] px-2 flex justify-center">
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        value={labelName}
                        onChange={(e) => setLabelName(e.target.value)}
                        onBlur={commitEdit}
                        onKeyDown={(e) => e.key === 'Enter' && commitEdit()}
                        className="px-1 py-0.5 text-[0.55rem] font-bold text-center text-[#16191f] bg-blue-50 border border-[#0073bb] rounded outline-none shadow-sm w-full pointer-events-auto"
                    />
                ) : (
                    <div 
                        onDoubleClick={() => setIsEditing(true)}
                        className="py-0.5 px-2 bg-white/80 backdrop-blur border border-gray-100 rounded text-[0.55rem] font-bold text-gray-700 shadow-sm max-w-[100px] text-center leading-tight cursor-text pointer-events-auto hover:bg-gray-50 hover:border-gray-300 transition-colors break-words whitespace-normal"
                    >
                        {labelName}
                    </div>
                )}
            </div>

            <Handle type="source" position={Position.Bottom} id="bottom" className="w-2 h-2 bg-[#0073bb] border-none" />
            <Handle type="source" position={Position.Right} id="right" className="w-2 h-2 bg-[#0073bb] border-none" />
        </div>
    );
};

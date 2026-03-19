import React from 'react';
import { Handle, Position } from '@xyflow/react';

export const AwsResourceNode = ({ data, selected }) => {
    const { toolInfo } = data;
    
    if (!toolInfo) return null;

    return (
        <div className={`flex flex-col items-center justify-center p-2 bg-transparent transition-all ${selected ? 'drop-shadow-md ring-2 ring-[#0073bb] rounded' : ''}`}>
            <Handle type="target" position={Position.Top} id="top" className="w-2 h-2 bg-gray-400 border-none" />
            <Handle type="target" position={Position.Left} id="left" className="w-2 h-2 bg-gray-400 border-none" />
            
            <div className="w-12 h-12 flex items-center justify-center bg-transparent">
                <img src={"/" + toolInfo.icon} alt={toolInfo.name} className="w-full h-full object-contain pointer-events-none drop-shadow-sm" />
            </div>
            
            <div className="mt-1 px-2 py-0.5 bg-white/80 backdrop-blur border border-gray-100 rounded text-[0.55rem] font-bold text-gray-700 shadow-sm max-w-[100px] text-center leading-tight">
                {toolInfo.name}
            </div>

            <Handle type="source" position={Position.Bottom} id="bottom" className="w-2 h-2 bg-[#0073bb] border-none" />
            <Handle type="source" position={Position.Right} id="right" className="w-2 h-2 bg-[#0073bb] border-none" />
        </div>
    );
};

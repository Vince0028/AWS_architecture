import React, { useState, useRef, useCallback } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { ToolSidebar } from './ToolSidebar';
import { DiagramCanvas } from './DiagramCanvas';
import '@xyflow/react/dist/style.css';

export const BuilderLayout = ({ allTools }) => {
    return (
        <div className="flex w-full h-full bg-slate-50">
            <ReactFlowProvider>
                <div className="flex-1 h-full relative" >
                    <DiagramCanvas allTools={allTools} />
                </div>
                <ToolSidebar allTools={allTools} />
            </ReactFlowProvider>
        </div>
    );
};

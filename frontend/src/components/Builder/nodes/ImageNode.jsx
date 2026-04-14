import React from 'react';
import { Handle, NodeResizer, Position } from '@xyflow/react';

export const ImageNode = ({ data, selected }) => {
    const src = data?.src;
    const label = data?.label || 'Image';

    if (!src) {
        return (
            <div
                style={{
                    width: '180px',
                    height: '120px',
                    border: '1px dashed #94a3b8',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f8fafc',
                    color: '#475569',
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '8px',
                    textAlign: 'center',
                }}
            >
                Missing image data
            </div>
        );
    }

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                borderRadius: '8px',
                overflow: 'hidden',
                border: selected ? '2px solid #0073bb' : '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                boxShadow: selected ? '0 0 0 3px rgba(0, 115, 187, 0.2)' : '0 1px 2px rgba(15, 23, 42, 0.15)',
            }}
        >
            <NodeResizer
                isVisible={selected}
                minWidth={120}
                minHeight={90}
                lineStyle={{ borderColor: '#0073bb', borderWidth: 1 }}
                handleStyle={{ width: 10, height: 10, borderRadius: 2, backgroundColor: '#0073bb' }}
            />

            <img
                src={src}
                alt={label}
                draggable={false}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    backgroundColor: '#ffffff',
                    userSelect: 'none',
                    pointerEvents: 'none',
                }}
            />

            <Handle type="target" position={Position.Top} style={{ width: '8px', height: '8px', backgroundColor: selected ? '#0073bb' : '#94a3b8', border: 'none' }} />
            <Handle type="target" position={Position.Left} style={{ width: '8px', height: '8px', backgroundColor: selected ? '#0073bb' : '#94a3b8', border: 'none' }} />
            <Handle type="source" position={Position.Right} style={{ width: '8px', height: '8px', backgroundColor: '#0073bb', border: 'none' }} />
            <Handle type="source" position={Position.Bottom} style={{ width: '8px', height: '8px', backgroundColor: '#0073bb', border: 'none' }} />
        </div>
    );
};

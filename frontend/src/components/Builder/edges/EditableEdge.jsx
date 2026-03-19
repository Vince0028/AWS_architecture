import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getSmoothStepPath, BaseEdge, EdgeLabelRenderer, useReactFlow } from '@xyflow/react';

export function EditableEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data = {},
  selected
}) {
  const { setEdges, getZoom } = useReactFlow();

  let centerX = undefined;
  let centerY = undefined;

  const isHorizontalSource = sourcePosition === 'left' || sourcePosition === 'right';
  const isHorizontalTarget = targetPosition === 'left' || targetPosition === 'right';

  // React Flow's smoothstep only utilizes centerX for horizontal-to-horizontal routing 
  // (Left/Right) and centerY for vertical (Top/Bottom). Supplying the non-active offset 
  // forces the interaction label calculations off the actual rendered SVG path line!
  if (isHorizontalSource && isHorizontalTarget) {
    if (data.offsetX !== undefined) centerX = (sourceX + targetX) / 2 + data.offsetX;
  } else if (!isHorizontalSource && !isHorizontalTarget) {
    if (data.offsetY !== undefined) centerY = (sourceY + targetY) / 2 + data.offsetY;
  } else {
    if (data.offsetX !== undefined) centerX = (sourceX + targetX) / 2 + data.offsetX;
    if (data.offsetY !== undefined) centerY = (sourceY + targetY) / 2 + data.offsetY;
  }

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    centerX,
    centerY,
    borderRadius: 8
  });

  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const startOffset = useRef({ x: 0, y: 0 });

  const onPointerDown = useCallback((e) => {
    e.stopPropagation();
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    startOffset.current = { x: data.offsetX || 0, y: data.offsetY || 0 };
  }, [data.offsetX, data.offsetY]);

  useEffect(() => {
    if (!isDragging) return;

    const onPointerMove = (e) => {
      const zoom = getZoom();
      const dx = (e.clientX - dragStartPos.current.x) / zoom;
      const dy = (e.clientY - dragStartPos.current.y) / zoom;

      setEdges((edges) =>
        edges.map((edge) => {
          if (edge.id === id) {
            return {
              ...edge,
              data: {
                ...edge.data, 
                offsetX: startOffset.current.x + dx,
                offsetY: startOffset.current.y + dy,
              },
            };
          }
          return edge;
        })
      );
    };

    const onPointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [isDragging, id, setEdges, getZoom]);

  const combinedStyle = {
    ...style,
    strokeWidth: selected || isDragging ? 3 : (style.strokeWidth || 2),
    stroke: selected || isDragging ? '#3b82f6' : (style.stroke || '#545b64')
  };

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={combinedStyle} />
      {/* Invisible thick path perfectly mirrors edge dimensions to catch user clicks comfortably */}
      <path id={`${id}-interactive`} stroke="transparent" strokeWidth={15} fill="none" d={edgePath} className="react-flow__edge-interaction cursor-pointer" />
      
      {/* Only render drag handle if edge is explicitly clicked/active to avoid cluttering the canvas */}
      {(selected || isDragging) && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
              cursor: isDragging ? 'grabbing' : 'grab',
              zIndex: 1000,
            }}
            className="nodrag nopan"
            onPointerDown={onPointerDown}
            title="Drag to Reroute Path"
          >
            <div 
              style={{
                width: '14px',
                height: '14px',
                backgroundColor: isDragging ? '#3b82f6' : 'white',
                border: `2px solid ${isDragging ? 'white' : '#3b82f6'}`,
                borderRadius: '50%',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.15s ease-in-out',
                transform: isDragging ? 'scale(1.5)' : 'scale(1)',
              }}
              onMouseEnter={(e) => { if (!isDragging) e.currentTarget.style.transform = 'scale(1.25)'; }}
              onMouseLeave={(e) => { if (!isDragging) e.currentTarget.style.transform = 'scale(1)'; }}
            />
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

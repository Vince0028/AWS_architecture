import React from 'react';
import { PILL_COLORS, getIcon } from '../utils/icons';

export const PipelineFlow = ({ steps }) => (
    <div className="pipeline-flow">
        {steps.map((step, i) => {
            const color = PILL_COLORS[step.c] || PILL_COLORS.blue;
            const iconSrc = getIcon(step.n);
            return (
                <React.Fragment key={i}>
                    {i > 0 && <span className="pill-arrow">→</span>}
                    <div className="pill" style={{ background: color.bg, borderColor: color.border, color: color.text }}>
                        {iconSrc ? (
                            <img src={"/" + iconSrc} style={{width:20,height:20,objectFit:"contain"}} onError={(e)=>e.target.style.display="none"} />
                        ) : (
                            <div style={{width:20,height:20,borderRadius:4,background:color.border,opacity:0.5,flexShrink:0}}></div>
                        )}
                        <div style={{display:"flex",flexDirection:"column",lineHeight:"1.2"}}>
                            <span style={{fontWeight:700,fontSize:"0.75rem"}}>{step.n}</span>
                            <span style={{fontSize:"0.6rem",opacity:0.7,fontWeight:400}}>{step.r}</span>
                        </div>
                    </div>
                </React.Fragment>
            );
        })}
    </div>
);

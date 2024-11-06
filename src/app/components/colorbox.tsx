import { useRef, useState } from "react";
import { ColorPicker, ColorService } from "react-color-palette";
import { useOnClickOutside } from "usehooks-ts";

export default function ColorBox (props: {color: string, setColor: (color: string) => void, onChangeComplete?: (color: string) => void}) {
    const [expanded, setExpanded] = useState(false);
  
    //const [color, setColor] = useColor("#aabbcc");

    const ref = useRef(null);
    
    useOnClickOutside([ref], () => {
      setExpanded(false);
    });
  
    const {color, setColor, onChangeComplete} = props;
  
    return (
      <div className="max-w-72">
        {expanded ? (
          <div className="flex flex-row items-start gap-1">
            <div ref={ref}>

              <ColorPicker color={ColorService.convert("hex", color)} onChange={(color) => setColor(color.hex)} onChangeComplete={(color) => { 
                if (onChangeComplete) onChangeComplete(color.hex) 
              }}/>
            </div>
            
          </div>
        ) : (
          <div
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: color,
              cursor: "pointer",
              borderRadius: "10%",
              zIndex: 5,
            }}
            onClick={() => setExpanded(true)}
          />
        )}
      </div>
    );
  };
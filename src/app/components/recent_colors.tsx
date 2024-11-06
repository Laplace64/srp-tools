import { useEffect, useState } from "react";
import { ColorService } from "react-color-palette";

export default function RecentColours (props: {text: string}): JSX.Element {
    const [c, setColors] = useState<string[]>([]);

    let colors = c;
  
  
    const {text} = props;
  
    const re = /&(#[0-9a-fA-F]{6})/gm;
  
    const splits = [...text.matchAll(re)].map((match) => {
      return match[0];
    });
  
    console.log(splits)
    
    colors.push(...splits);
  
    const unique = [...new Set(colors)];
    colors = unique.slice(-36)
  
    useEffect(() => {
      if (colors.length === 0) return;
      localStorage.setItem("recentColors", JSON.stringify(colors));
    });
  
    useEffect(() => {
      const storedColors = localStorage.getItem("recentColors");
      if (storedColors) {
        setColors(JSON.parse(storedColors));
      }
    }, []);
    
    
    //console.log(colors.map((color) => { return ColorService.convert("hex", color).hsv.s}));
    colors = colors.sort((color1, color2) => { return ColorService.convert("hex", color1.substring(1)).hsv.s - ColorService.convert("hex", color2.substring(1)).hsv.s});
    //console.log(colors)
  
    const rows = [];
    for (let i = 0; i < colors.length; i += 12) {
      rows.push(colors.slice(i, i + 12));
    }

    return (
      <div className="flex flex-col gap-2">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-row gap-2">
        {row.map((color, index) => (
          <button
          key={index}
          style={{
            width: "32px",
            height: "32px",
            backgroundColor: color.substring(1),
            cursor: "pointer",
            borderRadius: "10%",
          }}
          onClick={() => {
            navigator.clipboard.writeText(color);
          }}
          />
        ))}
        </div>
      ))}
      </div>
    );
  }
export default function hashStringToColor(str: string): string {
    
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
    }

    const r = (hash & 0xFF0000) >> 16; // Старший байт
    const g = (hash & 0x00FF00) >> 8;  // Средний байт
    const b = hash & 0x0000FF;         // Младший байт

    const softenColor = (value: number) => 127 + (value >> 1);
    let softenedR = softenColor(r);
    let softenedG = softenColor(g);
    let softenedB = softenColor(b);

    const isGray = Math.abs(softenedR - softenedG) < 15 && Math.abs(softenedG - softenedB) < 15;
    if (isGray) {
        softenedR = Math.min(softenedR + 20, 255); 
    }

    return `rgb(${softenedR}, ${softenedG}, ${softenedB})`;
}
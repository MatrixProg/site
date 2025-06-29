import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Palette, Upload, Copy, Download, RotateCcw, Image, Sparkles } from "lucide-react";

interface ColorInfo {
  hex: string;
  rgb: string;
  hsl: string;
  name?: string;
}

export default function ColorPalette() {
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [extractedColors, setExtractedColors] = useState<ColorInfo[]>([]);
  const [paletteType, setPaletteType] = useState("complementary");
  const [baseColor, setBaseColor] = useState("#00ff41");
  const [generatedPalette, setGeneratedPalette] = useState<ColorInfo[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const paletteTypes = [
    { id: "complementary", name: "Complementary", description: "Colors opposite on the color wheel" },
    { id: "analogous", name: "Analogous", description: "Colors next to each other" },
    { id: "triadic", name: "Triadic", description: "Three evenly spaced colors" },
    { id: "monochromatic", name: "Monochromatic", description: "Different shades of one color" },
    { id: "split-complementary", name: "Split Complementary", description: "Base color plus two adjacent to its complement" },
  ];

  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const hslToHex = (h: number, s: number, l: number): string => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const generateColorInfo = (hex: string): ColorInfo => {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    return {
      hex: hex.toUpperCase(),
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
    };
  };

  const generatePalette = () => {
    const baseRgb = hexToRgb(baseColor);
    const baseHsl = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b);
    const colors: ColorInfo[] = [];

    switch (paletteType) {
      case "complementary":
        colors.push(generateColorInfo(baseColor));
        colors.push(generateColorInfo(hslToHex((baseHsl.h + 180) % 360, baseHsl.s, baseHsl.l)));
        break;

      case "analogous":
        colors.push(generateColorInfo(hslToHex((baseHsl.h - 30 + 360) % 360, baseHsl.s, baseHsl.l)));
        colors.push(generateColorInfo(baseColor));
        colors.push(generateColorInfo(hslToHex((baseHsl.h + 30) % 360, baseHsl.s, baseHsl.l)));
        break;

      case "triadic":
        colors.push(generateColorInfo(baseColor));
        colors.push(generateColorInfo(hslToHex((baseHsl.h + 120) % 360, baseHsl.s, baseHsl.l)));
        colors.push(generateColorInfo(hslToHex((baseHsl.h + 240) % 360, baseHsl.s, baseHsl.l)));
        break;

      case "monochromatic":
        colors.push(generateColorInfo(hslToHex(baseHsl.h, baseHsl.s, Math.max(baseHsl.l - 40, 10))));
        colors.push(generateColorInfo(hslToHex(baseHsl.h, baseHsl.s, Math.max(baseHsl.l - 20, 10))));
        colors.push(generateColorInfo(baseColor));
        colors.push(generateColorInfo(hslToHex(baseHsl.h, baseHsl.s, Math.min(baseHsl.l + 20, 90))));
        colors.push(generateColorInfo(hslToHex(baseHsl.h, baseHsl.s, Math.min(baseHsl.l + 40, 90))));
        break;

      case "split-complementary":
        colors.push(generateColorInfo(baseColor));
        colors.push(generateColorInfo(hslToHex((baseHsl.h + 150) % 360, baseHsl.s, baseHsl.l)));
        colors.push(generateColorInfo(hslToHex((baseHsl.h + 210) % 360, baseHsl.s, baseHsl.l)));
        break;
    }

    setGeneratedPalette(colors);
    toast({
      title: "Palette generated!",
      description: `Created ${colors.length} colors using ${paletteTypes.find(t => t.id === paletteType)?.name} scheme.`,
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setUploadedImage(imageUrl);
      extractColorsFromImage(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const extractColorsFromImage = (imageUrl: string) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (!imageData) return;

      // Sample colors from different parts of the image
      const colors = new Set<string>();
      const step = Math.floor(imageData.data.length / 1000); // Sample every 1000th pixel
      
      for (let i = 0; i < imageData.data.length; i += step * 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const alpha = imageData.data[i + 3];
        
        if (alpha > 128) { // Only consider non-transparent pixels
          const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
          colors.add(hex);
        }
      }

      // Convert to ColorInfo array and limit to 8 colors
      const colorInfoArray = Array.from(colors)
        .slice(0, 8)
        .map(hex => generateColorInfo(hex));
      
      setExtractedColors(colorInfoArray);
      toast({
        title: "Colors extracted!",
        description: `Found ${colorInfoArray.length} dominant colors in the image.`,
      });
    };
    
    img.src = imageUrl;
  };

  const copyColor = (color: ColorInfo, format: 'hex' | 'rgb' | 'hsl' = 'hex') => {
    const value = format === 'hex' ? color.hex : format === 'rgb' ? color.rgb : color.hsl;
    navigator.clipboard.writeText(value);
    toast({
      title: "Color copied!",
      description: `${value} has been copied to clipboard.`,
    });
  };

  const downloadPalette = (colors: ColorInfo[], name: string) => {
    const paletteData = {
      name,
      colors: colors.map(color => ({
        hex: color.hex,
        rgb: color.rgb,
        hsl: color.hsl,
      })),
      createdAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(paletteData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name.toLowerCase().replace(/\s+/g, '_')}_palette.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Palette downloaded!",
      description: "Color palette has been saved as JSON.",
    });
  };

  const resetAll = () => {
    setUploadedImage("");
    setExtractedColors([]);
    setGeneratedPalette([]);
    setBaseColor("#00ff41");
    setPaletteType("complementary");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    
    toast({
      title: "Reset complete",
      description: "All color palette data has been cleared.",
    });
  };

  const ColorCard = ({ color, showCopyButtons = true }: { color: ColorInfo; showCopyButtons?: boolean }) => (
    <Card className="bg-gray-700 border-gray-600 overflow-hidden">
      <div 
        className="h-20 cursor-pointer transition-transform hover:scale-105"
        style={{ backgroundColor: color.hex }}
        onClick={() => copyColor(color)}
      />
      <CardContent className="p-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-gray-300">{color.hex}</span>
            {showCopyButtons && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyColor(color)}
                className="h-6 w-6 p-0 text-gray-400 hover:text-white"
              >
                <Copy className="w-3 h-3" />
              </Button>
            )}
          </div>
          <div className="text-xs text-gray-400">
            <div>{color.rgb}</div>
            <div>{color.hsl}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Color Generator */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-cyber-purple" />
            <span>Color Palette Generator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Base Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-16 h-10 rounded border border-gray-600 cursor-pointer"
                />
                <Input
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="bg-gray-700 border-gray-600 font-mono"
                  placeholder="#00ff41"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Palette Type</label>
              <Select value={paletteType} onValueChange={setPaletteType}>
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {paletteTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      <div>
                        <div className="font-medium">{type.name}</div>
                        <div className="text-xs text-gray-400">{type.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={generatePalette}
              className="flex-1 bg-cyber-purple text-white hover:bg-cyber-purple/80"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Palette
            </Button>
            <Button
              onClick={resetAll}
              variant="outline"
              className="border-gray-600"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          {generatedPalette.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Generated Palette</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadPalette(generatedPalette, `${paletteType} palette`)}
                  className="border-cyber-purple text-cyber-purple hover:bg-cyber-purple hover:text-white"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {generatedPalette.map((color, index) => (
                  <ColorCard key={index} color={color} />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Image Color Extractor */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Image className="w-5 h-5 text-cyber-teal" />
            <span>Extract Colors from Image</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="w-full border-gray-600 hover:border-cyber-teal h-32"
            >
              <div className="text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-cyber-teal" />
                <p className="text-sm">Click to upload an image</p>
                <p className="text-xs text-gray-400">JPG, PNG, GIF up to 10MB</p>
              </div>
            </Button>
          </div>

          {uploadedImage && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Uploaded Image</h4>
                <img 
                  src={uploadedImage} 
                  alt="Uploaded" 
                  className="w-full h-48 object-cover rounded-lg border border-gray-600"
                />
              </div>
              
              {extractedColors.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Extracted Colors</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadPalette(extractedColors, "extracted colors")}
                      className="border-cyber-teal text-cyber-teal hover:bg-cyber-teal hover:text-white"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {extractedColors.slice(0, 6).map((color, index) => (
                      <ColorCard key={index} color={color} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preset Palettes */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="w-5 h-5 text-matrix" />
            <span>Popular Color Palettes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                name: "MatrixProg Theme",
                colors: ["#00ff41", "#0d7377", "#7209b7", "#f72585", "#14213d"]
              },
              {
                name: "Ocean Blues",
                colors: ["#001219", "#005f73", "#0a9396", "#94d2bd", "#e9d8a6"]
              },
              {
                name: "Sunset Vibes", 
                colors: ["#f72585", "#b5179e", "#7209b7", "#480ca8", "#3a0ca3"]
              },
              {
                name: "Forest Greens",
                colors: ["#2d5016", "#3e6b1f", "#568527", "#6da030", "#84bb38"]
              }
            ].map((palette, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{palette.name}</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadPalette(
                      palette.colors.map(hex => generateColorInfo(hex)), 
                      palette.name
                    )}
                    className="border-matrix text-matrix hover:bg-matrix hover:text-gray-900"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {palette.colors.map((hex, colorIndex) => (
                    <ColorCard key={colorIndex} color={generateColorInfo(hex)} showCopyButtons={false} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

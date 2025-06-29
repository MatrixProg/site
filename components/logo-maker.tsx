'use client'

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Paintbrush, Download, RotateCcw, Palette, Type, Shapes } from "lucide-react";

export default function LogoMaker() {
  const [brandName, setBrandName] = useState("MatrixProg");
  const [tagline, setTagline] = useState("AI Powered");
  const [logoStyle, setLogoStyle] = useState("modern");
  const [shape, setShape] = useState("circle");
  const [primaryColor, setPrimaryColor] = useState("#00ff41");
  const [secondaryColor, setSecondaryColor] = useState("#0d7377");
  const [textColor, setTextColor] = useState("#ffffff");
  const [backgroundColor, setBackgroundColor] = useState("#1a1a1a");
  const [logoSize, setLogoSize] = useState([200]);
  const { toast } = useToast();

  const logoStyles = [
    { id: "modern", name: "Modern", description: "Clean and contemporary" },
    { id: "tech", name: "Tech", description: "Futuristic and digital" },
    { id: "creative", name: "Creative", description: "Artistic and unique" },
    { id: "corporate", name: "Corporate", description: "Professional and trustworthy" },
    { id: "startup", name: "Startup", description: "Fresh and innovative" },
  ];

  const shapes = [
    { id: "circle", name: "Circle" },
    { id: "square", name: "Square" },
    { id: "hexagon", name: "Hexagon" },
    { id: "diamond", name: "Diamond" },
  ];

  const generateLogo = () => {
    toast({
      title: "Logo Generated!",
      description: "Your custom logo has been created successfully.",
    });
  };

  const downloadLogo = () => {
    toast({
      title: "Download Started",
      description: "Your logo is being downloaded as PNG.",
    });
  };

  const resetToDefaults = () => {
    setBrandName("MatrixProg");
    setTagline("AI Powered");
    setLogoStyle("modern");
    setShape("circle");
    setPrimaryColor("#00ff41");
    setSecondaryColor("#0d7377");
    setTextColor("#ffffff");
    setBackgroundColor("#1a1a1a");
    setLogoSize([200]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Paintbrush className="w-5 h-5 text-cyber-purple" />
            <span>AI Logo Maker</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Brand Name</label>
              <Input
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="bg-gray-700 border-gray-600"
                placeholder="Enter brand name..."
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Tagline (Optional)</label>
              <Input
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="bg-gray-700 border-gray-600"
                placeholder="Enter tagline..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Logo Style</label>
              <Select value={logoStyle} onValueChange={setLogoStyle}>
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {logoStyles.map(style => (
                    <SelectItem key={style.id} value={style.id}>
                      <div>
                        <div className="font-medium">{style.name}</div>
                        <div className="text-xs text-gray-500">{style.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Shape</label>
              <Select value={shape} onValueChange={setShape}>
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {shapes.map(s => (
                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Primary Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-12 h-10 rounded border border-gray-600"
                />
                <Input
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="bg-gray-700 border-gray-600"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Secondary Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-12 h-10 rounded border border-gray-600"
                />
                <Input
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="bg-gray-700 border-gray-600"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Text Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-12 h-10 rounded border border-gray-600"
                />
                <Input
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="bg-gray-700 border-gray-600"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Background</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-12 h-10 rounded border border-gray-600"
                />
                <Input
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="bg-gray-700 border-gray-600"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Logo Size: {logoSize[0]}px
            </label>
            <Slider
              value={logoSize}
              onValueChange={setLogoSize}
              max={400}
              min={100}
              step={10}
              className="w-full"
            />
          </div>

          <div className="flex space-x-3">
            <Button onClick={generateLogo} className="flex-1">
              <Palette className="w-4 h-4 mr-2" />
              Generate Logo
            </Button>
            <Button onClick={resetToDefaults} variant="outline">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Logo Preview */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Logo Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
            <div 
              className="flex flex-col items-center justify-center rounded-lg p-8 border-2 border-dashed border-gray-600"
              style={{ 
                backgroundColor: backgroundColor,
                width: logoSize[0],
                height: logoSize[0]
              }}
            >
              <div 
                className={`w-16 h-16 rounded-${shape === 'circle' ? 'full' : 'lg'} flex items-center justify-center text-2xl font-bold`}
                style={{ 
                  backgroundColor: primaryColor,
                  color: textColor,
                  border: `2px solid ${secondaryColor}`
                }}
              >
                {brandName.substring(0, 2).toUpperCase()}
              </div>
              <h3 
                className="text-xl font-bold mt-4"
                style={{ color: textColor }}
              >
                {brandName}
              </h3>
              {tagline && (
                <p 
                  className="text-sm opacity-80"
                  style={{ color: textColor }}
                >
                  {tagline}
                </p>
              )}
            </div>

            <div className="flex space-x-3">
              <Button onClick={downloadLogo} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download PNG
              </Button>
              <Button onClick={downloadLogo} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download SVG
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X } from "lucide-react";
import { toast } from "sonner";

interface CameraModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductDetected: (productName: string) => void;
}

export const CameraModal = ({ open, onOpenChange, onProductDetected }: CameraModalProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIdentify = async () => {
    if (!imagePreview) {
      toast.error("Please select an image first");
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/identify-product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ image: imagePreview }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to identify product");
      }

      const data = await response.json();
      
      if (data.detectedName) {
        onProductDetected(data.detectedName);
        toast.success(`Product identified: ${data.detectedName}`);
        handleClose();
      } else {
        toast.error("Could not identify product. Please try another image.");
      }
    } catch (error) {
      console.error("Error identifying product:", error);
      toast.error("Failed to identify product. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setImagePreview(null);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scan Product</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {!imagePreview ? (
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileSelect}
                className="hidden"
                id="camera-input"
              />
              
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
                size="lg"
              >
                <Camera className="mr-2 h-5 w-5" />
                Take Photo
              </Button>
              
              <Button
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.removeAttribute("capture");
                    fileInputRef.current.click();
                    fileInputRef.current.setAttribute("capture", "environment");
                  }
                }}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload from Gallery
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="w-full rounded-lg border border-border"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={() => setImagePreview(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={handleIdentify}
                  disabled={isProcessing}
                  className="flex-1"
                  size="lg"
                >
                  {isProcessing ? "Identifying..." : "Identify Product"}
                </Button>
                <Button
                  onClick={() => setImagePreview(null)}
                  variant="outline"
                  disabled={isProcessing}
                >
                  Retake
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

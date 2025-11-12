"use client";

import { useState } from "react";

import { FileUploader } from "@/components/upload/file-uploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { uploadSalesFile } from "@/lib/api-client";

export default function UploadPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    try {
      setError(null);
      setIsProcessing(true);
      await uploadSalesFile(file);
    } catch (err) {
      console.error(err);
      setError("We couldn’t process the file. Double-check the format and try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <Card className="border-0 bg-card/90 shadow-lg shadow-primary/10">
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-3xl font-semibold text-foreground">Upload Data</CardTitle>
            <CardDescription>
              Import historical sales or SKU performance to keep forecasts fresh.
            </CardDescription>
          </div>
          <Button size="pill" variant="secondary">
            Download Template
          </Button>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            Forecast smarter with a clean import. We validate, fill gaps, and surface issues before any
            predictions run — so you can trust every recommendation.
          </p>
        </CardContent>
      </Card>

      <FileUploader onUpload={handleUpload} isProcessing={isProcessing} error={error} />
    </div>
  );
}


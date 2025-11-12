"use client";

import { useState } from "react";

import { FileUploader } from "@/components/upload/file-uploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type UploadSummary, uploadSalesFile } from "@/lib/api-client";

export default function UploadPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<UploadSummary | null>(null);

  const handleUpload = async (file: File) => {
    try {
      setError(null);
      setSummary(null);
      setIsProcessing(true);
      const result = await uploadSalesFile(file);
      setSummary(result);
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

      {summary ? (
        <Card className="border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Upload Summary</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {summary.message}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm text-muted-foreground md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Rows Processed</p>
              <p className="mt-1 text-base font-semibold text-foreground">{summary.rows}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Columns Detected</p>
              <p className="mt-1 text-base font-semibold text-foreground">
                {summary.columns.join(", ")}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Sample Preview</p>
              <pre className="mt-2 max-h-48 overflow-auto rounded-2xl bg-secondary/60 p-4 text-xs text-muted-foreground">
                {JSON.stringify(summary.sample, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}


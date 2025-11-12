"use client";

import { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload, FileSpreadsheet, Loader2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FileUploaderProps {
  onUpload: (file: File) => Promise<void> | void;
  isProcessing?: boolean;
  sampleData?: string[][];
  error?: string | null;
}

export function FileUploader({ onUpload, isProcessing = false, sampleData, error }: FileUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) {
        return;
      }
      setSelectedFile(file);
      await onUpload(file);
    },
    [onUpload],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  const rejectionMessage = useMemo(() => {
    if (!fileRejections.length) return null;
    const [rejection] = fileRejections;
    return rejection.errors.map((error) => error.message).join(", ");
  }, [fileRejections]);

  return (
    <Card className="border-0 bg-card shadow-xl shadow-primary/10">
      <CardHeader className="space-y-2">
        <CardTitle className="text-3xl font-semibold text-foreground">Upload Data</CardTitle>
        <CardDescription>
          Upload your sales history to generate AI-powered forecasts. Supported formats: CSV, XLSX.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <div
          {...getRootProps()}
          className={`relative flex min-h-[240px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed transition ${
            dragActive || isDragActive ? "border-primary bg-primary/10" : "border-border bg-secondary/30"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CloudUpload className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold text-foreground">
                Drop your file here or click to browse
              </p>
              <p className="text-sm text-muted-foreground">
                Supported formats: CSV, XLSX (Max size: 10MB)
              </p>
            </div>
            {selectedFile ? (
              <Badge variant="primary" className="gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                {selectedFile.name}
              </Badge>
            ) : null}
          </div>
        </div>

        {error || rejectionMessage ? (
          <div className="flex items-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            <XCircle className="h-5 w-5" />
            <span>{error ?? rejectionMessage}</span>
          </div>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border border-dashed border-border/80 bg-transparent shadow-none">
            <CardHeader>
              <CardTitle className="text-lg">Required data format</CardTitle>
              <CardDescription>Columns needed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <ul className="list-disc space-y-1 pl-5">
                <li>Date</li>
                <li>SKU / Product ID</li>
                <li>Units Sold</li>
                <li>Inventory Level (optional)</li>
                <li>Lead Time (optional)</li>
              </ul>
              <div className="rounded-2xl bg-secondary/60 p-4 font-mono text-xs text-muted-foreground">
                date,sku,units_sold,stock,lead_time<br />
                2024-01-01,SKU-A01,120,450,7<br />
                2024-01-02,SKU-A01,135,430,7
              </div>
              <p className="text-xs text-muted-foreground">
                Tip: More historical data unlocks higher accuracy. We recommend at least 6 months.
              </p>
            </CardContent>
          </Card>
          <Card className="border border-dashed border-border/80 bg-transparent shadow-none">
            <CardHeader>
              <CardTitle className="text-lg">Preview</CardTitle>
              <CardDescription>First rows detected</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-h-[190px] overflow-auto rounded-2xl border border-border">
                <table className="w-full table-auto text-sm">
                  <tbody>
                    {(sampleData ?? SAMPLE_ROWS).map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={rowIndex === 0 ? "bg-secondary/50 text-xs uppercase text-muted-foreground" : ""}
                      >
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="px-4 py-2 text-left">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-border/60 bg-gradient-to-r from-primary/10 to-transparent px-6 py-5 shadow-sm sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Ready to transform your sales data into action?
            </p>
            <p className="text-xs text-muted-foreground">We crunch the numbers — you get confident orders.</p>
          </div>
          <Button
            size="pill"
            disabled={!selectedFile || isProcessing}
            className="min-w-[200px]"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating forecast…
              </>
            ) : (
              <>
                Generate Forecast
                <CloudUpload className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const SAMPLE_ROWS: string[][] = [
  ["date", "sku", "units_sold", "stock", "lead_time"],
  ["2024-01-01", "SKU-A01", "120", "450", "7"],
  ["2024-01-02", "SKU-A01", "135", "430", "7"],
  ["2024-01-03", "SKU-A01", "142", "415", "7"],
  ["2024-01-04", "SKU-A01", "150", "390", "7"],
];


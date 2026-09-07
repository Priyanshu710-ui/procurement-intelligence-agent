"use client";

import { useRef, useState } from "react";

interface UploadFormProps {
  onSubmit: (csvText: string) => void;
  loading: boolean;
}

export default function UploadForm({ onSubmit, loading }: UploadFormProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      onSubmit(text);
    };
    reader.readAsText(file);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function loadSample() {
    fetch("/sample_purchases.csv")
      .then((r) => r.text())
      .then((text) => {
        setFileName("sample_purchases.csv");
        onSubmit(text);
      });
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed px-6 py-14 text-center transition-all duration-200 sm:px-10 sm:py-16 ${
          dragOver
            ? "border-gold bg-gold/10 shadow-[0_0_0_4px_rgba(185,130,53,0.08)]"
            : "border-line bg-slate-50/70 hover:border-gold/50 hover:bg-gold/[0.03]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        {/* Upload icon */}
        <div
          className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border transition-all ${
            dragOver
              ? "border-gold/30 bg-gold/10"
              : "border-line bg-white shadow-sm group-hover:border-gold/30 group-hover:bg-gold/5"
          }`}
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-colors ${
              dragOver ? "text-gold" : "text-ledger/55 group-hover:text-gold"
            }`}
          >
            <path
              d="M12 16V4M12 4L7 9M12 4L17 9"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 14V18C5 19.1046 5.89543 20 7 20H17C18.1046 20 19 19.1046 19 18V14"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <p className="font-display text-xl text-ledger sm:text-2xl">
          Drop your purchase ledger here
        </p>

        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-ink/50">
          Upload a CSV containing your procurement transactions and
          let the intelligence engine analyze your spending.
        </p>

        <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/45">
            CSV files only
          </span>
        </div>

        <p className="mt-5 text-xs text-ink/35">
          or click anywhere to browse
        </p>

        {fileName && (
          <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700">
              ✓
            </span>
            <span className="font-mono text-xs text-green-700">
              {fileName}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={(e) => {
            e.stopPropagation();
            loadSample();
          }}
          disabled={loading}
          className="group inline-flex w-fit items-center gap-2 rounded-lg border border-line bg-white px-4 py-2.5 text-sm font-medium text-ledger shadow-sm transition-all hover:border-gold/40 hover:bg-gold/5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="text-gold transition-transform group-hover:translate-x-0.5">
            ↗
          </span>
          Try it with sample data
        </button>

        {loading && (
          <div className="flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-3 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-gold">
              Analyzing procurement data…
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
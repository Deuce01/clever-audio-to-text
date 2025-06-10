
import { useState } from 'react';
import { Copy, Download, FileText, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface TextOutputProps {
  text: string;
  isProcessing: boolean;
  fileName?: string;
}

const TextOutput = ({ text, isProcessing, fileName }: TextOutputProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Text copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  const handleDownload = () => {
    if (!text) return;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName ? fileName.replace(/\.[^/.]+$/, '') : 'transcription'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success('Transcription downloaded!');
  };

  if (isProcessing) {
    return (
      <Card className="p-6 border-0 shadow-lg bg-white/70 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Transcription Results</h3>
          <FileText className="w-5 h-5 text-gray-400" />
        </div>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">Processing your audio...</p>
          <p className="text-sm text-gray-400 mt-2">Your transcription will appear here</p>
        </div>
      </Card>
    );
  }

  if (!text) {
    return (
      <Card className="p-6 border-0 shadow-lg bg-white/70 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Transcription Results</h3>
          <FileText className="w-5 h-5 text-gray-400" />
        </div>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No transcription yet</p>
          <p className="text-sm text-gray-400 mt-2">Upload an audio file and start processing to see results</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-0 shadow-lg bg-white/70 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Transcription Results</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-600 font-medium">Complete</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Textarea
            value={text}
            readOnly
            className="min-h-[300px] resize-none bg-gray-50 border-gray-200 focus:border-purple-300 focus:ring-purple-200"
            placeholder="Your transcribed text will appear here..."
          />
          {text && (
            <div className="absolute top-2 right-2 bg-white rounded-md shadow-sm border border-gray-200 px-2 py-1">
              <span className="text-xs text-gray-500">
                {text.split(' ').length} words
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleCopy}
            variant="outline"
            className="flex-1 bg-white hover:bg-gray-50 border-gray-200 text-gray-700"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2 text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Text
              </>
            )}
          </Button>
          <Button
            onClick={handleDownload}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Download TXT
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TextOutput;

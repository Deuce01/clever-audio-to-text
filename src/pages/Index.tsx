
import { useState, useRef } from 'react';
import { Upload, FileAudio, Copy, Download, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import AudioUpload from '@/components/AudioUpload';
import ProcessingStatus from '@/components/ProcessingStatus';
import TextOutput from '@/components/TextOutput';

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [transcribedText, setTranscribedText] = useState('');
  const [processingStep, setProcessingStep] = useState('');

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setTranscribedText('');
    setProgress(0);
    toast.success(`File "${file.name}" uploaded successfully!`);
  };

  const simulateProcessing = async () => {
    setIsProcessing(true);
    setProgress(0);
    setTranscribedText('');

    const steps = [
      { step: 'Analyzing audio format...', duration: 1000 },
      { step: 'Splitting audio into segments...', duration: 2000 },
      { step: 'Processing segment 1/3...', duration: 1500 },
      { step: 'Processing segment 2/3...', duration: 1500 },
      { step: 'Processing segment 3/3...', duration: 1500 },
      { step: 'Combining results...', duration: 1000 },
      { step: 'Finalizing transcription...', duration: 500 }
    ];

    for (let i = 0; i < steps.length; i++) {
      setProcessingStep(steps[i].step);
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
      setProgress(((i + 1) / steps.length) * 100);
    }

    // Simulate transcribed text
    const sampleText = `Welcome to our audio transcription service. This is a demonstration of how your audio file would be converted to text. 

The audio processing system analyzes your uploaded file, splits it into manageable segments if needed, and uses advanced speech recognition technology to convert speech to text.

Key features include:
- Support for multiple audio formats
- Automatic audio segmentation for long files
- High accuracy speech recognition
- Real-time processing status updates
- Easy text export and copying

Your actual transcription results would appear here based on the content of your uploaded audio file.`;

    setTranscribedText(sampleText);
    setIsProcessing(false);
    setProcessingStep('');
    toast.success('Audio transcription completed!');
  };

  const handleStartProcessing = () => {
    if (!uploadedFile) {
      toast.error('Please upload an audio file first');
      return;
    }
    simulateProcessing();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <FileAudio className="w-12 h-12 text-purple-600" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Clever Audio to Text
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your audio files into accurate text transcriptions with our advanced speech recognition technology
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <AudioUpload onFileUpload={handleFileUpload} />
            
            {uploadedFile && (
              <Card className="p-6 border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Ready to Process</h3>
                  <FileAudio className="w-5 h-5 text-purple-600" />
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button 
                  onClick={handleStartProcessing}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  {isProcessing ? 'Processing...' : 'Start Transcription'}
                </Button>
              </Card>
            )}

            {isProcessing && (
              <ProcessingStatus progress={progress} currentStep={processingStep} />
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <TextOutput 
              text={transcribedText} 
              isProcessing={isProcessing}
              fileName={uploadedFile?.name}
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl bg-white/50 backdrop-blur-sm border-0 shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Upload className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy Upload</h3>
            <p className="text-gray-600">Drag and drop or click to upload your audio files in multiple formats</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/50 backdrop-blur-sm border-0 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Play className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Fast Processing</h3>
            <p className="text-gray-600">Advanced AI technology for quick and accurate speech recognition</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/50 backdrop-blur-sm border-0 shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Download className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Export Results</h3>
            <p className="text-gray-600">Copy to clipboard or download your transcriptions in text format</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;


import { useState, useRef } from 'react';
import { Upload, FileAudio, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface AudioUploadProps {
  onFileUpload: (file: File) => void;
}

const AudioUpload = ({ onFileUpload }: AudioUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supportedFormats = ['audio/wav', 'audio/mp3', 'audio/mpeg', 'audio/ogg', 'audio/webm', 'audio/m4a'];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!supportedFormats.includes(file.type) && !file.name.toLowerCase().match(/\.(wav|mp3|ogg|webm|m4a)$/)) {
      toast.error('Please upload a valid audio file (WAV, MP3, OGG, WebM, or M4A)');
      return;
    }

    if (file.size > 100 * 1024 * 1024) { // 100MB limit
      toast.error('File size must be less than 100MB');
      return;
    }

    onFileUpload(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm overflow-hidden">
      <div
        className={`relative p-8 transition-all duration-300 ${
          isDragOver 
            ? 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-300' 
            : 'bg-gradient-to-br from-gray-50 to-white'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative z-10 text-center">
          <div className="mb-6">
            <div className="relative inline-block">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                isDragOver 
                  ? 'bg-gradient-to-br from-purple-500 to-blue-500 scale-110' 
                  : 'bg-gradient-to-br from-purple-400 to-blue-400'
              }`}>
                <Upload className="w-10 h-10 text-white" />
              </div>
              {isDragOver && (
                <div className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-75"></div>
              )}
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {isDragOver ? 'Drop your audio file here' : 'Upload Audio File'}
          </h3>
          
          <p className="text-gray-600 mb-6">
            Drag and drop your audio file here, or{' '}
            <button 
              onClick={openFileDialog}
              className="text-purple-600 hover:text-purple-700 font-medium underline transition-colors"
            >
              browse files
            </button>
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            {['WAV', 'MP3', 'OGG', 'WebM', 'M4A'].map((format) => (
              <div 
                key={format}
                className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 flex items-center justify-center"
              >
                <FileAudio className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm font-medium text-gray-600">{format}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500">
            Maximum file size: 100MB
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </Card>
  );
};

export default AudioUpload;

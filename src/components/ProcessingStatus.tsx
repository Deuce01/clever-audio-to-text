
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Loader2, Zap } from 'lucide-react';

interface ProcessingStatusProps {
  progress: number;
  currentStep: string;
}

const ProcessingStatus = ({ progress, currentStep }: ProcessingStatusProps) => {
  return (
    <Card className="p-6 border-0 shadow-lg bg-white/70 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Processing Audio</h3>
        <div className="flex items-center space-x-2">
          <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
          <Zap className="w-5 h-5 text-yellow-500" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{currentStep}</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
          </div>
          <Progress 
            value={progress} 
            className="h-3 bg-gray-200"
          />
        </div>

        {/* Processing animation */}
        <div className="flex justify-center space-x-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-2 h-8 bg-gradient-to-t from-purple-400 to-blue-400 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            ></div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            This may take a few moments depending on the audio length...
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ProcessingStatus;

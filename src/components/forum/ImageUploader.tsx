import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface ImageUploaderProps {
  onImageUpload: (url: string) => void;
  maxSizeMB?: number;
}

const ImageUploader = ({ onImageUpload, maxSizeMB = 5 }: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`Файл слишком большой. Максимум ${maxSizeMB}MB`);
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Только изображения допускаются');
      return;
    }

    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        
        const mockUrl = URL.createObjectURL(file);
        onImageUpload(mockUrl);
        toast.success('Изображение загружено!');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error('Ошибка загрузки изображения');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="inline-block">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
      >
        <Icon name={uploading ? "Loader2" : "Image"} className={`h-4 w-4 mr-2 ${uploading ? 'animate-spin' : ''}`} />
        {uploading ? 'Загрузка...' : 'Добавить фото'}
      </Button>
    </div>
  );
};

export default ImageUploader;

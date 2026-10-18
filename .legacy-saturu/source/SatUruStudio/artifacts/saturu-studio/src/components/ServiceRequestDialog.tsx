import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { OrderForm } from './OrderForm';
import { useLanguage } from '../context/LanguageContext';

interface ServiceRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceName: string;
  serviceSlug: string;
}

export function ServiceRequestDialog({
  open,
  onOpenChange,
  serviceName,
  serviceSlug,
}: ServiceRequestDialogProps) {
  const { language } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-border/50 bg-background/95 backdrop-blur-2xl shadow-2xl shadow-black/40 p-0">
        <DialogHeader className="px-7 pt-7 pb-0">
          <DialogTitle className="font-display text-lg font-bold tracking-[-0.01em] text-foreground">
            {language === 'ru' ? 'Заявка на услугу' : 'Service Request'}
          </DialogTitle>
        </DialogHeader>
        <div className="px-7 pt-5 pb-7">
          <OrderForm serviceName={serviceName} serviceSlug={serviceSlug} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

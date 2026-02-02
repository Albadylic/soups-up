import { useEffect } from 'preact/hooks';

interface FeedbackMessageProps {
  type: 'success' | 'failure';
  onDismiss: () => void;
  onNextOrder: () => void;
}

export function FeedbackMessage({ type, onDismiss, onNextOrder }: FeedbackMessageProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (type === 'success') {
        onNextOrder();
      } else {
        onDismiss();
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [type, onDismiss, onNextOrder]);

  return (
    <div class="feedback-overlay">
      <div class={`feedback-message ${type}`}>
        {type === 'success' ? 'Delicious!' : 'Try Again!'}
      </div>
    </div>
  );
}

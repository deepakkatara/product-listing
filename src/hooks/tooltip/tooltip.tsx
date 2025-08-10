import React, { forwardRef, useState } from 'react';
import { Whisper, Popover } from 'rsuite';

// Hook for managing tooltip state
export const useTooltip = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState('');

  const showTooltip = (tooltipContent: string) => {
    setContent(tooltipContent);
    setIsVisible(true);
  };

  const hideTooltip = () => {
    setIsVisible(false);
    setContent('');
  };

  return {
    isVisible,
    content,
    showTooltip,
    hideTooltip,
  };
};

interface DefaultPopoverProps {
  content: any;
  className?: string;
  [key: string]: any;
}

// eslint-disable-next-line react/display-name
const DefaultPopover = forwardRef<HTMLDivElement, DefaultPopoverProps>(({ content, className, ...props }, ref) => {
  return (
    <Popover {...(props as any)} className={className} arrow={false}>
      <p>{content}</p>
    </Popover>
  );
});

interface AppTooltipProps {
  placement: any;
  data: any;
  className?: string;
  name: string;
  tooltipClass?: string;
}

export const AppTooltip: React.FC<AppTooltipProps> = ({ placement, data, className, name, tooltipClass }) => (
  <Whisper
    trigger="click"
    placement={placement}
    controlId={`control-id-${placement}`}
    speaker={<DefaultPopover content={data} className={tooltipClass} />}
  >
    <div className={className}>{name}</div>
  </Whisper>
);

export default useTooltip;
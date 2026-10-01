import {type ComponentPropsWithoutRef, type ComponentType, memo, type SVGProps} from 'react';

import { log } from '../../log.ts';

interface IconButtonProps extends ComponentPropsWithoutRef<'button'> {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const IconButton = memo(function IconButton({ children, icon, ...props }: IconButtonProps) {
  log('<IconButton /> rendered', 2);

  const Icon = icon;
  return (
    <button
      {...props}
      className="inline-flex cursor-pointer items-center gap-2 rounded bg-[#16f3eb] px-4 py-2 text-center text-[0.83rem] text-[#051a19] transition-colors duration-300 hover:bg-[#12c9c2]"
    >
      <Icon className="h-[0.9rem] w-[0.9rem] text-[#051a19]" />
      <span>{children}</span>
    </button>
  );
});

export default IconButton;

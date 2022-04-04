import { Switch } from '@headlessui/react';

interface Props {
  className?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

function SwitchComponent(props: Props) {
  return (
    <Switch
      checked={props.checked}
      onChange={props.onChange}
      className={`${props.className} ${props.checked ? 'bg-blue-500' : 'bg-gray-400'}
          relative inline-flex flex-shrink-0 h-[24px] w-[60px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span
        className={`${props.className} ${props.checked ? 'translate-x-9' : 'translate-x-0'}
        pointer-events-none inline-block h-[20px] w-[20px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
      />
    </Switch>
  );
}

export default SwitchComponent;

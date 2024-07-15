
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { twMerge } from "tailwind-merge";
import { FaRegCalendarDays } from "react-icons/fa6";

export default function DatePicker(props) {
  const {
    defaultIcon,
    ...restProps
  } = props;
  return (<>
    <ReactDatePicker
      {...restProps}
      isClearable={props?.isClearable ?? true}
      showIcon={props?.showIcon ?? true}
      icon={props?.icon ?? defaultIcon
        ? undefined
        : <FaRegCalendarDays className="top-1/2 -translate-y-1/2 -left-1 text-[--foreground-rgb]" />
      }
    />
  </>);
}

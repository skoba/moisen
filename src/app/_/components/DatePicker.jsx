
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { twMerge } from "tailwind-merge";

export default function DatePicker(props) {
  return (<>
    <ReactDatePicker
      {...props}
      showIcon={props?.showIcon ?? true}
      isClearable={props?.isClearable ?? true}
    />
  </>);
}

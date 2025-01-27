import { ComponentProps } from "react";
import s from "./Input.module.css";
interface InputProps extends ComponentProps<"input"> {
  icon?: React.ReactNode;
}
export const Input = (props: InputProps) => {
  const { className, icon, ...rest } = props;
  return (
    <div className={`${s.input} ${className}`}>
      {icon && <div className={s.icon}>{icon}</div>}
      <input type="text" {...rest} />
    </div>
  );
};

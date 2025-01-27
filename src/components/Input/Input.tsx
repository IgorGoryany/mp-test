import { ComponentProps, useId } from "react";
import s from "./Input.module.css";
interface InputProps extends ComponentProps<"input"> {
  icon?: React.ReactNode;
  label?: string;
}
export const Input = (props: InputProps) => {
  const { className, icon, label, ...rest } = props;
  const id = useId();
  return (
    <div className={`${s.container} ${className}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <div className={s.input}>
        {icon && <div className={s.icon}>{icon}</div>}
        <input type="text" {...rest} />
      </div>
    </div>
  );
};

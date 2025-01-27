import { ComponentProps, ReactNode, useId } from "react";
import s from "./Select.module.css";

interface SelectProps<T>
  extends Omit<ComponentProps<"select">, "children" | "id"> {
  items: T[];
  label: string | number;
  className?: string;
  children: (item: T) => ReactNode;
  icon?: ReactNode;
}
export const Select = <T extends Record<keyof T, unknown>>(
  props: SelectProps<T>,
) => {
  const { items, children, label, className, icon, ...otherProps } = props;
  const id = useId();
  return (
    <label className={className} htmlFor={id}>
      {label}
      <div className={s["select-container"]}>
        {icon && <div className={s.icon}>{icon}</div>}
        <select id={id} {...otherProps}>
          {items.map(children)}
        </select>
      </div>
    </label>
  );
};

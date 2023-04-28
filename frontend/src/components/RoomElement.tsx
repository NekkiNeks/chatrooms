import classNames from "classnames";

interface iProps extends React.LiHTMLAttributes<HTMLLIElement> {
  selected: boolean;
  name: string;
}

export default function RoomElement({ selected, name, ...props }: iProps) {
  const classes = classNames("room-element", { selected });
  return (
    <li className={classes} {...props}>
      {name}
    </li>
  );
}

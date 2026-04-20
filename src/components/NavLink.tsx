import { NavLink as RRNavLink } from "react-router-dom";
import type { NavLinkProps } from "react-router-dom";

interface CustomNavLinkProps extends NavLinkProps {
  activeClassName?: string;
}

export function NavLink({ activeClassName, className, ...props }: CustomNavLinkProps) {
  return (
    <RRNavLink
      className={({ isActive }) =>
        `${className} ${isActive && activeClassName ? activeClassName : ""}`.trim()
      }
      {...props}
    />
  );
}
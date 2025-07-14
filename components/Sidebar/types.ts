export interface NavItemProps {
  icon: string | React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export interface NavSectionProps {
  icon: string | React.ReactNode;
  label: string;
  children: React.ReactNode;
  isActive?: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export interface NavFooterItemProps {
  label: string;
  onClick?: () => void;
}

export interface NavFooterProps {
  items: NavFooterItemProps[];
}

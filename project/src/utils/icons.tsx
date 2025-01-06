import { 
  LayoutGrid, 
  User, 
  Briefcase, 
  Heart, 
  ShoppingCart, 
  Wallet, 
  MoreHorizontal 
} from 'lucide-react';

export const categoryIcons = {
  all: LayoutGrid,
  personal: User,
  work: Briefcase,
  health: Heart,
  shopping: ShoppingCart,
  finance: Wallet,
  other: MoreHorizontal,
} as const;
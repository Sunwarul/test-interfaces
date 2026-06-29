import { cssInterop } from "nativewind";
import {
  AlertCircle,
  Bell,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Home,
  Menu,
  Plus,
  Search,
  Settings,
  User,
  X,
} from "lucide-react-native";

const iconClassNameConfig = {
  className: {
    target: "style",
    nativeStyleToProp: { color: true, width: true, height: true },
  },
} as const;

cssInterop(AlertCircle, iconClassNameConfig);
cssInterop(Bell, iconClassNameConfig);
cssInterop(Calendar, iconClassNameConfig);
cssInterop(Check, iconClassNameConfig);
cssInterop(ChevronDown, iconClassNameConfig);
cssInterop(ChevronLeft, iconClassNameConfig);
cssInterop(ChevronRight, iconClassNameConfig);
cssInterop(Download, iconClassNameConfig);
cssInterop(Filter, iconClassNameConfig);
cssInterop(Home, iconClassNameConfig);
cssInterop(Menu, iconClassNameConfig);
cssInterop(Plus, iconClassNameConfig);
cssInterop(Search, iconClassNameConfig);
cssInterop(Settings, iconClassNameConfig);
cssInterop(User, iconClassNameConfig);
cssInterop(X, iconClassNameConfig);

export {
  AlertCircle,
  Bell,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Home,
  Menu,
  Plus,
  Search,
  Settings,
  User,
  X,
};
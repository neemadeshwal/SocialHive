import {
  faBars,
  faBurger,
  faCompass,
  faHeart,
  faHome,
  faList,
  faMagnifyingGlass,
  faMessage,
  faPerson,
  faPersonCirclePlus,
  faPlusSquare,
  faUser,
  faUserCircle,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
type LeftBar = {
  id: string;
  title: string;
  icon: any;
};
import { v4 as uuidv4 } from "uuid";

const randomUUID: string = uuidv4();

const LeftBarPanel: LeftBar[] = [
  {
    id: "1abc",
    title: "home",
    icon: faHome,
  },
  {
    id: "2abc",
    title: "search",
    icon: faMagnifyingGlass,
  },

  {
    id: "5abc",
    title: "messages",
    icon: faMessage,
  },
  {
    id: "6abc",
    title: "notification",
    icon: faHeart,
  },
  {
    id: "7abc",
    title: "create",
    icon: faPlusSquare,
  },
  {
    id: "8abc",
    title: "profile",
    icon: faUserCircle,
  },
  {
    id: "9abc",
    title: "more",
    icon: faBars,
  },
];

export default LeftBarPanel;

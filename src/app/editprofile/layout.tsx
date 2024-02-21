import {
  faUser,
  faCheckSquare,
  faShield,
  faLock,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SidePanel from "../(components)/sidePanel";
import Link from "next/link";
export default function Layout({ children }: any) {
  return (
    <SidePanel>
      <div className=" mt-20 w-[70vw]  min-h-[100vh]">
        <div className="flex gap-4">
          <div className="w-[20vw] flex flex-col gap-8  text-gray-400 capitalize">
            <h1 className="text-3xl ">Settings</h1>
            <Link href="/editprofile/personal">
              <div className="flex gap-3 items-center hover:bg-gray-950 py-5 text-md px-4 rounded-xl">
                <FontAwesomeIcon icon={faUser} />
                <p>personal details</p>
              </div>
            </Link>
            <Link href="/editprofile/security">
              <div className="flex gap-3 items-center hover:bg-gray-950  py-5 text-md px-4 rounded-xl">
                <FontAwesomeIcon icon={faShield} />
                <p>password and security</p>
              </div>
            </Link>
            <Link href="/editprofile/">
              <div className="flex gap-3 items-center hover:bg-gray-950  py-4 text-md px-4 rounded-xl">
                <FontAwesomeIcon icon={faWrench} />
                <p>general settings</p>
              </div>
            </Link>
            <Link href="/editprofile/privacy">
              <div className="flex gap-3 items-center hover:bg-gray-950 py-4 text-md px-4 rounded-xl">
                <FontAwesomeIcon icon={faLock} />
                <p>account privacy</p>
              </div>
            </Link>
          </div>
          <div className="h-[80vh] w-px  block bg-gray-900"></div>
          {children}
        </div>
      </div>
    </SidePanel>
  );
}

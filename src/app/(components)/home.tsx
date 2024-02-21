import AccountDetails from "./accountsDetail";
import ShowAllPost from "./showAllPost";
export default function Home() {
  return (
    <div className="flex justify-between w-full gap-10 h-full">
      <div className=" w-[48vw]  pt-10">
        <ShowAllPost />
      </div>
      <div className="w-[20vw] pt-10">
        <AccountDetails />
      </div>
    </div>
  );
}

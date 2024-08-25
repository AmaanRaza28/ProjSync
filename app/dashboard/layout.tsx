import SideNav from "../ui/nav/SideNav";
import Navbar from "../ui/nav/Navbar";
// import Search from "../ui/nav/Search";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col ">
      <Navbar />
      <div className="flex flex-1 flex-col md:flex-row pt-12 md:pt-0">
        <SideNav />
        <div className="flex-1 flex flex-col md:pl-64">
          {/* <Search /> */}
          {children}
        </div>
      </div>
    </div>
  );
}

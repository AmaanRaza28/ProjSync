import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ListIcon, ViewIcon } from "lucide-react";

export default function Search() {
  return (
    <header className="md:ml-64 mt-12 md:mt-0 fixed top-0 left-0 right-0 z-40 bg-white flex items-center justify-between p-4 border-b">
      <Input type="search" placeholder="Search" className="max-w-xs" />
      <div className="flex items-center space-x-4">
        <span className="hidden md:block">Monday, 6th March</span>
        <Button variant="secondary" size="icon">
          <ViewIcon className="w-5 h-5" />
        </Button>
        <Button variant="secondary" size="icon">
          <ListIcon className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}

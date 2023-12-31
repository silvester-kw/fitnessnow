import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Card from "@/components/base/Card";
import { redirect } from "next/navigation";
import Link from "next/link";
import NavbarClasses from "@/components/base/NavbarClasses";

export default async function Classes() {
  const date = new Date();
  let currentDay = String(date.getDate()).padStart(2, "0");
  let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
  let currentYear = date.getFullYear();
  let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

  const supabase = createServerComponentClient({ cookies });
  const { data: sesi, error } = await supabase.auth.getSession();
  const query = supabase.from("kelas_latihan").select("*").gt("date", currentDate).order("created_at", { ascending: false });
  const { data: kelas } = await query;
  {
    sesi?.session?.user == null ? redirect("/about") : <></>;
  }

  return (
    <>
      <div className="bg-black">
        <div className="container">
          <NavbarClasses />
        </div>
      </div>
      <div className="container min-h-screen">
        <div className="my-4 md:my-8 lg:my-12 flex mx-3">
          <div className="text-sm sm:text-md md:text-2xl lg:text-3xl font-bold px-3 md:px-10 lg:px-12 py-2 bg-red-800 rounded-xl text-white">Classes</div>
          <Link href="classes/registered-class" className="hover:bg-gray-200 ml-2 text-sm sm:text-md md:text-2xl lg:text-3xl font-bold px-3 md:px-10 lg:px-12 py-2 bg-white rounded-xl text-gray-400 cursor-pointer">
            Registered Classes
          </Link>
        </div>
        <div>
          {kelas?.length == 0 ? <div>Tidak Ada Kelas</div> : <></>}
          {kelas && kelas?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
              {kelas?.map((item, index) => (
                <Card kelas={item} key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

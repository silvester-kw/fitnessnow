import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Card from "@/components/base/Card";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";
import NavbarClasses from "@/components/base/NavbarClasses";

export default async function Classes() {
  const supabase = createServerComponentClient({ cookies });
  const { data: sesi, error } = await supabase.auth.getSession();
  const { data } = await supabase.auth.getUser();
  const queryClassList = supabase.from("anggota_ikut_kelas").select("class_id").eq("user_id", data.user?.id);
  const { data: kelasList } = await queryClassList;
  const { data: kelas } = await supabase.from("kelas_latihan").select("*");
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
          <Link href="/classes" className="text-sm sm:text-md md:text-2xl lg:text-3xl font-bold px-3 md:px-10 lg:px-12 py-2 hover:bg-gray-200 mr-2 rounded-xl text-gray-400 cursor-pointer">
            Classes
          </Link>
          <div className="text-sm sm:text-md md:text-2xl lg:text-3xl font-bold px-3 md:px-10 lg:px-12 py-2 bg-red-800 rounded-xl text-white">Registered Classes</div>
        </div>
        <>
          {kelasList?.length == 0 ? <div>Tidak Ada Kelas Terdaftar</div> : <></>}
          {kelasList && kelasList?.length > 0 && (
            <div className="w-full gap-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {kelas?.map((kelas, kelasIndex) => (
                <React.Fragment key={kelasIndex}>{kelasList?.map((registered, registeredIndex) => registered.class_id === kelas.id && <Card kelas={kelas} key={kelas.id} />)}</React.Fragment>
              ))}
            </div>
          )}
        </>
      </div>
    </>
  );
}

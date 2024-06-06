"use client"
import { getCookie, setCookie } from "@/components/utils/cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function page() {
  const router = useRouter();


  const initLocale = async () => {
    let accessTokenAzure =  await getCookie("accessTokenAzure")
    console.log('accessTokenAzure : ', accessTokenAzure);
    let userInfo:any =  await getCookie("userInfo")
    console.log('userInfo : ', JSON.parse(userInfo));
    setCookie(`nx-access-token`, `test`, 111)
   let locale =  await getCookie("NEXT_LOCALE")
    router.push(`/${locale || `en`}/main`);
   }
 
   useEffect(() => {
     initLocale()
     return () => {
     }
   }, [])

  
  return (
    <div className=" text-gray-600">
      {`...Loading`}
    </div>
  );
}

export default page;

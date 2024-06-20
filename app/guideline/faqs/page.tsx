"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GuidelinesData } from "@/types/types";
import { Notifications } from "@/components/Notification";
import { GuidelineEditor } from "@/components/GuidelineEditor";
import { GuidelineButton } from "@/components/GuidelineButton";
import DashboardLayout from "@/app/layouts/Dashboard";
import { getGuideline } from "@/API/guideline.api";
import { useQuery } from "@tanstack/react-query";

export default function GuidelinePage() {
  const [value, setValue] = useState("");

  // Fetching content
  const { data, isLoading } = useQuery<GuidelinesData>({
    queryKey: ["FAQs"],
    queryFn: () => getGuideline("FAQs"),
  });

  useEffect(() => {
  setValue(data?.response.guidelines[0].content || ""); 
  }, [data])
  
  return (
    <DashboardLayout active={5} title="Guidelines">
      <div className="px-10 pb-10">
        <div className="flex gap-20 my-14 border-b-2 mb-2">
          <Link href={'/guideline'}>
          <h4 className=" ">Terms & Condition</h4>
          </Link>
          <h4 className="font-bold opacity-80 border-b-4 border-[#093732]">
            FAQs
          </h4>
          <h4 className="opacity-80]">
            <Link href={"/guideline/privacy"}>Privacy Policy</Link>
          </h4>
        </div>
        <div className="flex gap-4 mt-5">
          <div className="flex flex-col gap-10 w-3/4 justify-between">
            <GuidelineEditor setValue={setValue} value={value} />
            <div className="flex justify-center mt-5">
            <GuidelineButton value={value} type="FAQs" title="FAQs"/>
            </div>
          </div>
          <Notifications />
        </div>
      </div>
    </DashboardLayout>
  );
}





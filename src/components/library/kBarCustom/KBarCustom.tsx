"use client";
import React from "react";
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
  NO_GROUP,
  KBarResults,
  ActionImpl,
} from "kbar";
import CottageIcon from '@mui/icons-material/Cottage';
import { useRouter } from "next/navigation";

// Forward Ref
const ResultItem = React.forwardRef(function ResultItem(
  { action, active }: { action: ActionImpl; active: boolean },
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={
        active
          ? `px-3 py-2 leading-none rounded text-sm flex items-center justify-between bg-violet-50`
          : `px-3 py-2 leading-none rounded text-sm flex items-center justify-between hover:bg-violet-50`
      }
    >
      <header className="flex items-center">
        {action.icon}
        <div className="rounded flex flex-col items-start justify-center relative select-none outline-none hover:bg-violet-50">
          <h1 className="text-md font-bold"> {action.name} </h1>
          <p className="text-sm py-1"> {action.subtitle} </p>
        </div>
      </header>
      <div className="text-[15px] leading-none text-sm rounded flex justify-between items-center relative select-none outline-none hover:bg-violet-50">
        {action.shortcut?.length ? (
          <div
            aria-hidden
            style={{ display: "grid", gridAutoFlow: "column", gap: "4px" }}
          >
            {action.shortcut.map((sc) => (
              <kbd
                key={sc}
                style={{
                  padding: "4px 6px",
                  background: "rgba(0 0 0 / .1)",
                  borderRadius: "4px",
                  fontSize: 14,
                }}
              >
                {sc}
              </kbd>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
});

const RenderResults = () => {
  const { results } = useMatches();
  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => {
        return typeof item === "string" ? (
          <div className="py-3 px-5">
            {" "}
            <h2 className="text-start uppercase"> {item} </h2>{" "}
          </div>
        ) : (
          <ResultItem action={item} active={active} />
        );
      }}
    />
  );
};

function KBarCustom() {
  const router = useRouter();
  
  const actions = [
    {
      id: "1",
      name: "New Date Rang",
      shortcut: ["h"],
      keywords: "Date Rang",
      section: "Navigation",
      perform: () => router.push("/en/lib/app/dateRang"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Detail...",
    },
    {
      id: "2",
      name: "New Drawer",
      shortcut: ["h1"],
      keywords: "Drawer",
      section: "Navigation",
      perform: () => router.push("/en/lib/app/drawer"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Detail...",
    },
    {
      id: "3",
      name: "CountyPhone",
      shortcut: ["a"],
      keywords: "CountyPhone",
      section: "Navigation2",
      perform: () => router.push("/en/lib/app/countyPhone"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Detail...",
    },
  ];

  return (
    <>
      <KBarProvider actions={actions}>
        <KBarPortal>
          <KBarPositioner>
            <KBarAnimator className="max-w-3xlLspInfo w-3/6 bg-white border-r-8 overflow-hidden shadow-white text-black ">
              <KBarSearch defaultPlaceholder="Search..." className="py-4 px-5 text-xs w-full outline-none border-none bg-white text-black " />
              <RenderResults />
            </KBarAnimator>
          </KBarPositioner>
        </KBarPortal>
        <div>command CTRL + K</div>
      </KBarProvider>
    </>
  );
}

export default KBarCustom;

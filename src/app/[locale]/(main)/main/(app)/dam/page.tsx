import BarMenu from "@/components/layout/barMenu/BarMenu";
import Demo from "@/components/main/demo/Demo";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

function page() {
  return (
    <>
      <div className=" h-[100%] grid items-between">
        <div className="h-[calc(100vh-112px)] relative ">
          <img
            src="/assets/image/Group 1000005762.png"
            className=" top-0 left-0 w-full h-full object-cover bg-cover bg-center	bg-no-repeat "
            alt=""
          />
          <div className="absolute top-0 left-0 grid grid-cols-2 h-[calc(100vh-112px)] w-[100%]">
            <div className=" grid items-center justify-center">
              <div className=" mb-20">
                <div className=" border-[2px] border-[#00ADEF] w-[150px] h-[150px] rounded-full grid items-center justify-center">
                  <PeopleAltIcon
                    className="text-[#00ADEF]"
                    style={{ fontSize: "80px" }}
                  />
                </div>
                <div className=" text-[#00ADEF] text-center font-bold text-[40px] mt-5">{`DAM`}</div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;

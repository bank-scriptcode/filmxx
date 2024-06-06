import React, { useEffect, useState } from "react";

let tempMenu = [
  {
    id: 1,
    menuName: "menu1",
    active: false,
    sub: [
      {
        id: 11,
        menuName: "menu11",
        active: false,
        sub: [
          {
            id: 111,
            menuName: "menu111",
            active: false,
            sub: [],
          },
          {
            id: 112,
            menuName: "menu112",
            active: false,
            sub: [],
          },
          {
            id: 113,
            menuName: "menu113",
            active: false,
            sub: [],
          },
        ],
      },
      {
        id: 12,
        menuName: "menu12",
        active: false,
        sub: [
          {
            id: 121,
            menuName: "menu121",
            active: false,
            sub: [],
          },
        ],
      },
      {
        id: 33,
        menuName: "menu13",
        active: false,
        sub: [],
      },
    ],
  },
  {
    id: 2,
    menuName: "menu2",
    active: false,
    sub: [
      {
        id: 21,
        menuName: "menu21",
        active: false,
        sub: [],
      },
    ],
  },
  {
    id: 3,
    menuName: "menu3",
    active: false,
    sub: [],
  },
  {
    id: 4,
    menuName: "menu4",
    active: false,
    sub: [],
  },
  {
    id: 5,
    menuName: "menu5",
    active: false,
    sub: [],
  },
];

function MenuItem({ item, onToggleActiveState, setMenuState }: any) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (e: any) => {
    onToggleActiveState(e?.id);
    // setIsHovered(true);
  };

  const handleMouseLeave = (e: any) => {
    // console.log(e);
    // onToggleActiveStateLeave(e?.id);
    // setMenuState
    // setIsHovered(false);
  };

  return (
    <li className=" relative">
      <div
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
        onMouseEnter={() => handleMouseEnter(item)}
        onMouseLeave={() => handleMouseLeave(item)}
        // onClick={() => {
        //     handleMouseEnter(item);
        // }}
        className={` cursor-pointer`}
      >
        <div>{item.menuName || "-"}</div>
      </div>
      {item.active && item.sub.length > 0 && (
        <ul className=" bg-[#dbdbdb] p-3 right-[-100%] ">
          {item.sub.map((subItem: any) => (
            <MenuItem
              key={subItem.id}
              item={subItem}
              onToggleActiveState={onToggleActiveState}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function NavMenu() {
  const [menuState, setMenuState] = useState(tempMenu || []);

  const toggleActiveState = (itemId: number) => {
    console.log("itemId : ", itemId);
    setMenuState((prevState: any) => {
      return prevState.map((item: any) => {
        let filter = (item.sub || []).find((f: any) => {
          return f?.id === itemId;
        });
        let filterSub: any = false;
        let checkSub = (item.sub || []).forEach((fe: any) => {
          (fe.sub || []).forEach((fes: any) => {
            if (fes?.id === itemId) {
              filterSub = true;
            }
            return fes;
          });
          return fe;
        });

        if (item.id === itemId) {
          return { ...item, active: true };
        } else if (!!filter) {
          return {
            ...item,
            active: true,
            sub: item.sub.map((subItem: any) => {
              if (subItem.id === itemId) {
                return { ...subItem, active: true };
              } else {
                return { ...subItem, active: false };
              }
            }),
          };
        } else if (!!filterSub) {
          return {
            ...item,
            active: true,
            sub: item.sub.map((subItem: any) => {
              let ck = subItem.sub.find((f: any) => {
                return f?.id === itemId;
              });
              if (!!ck) {
                return { ...subItem, active: true };
              } else {
                return { ...subItem, active: false};
              }
            }),
          };
        } else {
          return {
            ...item,
            active: false,
            sub: item.sub.map((subItem: any) => {
              return { ...subItem, active: false };
            }),
          };
        }

        // if (item.id === itemId) {
        //   console.log('item.id : ', item.id);
        //   return { ...item, active: true };
        // } else if (item.sub && item.sub.length > 0) {
        //   console.log('item.id : ', item.id);
        //   return {
        //     ...item,
        //     sub: item.sub.map((subItem: any) => {
        //       if (subItem.id === itemId) {
        //         return { ...subItem, active: true };
        //       }else{
        //         return { ...subItem, active: false  };
        //       }
        //     }),
        //   };
        // }else{
        //   console.log('item.id : ', item.id);
        // }
        return item;
      });
    });
    // setMenuState((prevState: any) => {
    //   return prevState.map((item: any) => {
    //     if (item.id === itemId) {
    //       return { ...item, active: !item.active };
    //     } else if (item.sub && item.sub.length > 0) {
    //       return {
    //         ...item,
    //         sub: item.sub.map((subItem: any) => {
    //           if (subItem.id === itemId) {
    //             return { ...subItem, active: !subItem.active };
    //           }
    //           return subItem;
    //         }),
    //       };
    //     }
    //     return item;
    //   });
    // });
  };

  useEffect(() => {
    console.log(menuState);
  }, [menuState]);

  return (
    <div className="bg-[#eeeeee]">
      <ul className="flex items-center justify-around">
        {menuState.map((item: any) => (
          <MenuItem
            key={item.id}
            item={item}
            onToggleActiveState={toggleActiveState}
            setMenuState={setMenuState}
          />
        ))}
      </ul>
    </div>
  );
}

export default NavMenu;

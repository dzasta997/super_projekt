import React from "react";
import { 
    Navbar,
    Typography
} from "@material-tailwind/react";

const navList = (
    <ul className="py-5 justify-between items-start w-full h-full text-white grid grid-cols-1 place-items-start">
      <Typography
        as="li"
        variant="small"
        className={window.location.pathname === "/" ? 'font-normal text-lg' : 'font-thin text-lg'}
      >
        <a href="/">
          Dashboard
        </a>
      </Typography>

      <Typography
        as="li"
        variant="small"
        className={window.location.pathname === "/inventory" ? 'font-normal text-lg' : 'font-thin text-lg'}
      >
        <a href="/inventory" className="">
          Inventory
        </a>
      </Typography>

      <Typography
        as="li"
        variant="small"
        className={window.location.pathname === "/edit-inventory" ? 'font-normal text-lg' : 'font-thin text-lg'}
      >
        <a href="/edit-inventory" className="">
          Edit inventory
        </a>
      </Typography>

      <Typography
        as="li"
        variant="small"
        className={window.location.pathname === "/find-item" ? 'font-normal text-lg' : 'font-thin text-lg'}
      >
        <a href="/find-item" className="">
          Find item
        </a>
      </Typography>

      <Typography
        as="li"
        variant="small"
        className={window.location.pathname === "/delivery" ? 'font-normal text-lg' : 'font-thin text-lg'}
      >
        <a href="delivery" className="">
          Delivery
        </a>
      </Typography>

      <Typography
        as="li"
        variant="small"
        className={window.location.pathname === "/shipping" ? 'font-normal text-lg' : 'font-thin text-lg'}
      >
        <a href="/shipping" className="">
          Shipping
        </a>
      </Typography>
    </ul>
);

const UserNavbar = () => {
    return (
        <Navbar className="">
            <div className=" px-5 py-5 w-[200px] h-screen z-10 bg-primaryBlue text-white fixed">
                <Typography
                    as="p"
                    variant="small"
                    className="py-1.5 font-thin text-sm"
                >
                    <span>Warehouse  <br/> Management <br/> System </span>
                </Typography>

                <div>{navList}</div>
                
                <Typography
                    as="href"
                    variant="small"
                    className='absolute px-5 py-5 font-thin left-0 bottom-0'
                >
                    <a href="/login"> Log out </a>
                </Typography>
            </div>
        </Navbar>
    );
}

export default UserNavbar
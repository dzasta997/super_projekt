import React from "react";
import { 
    Navbar,
    Typography
} from "@material-tailwind/react";

const AdminNavbar = () => {
    return (
        <Navbar className="">
            <div className=" px-5 py-5 w-[200px] h-screen z-10 bg-primaryBlue fixed text-white">
                <Typography
                    as="p"
                    variant="small"
                    className="py-1.5 font-thin font-small text-sm"
                >
                    <span>Warehouse  <br/> Management <br/> System </span>
                </Typography>

                <Typography
                    as="href"
                    variant="small"
                    className='py-10 flex font-normal text-lg'
                >
                    <a href="/"> Dashboard </a>
                </Typography>
                
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

export default AdminNavbar
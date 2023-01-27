import React from "react";
import { 
    Navbar,
    Typography
} from "@material-tailwind/react";

const AdminNavbar = ({onLogout}) => {
    return (
        <Navbar className="border-0 py-0 px-0">
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
                    className='pt-10 flex font-normal text-lg'
                >
                    <a href="/"> Dashboard </a>
                </Typography>

                <Typography
                    as="href"
                    variant="small"
                    className='pt-5 flex font-normal text-lg'
                >
                    <a href="/sign-up"> Create account </a>
                </Typography>
                
                <Typography
                    as="href"
                    variant="small"
                    className='absolute px-5 py-5 font-thin left-0 bottom-0'
                >
                <div onClick={onLogout} className="text-white hover:text-darkGray">Log out</div>
                </Typography>
            </div>
        </Navbar>
    );
}

export default AdminNavbar
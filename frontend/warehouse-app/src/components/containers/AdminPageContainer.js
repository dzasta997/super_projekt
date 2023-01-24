export default function AdminPageContainer({children}) {
    return (
        <div className="px-[270px] py-[30px] flex flex-col items-start">
            <div className="text-4xl flex flex-row pb-5">
                Admin dashboard
            </div>
            {children}
        </div>
    );
}
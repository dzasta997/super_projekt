/**
 * A container for all pages.
 * The children elements will be added next to the navbar in a column.
 * @param {string} title - the title of the page, in bold text style.
 * @param {string} location - the location of the warehouse, thin text style. 
 * @param {ReactNode} children - the content of the page.
 * @returns a PageContainer component.
 */
export default function PageContainer({
    title="",
    location="",
    children
}) {
    return (
        <div className="px-[270px] py-[30px] w-full h-screen flex flex-col items-start">
            <div className="text-4xl flex flex-row pb-5">
                {title} 
                <div className="pl-3 font-thin">location: {location}</div>
            </div>
            {children}
        </div>
    );
}
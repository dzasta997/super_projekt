export default function ActionsHistoryElement({ id, type, date }) {
  return (
    <div className="primary-bg">
      <div className="w-100 py-3 px-6 flex">
        <h1 className="text-[30px] font-light mr-3">{`${type} id. ${id}`}</h1>
        <p className=" font-light text-[20px] self-center">{date}</p>
      </div>
    </div>
  );
}

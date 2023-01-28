import { useState } from "react"
import ActionsHistoryElement from "./ActionsHistoryElement"

export default function RecentActions({type}) {
    const [recent, setRecent] = useState([
        {
            id: 1,
            date: "10.12.2022"
        },
        {
            id: 2,
            date: "11.12.2022"
        },
        {
            id: 3,
            date: "15.12.2022"
        }
    ])

    return (
        <div className="flex flex-col gap-4">
        {recent.map((action) => (
          <div key={action.id}>
            <ActionsHistoryElement
              type={type}
              id={action.id}
              date={action.date}
            />
          </div>
        ))}
      </div>
    )
}
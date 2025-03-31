import Sort from "@/components/Sort"
import { SearchParams } from "next/dist/server/request/search-params"
import React from "react"

const Page = async ({ params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || ""

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>
        <div className="total-size-section">
          <p className="body-1">
            Total: <span className="h5">0 MB</span>
          </p>
        </div>
        <div className="sort-container">
          <p className="body-1 hidden sm:block">Sort by: </p>

          <Sort />
        </div>
      </section>
    </div>
  )
}

export default Page

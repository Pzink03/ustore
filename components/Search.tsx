"use client"

import Image from "next/image"
import React, { useEffect, useState } from "react"
import { Input } from "./ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { getFiles } from "@/lib/actions/file.actions"
import { Models } from "node-appwrite"
import Thumbnail from "./Thumbnail"
import { formatDateTime } from "@/lib/utils"
import { useDebounce } from "use-debounce"

const Search = () => {
  const [query, setQuery] = useState("")
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("query") || ""
  const [results, setResults] = useState<Models.Document[]>([])

  const [open, setOpen] = useState(false)

  const [debouncedQuery] = useDebounce(query, 300)
  const router = useRouter()
  const path = usePathname()

  useEffect(() => {
    const fetchFiles = async () => {
      if (debouncedQuery.length === 0) {
        setResults([])
        setOpen(false)
        return router.push(path.replace(searchParams.toString(), ""))
      }
      const files = await getFiles({ types: [], searchText: debouncedQuery })
      setResults(files.documents)
      setOpen(true)
    }
    fetchFiles()
  }, [debouncedQuery])

  useEffect(() => {
    if (!searchQuery) {
      setQuery("")
    }
  }, [])

  const handleClickItem = (file: Models.Document) => {
    setOpen(false)
    setResults([])
    router.push(
      `/${
        file.type === "video" || file.type === "audio"
          ? "media"
          : file.type + "s"
      }?query=${query}`
    )
  }
  return (
    <div className="search">
      <div className="search-input-wrapper">
        <Image
          src="/assets/icons/search.svg"
          alt="Search"
          width={24}
          height={24}
        />
        <Input
          value={query}
          placeholder="Search..."
          className="search-input"
          onChange={(e) => setQuery(e.target.value)}
        />
        {open && (
          <ul className="search-result">
            {results.length > 0 ? (
              results.map((file) => (
                <li
                  key={file.$id}
                  className="flex items-center justify-between"
                >
                  <div className="flex cursor-pointer items-center gap-4">
                    <Thumbnail
                      type={file.type}
                      extension={file.extension}
                      url={file.url}
                      className="size-9 min-w-9"
                    />
                    <p className="subtitle-2 line-clamp-1 text-gray-600">
                      {file.name}
                    </p>
                  </div>
                  <p className="line-clamp-1 text-gray-400">
                    {formatDateTime(file.$createdAt)}
                  </p>
                </li>
              ))
            ) : (
              <p className="empty-result">No files found</p>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Search

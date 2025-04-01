"use client"

import React, { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Models } from "node-appwrite"
import { actionsDropdownItems } from "@/constants"
import { constructDownloadUrl } from "@/lib/utils"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

const ActionsDropdown = ({ file }: { file: Models.Document }) => {
  const [action, setAction] = useState<ActionType | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [fileName, setFileName] = useState(file.name)
  const [isLoading, setIsLoading] = useState(false)

  const closeAllModals = () => {
    setIsDropdownOpen(false)
    setIsModalOpen(false)
    setAction(null)
    setFileName(file.name)
  }

  const handleAction = async () => {}

  const renderDialogContent = () => {
    if (!action) return

    const { value, label } = action
    return (
      <DialogContent className="shad-dialog button">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center text-gray-600">
            {label}
          </DialogTitle>
          {value === "rename" && (
            <Input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          )}
        </DialogHeader>
        {["rename", "delete", "share"].includes(value) && (
          <DialogFooter className="flex flex-col gap-3 md:flex-row">
            <Button
              onClick={() => closeAllModals()}
              className="modal-cancel-button"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleAction()}
              className="modal-submit-button"
            >
              Submit
              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="animate-spin"
                />
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    )
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="shad-no-focus">
          <Image
            src="/assets/icons/dots.svg"
            alt="dots"
            width={34}
            height={34}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="max-w-[200px] truncate">
            {file.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((actionItem) => (
            <DropdownMenuItem
              key={actionItem.value}
              className="shad-dropdown-item"
              onClick={() => {
                setAction(actionItem)

                if (
                  ["rename", "share", "delete", "details"].includes(
                    actionItem.value
                  )
                ) {
                  setIsModalOpen(true)
                }
              }}
            >
              {actionItem.value === "download" ? (
                <Link
                  href={constructDownloadUrl(file.bucketFileId)}
                  download={file.name}
                  className="flex items-center gap-2"
                >
                  <Image
                    src={actionItem.icon}
                    alt={actionItem.label}
                    width={30}
                    height={30}
                  />
                  {actionItem.label}
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Image
                    src={actionItem.icon}
                    alt={actionItem.label}
                    width={30}
                    height={30}
                  />
                  {actionItem.label}
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {renderDialogContent()}
    </Dialog>
  )
}

export default ActionsDropdown

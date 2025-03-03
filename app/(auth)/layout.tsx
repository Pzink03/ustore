import Image from "next/image"
import React from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="hidden w-1/2 bg-primary p-10 items-center justify-center lg:flex xl:w-2/5">
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={224}
            height={82}
            className="h-auto"
          />
          <div className="text-white space-y-5">
            <h1 className="h1">Manage your files the best way</h1>
            <p className="body-1">
              This is a place where you can store all your documents
            </p>
          </div>
          <Image
            src="/assets/images/files.png"
            alt="Files"
            width={342}
            height={342}
          />
        </div>
      </section>
      <section className="flex flex-col flex-1 items-center lg:justify-center bg-white p-4 py-10 lg:p-10 lg:py-0">
        <div>
          <Image
            src="/assets/icons/logo-full-brand.svg"
            alt="logo"
            width={224}
            height={82}
            className="h-auto w-[200px] lg:w-[250px]"
          />
        </div>
        {children}
      </section>
    </div>
  )
}

export default Layout

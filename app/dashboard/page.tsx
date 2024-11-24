import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { Button } from "@/components/ui/buts"

import Image from "next/image"
 
import { AspectRatio } from "@/components/ui/aspect-ratio"


import { Terminal } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function Page() {
  return (
    <SidebarProvider style={{overflow: 'hidden'}}>
      <AppSidebar />
      
      <div className="flex w-full h-screen">
  <div className="w-2/5 md:w-2/5 lg:w-2/4 flex flex-col justify-between"> {/* First sidebar: 40% width */}
    {/* <div> */}
      <SidebarInset className="h-full flex flex-col justify-between">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Write your prompt
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Get your image</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="grid w-full gap-1.5 flex items-center gap-3 px-6 absolute bottom-2.5 left-1/2 transform -translate-x-1/2">
          <Label htmlFor="message" className="text-white">Your prompt</Label>
          <Textarea placeholder="Type your prompt here." id="message" />
          <Button>Submit</Button>
        </div>
      </SidebarInset>
    {/* </div> */}
  </div>
 
  <div className="w-3/5 md:w-3/5 lg:w-3/5 flex flex-col justify-between">
    {/* <div > */}
      <SidebarInset className="bg-[hsl(240,5.9%,10%)] h-full flex flex-col justify-between items-center">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            {/* <SidebarTrigger className="-ml-1" /> */}
            {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
            <Breadcrumb>
              <BreadcrumbList>
                {/* <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" /> */}
                <BreadcrumbItem>
                  <BreadcrumbPage>Generated Image</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* <div className="w-full relative grid w-full gap-1.5 flex items-center gap-3 px-6">
          <AspectRatio>
            <Image src="https://images.unsplash.com/photo-1731902062633-1496d7bcf95c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image" fill={true} objectFit="cover" className="w-full h-full object-cover rounded-2xl" />
          </AspectRatio>
        </div> */}

        <div className="w-full h-screen flex items-center justify-center">
          <div className="w-full max-w-[90%] md:max-w-[50%]">
            <AspectRatio>
              <Image
                src="https://images.unsplash.com/photo-1731902062633-1496d7bcf95c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Image"
                layout="fill"
                objectFit="cover"
                className="rounded-2xl"
              />
            </AspectRatio>
          </div>
        </div>
      </SidebarInset>
    {/* </div> */}
  </div>
</div>
    </SidebarProvider>
  )
}

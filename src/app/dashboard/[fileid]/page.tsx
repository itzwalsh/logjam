import ChatWrapper from "@/components/ChatWrapper"
import ImageRenderer from "@/components/ImageRenderer"
import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { notFound, redirect } from "next/navigation"

interface PageProps {
  params: {
    fileid: string
  }
}
const Page = async ({ params }: PageProps) => {
  //   obtain file id
  const { fileid } = params

  const { getUser } = getKindeServerSession()
  const user = getUser()

  if (!user || !user.id) redirect(`/auth-callback?origin=dashboard/${fileid}`)

  //make db call
  const file = await db.file.findFirst({
    where: {
      id: fileid,
      userId: user.id,
    },
  })

  if (!file) notFound()

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        {/* Top Side - Image/Text Input */}
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6 bg-blue-200">
            <ImageRenderer />
          </div>
        </div>

        {/* Bottom Side - Chat */}
        <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6 bg-red-200">
            <ChatWrapper />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page

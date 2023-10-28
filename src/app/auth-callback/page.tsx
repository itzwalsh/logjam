import { useRouter, useSearchParams } from "next/navigation"
import { trpc } from "../_trpc/client"
import { QueryCache, QueryClient } from "@tanstack/react-query"

const Page = async () => {
  const router = useRouter()

  const searchParams = useSearchParams()
  const origin = searchParams.get("origin")

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        // im not certain this works. TODO: figure out v5 workaround for deprecated onError/onSuccess
      },
    }),
  })

  const { data, isLoading } = trpc.authCallback.useQuery(
    router.push(origin ? `/${origin}` : `/dashboard`)
  )
}

export default Page

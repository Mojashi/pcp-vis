import { useRouter } from "next/router";
import { PCP } from "../../app/model/pcp";
import { PCPExplore } from "../../app/explore";
import RootLayout from "@/app/layout";
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Flowbite } from 'flowbite-react';

const customTheme: CustomFlowbiteTheme = {
    sidebar: {
      "root": {
        "inner": "h-full overflow-y-auto w-fit overflow-x-hidden rounded bg-gray-50 py-4 px-3 dark:bg-gray-800"
      }
    }
  };
function ExplorePage() {
    const router = useRouter();

    const upArray = router.query["up"]
    const dnArray = router.query["dn"]
    if (upArray === undefined || dnArray === undefined) return <div>Invalid query</div>
    if (typeof upArray === "string" || typeof dnArray === "string") return <div>Invalid query</div>
    if (upArray.length !== dnArray.length) return <div>Invalid query</div>

    const pcp: PCP = upArray.map((up, idx) => ({ up: up, dn: dnArray[idx] }))

    return <div>
      <Flowbite theme={{ theme: customTheme }}>

        <PCPExplore pcp={pcp}></PCPExplore>
        </Flowbite>
    </div>
}
ExplorePage.Layout = RootLayout
export default ExplorePage

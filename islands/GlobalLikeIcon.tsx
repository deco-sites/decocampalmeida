import { useEffect } from "preact/hooks";
import Icon from "../components/ui/Icon.tsx";
import { useUI } from "../sdk/useUI.ts";
import { invoke } from "deco-sites/decocampalmeida/runtime.ts"

function GlobalLikeIcon() {
  const { likesCountGlobal } = useUI();
  const likes = likesCountGlobal?.value
  const THIRTY_SECONDS = 30000;
  
  const updateVotes = async () => {
    const result = await invoke["deco-sites/decocampalmeida"].loaders.ProductLike.getGlobalLikes()
    if (result) {
      likesCountGlobal.value = result.total;
    }
  };

  useEffect(() => {
    updateVotes();
    const intervalId = setInterval(() => {
      updateVotes()
    }, THIRTY_SECONDS);
    
    return () => clearInterval(intervalId);
  }, [])
  
  return (
    <>
    <div class="relative">
      {likes !== null && (
        <span class="absolute flex items-center justify-center h-[20px] w-[20px] text-[15px] top-[-10px] right-[-10px] bg-orange-600 rounded-full p-1 text-[#FFF]">
          {likes}
        </span>
      )}
      <Icon id="Friends" size={40} strokeWidth={0.4} />
    </div>
    </>
  );
}

export default GlobalLikeIcon;

import Icon from "deco-sites/decocampalmeida/components/ui/Icon.tsx";
import { useUI } from "deco-sites/decocampalmeida/sdk/useUI.ts";
import { invoke } from "deco-sites/decocampalmeida/runtime.ts";
import { useEffect, useState } from "preact/hooks";
import { toast, ToastContainer } from "tostfy";
import { SendEventOnClick } from "deco-sites/decocampalmeida/components/Analytics.tsx";
interface Props {
  id: string;
}

function ProductLikeButton({
  id,
}: Props) {
  const { likesCountGlobal } = useUI();
  const [userAlreadyVoted, setUserAlreadyVoted] = useState(false);
  const [productLikes, setProductLikes] = useState(0);

  const addLike = async () => {
    const result = await invoke["deco-sites/decocampalmeida"].actions
      .ProductLike.addLikes({ productId: id });

    if (result) {
      likesCountGlobal.value = likesCountGlobal.value + 1;
      toast("Você curtiu esse produto!", {
        autoClose: 3000,
        containerId: id,
        position: "bottom-center",
        hideProgressBar: true,
      });
    }
    setUserAlreadyVoted(true);
  };

  const getLikes = async () => {
    const result = await invoke["deco-sites/decocampalmeida"].loaders
      .ProductLike.getProductLikes({ productId: id });

    if (result) {
      setProductLikes(result.product)
    }
  };

  useEffect(() => { getLikes() }, [])


  return (
    <button class="relative block pointer w-[40px]"
      onClick={() => {
        userAlreadyVoted ? console.log("Already voted") : addLike(); getLikes();
      }}>
      <>
        {productLikes !== null && (
          <span class="absolute flex items-center justify-center h-[20px] w-[20px] text-[15px] top-[-10px] right-[-10px] bg-orange-600 rounded-full p-1 text-[#FFF]">
            {productLikes}
          </span>
        )}
        {userAlreadyVoted ?
          <Icon id={"MoodCheck"} size={40} strokeWidth={0.4} />
          :
          <>
            <Icon id={"MoodSmile"} size={40} strokeWidth={0.4} />
            <SendEventOnClick
              id={id}
              event={{
                name: "post_score" as const,
                params: {
                  score: productLikes + 1,
                  character: 'user'
                },
              }}
              />
          </>
        }
        <ToastContainer containerId={id} />
      </>
    </button>
  );
}

export default ProductLikeButton;

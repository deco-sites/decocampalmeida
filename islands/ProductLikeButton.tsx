import Icon from "deco-sites/decocampalmeida/components/ui/Icon.tsx";
import { useUI } from "deco-sites/decocampalmeida/sdk/useUI.ts";
import { invoke } from "deco-sites/decocampalmeida/runtime.ts";
import { useState } from "preact/hooks";

interface Props {
  id: string;
}

function ProductLikeButton({
  id,
}: Props) {
  const { likesCountGlobal } = useUI();
  const [userAlreadyVoted, setUserAlreadyVoted] = useState(false);

  const addLike = async () => {
    const result = await invoke["deco-sites/decocampalmeida"].actions
      .ProductLike.addLikes({ productId: id });

    if (result) {
      likesCountGlobal.value = likesCountGlobal.value + 1;
    }
    setUserAlreadyVoted(true);
  };

  return (
    <button
      class="block pointer"
      onClick={() => {
        userAlreadyVoted ? console.log("Already voted") : addLike();
      }}
    >
      {userAlreadyVoted
        ? <Icon id={"MoodCheck"} size={40} strokeWidth={0.4} />
        : <Icon id={"MoodSmile"} size={40} strokeWidth={0.4} />}
    </button>
  );
}

export default ProductLikeButton;

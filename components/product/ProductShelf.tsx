import { SendEventOnView } from "../../components/Analytics.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "../../components/product/ProductCard.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Header from "../../components/ui/SectionHeader.tsx";
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { clx } from "../../sdk/clx.ts";
import HorizontalProductCard, {
  Layout as horizontalCardLayout,
} from "./HorizontalProductCard.tsx";
import Image from "apps/website/components/Image.tsx";
export interface Props {
  products: Product[] | null;
  title?: string;
  description?: string;
  layout?: {
    horizontal?: boolean;
    numberOfSliders?: {
      mobile?: 1 | 2 | 3 | 4 | 5;
      desktop?: 1 | 2 | 3 | 4 | 5;
    };
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large" | "Small";
    showArrows?: boolean;
  };
  cardLayout?: cardLayout;
  horizontalCardLayout?: horizontalCardLayout;
}

function ProductShelf({
  products,
  title,
  description,
  layout,
  cardLayout,
}: Props) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }
  const slideDesktop = {
    1: "md:w-full",
    2: "md:w-1/2",
    3: "md:w-1/3",
    4: "md:w-1/4",
    5: "md:w-1/5",
  };

  const slideMobile = {
    1: "w-full",
    2: "w-1/2",
    3: "w-1/3",
    4: "w-1/4",
    5: "w-1/5",
  };

  return (
    <div class="w-full container py-8 flex flex-col gap-6 lg:py-10">
      <Header
        title={title || ""}
        description={description || ""}
        fontSize={layout?.headerfontSize || "Large"}
        alignment={layout?.headerAlignment || "center"}
      />

      {layout?.horizontal
        ? (
          <div
            id={id}
            class={`flex flex-row justify-center items-center gap-14 flex-wrap`}
          >
            {products?.map((product, index) => (
              product
                ? (
                  <HorizontalProductCard
                    product={product}
                    itemListName={title}
                    layout={cardLayout}
                    platform={"vtex"}
                    index={index}
                  />
                )
                : (
                  <>
                    <Image
                      src={"front.url!"}
                      alt={"front.alternateName"}
                      width={500}
                      height={500}
                      class={`bg-base-100 col-span-full row-span-full rounded w-full`}
                      sizes="(max-width: 640px) 50vw, 20vw"
                      preload={true}
                      loading="eager"
                      decoding="async"
                    />
                  </>
                )
            ))}
          </div>
        )
        : (
          <div
            id={id}
            class={clx(
              "grid",
              layout?.showArrows && "grid-cols-[48px_1fr_48px]",
              "px-0 md:px-5 container",
            )}
          >
            <Slider class="carousel carousel-center sm:carousel-end sm:gap-1 row-start-2 row-end-5">
              {products?.map((product, index) => (
                <Slider.Item
                  index={index}
                  class={clx(
                    "carousel-item",
                    slideDesktop[layout?.numberOfSliders?.desktop ?? 3],
                    slideMobile[layout?.numberOfSliders?.mobile ?? 1],
                  )}
                >
                  <ProductCard
                    product={product}
                    itemListName={title}
                    layout={cardLayout}
                    platform={"vtex"}
                    index={index}
                  />
                </Slider.Item>
              ))}
            </Slider>

            {layout?.showArrows && (
              <>
                <div class="relative block z-10 col-start-1 row-start-3">
                  <Slider.PrevButton class="absolute w-12 h-12 flex justify-center items-center">
                    <Icon
                      size={24}
                      id="ChevronLeft"
                      strokeWidth={3}
                      class="w-5"
                    />
                  </Slider.PrevButton>
                </div>
                <div class="relative block z-10 col-start-3 row-start-3">
                  <Slider.NextButton class="absolute w-12 h-12 flex justify-center items-center">
                    <Icon size={24} id="ChevronRight" strokeWidth={3} />
                  </Slider.NextButton>
                </div>
              </>
            )}
            <SliderJS rootId={id} />
            <SendEventOnView
              id={id}
              event={{
                name: "view_item_list",
                params: {
                  item_list_name: title,
                  items: products.map((product, index) =>
                    mapProductToAnalyticsItem({
                      index,
                      product,
                      ...(useOffer(product.offers)),
                    })
                  ),
                },
              }}
            />
          </div>
        )}
    </div>
  );
}

export default ProductShelf;

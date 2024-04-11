import type { HTMLWidget } from "apps/admin/widgets.ts";
import RichText from "../../sections/Content/RichText.tsx";
import { useUI } from "../../sdk/useUI.ts";

export interface Props {
  textBefore?: HTMLWidget;
  textAfter?: HTMLWidget;
  voucher?: string;
  voucherValue?: number;
}

function CouponSection({
  textBefore =
    "Você ganhou um vale-presente para<br>  gastar em uma de nossas lojas!",
  textAfter =
    "Válido em nossas <strong>lojas físicas</strong> ou <strong>online</strong>",
  voucherValue = 100,
  voucher = "PRIMEIRA100",
}: Props) {
  const { callAction } = useUI();

  const actionCopy = () => {
    navigator.clipboard.writeText(voucher)
      .then(() => {
        console.log("Texto copiado para a área de transferência!");
        callAction.value = true;
        setTimeout(() => {
          callAction.value = false;
        }, 2000);
      });
  };

  return (
    <div class="flex justify-center flex-col content-center items-center py-10 gap-3">
      <div class="">
        <span>
          <RichText text={textBefore} />
        </span>
      </div>

      <div class="flex items-center justify-between gap-5 py-1">
        <span class="text-[20px]">
          R$ <strong class="text-[80px]">{voucherValue}</strong>
        </span>
        <div class="border border-black w-1 h-20" />
        <div class="flex flex-col items-center">
          <span class="text-[30px]">{voucher}</span>
          <button
            onClick={actionCopy}
            class={`btn ${callAction.value ? "btn-success" : "btn-outline"}`}
          >
            {callAction.value ? "Copiado com sucesso!" : "Clique para copiar"}
          </button>
        </div>
      </div>

      <div class="">
        <RichText text={textAfter} />
      </div>
    </div>
  );
}

export default CouponSection;

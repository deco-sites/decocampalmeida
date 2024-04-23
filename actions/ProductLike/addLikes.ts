export interface Props {
  productId: string;
}

export type Res = {
  product: number;
};

const action = async (
  props: Props,
  _req: Request,
): Promise<Res | null> => {
  const { productId } = props;
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    const res = await fetch(`https://camp-api.deco.cx/event`, {
      signal,
      method: "POST",
      headers: {
        "x-api-key": "decocampalmeida",
      },
      mode: "no-cors",
      body: JSON.stringify({ "productId": productId }),
    });
    const response = await res.json();
    return response;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default action;

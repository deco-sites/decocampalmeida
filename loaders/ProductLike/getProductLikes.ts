export interface Props {
  productId: string;
  total: number;
}

export type Res = {
  product: number;
  total: number;
};

const loader = async (props: Props): Promise<Res | null> => {
  const { productId } = props;

  const controller = new AbortController();
  const signal = controller.signal;

  try {
    const res = await fetch(`https://camp-api.deco.cx/event/${productId}`, {
      signal,
      headers: {
        "x-api-key": "decocampalmeida",
      },
    });
    const response = await res.json();
    return response;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default loader;
